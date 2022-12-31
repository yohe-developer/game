/**
 * Created by aio on 2022/12/31 15:28
 */

export interface IEnumerator<T> {
  reset: () => void
  moveNext: () => boolean
  readonly current: T
}
