<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <MainTabbar></MainTabbar>
  </div>
</template>

<script>
// 组件
import MainTabbar from 'components/content/MainTabbar'
import NavBar from 'components/common/navbar/NavBar.vue'

// 网络处理
import {getHomeMultiData} from 'network/home.js'

// Vuex
import store from '@/store'

export default {
  name: 'App',
  components: {
    MainTabbar,
    NavBar
  },
  data() {
    return {
      banners: null,
      recommends: null,
    }
  },
  store
}
</script>

<style>
  @import "~assets/css/base.css";
</style>
