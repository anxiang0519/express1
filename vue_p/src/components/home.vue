<template>
  <el-container style="height:100%;">
    <el-aside width="" style="background-color: rgb(238, 241, 246)">
     <!--  <el-switch v-model="isCollapse" active-color="#13ce66" inactive-color="#ff4949">
     </el-switch> -->
     <div class="menu_btn" @click="changeMenu()"></div>
     <el-menu router default-active="1-4-1" class="el-menu-left" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
       <el-menu-item index="/home/index">
        <i class="el-icon-menu"></i>
        <span slot="title">首頁</span>
      </el-menu-item>
      <el-menu-item index="/home/product">
        <i class="el-icon-document"></i>
        <span slot="title">商品</span>
      </el-menu-item>
      <el-menu-item index="/home/shopcar">
        <i class="el-icon-setting"></i>
        <span slot="title">购物车</span>
      </el-menu-item>
      <el-menu-item index="/home/order">
        <i class="el-icon-setting"></i>
        <span slot="title">订单</span>
      </el-menu-item>
      <el-menu-item index="/home/usermanage">
        <i class="el-icon-setting"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="/home/setting">
        <i class="el-icon-setting"></i>
        <span slot="title">设置</span>
      </el-menu-item>
    </el-menu>    
  </el-aside>

  <el-container>
    <el-header style="text-align: right; font-size: 12px;border-bottom:1px solid rgb(238, 241, 246);">
      <el-row style="margin-top:10px;">
        <el-button icon="el-icon-search" circle></el-button>
        <el-badge :value="11" :max="99" class="item">
          <el-button type="info" icon="el-icon-message" circle></el-button>
        </el-badge>
        <el-button type="info" icon="el-icon-message" circle></el-button>
        <el-button type="info" icon="el-icon-search" circle></el-button>
        <!-- <el-avatar :src="img_tx"></el-avatar> -->
      </el-row>
      <el-dropdown @command="handleCommand">
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>


    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
  import {getCookie,delCookie} from '@/cookie'
  import img_tx from '@/assets/touxiang.png'
  import {mapMutations} from 'vuex'
// import http from '@/http'
// import login_back from '@/assets/login_back.jpg'
export default {
  name: 'home',
  data(){
    return {
      loginuser:'',
      isCollapse: true,
      img_tx:img_tx
    }
  },
  methods:{
    ...mapMutations(['quiteLogin']),
    quite(){
      console.log(123)
      this.$confirm('确认退出?','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        this.quiteLogin({token:res.token});
        this.$router.push('/login')
      }).catch(()=>{

      })            
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    changeMenu(){
      this.isCollapse = this.isCollapse?false:true;
    },
    handleCommand(command){
      switch (command) {
        case "a":
        this.$confirm('确认退出?','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          this.quiteLogin();
          this.$router.push('/login')
        }).catch(()=>{

        })
        break;
      }
    }
  },
  mounted(){
    return;
    /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
    var loginuser = getCookie('username')
    if(!loginuser){
      this.$router.push('/login')
    }else{
      this.loginuser = loginuser
    }
    this.$router.replace({path: '/home/index'});
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-menu-left:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-aside{
  position: relative;
  overflow: visible;
}
.menu_btn{
  background: red;
  height: 60px;
  width: 10px;
  position: absolute;
  right: -5px;
  top: 50%;
  margin-top: -30px;
  cursor: pointer;
  z-index: 9;
}
.el-menu{
  height: 100%;
  background: rgb(238, 241, 246);
}
</style>
