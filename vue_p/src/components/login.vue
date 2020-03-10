<template>
  <div class="login_page">
    <!-- <div class="login_back" :style="backStyle">
    </div> -->
    <div class="login_content">
      <el-row type="flex" justify="center" class="login_user_row">
        <el-col :span="20">
            <el-input placeholder="" v-model="username" prefix-icon="el-icon-user-solid"></el-input>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" class="login_psd_row">
        <el-col :span="20">
            <el-input placeholder="" v-model="password" prefix-icon="el-icon-s-tools"></el-input>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" class="login_btn_row">
        <el-col :span="20">
          <el-button round @click="login()" class="login_btn">登录</el-button>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" class="login_btn_row">
        <el-col :span="6">
          <el-link href="" target="_blank">注册账号</el-link>
        </el-col>
        <el-col :span="6">
          <el-link href="" target="_blank">忘记密码</el-link>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="20">
           <el-divider content-position="center">第三方账号</el-divider>
        </el-col>
      </el-row>
      </div>
  </div>
</template>

<script>
import {setCookie,getCookie} from '@/cookie'
import http from '@/http'
import login_back from '@/assets/login_back.jpg'
export default {
  name: 'login',
  data(){
    return {
      username:'',
      password:'',
      backStyle:{
        background:`url(${login_back}) center center no-repeat`
      }
    }
  },
  methods:{
    login(){
      this.$router.push('/home');
      return;
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
.login_page{
  height: 100%;
  width: 100%;
}
.login_content{
  width: 400px;
  height: 500px;
  /* margin: 0 auto; */
  /* margin-top: 200px; */
  background: #fff;
  box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.5);
  border-radius: 10px;
  position: absolute;
  top: 50%;
  margin-top: -200px;
  left: 50%;
  margin-left: -200px;
}
.login_user_row{
  padding-top: 50px;
}
.login_psd_row{
  padding-top: 20px;
}
.login_btn_row{
  padding-top: 20px;
}
.login_btn{
  width: 100%;
}
.login_back{
  position: absolute;
  width: 100%;
  height:50%;
}
</style>
