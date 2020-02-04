<template>
  <div class="wrapper">
    <!-- 其组件只可有一个子组件-->
    <div class="content"  ref='wrapper'>
      <slot></slot>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  export default {
    data() {
      return {
        scroll: null
      }
    },
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default:false
      }
    },
    mounted() {
      // 1.创建对象
      this.scroll = new BScroll(document.querySelector('.wrapper'), {
        // probeType: 3
        click:true,
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad
      })
      // 2.监听滚动的位置(监听事件需要对象中有probeType属性为2 3方可监听)
      if(this.probeType===2  || this.probeType===3){
          this.scroll.on('scroll',(position)=>{
            // console.log(position);
            this.$emit('scrollP',position);
        })
      }
      if(this.pullUpLoad){
          this.scroll.on('pullingUp',()=>{
            this.$emit('PullUp')
        })
      }
    },
    methods:{
      scrollTo(x,y,time=300){
        this.scroll && this.scroll.scrollTo(x,y,time);
      },
      goRefresh(){
        this.scroll && this.scroll.refresh();
      },
      finishPull(){
        this.scroll && this.scroll.finishPullUp();
      },
      getScrollY(){
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>
<style scoped>
</style>

