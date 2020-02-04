<template>
  <div class='cart'>
    <!-- 导航 -->
    <nav-bar class='nav-bar'>
      <div slot='center'>购物车({{length}})</div>
    </nav-bar>
    <!-- 商品的列表 -->
    <cartList></cartList>
    <!-- 购物车底部详情 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  // 辅助函数
  import {
    mapGetters
  } from 'vuex'
  // 自组件 公共组件
  import NavBar from '../../components/common/navbar/NavBar'
  // 自组件 非公共组件
  import cartList from './childCart/cartlist'
  import cartBottomBar from './childCart/cartBottomBar.vue'
  export default {
    name: "Cart",
    components: {
      NavBar,
      cartList,
      cartBottomBar
    },
    computed: {
      ...mapGetters({
        length: 'cartlength'
      })
    }
  }
</script>

<style scoped>
  .cart{
    height:100vh;
    position: relative;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>
