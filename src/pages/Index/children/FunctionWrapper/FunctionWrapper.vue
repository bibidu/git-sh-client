<template>
  <div class="function-wrapper">
    <el-button style="height:30px;" type="primary" size="small" :loading="true">执行</el-button>
    <el-button style="height:30px;" type="danger" disabled size="small">停止</el-button>
  </div>
</template>

<script>
import FunctionBtnItem from './children/FunctionBtnItem'

export default {
  name: 'FunctionWrapper',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    FunctionBtnItem
  }
}
</script>

<style scoped>
.function-wrapper{
  display: flex;
}
</style>
