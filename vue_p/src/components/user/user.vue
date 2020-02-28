<template>
  <div>
    <el-button type="primary" @click="addUser()">新增</el-button>
    <el-table 
    :data="users.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" 
    style="width: 100%" stripe :default-sort = "{prop: 'name', order: 'descending'}"> 
      <el-table-column type="index">
      </el-table-column>

      <el-table-column label="姓名" prop="name" sortable>
      </el-table-column>

      <el-table-column label="年龄" prop="age" sortable>
      </el-table-column>

      <el-table-column label="手机" prop="phone">
      </el-table-column>

      <el-table-column align="center">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="名字搜索"/>
        </template> 
        <template slot-scope="scope">
          <el-button size="mini" @click="query(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleterow(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogInfo.title" :visible.sync="dialogInfo.isshow">
      <el-form :model="dialogInfo.userObj">
        <el-form-item label="姓名">
          <el-input v-model="dialogInfo.userObj.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="dialogInfo.userObj.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="dialogInfo.userObj.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="canvel()">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import http from '@/http'
import { setCookie,getCookie,delCookie } from '@/cookie'
export default {
  name: 'user',
  data(){
    return {
      title:'',
      users:[],
      search:'',
      dialogInfo:{
        isAdd:false,
        isshow:false,
        userObj:{},
        title:''
      }
    }
  },
  methods:{
    addUser(){
      this.dialogInfo.isAdd = true
      this.dialogInfo.title='人员新增'
      this.dialogInfo.userObj = {}
      this.dialogInfo.isshow = true;
    },
    query(row){
      this.dialogInfo.isAdd = false;
      this.dialogInfo.title='人员编辑'
      const {id,name,age,phone} = this.users[this.users.findIndex(item => item.id === row.id)]
      this.dialogInfo.userObj = {'id':id,'name':name,'age':age,'phone':phone};
      this.dialogInfo.isshow = true;
    },
    deleterow(row){
      var _this = this;
      this.$confirm('确认删除？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
         http({
          //这里是你自己的请求方式、url和data参数
          method: 'get',
          url: 'http://localhost:3000/deleteUser?id='+row.id,
          data: {}
        }).then(res => {
          if(res.code==200){
            _this.users.splice(_this.users.findIndex(item => item.id == row.id), 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        }).catch(err => {
           this.$message({
              type: 'info',
              message: '删除失败'
            }); 
        });
      }).catch(()=>{
         this.$message({
            type: 'info',
            message: '已取消删除'
          }); 
      })
     
    },
    save(){
      if(!this.dialogInfo.isAdd){//edit
        http({
          //这里是你自己的请求方式、url和data参数
          method: 'post',
          url: 'http://localhost:3000/updateUser',
          data: {'id':this.dialogInfo.userObj.id,'name':this.dialogInfo.userObj.name,'age':this.dialogInfo.userObj.age,'phone':this.dialogInfo.userObj.phone}
        }).then(res => {
          if(res.code==200){
            getAllUser(this);
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
      }else{//add
        http({
          //这里是你自己的请求方式、url和data参数
          method: 'post',
          url: 'http://localhost:3000/addUser',
          data: {'name':this.dialogInfo.userObj.name,'age':this.dialogInfo.userObj.age,'phone':this.dialogInfo.userObj.phone}
        }).then(res => {
          if(res.code==200){
            getAllUser(this);
            this.$message({
              type: 'success',
              message: '保存成功!'
            })
          }
        }).catch(err => {
          this.$message({
            type: 'info',
            message: '保存失败'
          }); 
        });
      }
      this.dialogInfo.isshow = false
    }
  },
  mounted(){
    /*页面挂载获取保存的cookie值，渲染到页面上*/
    let uname = getCookie('username')
    this.name = uname
    /*如果cookie不存在，则跳转到登录页*/
    if(uname == ""){
        this.$router.push('/')
        return
    }
    getAllUser(this);
  }
}
function getAllUser(_this){
  http({
    //这里是你自己的请求方式、url和data参数
    method: 'get',
    url: 'http://localhost:3000/queryAll',
    data: {}
  }).then(function (res) {
    _this.users = res.data;
  }).catch(function (err) {
    console.log(err);
  });
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
