<template>
  <div id="wrapper">
    <div class="project-row">
      <div class="title">
        <div class="top">当前仓库名</div>
        <div class="bottom" @click='lookProject(projectList[projectIndex])' v-if="projectList[projectIndex]">{{projectList[projectIndex].projectName}}</div>
        <div v-else class="bottom" @click='createProject'>添加仓库</div>
      </div>
      <div class="search-area">
        <input type="text" placeholder="Filter">
        <button @click='createProject'>Add</button>
      </div>
      <div class="project-list">
        <div :class="{'project-item': true, 'project-item-checked': index === projectIndex}" v-for="(item, index) in projectList" :key="item.id" @click='togProject(item, index)'>
          <img class="branch" src="~@/assets/branch.png" alt="">
          <div class="project-name">{{item.projectName}}</div>
          <img @click='delProject(item, index)' class="start-img" src="~@/assets/delete-white.png">
          <span class="tag">master</span>
        </div>
      </div>
    </div>

    <div class="main">
      <div class="title" style="justify-content: center;">
        <!-- <div class="top">当前构建任务</div> -->
        <!-- <div class="bottom" v-if='projectList[projectIndex] && projectList[projectIndex].tasks[taskIndex]'>{{projectList[projectIndex].tasks[taskIndex].taskName}}</div> -->
        <!-- <div v-else style="color: #28a745;" class="bottom" @click='addTask'>添加任务</div> -->
        <span v-if="projectList[projectIndex]" class="menu-item" @click='addTask'>添加任务</span>
      </div>
      <div class="content">
        <div class="left" v-if="projectList[projectIndex]">
          <div :class="{'sh-item': true, 'sh-item-checked': index === taskIndex}" v-for="(item, index) in projectList[projectIndex].tasks" :key="item.id" @click='lookSh(item, index)'>
            <span>{{item.taskName}}</span>
            <div>
              <img @click='build(item, index, projectList[projectIndex].cwd)' class="start-img" src="~@/assets/start.png">
              <img @click='del(item, index)' class="start-img" src="~@/assets/delete.png">
            </div>
          </div>
        </div>
        <div class="right" contenteditable="true">
          <div v-if='projectList[projectIndex] && projectList[projectIndex].tasks[taskIndex]'>
            <pre>{{projectList[projectIndex].tasks[taskIndex].shScript}}</pre>

            <template v-if="projectList[projectIndex].tasks[taskIndex].result">
              <div class="build-result">构建结果:</div>
              <pre>{{projectList[projectIndex].tasks[taskIndex].result}}</pre>
            </template>
          </div>
        </div>
      </div>
    </div>
    <RepositoryModal :show="showModal" @confirm='modalConfirm' @cancel='modalCancel' />
    <TaskModal :show="showTaskModal" @confirm='taskConfirm' @cancel='taskCancel' />
    <ProjectInfoModal
      :show='showProjectInfo'
      :project.sync='projectInfo'
      @updateProject='updateProject'
      @cancel="showProjectInfo = false"
    />
  </div>
</template>

