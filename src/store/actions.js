import * as types from './type'

export default {
  setToken({commit},token){
    commit(types.SET_TOKEN,token)
  },
  showLoading({commit}){
     commit(types.SHOW_LOADING)
  },
  hideLoading({commit}){
    commit(types.HIDE_LOADING)
  },
  increase({commit},food){
    commit(types.INCREASE_FOOD,food)
  },
  decrease({commit},index){
    commit(types.DECREASE_FOOD,index)
  },
  clearSelect({commit}){
    commit(types.CLEAR_SELECT)
  }
}