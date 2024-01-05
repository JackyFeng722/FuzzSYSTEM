<script>
import * as echarts from "echarts";
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
import { MoreFilled } from "@element-plus/icons-vue";
import { h } from "vue";
export default {
  name: "",
  components: { chart: echarts },
  props: {},
  data() {
    return {
      activities: [
        {
          content: "Step1：选择药物",
          timestamp: "药物的选型包括槲皮素和芹菜素，不同药物的质量指标不同",
          size: "large",
   
 
        },
        {
          content: "Step2：选择实验的载体类型",
          timestamp: "不同实验的载体类型各不相同",
          type: "primary",
          hollow: true,
        },
        {
          content: "Step3：选择药物与载体的质量比",
          timestamp: "实验中选择药物与载体的质量比需考虑多个因素，包括药物的理化性质、药效与药物释放速率的要求、载体的特性等", 
          type: "primary",
        },
        {
          content: "Step4：选择搅拌时间",
          timestamp: "在实验前需要熟悉所使用的设备，并根据设备的性能来确定适当的搅拌时间",
          color: "#0bbd87",
        },
        {
          content: "Step5：检查",
          timestamp: "确保实验各项参数配置正确，方可进行下一步",
          size: "large",
          type: "primary",
          icon: MoreFilled,
        },
      ],
      urls: [
        "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
        "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
        "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
      ],
      option: {
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
          max: 1,
          startAngle: 75,
        },
        radiusAxis: {
          type: "category",
          data: ["index_1", "index_2", "index_3", "index_4"],
        },
        tooltip: {},
        series: {
          type: "bar",
          data: [0.612, 0.631, 0.629, 0.61],
          coordinateSystem: "polar",
          label: {
            show: true,
            position: "middle",
            formatter: "{b}: {c}",
          },
        },
      },

      option_lavam : {//lavam
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['DEzzer', 'DARWIN', 'HavocMAB', 'MOpt', 'AFL']
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: ['base64', 'uniq', 'who', 'md5sum']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'DEzzer',
            type: 'bar',
            barGap: 0,
            // label: this.labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [16, 5.4, 3.6, 4.8]
          },
          {
            name: 'DARWIN',
            type: 'bar',
            // label: this.labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [1.2, 5.0, 2.2, 3.8]
          },
          {
            name: 'HavocMAB',
            type: 'bar',
            // label: this.labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [4.0, 1.8,2.0, 4.2]
          },
          {
            name: 'MOpt',
            type: 'bar',
            // label: this.labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [0.2, 0.8, 2.0, 2.6]
          },
          {
            name: 'AFL',
            type: 'bar',
            // label: this.labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [1.0, 1.0, 1.4, 2.8]
          }
        ]
      },

      option_crashes : {
        legend: {},
        tooltip: {
          trigger: 'axis',
          showContent: false
        },
        dataset: {
          source: [
            ['time',  'objdump', 'obcopy', 'size','strip','jhead'],
            ['DEzzer', 13.0, 16.8, 13.6, 14.4 ,38.2],
            ['DARWIN', 12.4, 13.0,12.2,10.0 ,33,8],
            ['HavocMAB',12.8,12.6 , 11.2,9.8 ,15.6],
            ['MOpt',8.8, 4.2, 9.6 , 8.0 ,5.0],
            ['AFL',9.0, 9.8, 10.2, 8.6 ,27.8]
          ]
        },
        xAxis: { type: 'category' },
        yAxis: { gridIndex: 0 },
        grid: { top: '55%' },
        series: [
          {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' }
          },
          {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' }
          },
          {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' }
          },
          {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' }
          },
          {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' }
          },
          {
            type: 'pie',
            id: 'pie',
            radius: '30%',
            center: ['50%', '32%'],
            emphasis: {
              focus: 'self'
            },
            label: {
              formatter: '{b}: {@2012} ({d}%)'
            },
            encode: {
              itemName: 'time',
              value: '2012',
              tooltip: '2012'
            }
          }
        ]
      },
      
      myChart_index3: '',
      
      data:{
      data_DEzzer:[1.0, 947.4, 1310.8, 1516.2, 1661.8, 1789.0, 1863.8, 1920.2, 1975.0, 2063.4, 2304.0, 2490.0, 2626.6, 2774.2, 2883.6, 2932.8, 2995.0, 3092.6,
       3122.6, 3225.2, 3270.6, 3319.8, 3364.2, 3395.0, 3433.6, 3450.6, 3465.6, 3505.8, 3545.0, 3565.0, 3607.2, 3659.0],
      data_DARWIN:[1.0, 810.0, 1179.2, 1382.4, 1500.4, 1604.0, 1673.8, 1777.0, 1860.4, 1985.2, 2234.0, 2463.2, 2582.0, 2699.0, 2785.8, 2894.4, 2967.0, 3012.8,
       3056.2, 3078.2, 3113.0, 3145.0, 3170.2, 3206.8, 3239.2, 3266.0, 3295.4, 3317.2, 3355.6, 3430.0, 3451.6, 3473.0],
      data_HavocMAB:[1.0, 825.4, 1173.2, 1365.4, 1489.6, 1584.6, 1688.8, 1774.6, 1878.2, 2051.4, 2285.4, 2547.8, 2764.6, 2872.6, 2943.4, 3017.4, 3065.8, 3127.2,
       3156.6, 3183.2, 3248.2, 3289.8, 3329.0, 3363.8, 3386.0, 3398.8, 3415.6, 3441.6, 3470.4, 3532.2, 3550.0, 3578.2],
      data_MOpt:[1.0, 507.2, 758.2, 963.4, 1096.4, 1209.2, 1318.6, 1407.8, 1473.8, 1630.2, 1831.4, 2031.2, 2190.0, 2263.2, 2343.0, 2420.8, 2475.4, 2580.4, 2676.2, 
      2738.6, 2781.6, 2811.4, 2837.8, 2872.6, 2905.8, 2943.6, 2986.4, 3014.0, 3047.2, 3079.2, 3112.8, 3137.8],
      data_AFL:[1.0, 739.8, 1053.0, 1217.0, 1333.4, 1401.8, 1487.4, 1617.2, 1694.0, 1857.2, 2120.8, 2288.0, 2404.8, 2515.6, 2653.4, 2756.6, 2839.2, 2887.0, 2924.6,
       2959.4, 2986.0, 3023.8, 3058.4, 3094.0, 3117.4, 3152.4, 3185.2, 3202.6, 3229.4, 3266.6, 3288.2, 3305.2],
      }
 
  };
  },
  filters: {},
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.drawLine1();
    this.initData();

    //消息通知
    ElNotification({
      title: "我的主页",
      message: h("i", { style: "color: teal" }, "欢迎回到主页！！！"),
      position: "bottom-right",
      duration: 1000,
    });


    let myChart_index = echarts.init(this.$refs.myChart_index); //1、初始化-lavam-crashes
    let myChart_index2 = echarts.init(this.$refs.myChart_index2); //1、初始化-crashes
    // let myChart_index3 = echarts.init(this.$refs.myChart_index3); //1、初始化-path
    myChart_index.setOption(this.option_lavam);//1
    
    myChart_index2.on('updateAxisPointer', function (event) {//2
    const xAxisInfo = event.axesInfo[0];
    if (xAxisInfo) {
      const dimension = xAxisInfo.value + 1;
      myChart_index2.setOption({
        series: {
          id: 'pie',
          label: {
            formatter: '{b}: {@[' + dimension + ']} ({d}%)'
          },
          encode: {
            value: dimension,
            tooltip: dimension
          }
        }
      });
    }
  });
    myChart_index2.setOption(this.option_crashes);//2
 
   
 
    // myChart_index3.setOption(this.option_path);//3



  },

  methods: {
    getImageUrl(index) {
      // 根据索引获取对应的图片 URL
      return this.urls[index];
    },


    async initData() {
      this.myChart_index3.setOption({
        xAxis: {                // X轴
          data: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],       // X轴的数据,是一个数组
          name: '时间(秒)',     // X轴名字 字体颜色和大小
          nameTextStyle: {     
            color: '#0e9e9e',
            fontSize: 10,
          },
          axisLabel: {         // X轴刻度值的颜色和大小
            show: true,
            textStyle: {
              color: '#0e9e9e',
              fontSize: 15,
            },
            //解决横坐标自动隐藏问题
            // interval: 0
          }
        },
        yAxis: {        
          type: 'value',
          name: '总路径(Path)',     // Y轴的名字 字体颜色和大小
          nameTextStyle: {
            color: '#0e9e9e',
            fontSize: 12,
          },
          axisLabel: {            // Y轴刻度的颜色和大小
            show: true,
            textStyle: {
              color: '#0e9e9e',
              fontSize: 15,
            },
          }
        },
        series: [           // Y轴的数据
          {
            name: 'DEzzer',  // 每一个是一个Y轴的折线
            type: 'line',
        
            data: this.data.data_DEzzer  // 对应的数据数组
          },
          {
            name: 'DARWIN',
            type: 'line',
        
            data:this.data.data_DARWIN
          },
          {
            name: 'HavocMAB',
            type: 'line',
            
            data: this.data.data_HavocMAB
          },
          {
            name: 'MOpt',
            type: 'line',
       
            data: this.data.data_MOpt
          },
          {
            name: 'AFL',
            type: 'line',
         
            data: this.data.data_AFL
          },
        ]
      });
    },
    drawLine1() {
    
     this.myChart_index3 = echarts.init(this.$refs.myChart_index3);
      let option_path = {
        title: {               // 标题名称
          text: '',
          textStyle: {
            fontSize: 20,
            color: '#009229',
          },
          left: 'right'
        },
        tooltip: {
          trigger: 'axis'
        },
        color: ['#005DAF','#41AD7B','#FDD55D','#FB8F8F','#A467C0'],  // Y轴折线的颜色,与legend的data数据相匹配
        legend: {
          data: ['DEzzer', 'DARWIN', 'HavocMAB','MOpt','AFL'],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value'
        },
        animation: true,           // 是否展示动画
        animationDuration: 2000,  // 动画时长  单位毫秒  此处设为20秒完成数据展示
        series: [{
          name: 'DEzzer',
          type: 'line', // 折线图
          symbol: 'pin', // 取消数据点的标记
          smooth: true, // 平滑折线
        },
        {
          name: 'DARWIN',
          type: 'line', // 折线图
          symbol: 'pin', // 取消数据点的标记
          smooth: true, // 平滑折线
        },
        {
          name: 'HavocMAB',
          type: 'line', // 折线图
          symbol: 'pin', // 取消数据点的标记
          smooth: true, // 平滑折线
        },
        {
          name: 'MOpt',
          type: 'line', // 折线图
          symbol: 'pin', // 取消数据点的标记
          smooth: true, // 平滑折线
        },
        {
          name: 'AFL',
          type: 'line', // 折线图
          symbol: 'pin', // 取消数据点的标记
          smooth: true, // 平滑折线
        }
      
      
      ]
      };
      this.myChart_index3.setOption(option_path);
    },

  },


};
</script>

