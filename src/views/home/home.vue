<template>
    <div id="home">
        <NavBar class="homeNav"><div slot="center">首页</div></NavBar>
        <TabControl class="tab-Control2" :title="['流行','新款','精选']" @tabClick="goodTypeChange" ref="tabControl1" v-show="isSticky"></TabControl>

        <!-- 可滚动部分 -->
        <Scroll class="content" ref="scroll" :probeType="3" @scroll="scrollDeal" :pullUpLoad="true" @pullingUp="pullingUpDeal">
            <HomeSwiper :banners="banners" class="homeSwiper" @swiperImgLoad="swiperImgLoadDeal"></HomeSwiper>
            <HomeRecommend :recommends="recommends"></HomeRecommend>
            <FeatureView></FeatureView>
            <TabControl class="tab-Control" 
            :title="['流行','新款','精选']"
             @tabClick="goodTypeChange"
            ref="tabControl2"></TabControl>
            <GoodsList :goods="getType"></GoodsList>
        </Scroll>

        <!-- 返回顶部按钮 -->
        <BackTop @click.native="backTop" v-show="isBackTop"></BackTop>

    </div>
</template>

<script>
// 网络请求模块
import {getHomeMultiData, getHomeGoods} from 'network/home'

// 滚动模块
import Scroll from 'components/common/scroll/Scroll'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/goodsList'

import HomeSwiper from 'views/home/homeComps/homeSwiper'
import HomeRecommend from 'views/home/homeComps/homeRecommend'
import FeatureView from 'views/home/homeComps/FeatureView'

// 常量
import {BACK_POSITION} from 'common/const'

// 返回顶部按钮
import BackTop from 'components/content/backTop/BackTop'

// 工具函数
import {debounce} from 'common/utils'

// 混入
import {itemListenerMixin, backTop} from 'common/mixin'

export default {
    name: 'Home',
    components: {
        NavBar,
        HomeSwiper,
        HomeRecommend,
        FeatureView,
        TabControl,
        GoodsList,
        Scroll,
        BackTop
    },
    data() {
        return {
            banners: [],
            recommends: [],
            goods: {
	            'pop': { page: 0, list: [] },
	            'new': { page: 0, list: [] },
	            'sell': { page: 0, list: [] }
            },
            currentType: 'pop',
            isBackTop: false,
            offsetTopT: 0,
            isSticky: false,
            // 保存页面位置
            saveY: 0,

        }
    },
    created() {
        // 首页的多种数据
        this.getHomeMultiDataV()
        // 商品列表数据
        this.getHomeGoodsV('pop')
        this.getHomeGoodsV('new')
        this.getHomeGoodsV('sell')
    },
    // 使用keep-alive后就可以用这两个生命周期函数了
    activated() {
        //console.log('activated', this.saveY)
        this.$refs.scroll.scroll.y = this.saveY
        this.$refs.scroll.refresh()  
    },
    deactivated() {
        // 保留离开时的位置
        console.log('deactivated')
        this.saveY = this.$refs.scroll.scroll.y

        // 取消事件监听
        this.$bus.$off('imgLoad', this.itemImgListener)
    },
    methods: {
        /** A
         * 更改显示商品的类型
         */
        goodTypeChange(index) {
            switch(index) {
                case 0:
                    this.currentType = 'pop'
                    break
                case 1:
                    this.currentType = 'new'
                    break
                case 2:
                    this.currentType = 'sell'
                    break
            }
            this.$refs.tabControl1.currentIndex = index
            this.$refs.tabControl2.currentIndex = index
        },

        /** 
        *   网络请求
        */ 
        getHomeMultiDataV() {
            getHomeMultiData().then(res => {
                this.banners = res.data.data.banner.list
                this.recommends = res.data.data.recommend.list
            })
        },
        getHomeGoodsV(type) {
            // 请求当前页数的下一页
            const page = this.goods[type].page + 1
            getHomeGoods(type, page).then(res => {
                //console.log(res)
                // 存储新请求来的商品
                this.goods[type].list.push(...res.data.data.list)
                // 商品页数+1
                this.goods[type].page += 1

                this.$refs.scroll.finishPullUp()
            }) 
        },

        scrollDeal(position) {
            // 控制backTop按钮
            this.isBackTop = (-position.y) > BACK_POSITION

            //console.log('offsetTop', this.offsetTopT)
            // 吸顶
            this.isSticky = (-position.y) > this.offsetTopT
        },
        pullingUpDeal() {
            this.getHomeGoodsV(this.currentType)
            this.$refs.scroll.refresh()
        },

        // 获取offsetTop
        swiperImgLoadDeal() {
            this.offsetTopT = this.$refs.tabControl2.$el.offsetTop
        }
    },
    computed: {
        getType() {
            return this.goods[this.currentType].list
        }
    },
    mixins: [itemListenerMixin, backTop]
}
</script>

<style scoped>
    #home {
        /* padding-top: 44px; */
        overflow: hidden;
        height: 100vh;
        position: relative;
    }

    .homeNav {
        /* 使用原生滚动才需要这样写 */
        /* position: fixed;
        top: 0;
        left: 0;
        right: 0; */

        z-index: 9;
    }

    .tab-Control {
        background-color: white;

        z-index: 9;
    }
    .tab-Control2 {
        background-color: white;

        z-index: 10;
        
        position: fixed;
        top: 44px;
        left: 0;
        right: 0;
    }

    .content {
        overflow: hidden;

        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }

    /* .fixed {

    } */
</style>