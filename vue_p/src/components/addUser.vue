<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="6">
        姓名
      </el-col>
      <el-col :span="6">
          <el-input placeholder="name" v-model="name"></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="6">
        年龄
      </el-col>
      <el-col :span="6">
          <el-input placeholder="age" v-model="age"></el-input>
      </el-col>
    </el-row>
     <el-row type="flex" justify="center">
      <el-col :span="6">
        电话
      </el-col>
      <el-col :span="6">
          <el-input placeholder="phone" v-model="phone"></el-input>
      </el-col>
    </el-row>
    <el-button @click="save()">保存</el-button>
  </div>
</template>

<script>
import http from '@/http'
export default {
  name: 'addUser',
  data(){
    return {
      title:'',
      name:'',
      age:0,
      phone:''
    }
  },
  methods:{
    save(){
      var _this = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'post',
        url: 'http://localhost:3000/addUser',
        data: {'name':_this.name,'age':_this.age,'phone':_this.phone}
      }).then(res => {
        if(res.code==200){
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
        }
      }).catch(err => {
        this.$message({
          type: 'info',
          message: '保存失败'
        }); 
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
