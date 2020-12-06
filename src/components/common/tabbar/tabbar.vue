<template>
    <div id="tab-bar">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'Tabbar'
}
</script>

<style>
   #tab-bar {
        display: flex;
        background-color: rgba(0, 0, 0, 0.3);

        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
    } 
</style>
