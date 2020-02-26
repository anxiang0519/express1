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
    <el-button @click="save()">默认按钮</el-button>
  </div>
</template>

<script>
import http from '@/http'
export default {
  name: 'eidtUser',
  data(){
    return {
      title:'',
      id:'',
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
        url: 'http://localhost:3000/updateUser',
        data: {'id':_this.id,'name':_this.name,'age':_this.age,'phone':_this.phone}
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
  },
  mounted(){
    var _this = this;
    var id = location.href.split('=')[1];
    http({
      //这里是你自己的请求方式、url和data参数
      method: 'get',
      url: 'http://localhost:3000/editUser?id='+id,
      data: {}
    }).then(function (res) {
      console.log(res);
      _this.title = '';
      _this.id = res.data[0].id;
      _this.name = res.data[0].name;
      _this.age = res.data[0].age;
      _this.phone = res.data[0].phone;
    }).catch(function (err) {
      console.log(err);
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
