import {
  ADD_COUNTER
}
from './mutation-types'
export default {
  addCounter(state, payload) {
    payload.count ++;
    // console.log('you')
  },
  addToCart (state, payload) {
    payload.checked = true
    state.cartlist.push(payload);
    // console.log(state.cartlist);
  }
}
