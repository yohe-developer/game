import './index.scss'
import { Canvas2D } from './canvas2D'

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const canvas2D = new Canvas2D(canvas)
canvas2D.drawText('hello world')
