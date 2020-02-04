import {
  ADD_COUNTER
}
from './mutation-types'
import { resolve } from 'url';
export default {
  addcart (context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartlist.find(item => item.iid === payload.iid);
      if (oldProduct) { // 商品数量加1
        context.commit('addCounter', oldProduct);;
        // console.log('you');
        resolve('商品数量加一')
      } else { //购物车数量加一
        //  console.log('0000');
        payload.count = 1;
        // console.log(payload)
        context.commit('addToCart', payload);
        resolve('添加了新的商品')
      }
    })
    // console.log(payload);
    // 遍历数组

  }
}
