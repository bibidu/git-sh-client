<template>
  <div id="wrapper">
    <div class="project-row">
      <div class="title">
        <div class="top">当前仓库名</div>
        <div class="bottom" v-if="projectList[projectIndex]">{{projectList[projectIndex].projectName}}</div>
        <div v-else class="bottom" @click='createProject'>添加仓库</div>
      </div>
      <div class="search-area">
        <!-- <input type="text" placeholder="Filter"> -->
        <button @click='createProject'>Add</button>
      </div>
      <div class="project-list">
        <div :class="{'project-item': true, 'project-item-checked': index === projectIndex}" v-for="(item, index) in projectList" :key="item.id" @click='togProject(item, index)'>
          <img class="branch" src="~@/assets/branch.png" alt="">
          <div class="project-name">{{item.projectName}}</div>
          <img @click='modifyProject(projectList[projectIndex])' class="start-img" src="~@/assets/write-white.png">
          <img @click='delProject(item, index)' class="start-img" src="~@/assets/delete-white.png">
          <span class="tag">{{item.branch}}</span>
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
              <img @click='modify(item, index)' class="start-img" src="~@/assets/write.png">
              <img @click='del(item, index)' class="start-img" src="~@/assets/delete.png">
            </div>
          </div>
        </div>
        <div class="right">
          <div v-if='projectList[projectIndex] && projectList[projectIndex].tasks[taskIndex]'>
            <pre id='shScript'>{{projectList[projectIndex].tasks[taskIndex].shScript}}</pre>

            <template v-if="projectList[projectIndex].tasks[taskIndex].result">
              <div class="build-result">构建结果:</div>
              <pre>{{projectList[projectIndex].tasks[taskIndex].result}}</pre>
            </template>
          </div>
        </div>
      </div>
    </div>
    <RepositoryModal :show="showModal" @confirm='modalConfirm' @cancel='modalCancel' />
    <TaskModal :show="showTaskModal" :task='taskInfo' @confirm='taskConfirm' @cancel='taskCancel' />
    <ProjectInfoModal
      :show='showProjectInfo'
      :project='projectInfo'
      @updateProject='updateProject'
      @cancel="showProjectInfo = false"
    />
    <!-- <ModifyTaskModal
      :show="showModifyTaskModal"
      :task="taskInfo"
    /> -->
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
  // import ModifyTaskModal from './Modal/ModifyTaskModal'

  const trim = str => str.replace(/^\s*/, '').replace(/\s*$/, '')

  const baseTask = [
    {
      taskName: '查看提交记录',
      shScript: `git log`
    },
    {
      taskName: '提交当前分支',
      shScript: `git add .
git pull origin
git commit -m "..."
git push origin`
    },
    {
      taskName: '查看git状态',
      shScript: `git status`
    }
  ]
  export default {
    name: 'landing-page',
    components: {
      RepositoryModal,
      TaskModal,
      ProjectInfoModal,
      // ModifyTaskModal
    },
    data() {
      return {
        projectList: [
          // {
          //   id: 0, projectName: 'ci-blog-issue', branch: '', cwd: '', tasks: [
          //     { id: 1, taskName: '提交并切换分支合并', shScript: `git log1
          //     git log ..` },
          //     { id: 2, taskName: '打印日志', shScript: 'git log2' }
          //   ]
          // },
        ],
        projectIndex: 0,
        taskIndex: 0,
        showModal: false,
        showTaskModal: false,
        showProjectInfo: false,
        // showModifyTaskModal: false,
        projectInfo: {},
        taskInfo: {}
      }
    },
    methods: {
      execSync(cwd, cmd) {
        let result, error = false
        try {
          result = execSync(cmd, { cwd })
        } catch (err) {
          console.log('error');
          console.log(err);
          error = true
          result = err
        }
        return { result, error }
      },
      modifyProject(project) {
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
          tasks: JSON.parse(JSON.stringify(baseTask))
        })
        this.fetchProjectBranch(this.projectList.length - 1)
        this.taskIndex = -1
        this.projectIndex = this.projectList.length - 1
        this.showModal = false
        this.setCacheProjects()
      },
      // shScriptChange(e) {
      //   const sh = document.getElementById('shScript')
      //   this.projectList[this.projectIndex].tasks[this.taskIndex].shScript = sh.innerText
      //   document.getElementById('shScript').innerText = sh.innerText
      // },
      modalCancel() {
        this.showModal = false
      },
      createProject() {
        this.showModal = true
      },
      addTask() {
        this.showTaskModal = true
        this.taskInfo = {}
      },
      taskConfirm({ id, taskName, shScript }) {
        this.showTaskModal = false
        // 更新
        if (id) {
          const item = this.projectList[this.projectIndex].tasks.find(item => item.id === id)
          item.taskName = taskName
          item.shScript = shScript
          return
        }
        // 新增
        this.projectList[this.projectIndex].tasks.push({
          id: +new Date(),
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
        this.taskIndex = index
      },
      // 构建
      build(task, index, cwd) {
        this.taskIndex = index

        const cmds = task.shScript.split('\n').map(trim)

        const item = this.projectList[this.projectIndex].tasks[this.taskIndex]
        item.result = ''

        cmds.forEach(cmd => {
          const { result } = this.execSync(cwd, cmd)
          this.projectList[this.projectIndex].tasks[this.taskIndex].result += result.toString() + '\n'
        })
        this.$forceUpdate()
        this.fetchProjectBranch()
      },
      modify(item, index) {
        const { id, shScript, taskName } = item
        this.showTaskModal = true
        this.taskInfo = { id, shScript, taskName }
      },
      del(item, index) {
        this.projectList[this.projectIndex].tasks.splice(index, 1)
        this.setCacheProjects()
      },
      grabCurrBranch(str) {
        return /\*\s(\w+)/.exec(str)[1]
      },
      fetchProjectBranch(index) {
        (index > -1 ? this.projectList.slice(index, index + 1) : this.projectList).forEach(item => {
          const { error, result } = this.execSync(item.cwd, `git branch`)
          if (!error) {
            item.branch = this.grabCurrBranch(result)
          }
        })
        this.$forceUpdate()
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
          this.projectList = projectList
          this.projectIndex = projectIndex
          this.taskIndex = taskIndex
          this.$nextTick(() => {
            this.fetchProjectBranch()
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
  justify-content: center;
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
  /* margin-top: 20px; */
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
  position: fixed;
  top: 44px;
  left: 200px;
  width: 220px;
  height: 100%;
  border-right: 1px solid #ccc;
}
.main .content .left .sh-item{
  padding: 4px 5px 4px 10px;
  box-sizing: border-box;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  /* width: 200px; */
  width: 100%;
}
.main .content .left .sh-item:hover{
  background: #28a745;
  cursor: pointer;
}
.main .content .left .sh-item-checked{
  cursor: pointer;
  background: #28a745;
  color: #fff;
  font-size: 14px;
}
.start-img{
  width: 20px;
  height: 20px;
}
.main .content .right{
  margin-left: 220px;
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
