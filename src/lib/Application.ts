/**
 * Created by aio on 2023/1/16 09:30
 */

export class Application {
  readonly canvas!: HTMLCanvasElement

  protected _start: boolean = false
  protected _requestId: number = -1
  protected _lastTime!: number
  protected _startTime!: number

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
  }

  public step(timestamp: number) {
    if (this._startTime === -1) this._startTime = timestamp
    if (this._lastTime === -1) this._lastTime = timestamp

    const elapsedMsec: number = timestamp - this._startTime
    const intervalSec: number = timestamp - this._lastTime

    this._lastTime = timestamp
    this.update(elapsedMsec, intervalSec)
    console.log('app');
    this.render()
    this._requestId = window.requestAnimationFrame((timestamp) =>
      this.step(timestamp)
    )
  }

  public start() {
    if (!this._start) {
      this._start = true
      this._requestId = -1
      this._lastTime = -1
      this._startTime = -1
      this._requestId = window.requestAnimationFrame((timestamp) =>
        this.step(timestamp)
      )
    }
  }

  public stop() {
    if (this._start) {
      window.cancelAnimationFrame(this._requestId)
      this._start = false
      this._startTime = -1
      this._startTime = -1
      this._requestId = -1
    }
  }

  public render() {}

  update(elapsedMsec: number, intervalMsec: number): void {}
}
