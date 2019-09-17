<template>
  <div class="function-btn-item">
  </div>
</template>

<script>

export default {
  name: 'FunctionBtnItem',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props: ['text', 'color'],
  computed: {
    textStyle () {
      return `color: ${this.color || ''};`
    }
  }
}
</script>

<style scoped>
.function-btn-item{
  margin-right: 10px;
  display: flex;
  align-items: center;
  padding-right: 14px;
  cursor: pointer;
}
.text{
  font-size: 16px;
  color: #84B0DD;
  font-weight: bold;
}
.icon{
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.icon{
  font-size:20px;
  color:#409EFF;
  /* padding:5px; */
}
.icon-warn{
  color: #f56c6c;
}
</style>
