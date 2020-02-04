<template>
  <div class='bottom-bar'>
    <!-- 全选 -->
    <div class="check-content">
      <check-button :isChecked="isSelectAll" class='check-buttons' @click.native="getCheck"></check-button>
      <span>全选</span>
    </div>
    <!--合计总价  -->
    <div class='total-price'>合计: {{totalPrice}}</div>
    <!-- 数量 -->
    <div class='total-count'>去计算({{totalCount}})</div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import  checkButton from '../../../components/content/checkbutton/CheckButton'
export default {
  components:{
    checkButton
  },
  computed:{
    ...mapGetters(['cartlist']),
    totalPrice(){
      return  '￥' + this.cartlist.filter(item =>{
        return item.checked
      }).reduce((preValue,item)=>{
        return preValue + item.price * item.count
        },0).toFixed(2)
      },
    totalCount(){
      return this.cartlist.filter(item => item.checked).length;
    },
    isSelectAll(){
      if(this.cartlist.length === 0) return false
      // return this.cartlist.find(item =>item.checked === false) === undefined
      //1.过滤
      // return !(this.cartlist.filter(item =>!item.checked).length)
      // 2.find
      return !this.cartlist.find(item =>!item.checked)
      // 3.for循环
      // for(let item of  this.cartlist){
      //   if(!tem.checked){
      //     return false
      //   }
      // }
      // return true
    }
  },
  methods:{
    getCheck(){
      if(!this.isSelectAll){
       this.cartlist.forEach(item => {
          item.checked = true
        });
      }else{
        this.cartlist.forEach(item => {
          item.checked = false
        });
      }
      // console.log('jjk')
    }
  }

}
</script>
<style scoped>
  .bottom-bar{
    display:flex;
    position: absolute;
    bottom:50px;
    height:45px;
    width:100%;
    line-height:45px;
    background-color:#eee;
    }
  .check-content{
    display:flex;
    width:70px;
    margin-left:20px;
  }
  .check-content>span{
    margin-left:5px;
  }
  .check-buttons{
    width:20px;
    height:20px;
    line-height:20px;
    margin-top:12px;
  }
  .total-price{
    flex:1;
  }
  .total-count{
    width:100px;
    background-color:#f00;
    color:#fff;
    text-align:center;
  }
</style>
