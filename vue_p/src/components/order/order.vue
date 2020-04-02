<template>
  <div style="height:100%;">
    <el-tabs type="border-card" style="height:100%;">

      <el-tab-pane v-for="(item,index) in tabs" :key="index">
        <span slot="label"><i class="el-icon-date"></i>{{item.title}}</span>
        <el-table height="100%"
                  :data="item.orders.filter(data => !search || data.userid.toLowerCase().includes(search.toLowerCase()))"
                  style="width: 100%" stripe :default-sort="{prop: 'userid', order: 'descending'}">
          <el-table-column type="index">
          </el-table-column>
          <el-table-column label="用户ID" prop="userid" sortable>
          </el-table-column>
          <el-table-column label="姓名" prop="name" sortable>
          </el-table-column>
          <el-table-column label="商品ID" prop="productid" sortable>
          </el-table-column>
          <el-table-column label="商品名称" prop="productname" sortable>
          </el-table-column>

          <el-table-column label="数量" prop="num">
          </el-table-column>
          <el-table-column label="价格" prop="price">
          </el-table-column>
          <el-table-column label="类型" prop="type">
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
      </el-tab-pane>
      <!--     <el-tab-pane><span slot="label"><i class="el-icon-date"></i>待付款</span></el-tab-pane>
          <el-tab-pane><span slot="label"><i class="el-icon-date"></i>待发货</span></el-tab-pane>
          <el-tab-pane><span slot="label"><i class="el-icon-date"></i>待评价</span></el-tab-pane> -->
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
  import http from '@/http'
  import {setCookie, getCookie, delCookie} from '@/cookie'

  export default {
    name: 'order',
    data() {
      return {
        title: '',
        tabs: [
          {title: '全部订单', orders: []},
          {title: '待付款', orders: []},
          {title: '待发货', orders: []},
          {title: '待评价', orders: []}
        ],
        search: '',
        dialogInfo: {
          isAdd: false,
          isshow: false,
          userObj: {},
          title: ''
        }
      }
    },
    methods: {},
    mounted() {
      getAllUser(this);
      return;
      /*页面挂载获取保存的cookie值，渲染到页面上*/
      let uname = getCookie('username')
      this.name = uname
      /*如果cookie不存在，则跳转到登录页*/
      if (uname == "") {
        this.$router.push('/')
        return
      }

    }
  }

  function getAllUser(_this) {
    http({
      //这里是你自己的请求方式、url和data参数
      method: 'get',
      url: 'http://localhost:3000/order/queryAll?type=' + 1,
      data: {}
    }).then(function (res) {
      console.log(res);
      _this.tabs[0].orders = res.data;
      _this.tabs[1].orders = res.data;
      _this.tabs[2].orders = res.data;
      _this.tabs[3].orders = res.data;
    }).catch(function (err) {
      console.log(err);
    });
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
