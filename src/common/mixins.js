// 优化
import {debounce} from './util'
 //常量的使用
import {BACK_POSITION} from  './const'
// 项目组件
import backTop from  '../components/content/backTop/backTop'
export const imageLoadmixins = {
    data(){
        return {
            imageload:null,
            refresh:null
        }
    },
    mounted(){
        this.refresh=debounce(this.$refs.scroll.goRefresh,50)
        this.imageload = ()=>this.refresh();
        this.$bus.$on('iAllLoad',this.imageload)
    }
}
export const backTopMixins= {
    data(){
        return {
            showBackTop:false   
        }
    },
    components:{
        backTop
    },
    methods:{
        goBackTop(){
            this.$refs.scroll.scrollTo(0,0);
        },
        showBackTopIcon(position){
            this.showBackTop =(-position.y) > BACK_POSITION 
        }
    }
}