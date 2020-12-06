<template>
    <div id="category">
        <NavBar>
            <div slot="center">分类</div>
        </NavBar>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
// 引入better-scroll
import BScroll from 'better-scroll'

export default {
    name: 'Category',
    components: {
        NavBar
    },   
}
</script>

<style>

</style>