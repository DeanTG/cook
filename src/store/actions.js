import * as types from './type'

export default {
  showLoading({commit}){
    commit(types.SHOW_LOADING)
  },
  hideLoading({commit}){
    commit(types.HIDE_LOADING)
  }
}