/**
 * Description：test
 * Created by Qin on 2022/12/29.
 */

import { Canvas2D } from './index'

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const canvas2D = new Canvas2D(canvas)
canvas2D.drawText('hello world')
