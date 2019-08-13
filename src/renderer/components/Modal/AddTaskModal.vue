<template>
  <div class="modal-wrapper" v-if='show'>
    <div class="modal-content">
      <div class="modal-title">
        Add Task
      </div>
      <div class="modal-inner">
        <div class="label">任务名称</div>
        <div class="modal-left">
          <input v-model="task.taskName" />
          
        </div>
        <div class="label">执行脚本</div>
        <!-- <pre style="border:1px solid #eee;" contenteditable="true">
          {{shScript}}
        </pre>   -->
        <textarea class="textarea" v-model="task.shScript" />
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
    name: 'AddTaskModal',
    props: ['show'],
    data() {
      return {
        task: { shScript: '', taskName: '' }
      }
    },
    methods: {
      confirm() { this.$emit('confirm', this.task) },
      cancel() { this.$emit('cancel') }
    },
    mounted() {
    }
  }
</script>

<style>
.modal-wrapper{
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height:100%;
  z-index:3;
  background: rgba(0,0,0, 0.5);
}
.modal-content{
  position: absolute;
  z-index:4;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 2px;
  width: 340px;
  height: 360px;
  /* padding: 20px 0;
  box-sizing: border-box; */
}
.modal-title{
  padding: 10px 0 10px 20px;
  font-weight: 14px;
  font-weight: bold;
  border-bottom: 1px solid #eee;
}
.modal-inner{
  padding: 10px 20px;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
}
.label{
  font-size: 12px;
  margin-bottom: 5px;
}

.modal-left{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-left input{
  border: 1px solid #ccc;
  height: 22px;
  border-radius: 2px;
  text-indent: 8px;
  /* margin-right: 10px; */
  flex: 1;
  width: 100%;
}
.modal-left .choose-btn{
  border: 1px solid #ccc;
  background: #eee;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  width: 60px;
  font-size: 14px;
}
.btn-group{
  margin-top: 15px;
  overflow: hidden;
}
.btn-group button {
  border: none;
  float: right;
  margin-right: 15px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  width: 80px;
}
.cancel{
  background: #eee;
  border: 1px solid #ccc;
}
.confirm{
  background: #0366d6;
  color: #fff;
}
button:hover{
  opacity: 0.8;
  cursor: pointer;
}

.textarea{
  width: 100%;
  border: 1px solid #ccc;
  margin-right: 10px;
  height: 172px;
}
</style>

