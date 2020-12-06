<template>
    <Swiper class="detail-swiper">
        <SwiperItem v-for="(item, index) in swiper" :key="index">
            <img :src="item">
        </SwiperItem>
    </Swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper/index'

export default {
    name: 'DetailNavbar',
    components: {
        Swiper,
        SwiperItem
    },
    props: {
        swiper: {
            type: Array,
            default() {
                return []
            }
        }
    }
}
</script>

<style scoped>
    .detail-swiper {
        height: 200px;
    }
</style>