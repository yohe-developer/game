/**
 * Created by aio on 2022/12/31 16:00
 */

// import '../test/ApplicationTest'

import './src/RenderState'
import './test/TestApplication'
import { Application } from '@/application/src/Application'
// import { TestApplication } from '@/application/test/TestApplication'
import { TestApplication05 } from '@/application/test/testApplication05'

const canvas: HTMLCanvasElement | null = document.getElementById('canvas') as HTMLCanvasElement

const app: Application = new TestApplication05(canvas)
app.start()
