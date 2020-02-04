<template>
  <div id='detail'>
    <detail-nav-bar class="nav-bar" @getTopIndex='getIndex' ref='nav'></detail-nav-bar>
    <scroll class='content' ref='scroll'  :probe-type="3" @scrollP="getScroll">
      <detail-swiper :swiperitem='topImages'></detail-swiper>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop='shop'></detail-shop-info>
      <detail-good-info :detail-info='detailInfo' @detailImageLoad='imageLoad'></detail-good-info>
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info='commentInfo'></detail-comment-info>
      <good-list ref='goodlist' :goodlist='recommendList' />
    </scroll>
    <back-top class="backtop" v-show="showBackTop" @click.native='goBackTop'/>
    <detail-bottom-bar @addCartd="goAddCart"></detail-bottom-bar>
    <!-- <toast :message='message' :show='show'></toast> -->
  </div>
</template>

<script>
  //公共组件
  import Scroll from '../../components/common/scroll/scroll'
  import GoodList from '../../components/content/goods/GoodList.vue'
  // import Toast from '../../components/common/toast/Toast.vue'
  //子组件
  import DetailNavBar from './childDetail/DetailNavBar'
  import DetailSwiper from './childDetail/DetailSwiper'
  import DetailBaseInfo from './childDetail/DetailBaseInfo'
  import DetailShopInfo from './childDetail/DetailShopInfo'
  import DetailGoodInfo from './childDetail/DetailGoodInfo'
  import DetailParamInfo from './childDetail/DetailParamInfo'
  import DetailCommentInfo from './childDetail/DetailCommentInfo'
  import DetailBottomBar from './childDetail/DetailBottomBar'
  // 请求数据
  import {
    getDetailsData,
    getRecommend,
    Goods,
    Shop,
    GoodParam,
  } from '../../network/detail'
  // 混入
  import { imageLoadmixins,backTopMixins} from '../../common/mixins'
  import {  debounce } from '../../common/util';
  // 辅助函数
  import { mapActions } from 'vuex'
  export default {
    name: "Detail",
    data() {
      return {
        iid: '',
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommendList: [],
        navScrollY: [],
        getnavScrollY: null,
        currentIndex:0,
        // message:'',
        // show:false
      }
    },
    components: {
      Scroll,
      GoodList,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar
    },
    mixins: [imageLoadmixins,backTopMixins],
    created() {
      // 1.获取id
      this.iid = this.$route.params.iid;
      // 2.获取商品信息
      getDetailsData(this.iid)
        .then(res => {
          // 1.获取轮播图数据
          // console.log(res.result);
          this.topImages = res.result.itemInfo.topImages;
          const data = res.result
          // 2.获取商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
          // console.log(this.goods,'ggg')
          // 3.获取商家信息
          this.shop = new Shop(data.shopInfo)
          // 4.评论信息
          this.detailInfo = data.detailInfo;
          // 5.商品尺寸信息
          this.paramInfo = new GoodParam(data.itemParams.info, data.itemParams.rule);
          // 6.评论信息
          if (data.rate.cRate !== 0) {
            this.commentInfo = data.rate.list[0]
          }
          // console.log(this.paramInfo)
        }),
      // 3.请求推荐的数据
      getRecommend()
        .then(res => {
          // console.log(res)
          this.recommendList = res.data.list;
        })
      this.getnavScrollY = debounce(() => {
        this.navScrollY = []
        this.navScrollY.push(0);
        this.navScrollY.push(this.$refs.param.$el.offsetTop);
        this.navScrollY.push(this.$refs.comment.$el.offsetTop);
        this.navScrollY.push(this.$refs.goodlist.$el.offsetTop);
        this.navScrollY.push(Number.MAX_VALUE);
        // console.log(this.navScrollY)
      }, 100)
    },
    destroyed() {
      this.$bus.$off('iAllLoad', this.imageload)
    },
    methods: {
      ...mapActions(['addcart']),
      imageLoad() {
        this.refresh();
        this.getnavScrollY();

      },
      getIndex(index) {
        // console.log(index);
        this.$refs.scroll.scrollTo(0, -this.navScrollY[index], 100)
      },
      getScroll(position){
        const positionY = -position.y;
        let length = this.navScrollY.length;
        for(let i=0;i<this.navScrollY.length;i++){
          // console.log(i+1);
          // if(this.currentIndex !==i && ((i<length-1 && positionY>=this.navScrollY[i] && positionY <this.navScrollY[i+1]) || (i===length-1 && positionY >= this.navScrollY[i]))){
          //     this.currentIndex =i;
          //     // console.log(this.currentIndex);
          //     this.$refs.nav.currentIndex =this.currentIndex;
          // }
          if(this.currentIndex!==i && positionY >=this.navScrollY[i] && positionY < this.navScrollY[i+1]){
              this.currentIndex =i;
              // console.log(this.currentIndex);
              this.$refs.nav.currentIndex =this.currentIndex;
          }
        }
        this.showBackTopIcon(position)
      },
      goAddCart(){
        // 1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        // 2.将商品添加到购物车里（1.辅助函数 2.promise）
        // console.log(111 );
        // 已经使用了辅助函数可直接使用
        this.addcart(product).then(res => {
          // console.log(res);
          // this.message = res;
          // this.show = true;
          // setTimeout(() => {
          //   this.show = false
          // }, 1500);
          this.$toast.show(res,1500);

        })
        // this.$store.dispatch('addcart',product).then(res =>{
        //   console.log(res);
        // })
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .nav-bar {
    position: relative;
    z-index: 22;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 49px);
  }
  .backtop{
    position:fixed;
    right:10px;
    bottom:55px;
  }
</style>
