<template>
  <div class="goods">
    <good-list-item v-for="(item,index) in goodlist" :key='index' :goodlistson="item"></good-list-item>
  </div>
</template>
<script>
  import GoodListItem from './GoodListItem'
  export default {
    data(){
      return {
      }
    },
    props:{
      goodlist:{
        type:Array,
        default:[]
      }
    },
    components:{
      GoodListItem
    }
  }
</script>
<style scoped>
  .goods{
    display: flex;
    flex-wrap:wrap;
    justify-content: space-between;
    padding:7px;
  }
</style>
