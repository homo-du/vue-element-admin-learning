var Sugar = require('sugar')

export function prettyByteData(data) {
  return Sugar.Number.bytes(data, 2, true)
}

export function prettySecondData(time) {
  let now = new Date()
  let end = new Date(now.getTime() + time * 1000)
  let time_interval = Sugar.Date.relativeTo(now, end)
  return time_interval == '1 second' ? 0 : time_interval
}

export function prettyNumber(num) {
  return Sugar.Number.abbr(num)
}