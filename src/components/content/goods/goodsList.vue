<template>
    <div class="good-list">
        <GoodsItem v-for="(item, index) in goods" :key="index" :goodItem="item"></GoodsItem>
    </div>
</template>

<script>
import GoodsItem from './goodsItem'

export default {
    name: "GoodsList",
    components: {
        GoodsItem
    },
    props: {
        goods: {
            type: Array,
            default() {
                return []
            }
        }
    }
}
</script>

<style>
  .good-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background-color: var(--color-background);

    padding: 2px;
    color: black;
  }
</style>