<template>
  <div class="title">
    <button class="button">
      基于差分进化算法的变异调度模糊测试方法研究
      <div class="button__horizontal"></div>
      <div class="button__vertical"></div>
    </button>
  </div>
  <!-- <el-carousel :interval="4000" type="card" height="250px">
    <el-carousel-item v-for="(item, index) in 4" :key="index">
      <el-image :src="getImageUrl(index)" />
    </el-carousel-item>
  </el-carousel> -->

  <div class="information_bottom_left">
    <div
      style="
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 8px 30px;
        font-size: 14px;
      "
    >
      <el-card
        shadow="hover"
        class="box-card"
        :body-style="{ backgroundColor: '#fff' }"
        style="width: 46%"
      >
        <template #header>
          <div class="card-header">
            <span class="label">1</span>
            <span class="header-label">覆盖率评估</span>
            <div class="card-header-tag-green"></div>
          </div>
        </template>

        <h4>
模糊测试通过生成大量的随机、异常或非预期的输入来测试程序的鲁棒性和安全性。这些输入经常会触发程序中的边界情况、异常处理路径或不常执行的代码分支。
通过模糊测试的过程，如果能够达到高代码覆盖率，即覆盖到程序中的大部分代码路径和分支，那么有更高的概率发现隐藏的错误。因为只有对各个代码区域进行探索，才能触发程序中的潜在问题。通过不断增加代码覆盖率，模糊测试可以更全面地验证和发现程序中的潜在漏洞和问题。
        </h4>
      </el-card>
      <el-card style="width: 46%" shadow="hover">
        <template #header>
          <div class="card-header">
            <span class="label">2</span>
            <span class="header-label">被测程序崩溃评估</span>
            <div class="card-header-tag-green"></div>
          </div>
        </template>
        <h4>
