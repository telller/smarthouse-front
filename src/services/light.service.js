import BaseService from './BaseService'

class LightService extends BaseService {
  name = 'Light Service'

  getUrl (path) {
    return `light${path}`
  }
  async getStatus () {
    return this.makeRequest('/status')
  }
  async toogleLed () {
    return this.makeRequest('/toogle')
  }
}

export default new LightService()
