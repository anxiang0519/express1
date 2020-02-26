<template>
  <div>
    <div class="demo-input-suffix">
      姓名
      <el-input placeholder="name" v-model="name">
      </el-input>
    </div>
    <div class="demo-input-suffix">
      年龄
      <el-input placeholder="age" v-model="age">
      </el-input>
    </div>
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
      age:0
    }
  },
  methods:{
    save(row){
      var _this = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url: 'http://localhost:3000/addUser?id='+row.id,
        data: {}
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
    http({
      //这里是你自己的请求方式、url和data参数
      method: 'get',
      url: 'http://localhost:3000/query?id'+1,
      data: {}
    }).then(function (res) {
      _this.title = '';
      _this.name = res.data.name;
      _this.age = res.data.age;
    }).catch(function (err) {
      console.log(err);
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
