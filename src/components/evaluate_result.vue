<script setup>
//3、评估模块
import * as echarts from "echarts";
import { onMounted, ref } from "vue";

const random_number=ref(Math.floor(Math.random()*100)+1);
const selectedOption_method = ref("槲皮素"); // 用于存储选择的值
// const selectedOption_drug = ref(""); // 用于存储选择的值
const options_drug = ref([
  { id: 1, value: "槲皮素", label: "槲皮素",index: "2小时体外释放率(%)"},
  { id: 2, value: "芹菜素", label: "芹菜素",index: '包封率'},
]);
//审核进度
const active = ref(3);
const myChart_index_1 = ref(null);
const myChart_index_2 = ref(null);
const option1=ref( {
    title: [
      {
        // text: '质量评价-数据模型计算图',
        left: "center", // 设置标题水平居中
        top: 1, // 设置标题在顶部
      },
    ],
    grid: {
      top: 0, // 设置图距离顶部的距离
    },
    polar: {
      radius: [30, "80%"],
    },
    angleAxis: {
      max: 0.8,
      startAngle: 75,
    },
    radiusAxis: {
      type: "category",
      data: ["quercetin1", "quercetin2", "quercetin3", "quercetin4"],
    },
    tooltip: {},
    series: {
      type: "bar",
      data: [0.612, 0.631, 0.629, sessionStorage.getItem("quercetin")],//quercetin槲皮素：最后行模拟数据
      coordinateSystem: "polar",
      label: {
        show: true,
        position: "middle",
        formatter: "{b}: {c}",
      },
    },
  },)
const option2=ref( {
  title: [
    {
      text: ''
    }
  ],
  polar: {
    radius: [30, '80%']
  },
  radiusAxis: {
    max: 0.8
  },
  angleAxis: {
    type: 'category',
    data: ['apigenin1', 'apigenin2', 'apigenin3', 'apigenin4'],
    startAngle: 75
  },
  tooltip: {},
  series: {
    type: 'bar',
    data: [0.519, 0.481, 0.533,sessionStorage.getItem("apigenin")],//apigenin芹菜素：最后行模拟数据 
    coordinateSystem: 'polar',
    label: {
      show: true,
      position: 'middle',
      formatter: '{b}: {c}'
    }
  },
  animation: true
 });

onMounted(() => {
    // 在组件挂载后执行的代码
    console.log('option1.value.series.data[3]:',option1.value.series.data[3]);
    console.log('option2.value.series.data[3]:',option2.value.series.data[3]);
    // 可以在这里进行一些初始化操作或发起异步请求等
    let myChart_index = echarts.init(myChart_index_1.value); //1、初始化
    let myChart_index2 = echarts.init(myChart_index_2.value); //1、初始化
    myChart_index.setOption(option1.value);
    myChart_index2.setOption(option2.value);
    });


</script>
<template>
  <el-card style="width: 99%">
    <div class="head">
      <span class="head_text"> Step3：质量评价模块 </span>
    </div>
    <div class="steps">
      <el-steps :active="active" finish-status="success">
        <el-step
          title="进度 1 (已完成)"
          description="选择不同实验设计优化方法、影响因素(温度、浓度、制备方法等)、水平、指标，设计制剂方案"
        />
        <el-step title="进度 2 (已完成)" description="实验方案制备" />
        <el-step title="进度 3 (已完成)" description="质量指标评估" />
      </el-steps>
    </div>

    <div class="max_title">
      <div class="Experimental_theme">
    <span class="title">质量评价数据模型计算结果</span>
 
  </div>   
    </div>

    <div
      style="
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 8px 30px;
        font-size: 14px;
      "
    >
        <el-card style="width: 48%" shadow="hover">
        <h1 class="chart-title">质量评价：槲皮素数据模型计算图(2小时体外释放率(%))</h1>
        <div  class="chart-container">
          <div
            ref="myChart_index_1"
            id="myChart_index_1"
            style="width: 100%; height: 300px"
            class="echart_index_1"
          ></div>
        </div>
       
      </el-card>
      <el-card style="width: 48%" shadow="hover">
        <h1 class="chart-title">质量评价：芹菜素数据模型计算图(包封率(%))</h1>
        <div  class="chart-container">
          <div
            ref="myChart_index_2"
            id="myChart_index_2"
            style="width: 100%; height: 300px"
            class="echart_index_2"
          ></div>
        </div>
      </el-card>
    </div>
    <el-row type="flex" justify="start">
      <div class="button_under">
        <el-button type="success">
          <router-link to="/home" class="router-link-no-underline">
            <div class="first">返回主页</div></router-link
          >
        </el-button>
      </div>
    </el-row>
  </el-card>
</template>

<style scoped>
.chart-title {
  display: flex;
  align-items: center;
  justify-content: center;
}
.max_title {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0px;
}
 

.Experimental_theme {
  display: flex;
  align-items: center;
}

.mass-index {
  margin-left: 20px; /* 调整文本之间的间距 */
}
.title {
  margin-top: 20px;
  margin-left: 10px;
  margin-bottom: 10px;
  font-size: 30px;
  font-weight: bold;
}
.button_under {
  margin-top: 20px;
  margin-left: 47.4%;
}
.table {
  margin-left: 20%;
}
.head {
  text-align: center;
  font-size: 30px;
  font-weight: 400;
  margin-bottom: 5px;

}
.head_text {
    color: #006ac2;
  }
.steps {
  /* position: relative; */
  margin-top: 15px;
  margin-bottom: 10px;
  /* align-items: center; */
  /* text-align: center; */
  /* left: 10%; */
  /* align-content: center; */
  margin-left: 200px;
  margin-right: 30px;
}

.router-link-no-underline {
  text-decoration: none;
  color: white;
}
</style>
