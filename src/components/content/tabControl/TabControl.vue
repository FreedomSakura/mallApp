<template>
    <div class="tab-ctrl">
        <div class="tab-ctrl-item" 
        v-for="(item, index) in title" 
        :key="index"
        :class="{active: index === currentIndex}"
        @click="tabClick(index)">
            <span>{{ item }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "TabControl",
    props: {
        title: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            currentIndex: 0
        }
    },
    methods: {
        tabClick(index) {
            this.currentIndex = index
            this.$emit('tabClick', index)
        }
    }
}
</script>

<style>
    .tab-ctrl {
        display: flex;
        text-align: center;
        height: 40px;
        line-height: 40px;
        
        background-color: white;
        color: black;
    }

    .tab-ctrl-item {
        flex: 1;
    }

    .tab-ctrl-item.active {
        color: var(--color-high-text);
    }

    .tab-ctrl-item.active span {
        border-bottom: 3px solid var(--color-high-text);
    }
</style>