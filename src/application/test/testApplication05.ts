/**
 * Created by aio on 2023/1/15 12:13
 */
import { TestApplication } from '@/application/test/TestApplication'

const PI_BY_180 = Math.PI / 180
export class TestApplication05 extends TestApplication {
  private _mouseX = 0
  private _mouseY = 0

  constructor(canvas: HTMLCanvasElement) {
    super(canvas)
    this.isSupportMouseMove = true
  }

  public render(): void {
    if (this.context2D !== null) {
      this.context2D?.clearRect(0, 0, this.context2D?.canvas.width, this.context2D?.canvas.height)
      this.strokeGrid()
      this.drawCanvasCoordCenter()

      this.drawCoordInfo(`[${this._mouseX},${this._mouseY}]`, this._mouseX, this._mouseY)
    }
  }

  public drawCanvasCoordCenter(): void {
    if (this.context2D === null) {
      throw new Error('没有canvas 上下文')
    }

    const halfWidth = this.canvas.width * 0.5
    const halfHeight = this.canvas.height * 0.5

    this.context2D.save()
    this.context2D.lineWidth = 2
    this.context2D.strokeStyle = 'rgba(255, 0, 0, .5)'

    this.strokeLine(0, halfHeight, this.canvas.width, halfHeight)

    this.context2D.strokeStyle = 'rgba(255, 0, 0, .5)'
    this.strokeLine(halfWidth, 0, halfWidth, this.canvas.height)
    this.context2D.restore()
    this.fillCircle(halfWidth, halfHeight, 5, 'rgba(255, 0, 0, .5)')
  }

  public drawCoordInfo(info: string, x: number, y: number) {
    this.fillText(info, x, y, 'black', 'center', 'bottom')
  }

  /**
   * 两点之间的距离
   * @param x0
   * @param y0
   * @param x1
   * @param y1
   */
  public distance(x0: number, y0: number, x1: number, y1: number) {
    const diffX = x1 - x0
    const diffY = y1 - y0

    return Math.sqrt(diffX * diffX + diffY * diffY)
  }

  public static toRadian(radian: number) {
    return radian / PI_BY_180
  }

  protected dispatchMouseMove(evt) {
    this._mouseX = evt.canvasPosition.x
    this._mouseY = evt.canvasPosition.y
  }
}
