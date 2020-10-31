import { resourceCache } from 'use-async-resource'
import hash from 'object-hash'

const defaultTtl = 60
export const ttls = new Map()

const timers = new Map()

const setTimer = (apiFunction, ...args) => {
  if (!timers.has(apiFunction)) {
    timers.set(apiFunction, new Map())
  }

  const fnTimers = timers.get(apiFunction)
  const argsHash = hash(args)

  if (!fnTimers.has(argsHash)) {
    const ttl = ttls.has(apiFunction) ? ttls.get(apiFunction) : defaultTtl
    const timer = window.setTimeout(() => {
      // console.log('expiring', ...args)
      resourceCache(apiFunction).delete(...args)
      fnTimers.delete(argsHash)
    }, ttl * 1000)
    fnTimers.set(argsHash, timer)
    // console.log('set timer', ttl, ...args)
  }
}

export const expire = (apiFunction, ...args) => (result) => {
  setTimer(apiFunction, ...args)
  return result
}

export const clearFnCache = apiFunction => value => {
  resourceCache(apiFunction).clear()
  return value
}

export const clearAllCaches = () => {
  timers.keys()
    .forEach(apiFunction => {
      resourceCache(apiFunction).clear()
    })
}
