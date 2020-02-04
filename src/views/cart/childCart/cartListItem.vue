<template>
  <div class="shop-item" >
    <div class="item-selector">
      <check-button :is-checked='pro.checked' @click.native="getChecked"/>
    </div>
    <!-- {{pro}} -->
    <div class='item-img'>
      <img :src="pro.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class='item-title'>{{pro.title}}</div>
      <div class='item-desc'>商品描述{{pro.desc}}</div>
      <div class='info-bottom'>
        <div class='item-price left'>￥{{pro.price}}</div>
        <div class="item-count right">×{{pro.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from '../../../components/content/checkbutton/CheckButton.vue'
  export default {
    props: {
      pro: {
        type: Object,
        default: {}
      }
    },
    components:{
      CheckButton
    },
    computed:{
      showImage(){
        return 'http:'+ this.pro.image;
      }
    },
    methods:{
      getChecked(){
        // console.log('fhdfj')
        this.pro.checked =!this.pro.checked;
        console.log(this.pro.checked);
      }
    }
  }
</script>

<style scoped>
  .shop-item{
    width:100%;
    display: flex;
    padding:5px;
    border-bottom:1px solid #ccc;
  }
  .item-selector{
    width:14%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .item-img{
    padding:5px;
  }
  .item-img img{
    width:80px;
    height:100px;
    display:block;
    border-radius:5px;

  }
  .item-title,.item-desc{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }
  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }
   .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }

</style>
