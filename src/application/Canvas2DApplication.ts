/**
 * Created by aio on 2023/1/16 10:29
 */
import { Application } from '@/lib/Application'

export class Canvas2DApplication extends Application {
  readonly context2D: CanvasRenderingContext2D
  constructor(canvas: HTMLCanvasElement) {
    super(canvas)
    this.context2D = this.canvas.getContext('2d') as CanvasRenderingContext2D
  }

  public clearRect() {
    this.context2D?.clearRect(
      0,
      0,
      this.context2D?.canvas.width,
      this.context2D?.canvas.height
    )
  }
}
