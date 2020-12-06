<template>
    <div class="SwiperItem">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'SwiperItem',

}
</script>

<style>
    .SwiperItem {
        width: 100%;
        height: 200px;

        background-color: greenyellow;

        position: fixed;
    }

    .SwiperItem img{
        width: 100%;
        height: 200px;

        background-size: 100% 100%;

        left: 0;
    }
</style>