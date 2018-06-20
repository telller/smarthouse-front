const url = 'http://192.168.0.159/'
function MultipleException (errors) {
  this.isMultiple = true
  this.messages = errors.map(err => 'code: ' + err.code + '\n ' + err.msg + '\n')
  this.message = errors.reduce((acc, err, index) => `${index}: ` + acc.msg + ' \n' + `${index + 1}: ` + err.msg + ' \n')
  this.title = 'MULTIPLE ERRORS'
  this.isError = true
  this.toString = function () {
    return this.message
  }
}
class BaseService {
  async makeRequest (path = '', options = {}, json = true, text, isHeaders = false) {
    options = {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      },
      ...options
    }
    const response = await fetch(`${url}${this.getUrl(path)}`, options)
    let name = this.name || this.constructor.name
    if (!response.ok && response.status !== 503) {
      let data
      try {
        data = await response.json()
      } catch (err) {
        throw new Error(`${name} request failed: ${response.statusText}`)
      }
      if (data && data.errors && data.errors[0] && data.errors[0].msg) {
        if (data.errors.length === 1 && data.errors[0] && data.errors[0].code === 2001) return data.errors[0]
        if (data.errors.length > 1) throw new MultipleException(data.errors)
        if (response.status === 409) {
          const error = {code: 409, message: `${name} error: ${data.errors[0].msg}`}
          throw error
        }
        throw new Error(`${name} error: ${data.errors[0].msg}`)
      }
      throw new Error(`${name} request failed: ${response.statusText}`)
    } else if (!response.ok && response.status === 503) {
      throw new Error(`${name} service error: ${response.statusText}`)
    }
    if (text) return isHeaders ? {text: response.text(), headers: response.headers} : response.text()
    if (json) return response.status === 204 ? '' : response.json()
    return response
  }
}

export default BaseService
