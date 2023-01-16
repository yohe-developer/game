/**
 * Created by aio on 2023/1/16 09:29
 */

import { Canvas2DApplication } from '@/application/Canvas2DApplication'

/**
 * 平移变换、旋转变换、缩放变换都属于坐标变换，或者是画布变换。
 * 因此，缩放并非缩放的是图像，而是整个坐标系、整个画布！
 * 就像是对坐标系的单位距离缩放了一样，所以坐标和线条都会进行缩放。
 */
export class TranslateApplication extends Canvas2DApplication {
  /**
   * 坐标系的平移
   */
  public translate() {
    console.log(this.context2D, 'gh')
    if (this.context2D !== null) {
      this.context2D.fillStyle = '#00AAAA'
      this.context2D.fillRect(100, 100, 200, 100)

      this.context2D.fillStyle = 'red'
      this.context2D.translate(100, 100)
      this.context2D.fillRect(100, 100, 200, 100)
    }
  }

  public rotate() {
    if (this.context2D !== null) {
      for (let i = 0; i <= 12; i++) {
        this.context2D.save()
        this.context2D.translate(70 + i * 50, 50 + i * 40)
        this.context2D.fillStyle = '#00AAAA'
        this.context2D.fillRect(0, 0, 20, 20)
        this.context2D.restore()

        this.context2D.save()
        this.context2D.translate(70 + i * 50, 50 + i * 40)
        this.context2D.rotate((i * 30 * Math.PI) / 180)
        this.context2D.fillStyle = 'red'
        this.context2D.fillRect(0, 0, 20, 20)
        this.context2D.restore()
      }
    }
  }

  /**
   * 缩放时，图像左上角坐标的位置也会对应缩放。
   * 缩放时，图像线条的粗细也会对应缩放。
   */
  public scale() {
    if (this.context2D !== null) {
      this.context2D.strokeStyle = 'red'
      this.context2D.lineWidth = 5
      for (let i = 1; i < 4; i++) {
        this.context2D.save()
        this.context2D.scale(i, i)
        this.context2D.strokeRect(50, 50, 150, 100)
        this.context2D.restore()
      }
    }
  }

  public render() {
    this.clearRect()
    // this.translate()
    // this.rotate()
    this.scale()
  }
}
