<template>
  <div class="hello">
    <ShadowWrapper>
      <Header></Header>
    </ShadowWrapper>

    <div class="bottom-wrapper">
      <ShadowWrapper>
        <SideBtnGroup></SideBtnGroup>
      </ShadowWrapper>

      <div class="other">
        <ShadowWrapper>
          <FunctionWrapper></FunctionWrapper>
        </ShadowWrapper>

        <ShadowWrapper style="margin-top:10px;flex:1;">
          <ConsoleWrapper></ConsoleWrapper>
        </ShadowWrapper>
      </div>
    </div>

    <!-- 添加仓库弹窗 -->
    <el-dialog
      title="添加仓库"
      :visible.sync="showAddReposModal"
      :before-close="() => TOGGLE_ADD_REPOS(false)"
    >
      <el-form :model="taskModal">
        <el-form-item label="仓库分支">
          <el-input v-model="reposModal.branch" autocomplete="off" :disabled="1 === 1"></el-input>
        </el-form-item>
        <el-form-item label="仓库地址类型">
          <el-input v-model="reposModal.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="仓库地址url">
          <el-input v-model="reposModal.url" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="TOGGLE_ADD_REPOS(false)">取 消</el-button>
        <el-button type="primary" @click="submitRepos">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加任务弹窗 -->
    <el-dialog
      title="添加任务"
      :visible.sync="showAddTaskModal"
      :before-close="() => TOGGLE_ADD_TASK(false)"
    >
      <el-form :model="taskModal">
        <el-form-item label="任务名称">
          <el-input v-model="taskModal.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="任务脚本">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            :autosize="{ minRows: 2, maxRows: 10}"
            v-model="taskModal.script">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="TOGGLE_ADD_TASK(false)">取 消</el-button>
        <el-button type="primary" @click="submitTask">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import ShadowWrapper from '@/components/ShadowWrapper'
import Header from './children/Header/Header'
import SideBtnGroup from './children/SideBtnGroup/SideBtnGroup'
import FunctionWrapper from './children/FunctionWrapper/FunctionWrapper'
import ConsoleWrapper from './children/ConsoleWrapper/ConsoleWrapper'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      reposModal: {
        branch: 'master',
        type: '',
        url: '',
        name: '',
        scripts: []
      },
      taskModal: {
        name: '',
        script: ''
      }
    }
  },
  components: {
    ShadowWrapper,
    Header,
    SideBtnGroup,
    FunctionWrapper,
    ConsoleWrapper
  },
  computed: {
    ...mapState([
      'showAddTaskModal',
      'showAddReposModal'
    ])
  },
  methods: {
    ...mapMutations([
      'ADD_REPOS',
      'TOGGLE_ADD_REPOS',
      'ADD_TASK',
      'TOGGLE_ADD_TASK'
    ]),

    submitRepos () {
      this.ADD_REPOS(this.reposModal)
      this.TOGGLE_ADD_REPOS(false)
    },

    submitTask () {
      this.ADD_TASK(this.taskModal)
      this.TOGGLE_ADD_TASK(false)
    }
  }
}
</script>

<style scoped>
.bottom-wrapper{
  display: flex;
  margin-top: 10px;
}
.other{
  height: calc(100vh - 100px);
  width: 100%;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
}
</style>
