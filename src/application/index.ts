/**
 * Created by aio on 2022/12/31 16:00
 */

// import '../test/ApplicationTest'

import './exercise/RenderState'
import { Application } from '@/application/src/lib/Application'
import { TestApplication05 } from '@/application/playground/testApplication05'

const canvas: HTMLCanvasElement | null = document.getElementById('canvas') as HTMLCanvasElement

const app: Application = new TestApplication05(canvas)
app.start()