<script>
  import { execSync } from 'child_process'
  import hljs from 'highlight.js'
  import 'highlight.js/styles/github.css'
  import shell from 'highlight.js/lib/languages/shell'
  hljs.registerLanguage('shell', shell)
  // hljs.configure({useBR: true})
  import SystemInformation from './LandingPage/SystemInformation'
  import RepositoryModal from './Modal/AddRepositoryModal'
  import TaskModal from './Modal/AddTaskModal'
  import ProjectInfoModal from './Modal/ProjectInfoModal'

  const trim = str => str.replace(/^\s*/, '').replace(/\s*$/, '')

  export default {
    name: 'landing-page',
    components: {
      RepositoryModal,
      TaskModal,
      ProjectInfoModal
    },
    data() {
      return {
        projectList: [
          {
            id: 0, projectName: 'ci-blog-issue', cwd: '', tasks: [
              { id: 1, taskName: '提交并切换分支合并', shScript: `git log1
              git log ..` },
              { id: 2, taskName: '打印日志', shScript: 'git log2' }
            ]
          },
          {
            id: 1, projectName: 'auto-issue', cwd: '', tasks: [
              { id: 1, taskName: '提交并切换分支合并', shScript: 'git log3' },
              { id: 2, taskName: '打印日志', shScript: 'git log4' }
            ]
          }
        ],
        projectIndex: 0,
        taskIndex: 0,
        showModal: false,
        showTaskModal: false,
        showProjectInfo: false,
        projectInfo: {}
      }
    },
    methods: {
      execSync(cwd, command, projectIndex, taskIndex) {
        const cmds = command.split('\n').map(trim)
        console.log(cmds);
        console.log(cwd);
        // const taskItem = JSON.parse(JSON.stringify(this.projectList[projectIndex].tasks[taskIndex]))
        const item = this.projectList[projectIndex].tasks[taskIndex]
        item.result = item.result || ''
        cmds.forEach(cmd => {
          let result
          try {
            result = execSync(cmd, { cwd })
          } catch (error) {
            console.log('error');
            console.log(error);
            result = error
          }
          this.projectList[projectIndex].tasks[taskIndex].result += result.toString() + '\n'
        })
        this.$forceUpdate()
      },
      lookProject(project) {
        console.log(project);
        this.showProjectInfo = true
        this.projectInfo = {
          id: project.id,
          projectName: project.projectName
        }
        // this.projectInfo = { project}
      },
      updateProject({ id, projectName }) {
        const project = this.projectList.find(item => item.id === id)
        if (project) {
          project.projectName = projectName
        }
        this.showProjectInfo = false
        if (this.projectList.length) {
          this.projectIndex = this.projectList.length - 1
        }
        this.setCacheProjects()
      },
      delProject(item, index) {
        this.projectList.splice(index, 1)
      },
      modalConfirm({ name: projectName, path: cwd }) {
        if (this.projectList.some(item => item.cwd === cwd)) {
          return console.log('已添加该文件');
        }
        this.projectList.push({
          id: this.projectList.length,
          projectName,
          cwd,
          tasks: [],
        })
        this.taskIndex = -1
        this.showModal = false
        this.setCacheProjects()
      },
      modalCancel() {
        this.showModal = false
      },
      createProject() {
        this.showModal = true
      },
      addTask() {
        this.showTaskModal = true
      },
      taskConfirm({ taskName, shScript }) {
        this.showTaskModal = false
        this.projectList[this.projectIndex].tasks.push({
          id: this.projectList[this.projectIndex].tasks.length,
          taskName, shScript
        })
        this.setCacheProjects()
      },
      taskCancel() {
        this.showTaskModal = false
      },
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      togProject(project, index) {
        this.projectIndex = index
        this.taskIndex = 0
        this.setCacheProjects()
      },
      // 查看、修改任务脚本
      lookSh(task, index) {
        console.log(index);
        this.taskIndex = index
      },
      // 构建
      build(task, index, cwd) {
        this.taskIndex = index
        this.execSync(cwd, task.shScript, this.projectIndex, this.taskIndex)
      },
      del(item, index) {
        this.projectList[this.projectIndex].tasks.splice(index, 1)
        this.setCacheProjects()
      },
      setCacheProjects() {
        const projects = {
          projectIndex: this.projectIndex,
          taskIndex: this.taskIndex,
          projectList: this.projectList
        }
        localStorage.setItem('projects', JSON.stringify(projects))
      },
      getCacheProjectsAndSet() {
        let projects = localStorage.getItem('projects')
        if (projects && (projects = JSON.parse(projects))) {
          const { projectList, projectIndex, taskIndex } = projects
          this.$nextTick(() => {
            this.projectList = projectList
            this.projectIndex = projectIndex
            this.taskIndex = taskIndex
          })
        }
      }
    },
    created() {
      this.getCacheProjectsAndSet()
    },
    mounted() {
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }
pre {
  font-weight: bold;
  color: #0366d6;
}
#wrapper{
  display: flex;
}
.project-row {
  width: 200px;
  background: #3c4349;
  color: #fff;
  font-size: 14px;
  height: 100vh;
}
.title{
  height: 44px;
  background: #3c4349;
  display: flex;
  flex-direction: column;
  padding: 5px 10px 5px 30px;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(255,255,255,0.2);
}
.title .top{
  opacity: 0.7;
  font-size: 12px;
}
.title .bottom{
  font-weight: bold;
}
.search-area{
  padding: 10px 10px 5px 10px;
  display: flex;
}
.search-area input{
  border: none;
  height: 22px;
  border-radius: 2px;
  text-indent: 8px;
  margin-right: 10px;
  flex: 1;
}
.search-area button{
  border: 1px solid #ccc;
  background: #eee;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  width: 50px;
}
.project-list{
  margin-top: 20px;
  width: 100%;

}
.project-item{
  position: relative;
  padding: 3px 10px 3px 40px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* display: flex;
  justify-content: flex-start;
  align-items: center; */
}
.project-name{
  width: 110px;
  font-weight: bold;
  /* text-overflow: ellipsis; */
  overflow: hidden;
}
.project-item:hover{
  background: #555;
  cursor: pointer;
}

.project-item-checked{
  background: #555;
}
.main{
  border-left: 1px solid #111;
  flex: 1;
  color: #fff;
  height: 100%;
}
.main .content{
  position: absolute;
  top: 44px;
  left: 200px;
  right: 0;
  bottom: 0;
  display: flex;
  color: #222;
  box-sizing: border-box;
  overflow: scroll;
}
.main .content .left{
  width: 200px;
  border-right: 1px solid #ccc;
}
.main .content .left .sh-item{
  padding: 4px 5px 4px 10px;
  box-sizing: border-box;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
}
.main .content .left .sh-item:hover{
  background: #ccc;
  cursor: pointer;
}
.main .content .left .sh-item-checked{
  background: #ccc;
  cursor: pointer;
}
.start-img{
  width: 20px;
  height: 20px;
}
.main .content .right{
  flex: 1;
  padding: 20px 20px;
  box-sizing: border-box;
}
.branch{
  width: 16px;
  height: 16px;
  margin-right: 5px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 12px;
}
.tag{
  font-weight: bold;
  font-size: 12px;
  padding: 1px 3px;
  border-radius: 2px;
  background: #28a745;
  color: #fff;
}
.menu-item{
  color: #28a745;
  width:70px;
  font-weight:bold;
}
.build-result{
  margin: 20px 0 10px;
  font-weight: bold;
  font-size: 14px;
}
</style>
