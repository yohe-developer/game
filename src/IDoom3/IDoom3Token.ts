/**
 * Description：IDoom3Token
 * Created by aio on 2022/12/29.
 */

enum ETokenType {
  NONE,
  STRING,
  NUMBER
}
export interface IDoom3Token {
  reset: () => void
  isString: (str: string) => boolean
  readonly type: ETokenType
  getString: () => string
  getFloat: () => number
  getInt: () => number
}

export interface IDoom3Tokenizer {
  setSource: (source: string) => void
  reset: () => void
  getNextToken: (token: IDoom3Token) => boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Doom3Token implements IDoom3Token {
  private readonly _charArr: string[] = []

  private _val!: number
  private _type!: ETokenType

  constructor() {
    this.reset()
  }

  public reset(): void {
    this._charArr.length = 0
    this._type = ETokenType.NONE
    this._val = 0.0
  }

  public get type(): ETokenType {
    return this._type
  }

  public getString(): string {
    return this._charArr.join('')
  }

  public getFloat(): number {
    return this._val
  }

  getInt(): number {
    return 0
  }

  isString(str: string): boolean {
    return false
  }
}
