<template>
  <div style="height:100%;">
    setting
  </div>
</template>

<script>
  import http from '@/http'
  import { setCookie,getCookie,delCookie } from '@/cookie'
  export default {
    name: 'setting',
    data(){
      return {
        title:'',
        tabs:[
        {title:'全部订单',data:[]},
        {title:'待付款',data:[]},
        {title:'待发货',data:[]},
        {title:'待评价',data:[]}
        ],
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
    },
    mounted(){
     getAllUser(this);
     return;
     /*页面挂载获取保存的cookie值，渲染到页面上*/
     let uname = getCookie('username')
     this.name = uname
     /*如果cookie不存在，则跳转到登录页*/
     if(uname == ""){
      this.$router.push('/')
      return
    }

  }
}
function getAllUser(_this){
  http({
    //这里是你自己的请求方式、url和data参数
    method: 'get',
    url: 'http://localhost:3000/order/queryAll?type='+1,
    data: {}
  }).then(function (res) {
    console.log(res);
    _this.tabs[0].data = res.data;
    _this.tabs[1] = res.data;
    _this.tabs[2] = res.data;
    _this.tabs[3] = res.data;
  }).catch(function (err) {
    console.log(err);
  });
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
