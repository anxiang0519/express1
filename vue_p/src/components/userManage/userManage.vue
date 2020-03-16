<template>
  <div style="height:100%;">
    <el-tabs type="border-card" style="height:100%;" @tab-click="tabclick">
      <el-tab-pane style="height:100%;">
        <span slot="label">
          <i class="el-icon-date"></i>微信用戶信息
        </span>
        <!-- <el-button type="primary" @click="addUser()">新增</el-button> -->
        <el-table
        :height="tableH"
        :data="wxUserList"
        style="width: 100%"
        stripe
        :default-sort="{prop: 'nickname', order: 'descending'}"
        >
        <el-table-column type="index"></el-table-column>
        <!-- <el-table-column label="avatarurl" prop="avatarurl" sortable></el-table-column> -->
        <el-table-column label="rouxiang">
          <template slot-scope="scope">
            <el-avatar shape="square" :size="35" :src="scope.row.avatarurl"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column label="nickname" prop="nickname" sortable></el-table-column>
        <el-table-column label="city" prop="city" sortable></el-table-column>
        <el-table-column label="country" prop="country" sortable></el-table-column>
        <el-table-column label="gender" prop="gender" sortable></el-table-column>
        <el-table-column label="language" prop="language" sortable></el-table-column>
        <el-table-column label="province" prop="province" sortable></el-table-column>
        <el-table-column label="logintime" sortable>
          <template slot-scope="scope">
            <span>{{ getMyDate(scope.row.logintime) }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane>
      <span slot="label">
        <i class="el-icon-date"></i>地址信息
      </span>
      <el-table
      :height="tableH"
      :data="addressList"
      style="width: 100%"
      stripe
      :default-sort="{prop: 'nickname', order: 'descending'}"
      >
      <el-table-column type="index"></el-table-column>
      <el-table-column label="name" prop="name" sortable></el-table-column>
      <el-table-column label="phone" prop="phone" sortable></el-table-column>
      <el-table-column label="areaName" prop="areaName" sortable></el-table-column>
      <el-table-column label="location" prop="location" sortable></el-table-column>
    </el-table>
  </el-tab-pane>
  <el-tab-pane>
    <span slot="label">
      <i class="el-icon-date"></i>系统用户信息
    </span>
    <el-table
    :height="tableH"
    :data="sysUserList"
    style="width: 100%"
    stripe
    :default-sort="{prop: 'nickname', order: 'descending'}"
    >
    <el-table-column type="index"></el-table-column>
    <el-table-column label="username" prop="username" sortable></el-table-column>
    <el-table-column label="password" prop="password" sortable></el-table-column>
    <el-table-column label="lasttime" prop="lasttime" sortable></el-table-column>
    <el-table-column label="type" prop="type" sortable></el-table-column>
  </el-table>
</el-tab-pane>
</el-tabs>

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
  import http from "@/http";
  import { setCookie, getCookie, delCookie } from "@/cookie";
  export default {
    name: "usermanager",
    data() {
      return {
        title: "",
        tableH:600,
        wxUserList: [],
        addressList:[],
        sysUserList:[],
        search: "",
        dialogInfo: {
          isAdd: false,
          isshow: false,
          userObj: {},
          title: ""
        }
      };
    },
    methods: {
      addUser(data) {
        console.log(data);
        // this.dialogInfo.isAdd = true;
        // this.dialogInfo.title = "人员新增";
        // this.dialogInfo.userObj = {};
        // this.dialogInfo.isshow = true;
      },
      query(row) {
        this.dialogInfo.isAdd = false;
        this.dialogInfo.title = "人员编辑";
        const { id, name, age, phone } = this.users[
        this.users.findIndex(item => item.id === row.id)
        ];
        this.dialogInfo.userObj = { id: id, name: name, age: age, phone: phone };
        this.dialogInfo.isshow = true;
      },
      deleterow(row) {
        var _this = this;
        this.$confirm("确认删除？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          http({
            //这里是你自己的请求方式、url和data参数
            method: "get",
            url: "http://localhost:3000/deleteUser?id=" + row.id,
            data: {}
          })
          .then(res => {
            if (res.code == 200) {
              _this.users.splice(
                _this.users.findIndex(item => item.id == row.id),
                1
                );
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
          })
          .catch(err => {
            this.$message({
              type: "info",
              message: "删除失败"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      },
      save() {
        if (!this.dialogInfo.isAdd) {
        //edit
        http({
          //这里是你自己的请求方式、url和data参数
          method: "post",
          url: "http://localhost:3000/updateUser",
          data: {
            id: this.dialogInfo.userObj.id,
            name: this.dialogInfo.userObj.name,
            age: this.dialogInfo.userObj.age,
            phone: this.dialogInfo.userObj.phone
          }
        })
        .then(res => {
          if (res.code == 200) {
            getData(this);
            this.$message({
              type: "success",
              message: "保存成功!"
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "保存失败"
          });
        });
      } else {
        //add
        http({
          //这里是你自己的请求方式、url和data参数
          method: "post",
          url: "http://localhost:3000/addUser",
          data: {
            name: this.dialogInfo.userObj.name,
            age: this.dialogInfo.userObj.age,
            phone: this.dialogInfo.userObj.phone
          }
        })
        .then(res => {
          if (res.code == 200) {
            getAllUser(this);
            this.$message({
              type: "success",
              message: "保存成功!"
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "保存失败"
          });
        });
      }
      this.dialogInfo.isshow = false;
    },
    tabclick(tab){
      var tabIndex = tab._data.index;
      switch (parseInt(tabIndex)) {
        case 0:
          this.getData1();
          break;
        case 1:
          this.getData2();
          break;
        case 2:
          this.getData3();
          break;
      }
    },
    getMyDate(str) {
      console.log(str);
        var oDate = new Date(parseInt(str)),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth()+1,
        oDay = oDate.getDate(),
        oHour = oDate.getHours(),
        oMin = oDate.getMinutes(),
        oSen = oDate.getSeconds(),
        oTime = oYear +'-'+ this.addZero(oMonth) +'-'+ this.addZero(oDay) +' '+ this.addZero(oHour) +':'+
    this.addZero(oMin) +':'+this.addZero(oSen);
        return oTime;
    },
    //补零操作
    addZero(num){
      if(parseInt(num) < 10){
        num = '0'+num;
      }
      return num;
    },
    //小程序用户信息
    getData1(){
      var _this = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "http://localhost:3000/userinfo/queryAll",
        data: {}
      }).then(function(res) {
        _this.wxUserList = res.data;
      })
      .catch(function(err) {
        console.log(err);
      });
    },
    //地址信息
    getData2(){
      var _this = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "http://localhost:3000/address/queryAll",
        data: {}
      }).then(function(res) {
        _this.addressList = res.data;
      })
      .catch(function(err){
        console.log(err);
      });
    },
    //系统用户信息
    getData3() {
      var _this = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "http://localhost:3000/user/queryAll",
        data: {}
      }).then(function(res) {
        _this.sysUserList = res.data;
      })
      .catch(function(err) {
        console.log(err);
      });
    }
  },
  mounted() {
    this.getData1();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
