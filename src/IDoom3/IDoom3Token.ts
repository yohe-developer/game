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
    return parseInt(this._val.toString(), 10)
  }

  isString(str: string): boolean {
    const count = this._charArr.length
    if (count !== str.length) {
      return false
    }
    for (let i = 0; i < count; i++) {
      if (this._charArr[i] !== str[i]) {
        return false
      }
    }
    return true
  }

  public addChar(c: string): void {
    this._charArr.push(c)
  }

  public setVal(num: number): void {
    this._val = num
    this._type = ETokenType.NUMBER
  }

  public setType(type: ETokenType): void {
    this._type = type
  }
}

export class Doom3Tokenizer implements IDoom3Tokenizer {
  private readonly _whiteSpaces: string[] = [' ', '\t', '\v', '\n', '\r']

  private readonly _digits: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  private _source: string = 'Doom3Tokenizer'
  private _currIdx: number = 0

  private _isDigit(c: string): boolean {
    return this._digits.some((item) => item === c)
  }

  private _isWhitespace(c: string): boolean {
    return this._whiteSpaces.some((space) => space === c)
  }

  private _getChar(): string {
    if (this._currIdx >= 0 && this._currIdx < this._source.length) {
      return this._source.charAt(this._currIdx++)
    }
    return ''
  }

  private _peekChar(): string {
    if (this._currIdx >= 0 && this._currIdx < this._source.length) {
      return this._source.charAt(this._currIdx)
    }
    return ''
  }

  private _unGetChar(): void {
    if (this._currIdx > 0) {
      --this._currIdx
    }
  }

  getNextToken(token: IDoom3Token): boolean {
    return false
  }

  reset(): void {
    this._currIdx = 0
  }

  setSource(source: string): void {
    this._source = source
    this._currIdx = 0
  }
}
