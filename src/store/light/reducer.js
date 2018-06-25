import Immutable from 'seamless-immutable'
import * as types from './types'

const initialState = Immutable({
  isFetchingStatus: false,
  lightStatus: {}
})

export default (state = initialState, action) => {
  const actions = {
    [types.GET_LIGHT_STATUS_SUCCESS]: () => ({ isFetchingStatus: false, lightStatus: action.payload.lightStatus }),
    [types.GET_LIGHT_STATUS_REQUEST]: () => ({ isFetchingStatus: true }),
    [types.GET_LIGHT_STATUS_ERROR]: () => ({ isFetchingStatus: false })
  }
  const o = actions[action.type]
  return o ? state.merge(o()) : state
}
