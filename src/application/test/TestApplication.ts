/**
 * Created by aio on 2023/1/1 12:51
 */
import TEST_IMG from '../data/test.jpg'
import { Canvas2DApplication } from '@/application/src/Canvas2DApplication'

type PatternRepeat = 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat'
export class TestApplication extends Canvas2DApplication {
  private _lineDashOffset: number = 0
  private _linearGradient!: CanvasGradient
  private _radialGradient!: CanvasGradient
  private _pattern: CanvasPattern | null = null
  constructor(canvas: HTMLCanvasElement) {
    super(canvas)
    this.addTimer(this.timeCallback.bind(this), 0)
  }

  private _updateLineDashOffset(): void {
    this._lineDashOffset--
    if (this._lineDashOffset < -10000) {
      this._lineDashOffset = 0
    }
  }

  public render(): void {
    this.context2D?.clearRect(0, 0, this.context2D?.canvas.width, this.context2D?.canvas.height)
    // this.fillLinearRect(0, 0, this.canvas.width, this.canvas.height)
    // this.fillRadialRect(0, 0, this.canvas.width, this.canvas.height)
    // this.fillPatternRect(0, 0, this.canvas.width, this.canvas.height)
    // this.fillPatternRect(0, 0, this.canvas.width, this.canvas.height, 'no-repeat')
    // this.strokeCoord(12, 12, this.canvas.width, this.canvas.height)
    this.strokeGrid()
  }

  public timeCallback(id: number, data: any): void {
    this._updateLineDashOffset()
    this.context2D?.clearRect(0, 0, this.context2D?.canvas.width, this.context2D?.canvas.height)
    this._drawRect(10, 10, this.canvas.width - 20, this.canvas.height - 20)
  }

  public _drawRect(x: number, y: number, w: number, h: number): void {
    if (this.context2D !== null) {
      this.context2D.save()
      this.context2D.fillStyle = 'pink'
      this.context2D.strokeStyle = 'blue'
      this.context2D.lineWidth = 2
      this.context2D.setLineDash([10, 15])

      this.context2D.lineDashOffset = this._lineDashOffset

      this.context2D.beginPath()
      this.context2D.moveTo(x, y)
      this.context2D.lineTo(x + w, y)
      this.context2D.lineTo(x + w, y + h)
      this.context2D.lineTo(x, y + h)
      this.context2D.closePath()

      this.context2D.fill()
      this.context2D.stroke()

      this.context2D.restore()
    }
  }

  public static Colors: string[] = [
    'aqua', // 浅绿色
    'black', // 黑色
    'blue', // 蓝色
    'fuchsia', // 紫红色
    'gray', // 灰色
    'green', // 绿色
    'lime', // 绿黄色
    'maroon', // 褐红色
    'navy', // 海军蓝
    'olive', // 橄榄色
    'orange', // 橙色
    'purple', // 紫色
    'red', // 红色
    'silver', // 银灰色
    'teal', // 蓝绿色
    'yellow', // 黄色
    'white' // 白色
  ]

  public fillLinearRect(x: number, y: number, w: number, h: number): void {
    if (this.context2D !== null) {
      this.context2D.save()
      if (this._linearGradient === undefined) {
        this._linearGradient = this.context2D.createLinearGradient(x, y, x + w, y)
        this._linearGradient = this.context2D.createLinearGradient(x, y, x, y + h)
        this._linearGradient = this.context2D.createLinearGradient(x, y, x + w, y + h)
        this._linearGradient = this.context2D.createLinearGradient(x + w, y + h, x, y)
        this._linearGradient.addColorStop(0.0, 'grey')
        this._linearGradient.addColorStop(0.25, 'rgba( 255 , 0 , 0 , 1 ) ')
        this._linearGradient.addColorStop(0.5, 'green')
        this._linearGradient.addColorStop(0.75, '#0000FF')
        this._linearGradient.addColorStop(1.0, 'black')
      }
      this.context2D.fillStyle = this._linearGradient
      this.context2D.beginPath()
      this.context2D.rect(x, y, w, h)
      this.context2D.fill()
      this.context2D.restore()
    }
  }

