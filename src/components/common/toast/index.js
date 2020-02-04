import Toast from './Toast'
const obj = {}
obj.install = function (Vue) {
  // console.log('jjjj')
  // 1.创建toast构造器
  const toastContrustor = Vue.extend(Toast);
  // 2.根据组件构造器，创建new组件对象
  const  toast = new toastContrustor()
  // 3.将组件对象，手动挂载到一个某一个元素上
  toast.$mount(document.createElement('div'))
  // 4.toast.$el 对应的就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}
export default obj
