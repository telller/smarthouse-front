import BaseService from './BaseService'

class LightService extends BaseService {
  name = 'Light Service'

  getUrl (path) {
    return `light${path}`
  }
  async getStatus () {
    return this.makeRequest('/status')
  }
  async toogleLed (body) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'aplication/json'
      },
      body: JSON.stringify(body)
    }
    return this.makeRequest('/toogle', options)
  }
}

export default new LightService()
