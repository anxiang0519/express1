<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="6">
        用户名
      </el-col>
      <el-col :span="6">
          <el-input placeholder="" v-model="username"></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="6">
        密码
      </el-col>
      <el-col :span="6">
          <el-input placeholder="" v-model="password"></el-input>
      </el-col>
    </el-row>
    <el-button @click="login()">登录</el-button>
  </div>
</template>

<script>
import {setCookie,getCookie} from '@/cookie'
import http from '@/http'
export default {
  name: 'login',
  data(){
    return {
      username:'',
      password:''
    }
  },
  methods:{
    login(){
      var _this = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'post',
        url: 'http://localhost:3000/login',
        data: {'username':_this.username,'password':_this.password}
      }).then(res => {
        if(res.code==200){
          this.$message({
            type: 'success',
            message: '登录成功!'
          });
          setCookie('username',_this.username,1000*60)
          setTimeout(function(){
              this.$router.push('/home')
          }.bind(this),1000)
        }else{
          this.$message({
            type: 'info',
            message: '登录失败!'
          });
        }
      }).catch(err => {
        this.$message({
          type: 'info',
          message: '登录失败'
        }); 
      });
    }
  },
  mounted(){
     /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
    if(getCookie('username')){
        this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
