import Immutable from 'seamless-immutable'

const initialState = Immutable({
  loading: true
})

export default (state = initialState, action) => {
  const actions = {
    LOADING: () => ({ loading: action.loading })
  }
  const o = actions[action.type]
  return o ? state.merge(o()) : state
}
