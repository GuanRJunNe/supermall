<template>
  <div class='cart-list' style="height:calc(100% - 44px - 49px)">
    <scroll class='content' ref='scroll'>
      <cart-list-item v-for="(item,index) in cartlist" :key="index" :pro='item' />
      <!-- <ul>
          <li>s1</li>
          <li>s2</li>
          <li>s3</li>
          <li>s4</li>
          <li>s5</li>
          <li>s6</li>
          <li>s7</li>
          <li>s8</li>
          <li>s9</li>
          <li>s10</li>
          <li>s11</li>
          <li>s12</li>
          <li>s13</li>
          <li>s14</li>
          <li>s15</li>
          <li>s16</li>
          <li>s17</li>
          <li>s18</li>
          <li>s19</li>
          <li>s20</li>
          <li>s21</li>
          <li>s22</li>
          <li>s23</li>
          <li>s24</li>
          <li>s25</li>
          <li>s26</li>
          <li>s27</li>
          <li>s28</li>
          <li>s29</li>
          <li>s30</li>
          <li>s31</li>
          <li>s32</li>
          <li>s33</li>
          <li>s34</li>
          <li>s35</li>
          <li>s36</li>
          <li>s37</li>
          <li>s38</li>
          <li>s39</li>
          <li>s40</li>
          <li>s41</li>
          <li>s42</li>
          <li>s43</li>
          <li>s44</li>
          <li>s45</li>
          <li>s46</li>
          <li>s47</li>
          <li>s48</li>
          <li>s49</li>
          <li>s50</li>
          <li>s51</li>
          <li>s52</li>
          <li>s53</li>
          <li>s54</li>
          <li>s55</li>
          <li>s56</li>
          <li>s57</li>
          <li>s58</li>
          <li>s59</li>
          <li>s60</li>
          <li>s61</li>
          <li>s62</li>
          <li>s63</li>
          <li>s64</li>
          <li>s65</li>
          <li>s66</li>
          <li>s67</li>
          <li>s68</li>
          <li>s69</li>
          <li>s70</li>
          <li>s71</li>
          <li>s72</li>
          <li>s73</li>
          <li>s74</li>
          <li>s75</li>
          <li>s76</li>
          <li>s77</li>
          <li>s78</li>
          <li>s79</li>
          <li>s80</li>
          <li>s81</li>
          <li>s82</li>
          <li>s83</li>
          <li>s84</li>
          <li>s85</li>
          <li>s86</li>
          <li>s87</li>
          <li>s88</li>
          <li>s89</li>
          <li>s90</li>
          <li>s91</li>
          <li>s92</li>
          <li>s93</li>
          <li>s94</li>
          <li>s95</li>
          <li>s96</li>
          <li>s97</li>
          <li>s98</li>
          <li>s99</li>
          <li>s100</li>
        </ul> -->
    </scroll>
  </div>
</template>

<script>
  // 辅助函数
  import {
    mapGetters
  } from 'vuex'
  // 公众组件
  import Scroll from '../../../components/common/scroll/scroll'
  import cartListItem from './cartListItem'
  export default {
    data() {
      return {}
    },
    components: {
      Scroll,
      cartListItem
    },
    computed: {
      ...mapGetters(['cartlist'])
    },
    activated() {
      this.$refs.scroll.goRefresh();

    }
  }
</script>

<style scoped>
  .cart-list {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0px;
    right: 0px;
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>




