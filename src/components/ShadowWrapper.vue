<template>
  <div class="shadow-wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ShadowWrapper',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>
.shadow-wrapper{
  box-shadow: 2px 2px 16px #aaa;
  padding: 20px 20px 15px;
  box-sizing: border-box;
}
</style>
