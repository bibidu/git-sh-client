<template>
  <div class="side-btn-group">
    <div class="operation-btn" v-for="(item, index) in scripts" :key="item.name">
      <el-button @click="SHOW_SCRIPT(index)" style="width:100%;" size="small" type="primary" plain>{{item.name}}</el-button>
    </div>

    <!-- 添加 -->
    <div class="operation-btn">
      <el-button class="add-operation-btn" @click="TOGGLE_ADD_TASK(true)" type="primary" size="small">添加</el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Header',
  data () {
    return {
      msg: ''
    }
  },
  computed: {
    ...mapState([
      'reposList',
      'reposIndex'
    ]),
    scriptsList () {
      return this.reposList[this.reposIndex].scripts
    },
    scripts () {
      return this.reposIndex > -1 ? this.scriptsList : []
    }
  },
  methods: {
    ...mapMutations([
      'TOGGLE_ADD_TASK',
      'SHOW_SCRIPT'
    ])
  }
}
</script>

<style scoped>
.side-btn-group{
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.operation-btn{
  margin-bottom: 10px;
  width: 200px;
}
.add-operation-btn{
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
}
</style>
