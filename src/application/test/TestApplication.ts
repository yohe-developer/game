/**
 * Created by aio on 2023/1/1 12:51
 */
import TEST_IMG from '../data/test.jpg'
import { Canvas2DApplication } from '@/application/src/Canvas2DApplication'
import { Rectangle, Size, Vec2 } from '../src/math2d'

type TextAlign = 'start' | 'left' | 'center' | 'right' | 'end'

type TextBaseline = 'alphabetic' | 'hanging' | 'top' | 'middle' | 'bottom'

type FontType = '10px sans-serif' | '15px sans-serif' | '20px sans-serif' | '25px sans-serif'

type FontStyle = 'normal' | 'italic' | 'oblique'

type FontVariant = 'normal' | 'small-caps'

type FontWeight =
  | 'normal'
  | 'bold'
  | 'bolder'
  | 'lighter'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'

type FontSize =
  | '10px'
  | '12px'
  | '16px'
  | '18px'
  | '24px'
  | '50%'
  | '75%'
  | '100%'
  | '125%'
  | '150%'
  | 'xx-small'
  | 'x-small'
  | 'small'
  | 'medium'
  | 'large'
  | 'x-large'
  | 'xx-large'
export enum EImageFillType {
  STRETCH,
  REPEAT,
  REPEAT_X,
  REPEAT_Y
}

