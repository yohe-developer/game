/**
 * Created by aio on 2023/1/1 10:29
 */

export type TimerCallback = (id: number, data: any) => void

export class Timer {
  public id: number = -1
  public enable: boolean = false
  public callback: TimerCallback

  public callbackData: any = undefined

  public countdown: number = 0
  public timeout: number = 0
  public onlyOnce: boolean = false

  constructor(callback: TimerCallback) {
    this.callback = callback
  }
}
