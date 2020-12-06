<template>
    <Navbar>
        <div slot="left" class="back" @click="backClick">
            <img src="~assets/img/common/back.svg">
        </div>
        <div slot="center" class="center">
            <div  v-for="(item, index) in titles" :key="index" 
            class="tab-item"
            :class="{active: index == currentIndex }"
            @click="itemClick(index)">{{ item }}</div>
        </div>
    </Navbar>
</template>

<script>
import Navbar from 'components/common/navbar/NavBar'

export default {
    name: 'DetailNavbar',
    components: {
        Navbar
    },
    data() {
        return {
            titles: ['商品', '参数', '讨论', '推荐'],
            currentIndex: 0
        }
    },
    methods: {
        itemClick(index) {
            this.currentIndex = index
            this.$emit('navClick', index)
        },
        backClick() {
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped>
    .center {
        display: flex;
    }
    .tab-item {
        flex: 1;
    }
    .active {
        color: var(--color-high-text);
    }

    .back {
        margin-top: 5px;
    }

</style>