/**
 * Created by aio on 2023/1/1 13:07
 */

export class RenderState {
  public lineWidth: number = 1
  public strokeStyle: string = 'red'
  public fillStyle: string = 'green'
  public clone(): RenderState {
    const state: RenderState = new RenderState()
    state.lineWidth = this.lineWidth
    state.strokeStyle = this.strokeStyle
    state.fillStyle = this.fillStyle
    return state
  }

  public toString(): string {
    return JSON.stringify(this, null, ' ')
  }
}

class RenderStateStack {
  private readonly _stack: RenderState[] = [new RenderState()]

  private get _currentState(): RenderState {
    return this._stack[this._stack.length - 1]
  }

  public save(): void {
    this._stack.push(this._currentState.clone())
  }

  public restore(): void {
    this._stack.pop()
  }

  public get lineWidth(): number {
    return this._currentState.lineWidth
  }

  public set lineWidth(value: number) {
    this._currentState.lineWidth = value
  }

  public get strokeStyle(): string {
    return this._currentState.strokeStyle
  }

  public set strokeStyle(value: string) {
    this._currentState.strokeStyle = value
  }

  public get fillStyle(): string {
    return this._currentState.fillStyle
  }

  public set fillStyle(value: string) {
    this._currentState.fillStyle = value
  }

  public printCurrentStateInfo(): void {
    console.log(this._currentState.toString())
  }
}

const stack = new RenderStateStack()

stack.printCurrentStateInfo()
stack.save()
stack.lineWidth = 10
stack.fillStyle = 'black'

stack.printCurrentStateInfo()

stack.restore()
stack.printCurrentStateInfo()
