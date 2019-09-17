<template>
  <div class="header">
    <HeaderItem
      :repository="item"
      :index="index"
      :large="reposIndex === index"
      style="margin-right:10px;"
      @clickHeaderItem="TOGGLE_REPOS_ACTION(index)"
      v-for="(item, index) in reposList"
      :key="item.name"
    />
    <HeaderItem />
    <el-button @click="TOGGLE_ADD_REPOS(true)" class="add-repos-btn" size="mini" type="primary">添加仓库</el-button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

import HeaderItem from './children/HeaderItem'

export default {
  name: 'Header',
  data () {
    return {
      msg: ''
    }
  },
  components: {
    HeaderItem
  },
  computed: {
    ...mapState([
      'reposList',
      'reposIndex'
    ])
  },
  methods: {
    ...mapMutations([
      'TOGGLE_ADD_REPOS'
    ]),
    ...mapActions([
      'TOGGLE_REPOS_ACTION'
    ])
  }
}
</script>

<style scoped>
.header{
  position: relative;
  display: flex;
  align-items: center;
}
.add-repos-btn{
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
