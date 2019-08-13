<template>
  <div class="modal-wrapper" v-if='show'>
    <div class="modal-content" style="height: 160px;">
      <div class="modal-title">
        项目信息
      </div>
      <div class="modal-inner">
        <div class="label">项目名</div>
        <div class="modal-left">
          <input v-model="project.projectName" />
          
        </div>
      </div>

      <div class="btn-group">
        <button class="confirm" @click='confirm'>Confirm</button>
        <button class="cancel" @click='cancel'>Cancel</button>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'ProjectInfoModal',
    props: {
      project: {
        type: Object
      },
      show: {
        type: Boolean
      }
    },
    methods: {
      uploadChange() {},
      confirm() {
        this.$emit('updateProject', this.project)
      },
      cancel() {
        this.$emit('cancel')
      },
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>

