/**
 * Created by aio on 2023/1/15 12:13
 */
import {
  ELayout,
  MethodApplication
} from '@/application/src/utils/MethodApplication'
import { Math2D } from '@/application/src/lib/math2d'

export class TestApplication05 extends MethodApplication {
  private _mouseX = 0
  private _mouseY = 0

  constructor(canvas: HTMLCanvasElement) {
    super(canvas)
    this.isSupportMouseMove = true
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

  protected dispatchMouseMove(evt) {
    this._mouseX = evt.canvasPosition.x
    this._mouseY = evt.canvasPosition.y
  }

  public render(): void {
    if (this.context2D !== null) {
      this.context2D?.clearRect(
        0,
        0,
        this.context2D?.canvas.width,
        this.context2D?.canvas.height
      )
      this.strokeGrid()
      this.drawCanvasCoordCenter()

      this.drawCoordInfo(
        `[${this._mouseX},${this._mouseY}]`,
        this._mouseX,
        this._mouseY
      )

      this.testFillLocalRectWithTitle()
    }
  }

  public doTransform(degree: number, rotateFirst: boolean = true) {
    if (this.context2D !== null) {
      const radians = Math2D.toRadian(degree)

      const width = 100
      const height = 60

      const x = this.canvas.width * 0.5
      const y = this.canvas.height * 0.5
      this.context2D.save()

      this.context2D.translate(x, y)
      this.fillRectWithTitle(0, 0, width, height, `0 旋转`)
      this.context2D.restore()

      this.context2D.save()

      if (rotateFirst) {
        this.context2D.rotate(radians)

        this.context2D.translate(x, y)
      } else {
        this.context2D.translate(x, y)
        this.context2D.rotate(radians)
      }

      this.fillRectWithTitle(0, 0, width, height, `${degree} 旋转`)

      this.context2D.restore()

      this.context2D.save()

      if (rotateFirst) {
        this.context2D.rotate(-radians)

        this.context2D.translate(x, y)
      } else {
        this.context2D.translate(x, y)
        this.context2D.rotate(-radians)
      }

      this.fillRectWithTitle(0, 0, 100, 60, `- ${degree} 旋转`)

      this.context2D.restore()

      const radius = this.distance(0, 0, x, y)
      this.strokeCircle(0, 0, radius, 'black')
    }
  }

  public fillLocalRectWithTitle(
    width: number,
    height: number,
    title: string = '',
    referencePt: ELayout = ELayout.CENTER_MIDDLE,
    layout: ELayout = ELayout.CENTER_MIDDLE,
    color: string = 'grey',
    showCoord: boolean = true
  ) {
    if (this.context2D !== null) {
      let x: number = 0
      let y: number = 0

      switch (referencePt) {
        case ELayout.LEFT_TOP:
          x = 0
          y = 0
          break
        case ELayout.LEFT_MIDDLE:
          x = 0
          y = -height * 0.5
          break
        case ELayout.LEFT_BOTTOM:
          x = 0
          y = -height
          break
        case ELayout.RIGHT_TOP:
          x = -width
          y = 0
          break
        case ELayout.RIGHT_MIDDLE:
          x = -width
          y = -height * 0.5
          break
        case ELayout.RIGHT_BOTTOM:
          x = -width
          y = -height
          break
        case ELayout.CENTER_TOP:
          x = -width * 0.5
          y = 0
          break
        case ELayout.CENTER_MIDDLE:
          x = -width * 0.5
          y = -height * 0.5
          break
        case ELayout.CENTER_BOTTOM:
          x = -width * 0.5
          y = -height
          break
      }

      this.context2D.save()
      this.context2D.fillStyle = color
      this.context2D.beginPath()

      this.context2D.fillRect(x, y, width, height)
      this.context2D.fill()

      if (title.length !== 0) {
        const rect = this.calcLocalTextRectangle(layout, title, width, height)
        this.fillText(
          title,
          x + rect.origin.x,
          y + rect.origin.y,
          'white',
          'left',
          'top'
        )
        this.strokeRect(
          x + rect.origin.x,
          y + rect.origin.y,
          rect.size.width,
          rect.size.height,
          'rgba(0,0,0,.5)'
        )

        this.fillCircle(x + rect.origin.x, y + rect.origin.y, 2)
      }

      if (showCoord) {
        this.strokeCoord(0, 0, width + 20, height + 20)
        this.fillCircle(0, 0, 3)
      }
      this.context2D.restore()
    }
  }

  public rotateTranslate(
    degree: number,
    layout: ELayout = ELayout.LEFT_TOP,
    width: number = 40,
    height: number = 20
  ) {
    if (this.context2D !== null) {
      const radians = Math2D.toRadian(degree)

      const x = this.canvas.width * 0.5
      const y = this.canvas.height * 0.5

      this.context2D.save()

      this.context2D.rotate(radians)

      this.context2D.translate(x, y)

      this.fillLocalRectWithTitle(width, height, layout.toString(), layout)

      this.context2D.restore()

      const radius = this.distance(0, 0, x, y)
      this.strokeCircle(0, 0, radius, 'black')
    }
  }

  public testFillLocalRectWithTitle(): void {
    if (this.context2D !== null) {
      this.rotateTranslate(0, ELayout.LEFT_TOP)
      this.rotateTranslate(8, ELayout.LEFT_MIDDLE)
      this.rotateTranslate(16, ELayout.LEFT_BOTTOM)
      this.rotateTranslate(24, ELayout.CENTER_TOP)
      this.rotateTranslate(32, ELayout.CENTER_MIDDLE)
      this.rotateTranslate(-8, ELayout.CENTER_BOTTOM)
      this.rotateTranslate(-16, ELayout.RIGHT_TOP)
      this.rotateTranslate(-24, ELayout.RIGHT_MIDDLE)
      this.rotateTranslate(-45, ELayout.RIGHT_BOTTOM)
      const radius: number = this.distance(
        0,
        0,
        this.canvas.width * 0.5,
        this.canvas.height * 0.5
      )
      this.strokeCircle(0, 0, radius, 'black')
    }
  }
}
