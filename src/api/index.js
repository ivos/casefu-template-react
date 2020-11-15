export * from './local-storage'
export * from './delay'

export const defaultSWROptions = { suspense: true }
export const editSWROptions = {
  ...defaultSWROptions,
  revalidateOnMount: true, // reload fresh data when the edit screen opens
  revalidateOnFocus: false, // do not change user-modified data on focus
  revalidateOnReconnect: false // do not change user-modified data on reconnect
}
