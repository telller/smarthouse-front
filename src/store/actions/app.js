import BaseService from 'base-service'

export const init = () => dispatch => {
  BaseService.get('http://192.168.0.159/light/status').then(r => {
    dispatch({ type: 'GET_STATUS', status: r.state })
    dispatch({ type: 'LOADING', loading: false })
  })
}
