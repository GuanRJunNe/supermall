<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot='center'>购物街</div>
    </nav-bar>
    <tab-control class='tab-control' ref="tabControl1" v-show='isTabFixed' @showTab="gettabIndex" :titles='["流行","新款","精选"]'></tab-control>
    <scroll  class='content' ref="scroll" :probe-type="3" :pull-up-load='true'  @scrollP="getScrollTop"  @PullUp="loadMore">
      <home-swiper :banners='banners'  @swiperLoad="SwiperLoad"></home-swiper>
      <Home-recommend-view :recommends="recommends" />
      <feture-view/>
      <tab-control ref="tabControl2" @showTab="gettabIndex" :titles='["流行","新款","精选"]'></tab-control>
      <good-list :goodlist="showGoods"></good-list>
    </scroll>
    <back-top @click.native="goBackTop" class="backtop" v-show='showBackTop'/>
  </div>
</template>
<script>
  // 外部组件
  // 公共组件
  import NavBar from '../../components/common/navbar/NavBar';
  import Scroll from '../../components/common/scroll/scroll.vue'
  //项目组件
  import TabControl from '../../components/content/tabControl/TabControl.vue'
  import GoodList from '../../components/content/goods/GoodList.vue'
  // 区域组件
  import HomeSwiper from './childComps/HomeSwiper.vue';
  import HomeRecommendView from './childComps/HomeReconmmendView.vue';
  import FetureView from './childComps/FetureView.vue'
  // 网络请求
  import {getHomeMultidata,getHomeGoods} from '../../network/home'
  // 混入
  import {imageLoadmixins,backTopMixins} from '../../common/mixins'
  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommendView,
      FetureView,
      TabControl,
      GoodList,
      Scroll
    },
    data() {
      return {
        banners: [],
        recommends: [],
        // 三个频道
        goods: {
          'pop': {
            page: 0,
            list: []
          },
          'new': {
            page: 0,
            list: []
          },
          'sell': {
            page: 0,
            list: []
          },
        },
        currentType: 'pop',
        TabOffsetTop:0,
        isTabFixed:false,
        saveY:0
      }
    },
    mixins:[imageLoadmixins,backTopMixins],
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      // 轮播图
      this.getHomeMultidata();
      // 分类数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    activated(){
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.goRefresh();
    },
    deactivated(){
      // 1.记住浏览的位置
      this.saveY = this.$refs.scroll.getScrollY();
      // 2.取消对image的监听
      this.$bus.$off('iAllLoad', this.imageload)
    },
    methods: {
      // 功能
      SwiperLoad(){
        this.TabOffsetTop=this.$refs.tabControl2.$el.offsetTop;
      },
      loadMore(){
        this.getHomeGoods(this.currentType);
      },
      getScrollTop(position){
        // console.log(position);
        // console.log(this.showBackTop,'222')
         this.showBackTopIcon(position) 
         this.isTabFixed = (-position.y) > this.TabOffsetTop
      },
      gettabIndex(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
        }
       this.$refs.tabControl1.currentIndex=index;
       this.$refs.tabControl2.currentIndex=index;
      },
      // 请求数据
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
          this.$refs.scroll.finishPull();
          // + console.log(res.data)
        })
      }
    }
  }
</script>
<style scoped>
  #home {
    /* padding-top: 44px; */
    height:100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /* position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99; */
  }
  .content{
    /* margin-top:40px; */
    position: absolute;
    overflow: hidden;
    top:44px;
    bottom:49px;
    left: 0;
    right:0;
  }
  .backtop{
    position:fixed;
    right:10px;
    bottom:55px;
  }
  .tab-control{
    position: relative;
    z-index:99;
  }
  </style>
