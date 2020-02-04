import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'
// 1.安装插件
Vue.use(Vuex);
// 2.创建一个store对象
const state = {
  cartlist:[]
}
const  store = new Vuex.Store({
    state,
    // mutation 唯一的目的就是修改state中的状态
    // mutation中的每个方法尽可能完成的事件比较单一
    mutations,
    actions,
    getters
})

export  default store
