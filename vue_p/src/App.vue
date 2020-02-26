<template>
  <div id="app">
      <router-view />
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
</style>
