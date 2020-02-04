<template>
  <div class="toast" v-show='isShow'>
    {{message}}
  </div>
</template>

<script>
  export default {
    props: {
      // message:{
      //   type:String,
      //   default:''
      // },
      // show:{
      //   type:Boolean,
      //   default:false
      // }
    },
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message='默认文字', duration=1500) {
        this.isShow = true;
        this.message = message;
        setTimeout(() => {
          this.isShow = false
        }, duration);
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, .5);
    color: #fff;
    padding: 8px 10px;
    border-radius: 2px;
    z-index:99;
  }
</style>
