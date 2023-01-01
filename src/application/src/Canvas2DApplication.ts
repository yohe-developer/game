/**
 * Created by aio on 2023/1/1 09:22
 */
import { Application } from '@/application/src/Application'

export class Canvas2DApplication extends Application {
  public context2D: CanvasRenderingContext2D | null

  constructor(canvas: HTMLCanvasElement) {
    super(canvas)
    this.context2D = this.canvas.getContext('2d')
  }
}