程序崩溃，是指程序在执行过程中发生了无法处理的错误或异常，导致程序无法正常继续执行并终止运行,崩溃检测能力是衡量测试能效的重要指标。
根据测试过程中触发的崩溃数量，我们将基于差分进化算法的模糊测试变异调度模糊器与最新的模糊器进行比较。在每个程序上进行5次实验，根据实验结果计算得到平均值。
通过实验数据对比，我们的模糊器在崩溃发现方面表现出了显著的优势。
        </h4>
      </el-card>
      <el-card style="width: 46%" shadow="hover">
        <template #header>
          <div class="card-header">
            <span class="label">3</span>
            <span class="header-label">LAVA-M数据集崩溃评估</span>
            <div class="card-header-tag-green"></div>
          </div>
        </template>
        <h4>
          LAVA是由Brendan Dolan-Gavitt等人提出的用于在程序中插入bug的技术方法。通过LAVA在base64、uniq、who、md5sum四个程序上进行bug插入而形成的测试集即为LAVA-M。LAVA-M被广泛应用于fuzz领域的工具效果评估。我们在评估中对所有的模糊测试器都使用了LAVA-M 官方提供的测试用例，并直接跳转到 Havoc 阶段进行 24 小时模糊测试，对每个目标程序独立运行五次。
          值得注意的是，在我们的评估中，DEzzer 是唯一一个能够在每个目标程序中找到平均最多漏洞的模糊测试器。
        </h4>
      </el-card>
    </div>
  </div>
  <div class="information_bottom_left">
    <div
      style="
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 8px 30px;
        font-size: 14px;
      "
    >
    <el-card style="width: 46%" shadow="hover">
        <h1 class="chart-title">被测程序size覆盖率</h1>
        <div  class="chart-container">
          <div
            ref="myChart_index3"
            id="myChart_index3"
            style="width: 100%; height: 300px"
            class="echart_index"
          ></div>
        </div>
       
      </el-card>
      <el-card style="width: 46%" shadow="hover">
        <h1 class="chart-title">不同被测程序崩溃数</h1>
        <div  class="chart-container">
          <div
            ref="myChart_index2"
            id="myChart_index2"
            style="width: 100%; height: 300px"
            class="echart_index"
          ></div>
        </div>
       
      </el-card>
      <el-card style="width: 46%" shadow="hover">
        <h1 class="chart-title">LAVA-M数据集崩溃</h1>
        <div  class="chart-container">
          <div
            ref="myChart_index"
            id="myChart_index"
            style="width: 100%; height: 300px"
            class="echart_index"
          ></div>
        </div>
       
      </el-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}
