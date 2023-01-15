/**
 * Created by aio on 2022/12/31 16:37
 */

export class Vec2 {
  public values: Float32Array

  public constructor(x: number = 0, y: number = 0) {
    this.values = new Float32Array([x, y])
  }

  public toString(): string {
    return ` [  ${this.values[0]}' , ' ${this.values[1]}  ] `
  }

  get x(): number {
    return this.values[0]
  }

  set x(x: number) {
    this.values[0] = x
  }

  get y(): number {
    return this.values[1]
  }

  set y(y: number) {
    this.values[1] = y
  }

  public reset(x: number = 0, y: number): Vec2 {
    this.values[0] = x
    this.values[1] = y
    return this
  }

  public static create(x: number = 0, y: number = 0): Vec2 {
    return new Vec2(x, y)
  }
}

export class Size {
  public values: Float32Array
  public constructor(w: number = 1, h: number = 1) {
    this.values = new Float32Array([w, h])
  }

  public set width(value: number) {
    this.values[0] = value
  }

  public get width(): number {
    return this.values[0]
  }

  public set height(value: number) {
    this.values[1] = value
  }

  public get height(): number {
    return this.values[1]
  }

  public static create(w: number = 1, h: number = 1): Size {
    return new Size(w, h)
  }
}

const PI_BY_180 = Math.PI / 180

export class Math2D {
  public static isEquals(left: number, right: number, epsilon: number = Number.EPSILON): boolean {
    return Math.abs(left - right) < epsilon
  }

  public static toRadian(radian: number) {
    return radian * PI_BY_180
  }

  public static toDegree(radian: number) {
    return radian / PI_BY_180
  }
}
export class Rectangle {
  public origin: Vec2
  public size: Size
  public constructor(origin: Vec2 = new Vec2(), size: Size = new Size(1, 1)) {
    this.origin = origin
    this.size = size
  }

  public isEmpty(): boolean {
    const area: number = this.size.width * this.size.height
    return Math2D.isEquals(area, 0)
  }

  public static create(x: number = 0, y: number = 0, w: number = 1, h: number = 1): Rectangle {
    return new Rectangle(new Vec2(x, y), new Size(w, h))
  }
}
