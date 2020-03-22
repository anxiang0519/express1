<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="indexTop"><indexcom></indexcom></div>
      </el-col>
      <el-col :span="8"><div class="indexTop"></div></el-col>
      <el-col :span="8"><div class="indexTop"></div></el-col>
    </el-row>
    <div style="height:20px;"></div>
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="indexbottom"><chart :options="options" :auto-resize="true"></chart></div>
      </el-col>
      <el-col :span="8"><div class="indexbottom"></div></el-col>
    </el-row>
  </div>
</template>
<script>
import indexcom from '@/components/indexcom/indexcom';
// 折线
import 'echarts/lib/chart/line';
// 饼状图
import 'echarts/lib/chart/pie';
// 柱状图
import 'echarts/lib/chart/bar';
// ...

// 提示
import 'echarts/lib/component/tooltip';
// 图例
import 'echarts/lib/component/legend';
// 标题
import 'echarts/lib/component/title';
export default {
  name: 'index',
  data() {
    return {
      options: {}
    };
  },
  methods: {},
  components: { indexcom },
  mounted() {
    this.options = {
      // 标题
      title: {
        text: '某某图',
        x: 'center',
        textStyle: {
          color: '#fff',
          fontSize: 18,
          fontWeight: 'normal'
        }
      },
      // 工具提示
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      // 图例说明
      legend: {
        show: true,
        x: 'center',
        bottom: 20,
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
        textStyle: {
          color: '#fff',
          fontSize: 20
        }
      },
      // 各个部分的颜色
      color: ['#18DBDF', '#F6EF7B', '#3DE16F', '#EF69FB', '#FE5679'],
      // 拖拽的时候重新渲染  默认关闭
      calculable: true,
      // 工具箱
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: {
            show: true,
            type: ['pie', 'funnel'],
            option: {
              funnel: {
                x: '25%',
                width: '50%',
                funnelAlign: 'left',
                max: 1548
              }
            }
          },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      label: {
        show: true,
        fontSize: 20
      },
      series: [
        {
          itemStyle: {
            normal: {
              label: {
                show: true,
                formatter: '{b} : {c} ({d}%)'
              },
              labelLine: {
                show: true
              }
            }
          },
          name: '访问来源',
          // 类型：这里是饼图
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          // 数据
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' }
          ]
        }
      ]
    };
  }
};
</script>
<style scoped>
.indexTop {
  background-color: blue;
  height: 200px;
}
.indexbottom {
  background-color: rgba(0,0,0,.1);
  height: 400px;
}
</style>
