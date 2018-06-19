import Immutable from 'seamless-immutable'

const initialState = Immutable({
  loading: true,
  status: false
})

export default (state = initialState, action) => {
  const actions = {
    GET_STATUS: () => ({ status: action.status }),
    LOADING: () => ({ loading: action.loading })
  }
  const o = actions[action.type]
  return o ? state.merge(o()) : state
}
