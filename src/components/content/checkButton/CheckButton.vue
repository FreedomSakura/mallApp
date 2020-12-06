<template>
    <div class="check-button" :class="{check: isChecked}">
        <img src="~assets/img/common/star.svg" alt="qwe2">
    </div>
</template>

<script>
export default {
    name: 'CheakButton',
    props: {
        isChecked: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
    .check-button {
        border-radius: 50%;
    }
    .check-button img {
        width: 20px;
        height: 20px;
    }
    /* 选中 */
    .check {
        background-color: pink;
        border-color: pink;
    }
</style>