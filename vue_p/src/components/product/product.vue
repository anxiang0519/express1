<template>
  <div style="height:100%;">
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      closable
      @tab-remove="removeTab"
      style="height:100%;"
    >
      <el-tab-pane
        v-for="(item,index) in editableTabs"
        :key="index"
        :label="item.title"
        :name="item.name"
      >
        <el-table
          v-if="editableTabsValue==1"
          :height="tableH"
          border
          :data="productList.filter(data => !search || data.productname.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
          stripe
          @row-dblclick="rowdbclick"
          :default-sort="{prop: 'productname', order: 'descending'}"
        >
          <el-table-column type="index"></el-table-column>

          <el-table-column label="商品名称" prop="productname" sortable></el-table-column>

          <el-table-column label="描述" prop="description" sortable></el-table-column>

          <el-table-column label="价格" prop="price"></el-table-column>

          <el-table-column label="库存" prop="num1"></el-table-column>

          <el-table-column label="上架时间" prop="time"></el-table-column>

          <el-table-column label="图片数量" prop="imgurl.length"></el-table-column>

          <el-table-column align="center">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" size="mini" placeholder="名字搜索" />
            </template>
            <template slot-scope="scope">
              <el-button size="mini" @click="addUser(scope.row)">新增</el-button>
              <!-- <el-button size="mini" @click="query(scope.row)">编辑</el-button> -->
              <el-button size="mini" type="danger" @click="deleterow(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div v-if="editableTabsValue!=1">
          <el-form ref="form" :model="item" label-width="80px" size="mini">
            <el-form-item label="商品名称">
              <el-input v-model="item.productname"></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
              <el-input v-model="item.price"></el-input>
            </el-form-item>
            <el-form-item label="库存">
              <el-input v-model="item.num1"></el-input>
            </el-form-item>
            <el-form-item label="上架时间">
              <el-date-picker type="datetime" placeholder="选择上架时间" v-model="item.time"></el-date-picker>
            </el-form-item>
            <el-form-item label="商品描述">
              <el-input type="textarea" v-model="item.description"></el-input>
            </el-form-item>
            <el-form-item label="是否包邮">
              <el-radio-group v-model="item.express">
                <el-radio label="1" v-model="item.express">包邮</el-radio>
                <el-radio label="0" v-model="item.express">不包邮</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="商品图片" prop="imgUrl">
              <el-upload
                class="upload-demo"
                action="http://localhost:3000/upload"
                multiple
                :limit="3"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="save">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-dialog :title="dialogInfo.title" :visible.sync="dialogInfo.isshow" width="500px">
      <el-form ref="form" :model="productObj" label-width="80px" size="mini">
        <el-form-item label="商品名称">
          <el-input v-model="productObj.productname"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="productObj.price"></el-input>
        </el-form-item>
        <el-form-item label="库存">
          <el-input v-model="productObj.num1"></el-input>
        </el-form-item>
        <el-form-item label="上架时间">
          <el-date-picker type="datetime" placeholder="选择上架时间" v-model="productObj.time"></el-date-picker>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input type="textarea" v-model="productObj.description"></el-input>
        </el-form-item>
        <el-form-item label="是否包邮">
          <el-radio-group v-model="productObj.express">
            <el-radio label="1" v-model="productObj.express">包邮</el-radio>
            <el-radio label="0" v-model="productObj.express">不包邮</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="商品图片" prop="imgUrl">
          <el-upload class="upload-demo" action="http://localhost:3000/upload" multiple :limit="3">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">立即创建</el-button>
          <el-button @click="cancelDialog">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import http from "@/http";
import { setCookie, getCookie, delCookie } from "@/cookie";
export default {
  name: "product",
  data() {
    return {
      title: "",
      tableH:600,
      productList: [],
      search: "",
      dialogInfo: {
        isAdd: false,
        isshow: false,
        title: ""
      },
      productObj: {
        productname: "",
        description: "",
        price: "",
        type: "",
        time: "",
        express: 0,
        type: 1,
        num1: 0,
        fileList: []
      },
      editableTabsValue: "1",
      editableTabs: [{ name: "1", title: "商品列表" }],
      tabIndex: 1
    };
  },
  methods: {
    addUser() {
      this.dialogInfo.isAdd = true;
      this.dialogInfo.title = "商品新增";
      this.dialogInfo.isshow = true;
      this.productObj = {};
    },
    query(row) {
      this.dialogInfo.isAdd = false;
      this.dialogInfo.title = "商品编辑";
      var productInfo = this.productList[
        this.productList.findIndex(item => item.id === row.id)
      ];
      this.productObj = { ...productInfo };
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
            url: "http://localhost:3000/product/delete?id=" + row.id,
            data: {}
          })
            .then(res => {
              if (res.code == 200) {
                _this.productList.splice(
                  _this.productList.findIndex(item => item.id == row.id),
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
    save(productObj) {
      console.log(this.productObj);
      if (!this.dialogInfo.isAdd) {
        //edit
        http({
          //这里是你自己的请求方式、url和data参数
          method: "post",
          url: "http://localhost:3000/product/update",
          data: this.productObj
        })
          .then(res => {
            if (res.code == 200) {
              getProductList(this);
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
          url: "http://localhost:3000/product/add",
          data: this.productObj
        })
          .then(res => {
            if (res.code == 200) {
              getProductList(this);
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
    cancelDialog: function() {
      this.dialogInfo.isshow = false;
    },
    rowdbclick: function(row, column, event) {
      console.log(row, column, event);
      let newTabName = ++this.tabIndex + "";
      this.editableTabs.push({
        ...row,
        name: newTabName,
        title: row.productname
      });
      this.editableTabsValue = newTabName;
    },
    removeTab: function(targetName) {
      console.log(targetName);
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    }
  },
  mounted() {
    console.log(this);
    
    getProductList(this);
    this.tableH = this.$el.offsetHeight;
  }
};
function getProductList(_this) {
  http({
    //这里是你自己的请求方式、url和data参数
    method: "get",
    url: "http://localhost:3000/product/queryAll",
    data: {}
  })
    .then(function(res) {
      console.log(res);
      _this.productList = res.data;
    })
    .catch(function(err) {
      console.log(err);
    });
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
