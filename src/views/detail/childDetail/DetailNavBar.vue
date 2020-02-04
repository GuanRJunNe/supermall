<template>
  <div class="details">
    <nav-bar>
      <div slot='left' class='back'>
        <img src="../../../assets/img/common/back.svg" @click='goback' alt="">
      </div>
      <div slot='center' class="title">
        <div v-for="(item,index) in titles" :key='index' :class='{active:index===currentIndex}' @click='getIndex(index)' class='title-item'>{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from '../../../components/common/navbar/NavBar'
  export default {
    data() {
      return {
        titles: ['商品', '详情', '评论', '推荐'],
        currentIndex: 0
      }
    },
    components: {
      NavBar
    },
    methods: {
      getIndex(index) {
        this.currentIndex = index;
        this.$emit('getTopIndex', index)
      },
      goback() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 14px;
  }

  .title-item {
    flex: 1;
  }

  .active {
    color: var(--color-tint)
  }

  .back img {
    margin-top: 10px;
  }
</style>
