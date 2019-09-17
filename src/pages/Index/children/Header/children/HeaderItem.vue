<template>
  <div class="header-item" v-if="repository" @click='clickHeaderItem'>
    <!-- HeaderItem -->
    <!-- <el-button class="branch-name" size="mini" type="primary" plain>{{repository.branch}}</el-button> -->
    <div :class="{'repos-name': true, 'repos-name-checked': large}">
      <span>{{repository.type + '@' + repository.name}}</span>
      <span class="badge">{{repository.branch}}</span>
    </div>
    <!-- <div class="seperator"></div> -->
  </div>
</template>

<script>

export default {
  name: 'HeaderItem',
  data () {
    return {
      msg: ''
    }
  },
  props: {
    repository: {
      type: Object
    },
    index: {
      type: Number
    },
    large: {
      type: Boolean
    }
  },
  methods: {
    clickHeaderItem () {
      this.$emit('clickHeaderItem', this.index)
    }
  }
}
</script>

<style scoped>
.header-item{
  display: flex;
  align-items: center;
  cursor: pointer;
}
.branch-name{
  font-weight: bold;
  font-family: Consolas;
}
.repos-name{
  position: relative;
  margin-left: 10px;
  color: #3A74AE;
  font-size: 15px;
}
.repos-name-checked{
  font-weight: bold;
  font-size: 22px;
}
.seperator{
  width: 1px;
  height: 30px;
  background: #2470BD;
  margin: 0 20px;
}
.badge{
  /* position: absolute;
  top: -7px;
  left: 100%; */
  display: inline-block;
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid #b3d8ff;
  color: #409EFF;
  font-size: 12px;
}
</style>
