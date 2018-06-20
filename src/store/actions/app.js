import LightService from 'services/light.service.js'
import showError from 'showError'

export const init = () => async dispatch => {
  try {
    const status = await LightService.getStatus()
    dispatch({ type: 'GET_STATUS', status })
    dispatch({ type: 'LOADING', loading: false })
  } catch (err) {
    showError(err)
  }
}