type FontFamily = 'sans-serif' | 'serif' | 'courier' | 'fantasy' | 'monospace'
export enum ELayout {
  LEFT_TOP,
  RIGHT_TOP,
  RIGHT_BOTTOM,
  LEFT_BOTTOM,
  CENTER_MIDDLE,
  CENTER_TOP,
  RIGHT_MIDDLE,
  CENTER_BOTTOM,
  LEFT_MIDDLE
}

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
    // this.context2D?.clearRect(0, 0, this.context2D?.canvas.width, this.context2D?.canvas.height)
    // this.fillLinearRect(0, 0, this.canvas.width, this.canvas.height)
    // this.fillRadialRect(0, 0, this.canvas.width, this.canvas.height)
    // this.fillPatternRect(0, 0, this.canvas.width, this.canvas.height)
    // this.fillPatternRect(0, 0, this.canvas.width, this.canvas.height, 'no-repeat')
    // this.strokeCoord(12, 12, this.canvas.width, this.canvas.height)
    // this.strokeGrid()
    // this.testCanvas2DTextLayout()
    // this.testMyTextLayout()
    // this.loadAndDrawImage(TEST_IMG)
    // this.testChangePartCanvasImageData()
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

  public strokeRect(x: number, y: number, w: number, h: number, color: string = 'black'): void {
    if (this.context2D !== null) {
      this.context2D.save()
      this.context2D.strokeStyle = color
      this.context2D.beginPath()
      this.context2D.moveTo(x, y)
      this.context2D.lineTo(x + w, y)
      this.context2D.lineTo(x + w, y + h)
      this.context2D.lineTo(x, y + h)
      this.context2D.closePath()
      this.context2D.stroke()
      this.context2D.restore()
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

  public fillText(
    text: string,
    x: number,
    y: number,
    color: string = 'white',
    align: CanvasTextAlign = 'left',
    baseline: TextBaseline = 'top',
    font: string = '10px sans-serif'
  ): void {
    if (this.context2D !== null) {
      this.context2D.save()
      this.context2D.textAlign = align
      this.context2D.textBaseline = baseline
      this.context2D.font = font
      this.context2D.fillStyle = color
      this.context2D.fillText(text, x, y)
      this.context2D.restore()
    }
  }

  public calcTextSize(text: string, char: string = 'W', scale: number = 0.5): Size {
    if (this.context2D !== null) {
      const size: Size = new Size()
      // 先设置 this.context2D.font 可以获取匹配的大小
      size.width = this.context2D.measureText(text).width
      const w: number = this.context2D.measureText(char).width
      size.height = w + w * scale
      return size
    }
    throw new Error('context2D is null')
  }

  public calcLocalTextRectangle(
    layout: ELayout,
    text: string,
    parentWidth: number,
    parentHeight: number
  ): Rectangle {
    const s: Size = this.calcTextSize(text)
    const o: Vec2 = Vec2.create()
    const left: number = 0
    const top: number = 0
    const right: number = parentWidth - s.width
    const bottom: number = parentHeight - s.height
    const center: number = right * 0.5
    const middle: number = bottom * 0.5
    switch (layout) {
      case ELayout.LEFT_TOP:
        o.x = left
        o.y = top
        break
      case ELayout.RIGHT_TOP:
        o.x = right
        o.y = top
        break
      case ELayout.RIGHT_BOTTOM:
        o.x = right
        o.y = bottom
        break
      case ELayout.LEFT_BOTTOM:
        o.x = left
        o.y = bottom
        break
      case ELayout.CENTER_MIDDLE:
        o.x = center
        o.y = middle
        break
      case ELayout.CENTER_TOP:
        o.x = center
        o.y = 0
        break
      case ELayout.RIGHT_MIDDLE:
        o.x = right
        o.y = middle
        break
      case ELayout.CENTER_BOTTOM:
        o.x = center
        o.y = bottom
        break
      case ELayout.LEFT_MIDDLE:
        o.x = left
        o.y = middle
        break
    }
    return new Rectangle(o, s)
  }

  public fillRectWithTitle(
    x: number,
    y: number,
    width: number,
    height: number,
    title: string = '',
    layout: ELayout = ELayout.CENTER_MIDDLE,
    color: string = 'grey',
    showCoord: boolean = true
  ): void {
    if (this.context2D !== null) {
      this.context2D.save()
      this.context2D.fillStyle = color
      this.context2D.beginPath()
      this.context2D.rect(x, y, width, height)
      this.context2D.fill()
      if (title.length !== 0) {
        const rect: Rectangle = this.calcLocalTextRectangle(layout, title, width, height)
        this.fillText(
          title,
          x + rect.origin.x,
          y + rect.origin.y,
          'white',
          'left',
          'top' /*, '10px sans-serif' */,
          this.makeFontString('18px', 'bold', 'italic', 'small-caps', 'sans-serif')
        )
        this.strokeRect(
          x + rect.origin.x,
          y + rect.origin.y,
          rect.size.width,
          rect.size.height,
          'pink'
        )
        this.fillCircle(x + rect.origin.x, y + rect.origin.y, 2)
      }
      if (showCoord) {
        this.strokeCoord(x, y, width + 20, height + 20)
        this.fillCircle(x, y, 3)
      }

      this.context2D.restore()
    }
  }

  public testCanvas2DTextLayout(): void {
    const x: number = 20
    const y: number = 20
    const width: number = this.canvas.width - x * 2
    const height: number = this.canvas.height - y * 2
    let drawX: number = x
    let drawY: number = y
    const radius: number = 3

    this.fillRectWithTitle(x, y, width, height)
    this.fillText('left-top', drawX, drawY, 'pink', 'left', 'top' /*, '20px sans-serif' */)
    this.fillCircle(drawX, drawY, radius, 'black')

    drawX = x + width
    drawY = y
    this.fillText('right-top', drawX, drawY, 'white', 'right', 'top' /* , '20px sans-serif' */)
    this.fillCircle(drawX, drawY, radius, 'black')

    drawX = x + width
    drawY = y + height
    this.fillText('right-bottom', drawX, drawY, 'white', 'right', 'bottom')
    this.fillCircle(drawX, drawY, radius, 'black')

    drawX = x + width * 0.5
    drawY = y + height * 0.5
    this.fillText(
      'center-middle',
      drawX,
      drawY,
      'black',
      'center',
      'middle',
      this.makeFontString('18px', 'bold', 'italic', 'small-caps', 'sans-serif')
    )
    this.fillCircle(drawX, drawY, radius, 'black')
  }

  public testMyTextLayout(
    font: string = this.makeFontString('10px', 'normal', 'normal', 'normal', 'sans-serif')
  ): void {
    const x: number = 20
    const y: number = 20
    const width: number = this.canvas.width - x * 2
    const height: number = this.canvas.height - y * 2
    const right: number = x + width
    const bottom: number = y + height

    let drawX: number = x
    let drawY: number = y
    const drawWidth: number = 150
    const drawHeight: number = 150

    if (this.context2D !== null) {
      this.context2D.save()
      this.context2D.font = font
      this.fillRectWithTitle(x, y, width, height)
      this.fillRectWithTitle(
        drawX,
        drawY,
        drawWidth,
        drawHeight,
        'left-top',
        ELayout.LEFT_TOP,
        'rgba( 255 , 255 , 0 , 0.2 )'
      )
      drawX = right - drawWidth
      drawY = y
      this.fillRectWithTitle(
        drawX,
        drawY,
        drawWidth,
        drawHeight,
        'right-top',
        ELayout.RIGHT_TOP,
        'rgba( 255 , 255 , 0 , 0.2 )'
      )
      drawX = right - drawWidth
      drawY = bottom - drawHeight
      this.fillRectWithTitle(
        drawX,
        drawY,
        drawWidth,
        drawHeight,
        'right-bottom',
        ELayout.RIGHT_BOTTOM,
        'rgba( 255 , 255 , 0 , 0.2 )'
      )
      drawX = x
      drawY = bottom - drawHeight
      this.fillRectWithTitle(
        drawX,
        drawY,
        drawWidth,
        drawHeight,
        'left-bottom',
        ELayout.LEFT_BOTTOM,
        'rgba( 255 , 255 , 0 , 0.2 )'
      )
      drawX = (right - drawWidth) * 0.5
      drawY = (bottom - drawHeight) * 0.5
      this.fillRectWithTitle(
        drawX,
        drawY,
        drawWidth,
        drawHeight,
        'center-middle',
        ELayout.CENTER_MIDDLE,
        'rgba( 255 , 0 , 0 , 0.2 )'
      )
      drawX = (right - drawWidth) * 0.5
      drawY = y
      this.fillRectWithTitle(
        drawX,
        drawY,
        drawWidth,
        drawHeight,
        'center-top',
        ELayout.CENTER_TOP,
        'rgba( 0 , 255 , 0 , 0.2 )'
      )
      drawX = right - drawWidth
      drawY = (bottom - drawHeight) * 0.5
      this.fillRectWithTitle(
        drawX,
        drawY,
        drawWidth,
        drawHeight,
        'right-middle',
        ELayout.RIGHT_MIDDLE,
        'rgba( 0 , 255 , 0 , 0.2 )'
      )
      drawX = (right - drawWidth) * 0.5
      drawY = bottom - drawHeight
      this.fillRectWithTitle(
        drawX,
        drawY,
        drawWidth,
        drawHeight,
        'center-bottom',
        ELayout.CENTER_BOTTOM,
        'rgba( 0 , 255 , 0 , 0.2 )'
      )
      drawX = x
      drawY = (bottom - drawHeight) * 0.5
      this.fillRectWithTitle(
        drawX,
        drawY,
        drawWidth,
        drawHeight,
        'left-middle',
        ELayout.LEFT_MIDDLE,
        'rgba( 0 , 255 , 0 , 0.2 )'
      )
    }
  }

  public /* static */ makeFontString(
    size: FontSize = '10px',
    weight: FontWeight = 'normal',
    style: FontStyle = 'normal',
    variant: FontVariant = 'normal',
    family: FontFamily = 'sans-serif'
  ): string {
    const strs: string[] = []
    strs.push(style)
    strs.push(variant)
    strs.push(weight)
    strs.push(size)
    strs.push(family)
    const ret: string = strs.join(' ')
    console.log(ret)
    return ret
  }

  public loadAndDrawImage(image: any): void {
    const img: HTMLImageElement = document.createElement('img')
    img.src = image
    img.onload = (ev: Event) => {
      console.dir(img)
      // this.context2D?.drawImage(img, img.width + 30, 10, 200, img.height)
      // this.context2D?.drawImage(img, 44, 6, 162, 175, 200, img.height + 30, 200, 130)
      this.drawImage(img, Rectangle.create(0, 0, 640, 600), undefined, EImageFillType.REPEAT)
    }
  }

  public fillRectangleWithColor(rect: Rectangle, color: string): void {
    if (rect.isEmpty()) {
      return
    }
    if (this.context2D !== null) {
      this.context2D.save()
      this.context2D.fillStyle = color
      this.context2D.fillRect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height)
      this.context2D.restore()
    }
  }

  public drawImage(
    img: HTMLImageElement | HTMLCanvasElement,
    destRect: Rectangle,
    srcRect: Rectangle = Rectangle.create(0, 0, img.width, img.height),
    fillType: EImageFillType = EImageFillType.STRETCH
  ): boolean {
    if (srcRect.isEmpty()) {
      return false
    }
    if (destRect.isEmpty()) {
      return false
    }
    console.log(img, 'img')
    if (fillType === EImageFillType.STRETCH) {
      this.context2D?.drawImage(
        img,
        srcRect.origin.x,
        srcRect.origin.y,
        srcRect.size.width,
        srcRect.size.height,
        destRect.origin.x,
        destRect.origin.y,
        destRect.size.width,
        destRect.size.height
      )
    } else {
      this.fillRectangleWithColor(destRect, 'grey')
      let rows: number = Math.ceil(destRect.size.width / srcRect.size.width)
      let colums: number = Math.ceil(destRect.size.height / srcRect.size.height)
      let left: number = 0
      let top: number = 0
      let right: number = 0
      let bottom: number = 0
      let width: number = 0
      let height: number = 0
      const destRight: number = destRect.origin.x + destRect.size.width
      const destBottom: number = destRect.origin.y + destRect.size.height
      if (fillType === EImageFillType.REPEAT_X) {
        colums = 1
      } else if (fillType === EImageFillType.REPEAT_Y) {
        rows = 1
      }
      for (let i: number = 0; i < rows; i++) {
        for (let j: number = 0; j < colums; j++) {
          left = destRect.origin.x + i * srcRect.size.width
          top = destRect.origin.y + j * srcRect.size.height

          width = srcRect.size.width
          height = srcRect.size.height
          right = left + width
          bottom = top + height
          if (right > destRight) {
            width = srcRect.size.width - (right - destRight)
          }
          if (bottom > destBottom) {
            height = srcRect.size.height - (bottom - destBottom)
          }
          this.context2D?.drawImage(
            img,
            srcRect.origin.x,
            srcRect.origin.y,
            width,
            height,
            left,
            top,
            width,
            height
          )
        }
      }
    }
    return false
  }

  public getColorsCanvas(amount: number = 52): HTMLCanvasElement {
    const step = 4
    const canvas = document.createElement('canvas')

    canvas.width = amount * step
    canvas.height = amount * step

    const context: CanvasRenderingContext2D | null = canvas.getContext('2d')
    if (context === null) {
      throw new Error('离屏Canvas 获取失败')
    }
    for (let i = 0; i < step; i++) {
      for (let j = 0; j < step; j++) {
        const idx = step * i + j
        context.save()

        context.fillStyle = TestApplication.Colors[idx]
        context?.fillRect(i * amount, j * amount, amount, amount)
        context?.restore()
      }
    }
    return canvas
  }

  public testChangePartCanvasImageData(
    rRow = 2,
    rColum = 0,
    cRow = 1,
    cCloum = 0,
    size = 52
  ): void {
    const colorCanvas = this.getColorsCanvas(size)
    const context = colorCanvas.getContext('2d')
    if (context === null) {
      throw new Error('离屏Canvas 获取失败')
    }
    this.setShadowState()

    this.drawImage(colorCanvas, Rectangle.create(100, 100, colorCanvas.width, colorCanvas.height))

    const imgData = context.createImageData(size, size)

    const data = imgData.data
    const rgbaCount = data.length / 4
    for (let i = 0; i < rgbaCount; i++) {
      data[i * 4 + 0] = 255
      data[i * 4 + 1] = 0
      data[i * 4 + 2] = 0
      data[i * 4 + 3] = 255
    }
    console.log(imgData)

    let component = 0

    for (let i = 0; i < imgData.width; i++) {
      for (let j = 0; j < imgData.height; j++) {
        for (let k = 0; k < 4; k++) {
          const idx = (i * imgData.height + j) * 4 + k
          component = data[idx]
          if (idx % 4 !== 3) {
            data[idx] = 255 - component - 100
          }
        }
      }
    }
    context.putImageData(imgData, size * rColum, size * rRow, 0, 0, size, size)
    this.drawImage(colorCanvas, Rectangle.create(300, 300, colorCanvas.width, colorCanvas.height))
  }

  public setShadowState(
    shadowBlur = 5,
    shadowColor = 'rgba(127,127,127, .5)',
    shadowOffsetX = 10,
    shadowOffsetY = 10
  ): void {
    if (this.context2D !== null) {
      this.context2D.shadowBlur = shadowBlur
      this.context2D.shadowColor = shadowColor
      this.context2D.shadowOffsetX = shadowOffsetX
      this.context2D.shadowOffsetY = shadowOffsetY
    }
  }
}
