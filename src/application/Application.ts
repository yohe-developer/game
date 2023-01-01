/**
 * Created by aio on 2022/12/31 16:14
 */
import { Vec2 } from '@/application/math2d'
import { CanvasKeyBoardEvent, CanvasMouseEvent } from '@/application/Event'
import { Timer, TimerCallback } from '@/application/Timer'

export class Application implements EventListenerObject {
  public timers: Timer[] = []
  private _timerId: number = -1

  private _fps: number = 0
  protected _start: boolean = false
  protected _requestId: number = -1
  protected _lastTime!: number
  protected _startTime!: number

  public canvas: HTMLCanvasElement

  protected _isMouseDown: boolean
  public isSupportMouseMove: boolean

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas

    this.canvas.addEventListener('mousedown', this, false)
    this.canvas.addEventListener('mouseup', this, false)
    this.canvas.addEventListener('mousemove', this, false)
    window.addEventListener('keydown', this, false)
    window.addEventListener('keyup', this, false)
    window.addEventListener('keypress', this, false)

    this.isSupportMouseMove = false
    this._isMouseDown = false
  }

  /**
   * 实现 addEventListener 回调接口
   * @param evt
   */
  public handleEvent(evt: Event): void {
    switch (evt.type) {
      case 'mousedown':
        this._isMouseDown = true
        this.dispatchMouseDown(this._toCanvasMouseEvent(evt))
        break
      case 'mouseup':
        this._isMouseDown = false
        this.dispatchMouseUp(this._toCanvasMouseEvent(evt))
        break
      case 'mousemove':
        if (this.isSupportMouseMove) {
          this.dispatchMouseMove(this._toCanvasMouseEvent(evt))
        }
        if (this._isMouseDown) {
          this.dispatchMouseDrag(this._toCanvasMouseEvent(evt))
        }
        break
      case 'keypress':
        this.dispatchKeyPress(this._toCanvasKeyBoardEvent(evt))
        break
      case 'keydown':
        this.dispatchKeyDown(this._toCanvasKeyBoardEvent(evt))
        break
      case 'keyup':
        this.dispatchKeyUp(this._toCanvasKeyBoardEvent(evt))
        break
    }
  }

  protected dispatchMouseDown(evt: CanvasMouseEvent): void {}
  protected dispatchMouseUp(evt: CanvasMouseEvent): void {}
  protected dispatchMouseMove(evt: CanvasMouseEvent): void {}
  protected dispatchMouseDrag(evt: CanvasMouseEvent): void {}
  protected dispatchKeyPress(evt: CanvasKeyBoardEvent): void {}
  protected dispatchKeyDown(evt: CanvasKeyBoardEvent): void {}
  protected dispatchKeyUp(evt: CanvasKeyBoardEvent): void {}

  public start(): void {
    if (!this._start) {
      this._start = true
      this._requestId = -1
      this._lastTime = -1
      this._startTime = -1
      this._requestId = requestAnimationFrame((elapsedMsec: number) => this.step(elapsedMsec))
    }
  }

  public stop(): void {
    if (this._start) {
      cancelAnimationFrame(this._requestId)
      this._start = false
      this._requestId = -1
      this._lastTime = -1
      this._startTime = -1
    }
  }

  public isRunning(): boolean {
    return this._start
  }

  public get fps(): number {
    return this._fps
  }

  protected step(timeStamp: number): void {
    if (this._startTime === -1) this._startTime = timeStamp
    if (this._lastTime === -1) this._lastTime = timeStamp

    const elapsedMsec: number = timeStamp - this._startTime
    let intervalSec: number = timeStamp - this._lastTime

    if (intervalSec !== 0) {
      this._fps = 1000.0 / intervalSec
    }
    intervalSec /= 1000.0

    this._lastTime = timeStamp
    this._handleTimers(intervalSec)
    this.update(elapsedMsec, intervalSec)
    this.render()
    this._requestId = requestAnimationFrame((elapsedMsec: number) => this.step(elapsedMsec))
  }

  update(elapsedMsec: number, intervalMsec: number): void {}

  render(): void {}

  /**
   * 转换到canvas 坐标
   * @param evt
   * @private
   */
  private _viewportToCanvasCoordinate(evt: MouseEvent): Vec2 {
    if (this.canvas) {
      const rect: DOMRect = this.canvas.getBoundingClientRect()
      if (evt.type === 'mousedown') {
        console.log('getBoundingClientRect' + JSON.stringify(rect))
      }
      if (evt.target) {
        let borderLeftWidth: number = 0
        let borderTopWidth: number = 0
        let paddingLeft: number = 0
        let paddingTop: number = 0

        const decl: CSSStyleDeclaration = window.getComputedStyle(evt.target as HTMLElement)
        let strNumber: string | null = decl.borderLeftWidth
        if (strNumber !== null) {
          borderLeftWidth = parseInt(strNumber, 10)
        }
        strNumber = decl.borderTopWidth
        if (strNumber !== null) {
          borderTopWidth = parseInt(strNumber, 10)
        }
        strNumber = decl.paddingLeft
        if (strNumber !== null) {
          paddingLeft = parseInt(strNumber, 10)
        }
        strNumber = decl.paddingTop
        if (strNumber !== null) {
          paddingTop = parseInt(strNumber, 10)
        }

        const x: number = evt.clientX - rect.left - borderLeftWidth - paddingLeft
        const y: number = evt.clientY - rect.top - borderTopWidth - paddingTop
        return Vec2.create(x, y)
      }
    }
    throw new Error('canvas is null')
  }

  private _toCanvasMouseEvent(evt: Event): CanvasMouseEvent {
    const event: MouseEvent = evt as MouseEvent
    const mousePosition: Vec2 = this._viewportToCanvasCoordinate(event)
    const canvasMouseEvent: CanvasMouseEvent = new CanvasMouseEvent(
      mousePosition,
      event.button,
      event.altKey,
      event.ctrlKey,
      event.shiftKey
    )
    return canvasMouseEvent
  }

  private _toCanvasKeyBoardEvent(evt: Event): CanvasKeyBoardEvent {
    const event: KeyboardEvent = evt as KeyboardEvent
    const canvasKeyBoardEvent: CanvasKeyBoardEvent = new CanvasKeyBoardEvent(
      event.key,
      event.code,
      event.repeat,
      event.altKey,
      event.ctrlKey,
      event.shiftKey
    )
    return canvasKeyBoardEvent
  }

  private _handleTimers(intervalSec): void {
    this.timers.forEach((timer) => {
      if (timer.enable) {
        timer.countdown -= intervalSec
        if (timer.countdown < 0.0) {
          timer.callback(timer.id, timer.callbackData)
          if (!timer.onlyOnce) {
            timer.countdown = timer.timeout
          } else {
            this.removeTimer(timer.id)
          }
        }
      }
    })
  }

  public addTimer(
    callback: TimerCallback,
    timeout: number = 1.0,
    onlyOnce: boolean = false,
    data: any = undefined
  ): number {
    const timerIndex = this.timers.findIndex((timer) => !timer.enable)
    if (timerIndex !== -1) {
      this.timers[timerIndex] = {
        id: this.timers[timerIndex].id,
        callback,
        callbackData: data,
        timeout,
        countdown: timeout,
        enable: true,
        onlyOnce
      }
      return this.timers[timerIndex].id
    }
    const timer = new Timer(callback)
    timer.callbackData = data
    timer.timeout = timeout
    timer.countdown = timeout
    timer.enable = true
    timer.id = ++this._timerId
    timer.onlyOnce = onlyOnce
    this.timers.push(timer)

    return timer.id
  }

  public removeTimer(id: number): boolean {
    let found: boolean = false
    this.timers = this.timers.map((timer) => {
      if (timer.id === id) {
        timer.enable = false
        found = true
      }
      return timer
    })
    return found
  }
}
