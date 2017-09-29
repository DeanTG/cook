import {
  SHOW_LOADING,
  HIDE_LOADING
} from './type'

export default {
  [SHOW_LOADING](state) {
    state.loadingState = true
  },
  [HIDE_LOADING](state) {
    state.loadingState = false
  }
}
