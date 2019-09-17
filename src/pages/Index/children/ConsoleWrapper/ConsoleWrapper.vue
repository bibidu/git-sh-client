<template>
  <div class="console-wrapper">
    <!-- 进度 -->
    <el-steps :active="2" align-center>
      <el-step :title="item" v-for="item in scriptSteps" :key="item" description=""></el-step>
    </el-steps>

    <!-- 控制台打印 -->
    <div class="console">
      <div class="console-item-strong">git add .</div>
      <div class="console-item">master * master * master * master * master * master * master * master * master * master * master * master * master * master * master * master * master * master * master * master * master * master * </div>
    
      <div class="console-item-strong">git add .</div>
      <div class="console-item">master * master * master * master * master * master * master * master * master * master * master * master * master * master * master * master * master * master * master * master * master * master * </div>
    
      <div class="console-item-strong">git add .</div>
      <div class="console-item">master * master * master * master * master * master * master * master * master * master * master * master * master * master * master * master * master * master * master * master * master * master * </div>
    
      <div class="console-item-strong">git add .</div>
      <div class="console-item">master * master * master * master * master * master * master * master * master * master * master * master * master * master * master * master * master * master * master * master * master * master * </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ConsoleWrapper',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    ...mapState([
      'reposIndex'
    ]),
    ...mapGetters([
      'currentScript'
    ]),
    scriptSteps () {
      return this.currentScript ? this.currentScript.script.split('\n') : []
    }
  },
  methods: {
    ...mapMutations([
      'ADD_COUNT'
    ])
  }
}
</script>

<style scoped>
.console-wrapper{
  height: 100%;
  overflow-y: scroll;
}
.console{
  margin-top: 10px;
  padding: 20px 50px;
  box-sizing: border-box;
  height: 100%;
  overflow-y: scroll;
  color: #409EFF;
  font-size: 14px;
}
.console-item{
  padding-left: 50px;
}
.console-item-strong{
  margin-top: 10px;
  font-weight: bold;
  font-size: 16px;
}
.console-item-strong:before{
  content: '> ';
}
</style>