.card-header {
  .label {
    padding: 0 3px;
    background-color: #fdf0da;
    color: #f19901;
  }
  .header-label {
    padding-left: 10px;
    color: #006ac2;
    font-weight: 900;
    font-size: large;
  }
}

.echart_index {
  margin-top: 20px;
}
.chart-title {
  display: flex;
  align-items: center;
  justify-content: center;
}
.boddy_down {
  margin-top: 1px;
  display: flex;

  .imformation_left,
  .imformation_bottom_left {
    //white-space: nowrap; //段落中文本不换行

    border: 1px solid #dfdfdf;

    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
    background-color: #fefefe;
    box-shadow: 0 0 5px 5px #f0f0f0;
    border-radius: 8px;
    .imformation_left_title {
      position: relative;
      width: 1%;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      border-bottom: 2px solid #dcdcdc;
      // border-top: 2px solid #dcdcdc;
      margin-left: 10px;
      display: table-cell;
      color: white;
      background-color: #3e97df;
      vertical-align: middle;
      //   background-color: aqua;
      .logo {
        margin-left: 10px;
        margin-top: 20px;
      }
    }
  }
  .imformation_bottom_right {
    // background-color: #d32c2c;
    position: relative;
    width: 35%;
    margin-top: 20px;
    margin-left: 14px;
    margin-top: 1.47%;
    border-radius: 8px;
    box-shadow: 0 0 5px 5px #f0f0f0;
    background-color: #fefefe;

    display: table-cell;
    color: #e32222;
    vertical-align: middle;
    //   background-color: aqua;
    .imformation_right_title {
      position: relative;
      width: 5%;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      border-bottom: 2px solid #dcdcdc;
      // border-top: 2px solid #dcdcdc;
      margin-left: 10px;
      display: table-cell;
      color: #e32222;
      // background-color: #3e97df;
      vertical-align: middle;
      //   background-color: aqua;
    }
    .logo {
      margin-left: 10px;
      margin-top: 20px;
    }
    .imformation_right {
      position: relative;
      border: 1px solid #dfdfdf;
      height: 240px;
      width: 300px;
      margin-top: 20px;
      margin-left: 20px;
      margin-right: 20px;
      background-color: #fefefe;
      box-shadow: 0 0 5px 5px #f0f0f0;
      border-radius: 8px;
    }
  }

  .pagination {
    float: right;
  }
}
</style>
<style lang="scss" scoped>
.el-tooltip__popper {
  max-width: 30% !important;
  display: none;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.title {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8vh;
  // background: #fcf3ec;
}

.button {
  --offset: 10px;
  --border-size: 2px;
  font-size: 25px;
  display: block;
  position: relative;
  padding: 0.5em 1em;
  appearance: none;
  border: 0;
  background: transparent;
  color: #e55743;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  outline: none;

  font-weight: bold;
  border-radius: 0;
  box-shadow: inset 0 0 0 var(--border-size) currentcolor;
  transition: background 0.8s ease;

  &:hover {
    background: rgba(100, 0, 0, 0.03);
  }

  &__horizontal,
  &__vertical {
    position: absolute;
    top: var(--horizontal-offset, 0);
    right: var(--vertical-offset, 0);
    bottom: var(--horizontal-offset, 0);
    left: var(--vertical-offset, 0);
    transition: transform 0.8s ease;
    will-change: transform;

    &::before {
      content: "";
      position: absolute;
      border: inherit;
    }
  }

  &__horizontal {
    --vertical-offset: calc(var(--offset) * -1);
    border-top: var(--border-size) solid currentcolor;
    border-bottom: var(--border-size) solid currentcolor;

    &::before {
      top: calc(var(--vertical-offset) - var(--border-size));
      bottom: calc(var(--vertical-offset) - var(--border-size));
      left: calc(var(--vertical-offset) * -1);
      right: calc(var(--vertical-offset) * -1);
    }
  }

  &:hover &__horizontal {
    transform: scaleX(0);
  }

  &__vertical {
    --horizontal-offset: calc(var(--offset) * -1);
    border-left: var(--border-size) solid currentcolor;
    border-right: var(--border-size) solid currentcolor;

    &::before {
      top: calc(var(--horizontal-offset) * -1);
      bottom: calc(var(--horizontal-offset) * -1);
      left: calc(var(--horizontal-offset) - var(--border-size));
      right: calc(var(--horizontal-offset) - var(--border-size));
    }
  }

  &:hover &__vertical {
    transform: scaleY(0);
  }
}
</style>
