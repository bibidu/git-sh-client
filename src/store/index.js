
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    reposIndex: 0, // 当前选中仓库下标
    scriptIndex: -1,
    reposList: [
      {
        type: 'git',
        branch: 'master',
        name: 'ci-blog',
        scripts: [
          {
            name: '提交',
            script: `git add .
            git pull origin
            git merge test
            git push origin`
          },
          {
            name: 'diff',
            script: `git diff`
          }
        ]
      }
    ], // 仓库列表信息
    // currentScript: '', // 当前脚本任务信息
    showAddReposModal: false, // 是否显示添加仓库弹窗
    showAddTaskModal: false // 是否显示添加脚本弹窗
  },
  getters: {
    currentScript (state) {
      const { reposIndex, reposList, scriptIndex } = state
      return reposList[reposIndex] && reposList[reposIndex].scripts ? reposList[reposIndex].scripts[scriptIndex] : ''
    }
  },

  mutations: {

    // 添加仓库
    'ADD_REPOS' (state, reposObj) {
      state.reposList.push(reposObj)
      state.reposIndex = state.reposList.length - 1
    },

    // 显示、隐藏添加仓库弹窗
    'TOGGLE_ADD_REPOS' (state, flag) {
      if (state.showAddReposModal !== flag) {
        state.showAddReposModal = flag
      }
    },

    // 添加脚本任务
    'ADD_TASK' (state, taskObj) {
      const { reposIndex, reposList } = state
      reposList[reposIndex].scripts.push(taskObj)
    },

    // 显示、隐藏 脚本任务弹窗
    'TOGGLE_ADD_TASK' (state, flag) {
      if (state.showAddTaskModal !== flag) {
        state.showAddTaskModal = flag
      }
    },

    // 显示 脚本
    'SHOW_SCRIPT' (state, item) {
      state.scriptIndex = item
      // state.currentScript = item
    },

    // 重置scriptIndex
    'RESET_SCRIPT_INDEX' (state) {
      state.scriptIndex = -1
    },

    // 切换当前仓库
    'TOGGLE_REPOS' (state, index) {
      state.reposIndex = index
    }
  },

  actions: {
    // 切换当前仓库
    'TOGGLE_REPOS_ACTION' ({ commit, state }, index) {
      if (state.reposIndex !== index) {
        commit('TOGGLE_REPOS', index)
        commit('RESET_SCRIPT_INDEX')
      }
    }
  }
})
export default store
