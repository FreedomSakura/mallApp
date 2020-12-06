<template>
    <div class="recommends">
        <div class="rcItem" v-for="(item, index) in recommends" :key="index">
            <a :href="item.link">
                <img :src="item.image">
                <div>{{ item.title }}</div>
            </a>
        </div>
    </div>
</template>

<script>

export default {
    name: 'HomeRecommend',
    props: {
        recommends: {
            type: Array,
            default: []
        }
    }
}
</script>

<style>
    .recommends {
        width: 100%;
        padding: 10px 0 20px;
        display: flex;
        
        text-align: center;
        font-size: 12px;

        border-bottom: 10px solid rgba(0,0,0,0.1)
    }
    .recommends .rcItem {
        flex: 1;
    }
    .recommends .rcItem img {
        width: 65px;
        height: 65px;
    }
</style>