import LightService from 'services/light.service.js'
import showError from 'showError'
import * as types from './types'

export const getLightStatus = () => async dispatch => {
  try {
    dispatch({ type: types.GET_LIGHT_STATUS_REQUEST })
    const lightStatus = await LightService.getStatus()
    dispatch({ type: types.GET_LIGHT_STATUS_SUCCESS, payload: { lightStatus } })
  } catch (err) {
    dispatch({ type: types.GET_LIGHT_STATUS_ERROR })
    showError(err)
  }
}
