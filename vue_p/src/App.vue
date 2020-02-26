<template>
  <div id="app">
      <el-header height="60px;">{{title}}</el-header>
      <el-main>
        <router-view />
      </el-main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      'title':'人员列表'
    }
  }
}
</script>

<style>
#app {
  height: 100%;
  width: 100%;
  min-width: 520px;
  position: relative;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-header{
  height: 60px;
  line-height: 60px;
}
.el-main{
  background: #EEF3F7;
}
</style>
