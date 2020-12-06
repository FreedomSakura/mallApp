<template>
      <div class="tab-bar-item" @click="clickActive">
          <div v-if="!isActive">
            <slot name="item-icon"></slot>
          </div>
          <div  v-else >
            <slot name="item-icon-active" ></slot>
          </div>
          <div :style="{activeStyle}">
            <slot name="item-text"></slot>
          </div>
      </div>
</template>

<script>
export default {
  name: 'TabbarItem',
  props:{
      path: String,      //要求传入的路径是字符串
      // 颜色A
      activeColor: {
          type: String,
          default: 'red'
      }
  },
  methods: {
      clickActive() {
        this.$router.replace(this.path)
      },
  },
  // 切换颜色
  computed: {
      isActive() {
          return this.$route.path.indexOf(this.path) != -1
      },
      activeStyle() {
          return this.isActive ? {color : this.activeColor} : {}
      }
  }
}
</script>

<style>
   .tab-bar-item {
        flex: 1;
        text-align: center;
        height: 49px;
        font-size: 14px;

    }   
    .tab-bar-item img {
        width: 24px;
        height: 24px;
        margin-top: 2px;
    }
</style>
