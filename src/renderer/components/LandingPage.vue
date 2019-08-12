<template>
  <div id="wrapper">
    <div class="project-row">
      <div class="title">
        <div class="top">Current Repository</div>
        <div class="bottom">toolbox</div>
      </div>
      <div class="search-area">
        <input type="text" placeholder="Filter">
        <button>Add</button>
      </div>
      <div class="project-list">
        <div class="project-item" v-for="item in [1, 2]" :key="item">ci-code-blog</div>
      </div>
    </div>

    <div class="main">
      <div class="title">
        <div class="bottom">sh list</div>
      </div>
      <div class="content">
        <div class="left">
          <div class="sh-item" v-for="item in [1, 2]" :key="item">
            <span>切换分支并提交</span>
          </div>
        </div>
        <div class="right" v-html="" contenteditable="true">
          git commit <br>
          git push
        </div>
      </div>
    </div>
    <!-- <div class="code">function a() {}</div> -->
  </div>
</template>

<script>
  import hljs from 'highlight.js'
  import 'highlight.js/styles/github.css'
  import shell from 'highlight.js/lib/languages/shell'
  hljs.registerLanguage('shell', shell)
  // hljs.configure({useBR: true})
  import SystemInformation from './LandingPage/SystemInformation'

  export default {
    name: 'landing-page',
    components: { SystemInformation },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    },
    mounted() {
      document.querySelectorAll('.content > .right').forEach((block) => {
        // console.log(hljs.listLanguages());
        hljs.highlightBlock(block);
      });
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
  padding: 3px 20px;
  box-sizing: border-box;
}
.project-item:hover{
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
}
.main .content .left{
  width: 200px;
  border-right: 1px solid #ccc;
}
.main .content .left .sh-item{
  padding: 4px 5px 4px 10px;
  box-sizing: border-box;
  font-size: 12px;
}
.main .content .left .sh-item:hover{
  background: #ccc;
  cursor: pointer;
}
.main .content .right{
  flex: 1;
}
</style>