  public fillRadialRect(x: number, y: number, w: number, h: number): void {
    if (this.context2D !== null) {
      this.context2D.save()
      if (this._radialGradient === undefined) {
        const centX: number = x + w * 0.5
        const centY: number = y + h * 0.5
        let radius: number = Math.min(w, h)
        radius *= 0.5

        this._radialGradient = this.context2D.createRadialGradient(
          centX,
          centY,
          radius * 0.1,
          centY,
          centY,
          radius
        )
        this._radialGradient.addColorStop(0.0, 'black')
        this._radialGradient.addColorStop(0.25, 'rgba( 255 , 0 , 0 , 1 ) ')
        this._radialGradient.addColorStop(0.5, 'green')
        this._radialGradient.addColorStop(0.75, '#0000FF')
        this._radialGradient.addColorStop(1.0, 'white')
      }
      this.context2D.fillStyle = this._radialGradient
      this.context2D.fillRect(x, y, w, h)
      this.context2D.restore()
    }
  }

  public fillPatternRect(
    x: number,
    y: number,
    w: number,
    h: number,
    repeat: PatternRepeat = 'repeat'
  ): void {
    if (this.context2D !== null) {
      if (this._pattern === null) {
        const img: HTMLImageElement = document.createElement('img')
        img.src = TEST_IMG
        img.onload = (ev: Event): void => {
          console.log(ev, 'ev')
          if (this.context2D !== null) {
            this._pattern = this.context2D.createPattern(img, repeat)
            this.context2D.save()
            if (this._pattern) {
              this.context2D.fillStyle = this._pattern
            }
            this.context2D.beginPath()
            this.context2D.rect(x, y, w, h)
            this.context2D.fill()
            this.context2D.restore()
          }
        }
      } else {
        this.context2D.save()
        if (this._pattern) {
          this.context2D.fillStyle = this._pattern
        }
        this.context2D.beginPath()
        this.context2D.rect(x, y, w, h)
        this.context2D.fill()
        this.context2D.restore()
      }
    }
  }

  public strokeLine(x0: number, y0: number, x1: number, y1: number): void {
    if (this.context2D !== null) {
      this.context2D.beginPath()
      this.context2D.moveTo(x0, y0)
      this.context2D.lineTo(x1, y1)
      this.context2D.stroke()
    }
  }

  public strokeCoord(originX: number, originY: number, width: number, height: number): void {
    if (this.context2D !== null) {
      this.context2D.save()
      this.context2D.strokeStyle = 'red'
      this.strokeLine(originX, originY, originX + width, originY)
      this.context2D.strokeStyle = 'blue'
      this.strokeLine(originX, originY, originX, originY + height)
      this.context2D.restore()
    }
  }

  public strokeGrid(color: string = 'red', interval: number = 10): void {
    if (this.context2D !== null) {
      this.context2D.save()
      this.context2D.strokeStyle = color
      this.context2D.lineWidth = 0.5
      for (let i: number = interval + 0.5; i < this.canvas.width; i += interval) {
        this.strokeLine(i, 0, i, this.canvas.height)
      }
      for (let i: number = interval + 0.5; i < this.canvas.height; i += interval) {
        this.strokeLine(0, i, this.canvas.width, i)
      }
      this.context2D.restore()
      this.fillCircle(0, 0, 5, 'green')
      this.strokeCoord(0, 0, this.canvas.width, this.canvas.height)
    }
  }

  public fillCircle(
    x: number,
    y: number,
    radius: number,
    fillStyle: string | CanvasGradient | CanvasPattern = 'red'
  ): void {
    if (this.context2D !== null) {
      this.context2D.save()
      this.context2D.fillStyle = fillStyle
      this.context2D.beginPath()
      this.context2D.arc(x, y, radius, 0, Math.PI * 2)
      this.context2D.fill()
      this.context2D.restore()
    }
  }
}
