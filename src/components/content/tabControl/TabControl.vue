<template>
  <div class="tab-control">
    <!-- 如果只是文字发生改变不需要使用slot  -->
    <!-- 使用传值 -->
    <div v-for='(item,index) in titles' @click="actIndex(index)" class="tab-control-item" :key="index" :class="{active:index==currentIndex}">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      titles: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      actIndex(index) {
        this.currentIndex = index;
        this.$emit('showTab',index)
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active span {
    border-bottom: 3px solid var( --color-high-text)
  }

  .active {
    color: var(--color-high-text);
  }
</style>

