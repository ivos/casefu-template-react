export const createResource = promise => {
  let status = 'pending'
  let response

  const suspender = promise.then(
    (resp) => {
      status = 'success'
      response = resp
    },
    (err) => {
      status = 'error'
      response = err
    }
  )

  const read = () => {
    switch (status) {
      case 'pending':
        throw suspender
      case 'error':
        throw response
      default:
        return response
    }
  }

  return { read }
}
