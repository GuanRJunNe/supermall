<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" @load='imageLoad' alt="">
    <div  class="goods-info">
      <p>{{goodlistson.title}}</p>
      <span class="price">{{goodlistson.price}}</span>
      <span class='collect'>{{goodlistson.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    goodlistson:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  computed:{
    showImage(){
      return this.goodlistson.image || this.goodlistson.show.img
    }
  },
  methods:{
    // 监听图片加载完成
    imageLoad(){
      // 监听图片加载完成去传递给home组件
      // 使用$bus
      this.$bus.$emit('iAllLoad');
    },
    itemClick(){
      console.log(this.goodlistson)
      this.$router.push('/detail/'+this.goodlistson.iid)
    }
  }
}
</script>
<style scoped>
.goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 49%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
