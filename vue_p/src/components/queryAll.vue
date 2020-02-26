<template>
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
</template>

<script>
import http from '@/http'
import { setCookie,getCookie,delCookie } from '@/cookie'
export default {
  name: 'queryAll',
  data(){
    return {
      title:'',
      users:[],
      search:''
    }
  },
  methods:{
    query(row){
      this.$router.push({path: '/editUser',query:{ id:row.id}});
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
            _this.users.splice(_this.users.findIndex(item => item.id === row.id), 1)
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
     quit(){
          /*删除cookie*/
          delCookie('username')
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

    var _this = this;
    http({
      //这里是你自己的请求方式、url和data参数
      method: 'get',
      url: 'http://localhost:3000/queryAll',
      data: {}
    }).then(function (res) {
      console.log(res);
      _this.title = '人员列表';
      _this.users = res.data;
    }).catch(function (err) {
      console.log(err);
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
