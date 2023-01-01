/**
 * Created by aio on 2022/12/31 16:00
 */

// import '../test/ApplicationTest'

import './src/RenderState'
import './test/TestApplication'
import { Application } from '@/application/src/Application'
import { TestApplication } from '@/application/test/TestApplication'

const canvas: HTMLCanvasElement | null = document.getElementById('canvas') as HTMLCanvasElement

const app: Application = new TestApplication(canvas)
app.start()
