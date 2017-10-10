import {
  SHOW_LOADING,
  HIDE_LOADING,
  INCREASE_FOOD,
  DECREASE_FOOD,
  CLEAR_SELECT
} from './type'

export default {
  [SHOW_LOADING](state) {
    state.loadingState = true
  },
  [HIDE_LOADING](state) {
    state.loadingState = false
  },
  [INCREASE_FOOD](state, food) {
    let [foodItem, index] = food;
    index = index > -1 ? index : -1;
    for (let i = 0; i < state.selectFood.length; i++) {
      if (state.selectFood[i].id == foodItem.id) {
        index = i;
      }
    }
    if (index != -1) {
      state.selectFood[index].count += 1;
    } else {
      state.selectFood.push({
        id: foodItem.id,
        name: foodItem.name,
        price: foodItem.price,
        count: 1
      })
    }
  },
  [DECREASE_FOOD](state, index) {
    if (index == -1) {
      state.selectFood = [];
      return
    }
    state.selectFood[index].count -= 1;
    if (state.selectFood[index].count == 0) {
      state.selectFood.splice(index, 1)
    }
  },
  [CLEAR_SELECT](state){
    state.selectFood = []
  }
}
