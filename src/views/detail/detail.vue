<template>
    <div id="detail">
        <DetailNavbar class="detail-nav" @navClick="navClick" ref="navbar"></DetailNavbar>
        <BScroll class="content" :probeType="3" :pullUpLoad="true" ref="scroll" @scroll="scrollDeal">
            <DetailSwiper :swiper="detailSwiper"></DetailSwiper>
            <DetailBaseInfo :goods="good"></DetailBaseInfo>
            <DetailShopInfo :shop="shop"></DetailShopInfo>
            <DetailGoodMessage :imagesInfo="detailInfo" @imgLoad="detailImgLoad"></DetailGoodMessage>
            <DetailParamInfo :paramInfo="paramInfo" ref="params"></DetailParamInfo>
            <DetailCommentInfo :commentInfo="commentInfo" ref="comment"></DetailCommentInfo>
            <GoodList :goods="recommends" ref="recommend" ></GoodList>
        </BScroll>
        <DetailBottomBar @addToCart="addToCart"></DetailBottomBar>
        <BackTop @click.native="backTop" v-show="isBackTop"></BackTop>
    </div>
</template>

<script>
import DetailNavbar from './childComps/DetailNavbar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodMessage from './childComps/DetailGoodMessage'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import GoodList from 'components/content/goods/goodsList'
import DetailBottomBar from './childComps/DetailBottomBar'
import BackTop from 'components/content/backTop/BackTop'

// 网络请求模块
import {getGoodDetail, Good, Shop, GoodsParams, getRecommend} from 'network/detail'

// 常量
import {BACK_POSITION} from 'common/const'

// BScroll
import BScroll from 'components/common/scroll//Scroll'

// 工具
import {debounce} from 'common/utils'

// 混入
import {itemListenerMixin, backTop} from 'common/mixin'

// 辅助函数
import { mapGetters, mapActions } from 'vuex'


export default {
    name: 'Detail',
    components: {
        DetailNavbar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodMessage,
        DetailParamInfo,
        DetailCommentInfo,
        GoodList,
        DetailBottomBar,
        BackTop,
        BScroll,
    },
    data() {
        return {
            iid: null,
            detailSwiper: [],
            good: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            recommends: [],
            // 用于存放NavBar各项的offsetTop
            themeTopY: [],
            // 获取offsetTop的防抖函数
            getThemeTopY: null,
            // Nav的索引
            currentIndex: 0,
            toastIsShow: false
        }
    },
    created() {
        //1、设置iid
        this.iid = this.$route.params.iid

        //2、请求商品详情数据
        getGoodDetail(this.iid).then( res => {
            let data = res.data.result
            //1、获取轮播图数据
            this.detailSwiper = data.itemInfo.topImages

            //2、获取商品信息
            this.good = new Good(data.itemInfo, data.columns, data.shopInfo.services)
            //console.log(this.good)

            //3、获取店铺信息
            this.shop = new Shop(data.shopInfo)
            //console.log(this.shop)

            //4、获取商品的详细信息
            this.detailInfo = data.detailInfo

            //5、获取商品参数
            this.paramInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule)

            //6、获取评论
            if (data.rate.cRate !== 0) {
                this.commentInfo = data.rate.list[0]
            }
        })
    
        //3、获取推荐信息
        getRecommend().then(res => {
            this.recommends = res.data.data.list
        })

        this.$nextTick(() => {
            this.getThemeTopY = debounce(() => {
                this.themeTopY.push(0)
                this.themeTopY.push(this.$refs.params.$el.offsetTop)
                this.themeTopY.push(this.$refs.comment.$el.offsetTop)
                this.themeTopY.push(this.$refs.recommend.$el.offsetTop)

                console.log('themeTopY ', this.themeTopY)
            })
        }, 100)
        
    },
    mounted() {
    },
    destroyed() {
        //4、取消事件监听
        this.$bus.$off('imgLoadout', this.itemImgListener)
    },
    methods: {
        ...mapActions([
            'addCart'
        ]),
        navClick(index) {
            //console.log(index)
            this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 200)
        },
        detailImgLoad() {
            this.getThemeTopY()
        },
        scrollDeal(position) {
            //console.log(position.y)
            for (var i = 0; i < this.themeTopY.length; ++i) {
                if ((this.currentIndex !== i) && ((-position.y > this.themeTopY[i] && -position.y < this.themeTopY[i + 1]) 
                || (i === this.themeTopY.length - 1 && -position.y > this.themeTopY[i]))) {
                    //console.log(i)
                    // 保存这个索引
                    this.currentIndex = i
                    // 修改NavBar中的currentIndex
                    this.$refs.navbar.currentIndex = i
                }
            }

            this.isBackTop = (-position.y) > BACK_POSITION
        },
        // 添加商品到购物车
        addToCart() {
            //1、获取购物车要展示的信息
            const product = {}
            product.image = this.detailSwiper[0]
            product.title = this.good.title
            product.desc = this.good.desc     
            product.price = this.good.newPrice
            product.iid = this.iid
            product.count = 0
            product.isChecked = false
            
            //2、将商品添加到购物车中（Vuex）
            this.addCart(product).then(res => {
                this.$toast.show(res, 2000)
            })
            // this.$store.dispatch('addCart', product).then(res => {
            //     console.log(res)
            // })
        }
    },
    mixins: [itemListenerMixin, backTop]
}
</script>

<style scoped>
    #detail {
        position: relative;
        z-index: 9;
        background-color: white;

        /* 设置父元素高度为100vh，以便使用BScroll */
        height: 100vh;
    }

    .detail-nav {
        position: relative;
        z-index: 9;
        background-color: white;
    }

    .content {
        height: calc(100% - 44px);
    }
</style>