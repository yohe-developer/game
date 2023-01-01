/**
 * Created by aio on 2023/1/1 09:19
 */
import { Application } from '@/application/Application'
import { CanvasKeyBoardEvent, CanvasMouseEvent } from './Event'

class ApplicationTest extends Application {
  protected dispatchKeyDown(evt: CanvasKeyBoardEvent): void {
    console.log(` key : ${evt.key} is down `)
  }

  protected dispatchMouseDown(evt: CanvasMouseEvent): void {
    console.log(` canvasPosition : ${evt.canvasPosition.toString()}`)
  }

  public update(elapsedMsec: number, intervalSec: number): void {
    console.log(` elapsedMsec : ${elapsedMsec} intervalSec : ${intervalSec}`)
  }

  public render(): void {
    console.log(' 调用render方法 ')
  }
}

const canvas: HTMLCanvasElement | null = document.getElementById('canvas') as HTMLCanvasElement

const app: Application = new ApplicationTest(canvas)

app.update(0, 0)
app.render()

const startButton: HTMLButtonElement | null = document.getElementById('start') as HTMLButtonElement
const stopButton: HTMLButtonElement | null = document.getElementById('stop') as HTMLButtonElement

startButton.onclick = (ev: MouseEvent): void => {
  app.start()
}

stopButton.onclick = (ev: MouseEvent): void => {
  app.stop()
}
