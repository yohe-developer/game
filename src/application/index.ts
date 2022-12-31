/**
 * Created by aio on 2022/12/31 16:00
 */

let start: number = 0
let lastTime: number = 0
let count: number = 0

let posX = 0
const speedX = 10
function update(timestamp, elapsedMsec, intervlMsec): void {
  const t: number = intervlMsec / 1000.0
  posX += speedX * t
  console.log('postX: ', posX)
}
function step(timestamp: number): void {
  if (start === 0) start = timestamp
  if (lastTime === 0) lastTime = timestamp

  const elapsedMsec: number = timestamp - start

  const intervlMsec: number = timestamp - lastTime

  lastTime = timestamp

  count++
  update(timestamp, elapsedMsec, intervlMsec)
  //
  // console.log(`${count}: timestamp ${timestamp}`)
  // console.log(`${count}: elapsedMsec ${elapsedMsec}`)
  // console.log(`${count}: intervlMsec ${intervlMsec}`)

  if (count < 200) {
    window.requestAnimationFrame(step)
  }
}

window.requestAnimationFrame(step)
