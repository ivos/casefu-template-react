import { dataLoadingDelay } from '../shared/constants'

export const delay = value =>
  new Promise(resolve =>
    window.setTimeout(resolve.bind(null, value), dataLoadingDelay()))
