/**
 * Created by aio on 2023/1/16 10:36
 */

/**
 * Created by aio on 2023/1/16 09:29
 */

import { TranslateApplication } from '@/playground/translate/Translate'

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const app = new TranslateApplication(canvas)
app.render()
const stop = document.getElementById('stop') as HTMLElement
stop.addEventListener('click', () => {
  app.stop()
})
const start = document.getElementById('start') as HTMLElement
start.addEventListener('click', () => {
  app.start()
})
