import qs from 'qs'

class BaseService {
  static get (url, data) {
    const body = data ? `?${qs.stringify(data)}` : ''
    return new Promise((resolve, reject) => {
      fetch(`${url}${body}`).then(response => {
        if (response.status >= 200 && response.status <= 304) {
          return response.json()
        } else {
          return response
        }
      }).then(text => resolve(text)).catch(error => reject(error))
    })
  }
  static send (url, method, data, json) {
    const formatData = json ? 'json;charset=UTF-8' : 'x-www-form-urlencoded;charset=UTF-8'
    return fetch(url, {
      method,
      headers: {
        'Content-Type': `application/${formatData}`
      },
      body: (json ? JSON.stringify(data) : qs.stringify(data))
    }).then(res => {
      if (res.status >= 200 && res.status < 300) {
        return res.text().then(text => {
          let result
          if (res.headers.get('content-type') && res.headers.get('content-type').indexOf('octet-stream') === -1) {
            result = text === '' ? '' : JSON.parse(text)
          } else {
            result = text === '' ? '' : text
          }
          return result
        })
      } else {
        return res
      }
    })
  }
  static post (url, data, json) {
    return this.send(url, 'POST', data, json)
  }
  static put (url, data) {
    return this.send(url, 'PUT', data)
  }
  static remove (url) {
    return this.send(url, 'DELETE')
  }
}

export default BaseService
