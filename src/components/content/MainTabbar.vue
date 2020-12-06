<template>
    <Tabbar>
      <TabbarItem path="/home" activeColor="blue">
        <img slot="item-icon" src="~assets/img/tabbar/首页.svg">
        <img slot="item-icon-active" src="~assets/img/tabbar/首页a.svg">
        <div slot="item-text">首页</div>
      </TabbarItem>
      <TabbarItem path="/category" activeColor="blue">
        <img slot="item-icon"  src="~assets/img/tabbar/分类.svg">
        <img slot="item-icon-active"  src="~assets/img/tabbar/分类a.svg">
        <div slot="item-text">分类</div>
      </TabbarItem>
      <TabbarItem path="/buycar" activeColor="blue">
        <img slot="item-icon"  src="~assets/img/tabbar/购物车.svg">
        <img slot="item-icon-active"  src="~assets/img/tabbar/购物车a.svg">
        <div slot="item-text">购物车</div>
      </TabbarItem>
      <TabbarItem path="/mine" activeColor="blue">
        <img slot="item-icon"  src="~assets/img/tabbar/我的.svg">
        <img slot="item-icon-active"  src="~assets/img/tabbar/我的a.svg">
        <div slot="item-text">我的</div>
      </TabbarItem>
    </Tabbar>
</template>

<script>
// 引入组件
import Tabbar from 'components/common/tabbar/tabbar'
import TabbarItem from 'components/common/tabbar/tabbarItem'

export default {
  name: 'MainTabbar',
  components: {
    Tabbar,
    TabbarItem
  }
}
</script>

<style>
   /* 在style中通过 @import 引入css文件 */
   @import "~assets/css/base.css";
</style>
