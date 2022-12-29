export class Canvas2D {
  public context: CanvasRenderingContext2D | null

  public constructor(canvas: HTMLCanvasElement) {
    this.context = canvas.getContext('2d')
  }

  /**
   * drawText
   */
  public drawText(text: string): void {
    if (this.context !== null) {
      this.context.save()
      this.context.textBaseline = 'middle'
      this.context.textAlign = 'center'

      const centerX: number = this.context?.canvas.width * 0.5
      const centerY: number = this.context?.canvas.height * 0.5

      this.context.fillStyle = 'red'
      this.context.font = '40px Arial'
      this.context.fillText(text, centerX, centerY)

      this.context.strokeStyle = 'green'
      this.context.strokeText(text, centerX, centerY)

      this.context.restore()
    }
  }
}
