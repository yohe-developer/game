/**
 * Created by aio on 2023/1/1 08:52
 */
import { Vec2 } from '@/application/math2d'

export enum EInputEventType {
  MOUSEEVENT,
  MOUSEDOWN,
  MOUSEUP,
  MOUSEMOVE,
  MOUSEDRAG,
  KEYBOARDEVENT,
  KEYUP,
  KEYDOWN,
  KEYPRESS
}

export class CanvasInputEvent {
  public altKey: boolean
  public ctrlKey: boolean
  public shiftKey: boolean
  public type: EInputEventType
  public constructor(
    altKey: boolean = false,
    ctrlKey: boolean = false,
    shiftKey: boolean = false,
    type: EInputEventType = EInputEventType.MOUSEEVENT
  ) {
    this.altKey = altKey
    this.ctrlKey = ctrlKey
    this.shiftKey = shiftKey
    this.type = type
  }
}

export class CanvasMouseEvent extends CanvasInputEvent {
  public button: number
  public canvasPosition: Vec2
  public localPosition: Vec2

  public constructor(
    canvasPos: Vec2,
    button: number,
    altKey: boolean = false,
    ctrlKey: boolean = false,
    shiftKey: boolean = false
  ) {
    super(altKey, ctrlKey, shiftKey)
    this.canvasPosition = canvasPos
    this.button = button

    this.localPosition = Vec2.create()
  }
}

export class CanvasKeyBoardEvent extends CanvasInputEvent {
  public key: string
  public code: string
  public repeat: boolean

  public constructor(
    key: string,
    code: string,
    repeat: boolean,
    altKey: boolean = false,
    ctrlKey: boolean = false,
    shiftKey: boolean = false
  ) {
    super(altKey, ctrlKey, shiftKey, EInputEventType.KEYBOARDEVENT)
    this.key = key
    this.code = code
    this.repeat = repeat
  }
}
