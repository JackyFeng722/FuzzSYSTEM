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

      option_lavam: {
        //lavam
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["行覆盖率(%)", "函数覆盖率(%)", "分支覆盖率(%)"],
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar", "stack"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: ["Baseline", "Csmith", "DeepFuzz", "TR-Fuzz"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "行覆盖率(%)",
            type: "bar",
            barGap: 0,
            // label: this.labelOption,
            emphasis: {
              focus: "series",
            },
            data: [44, 45, 46, 48],
          },
          {
            name: "函数覆盖率(%)",
            type: "bar",
            // label: this.labelOption,
            emphasis: {
              focus: "series",
            },
            data: [51, 52, 53, 54.5],
          },
          {
            name: "分支覆盖率(%)",
            type: "bar",
            // label: this.labelOption,
            emphasis: {
              focus: "series",
            },
            data: [35, 34, 34.5, 36],
          },
        ],
      },
      option_crashes: {
        legend: {},
        tooltip: {
          trigger: "axis",
          showContent: false,
        },
        dataset: {
          source: [
            ["time", "objdump", "obcopy", "size", "strip", "jhead"],
            ["DEzzer", 13.0, 16.8, 13.6, 14.4, 38.2],
            ["DARWIN", 12.4, 13.0, 12.2, 10.0, 33, 8],
            ["HavocMAB", 12.8, 12.6, 11.2, 9.8, 15.6],
            ["MOpt", 8.8, 4.2, 9.6, 8.0, 5.0],
            ["AFL", 9.0, 9.8, 10.2, 8.6, 27.8],
          ],
        },
        xAxis: { type: "category" },
        yAxis: { gridIndex: 0 },
        grid: { top: "55%" },
        series: [
          {
            type: "line",
            smooth: true,
            seriesLayoutBy: "row",
            emphasis: { focus: "series" },
          },
          {
            type: "line",
            smooth: true,
            seriesLayoutBy: "row",
            emphasis: { focus: "series" },
          },
          {
            type: "line",
            smooth: true,
            seriesLayoutBy: "row",
            emphasis: { focus: "series" },
          },
          {
            type: "line",
            smooth: true,
            seriesLayoutBy: "row",
            emphasis: { focus: "series" },
          },
          {
            type: "line",
            smooth: true,
            seriesLayoutBy: "row",
            emphasis: { focus: "series" },
          },
          {
            type: "pie",
            id: "pie",
            radius: "30%",
            center: ["50%", "32%"],
            emphasis: {
              focus: "self",
            },
            label: {
              formatter: "{b}: {@2012} ({d}%)",
            },
            encode: {
              itemName: "time",
              value: "2012",
              tooltip: "2012",
            },
          },
        ],
      },
      myChart_index3: "",
      data: {
        data_DEzzer: [
          1.0, 947.4, 1310.8, 1516.2, 1661.8, 1789.0, 1863.8, 1920.2, 1975.0,
          2063.4, 2304.0, 2490.0, 2626.6, 2774.2, 2883.6, 2932.8, 2995.0,
          3092.6, 3122.6, 3225.2, 3270.6, 3319.8, 3364.2, 3395.0, 3433.6,
          3450.6, 3465.6, 3505.8, 3545.0, 3565.0, 3607.2, 3659.0,
        ],
        data_DARWIN: [
          1.0, 810.0, 1179.2, 1382.4, 1500.4, 1604.0, 1673.8, 1777.0, 1860.4,
          1985.2, 2234.0, 2463.2, 2582.0, 2699.0, 2785.8, 2894.4, 2967.0,
          3012.8, 3056.2, 3078.2, 3113.0, 3145.0, 3170.2, 3206.8, 3239.2,
          3266.0, 3295.4, 3317.2, 3355.6, 3430.0, 3451.6, 3473.0,
        ],
        data_HavocMAB: [
          1.0, 825.4, 1173.2, 1365.4, 1489.6, 1584.6, 1688.8, 1774.6, 1878.2,
          2051.4, 2285.4, 2547.8, 2764.6, 2872.6, 2943.4, 3017.4, 3065.8,
          3127.2, 3156.6, 3183.2, 3248.2, 3289.8, 3329.0, 3363.8, 3386.0,
          3398.8, 3415.6, 3441.6, 3470.4, 3532.2, 3550.0, 3578.2,
        ],
        data_MOpt: [
          1.0, 507.2, 758.2, 963.4, 1096.4, 1209.2, 1318.6, 1407.8, 1473.8,
          1630.2, 1831.4, 2031.2, 2190.0, 2263.2, 2343.0, 2420.8, 2475.4,
          2580.4, 2676.2, 2738.6, 2781.6, 2811.4, 2837.8, 2872.6, 2905.8,
          2943.6, 2986.4, 3014.0, 3047.2, 3079.2, 3112.8, 3137.8,
        ],
        data_AFL: [
          1.0, 739.8, 1053.0, 1217.0, 1333.4, 1401.8, 1487.4, 1617.2, 1694.0,
          1857.2, 2120.8, 2288.0, 2404.8, 2515.6, 2653.4, 2756.6, 2839.2,
          2887.0, 2924.6, 2959.4, 2986.0, 3023.8, 3058.4, 3094.0, 3117.4,
          3152.4, 3185.2, 3202.6, 3229.4, 3266.6, 3288.2, 3305.2,
        ],
      },
    };
  },
  filters: {},
  computed: {},
  watch: {},
  created() {},
  mounted() {
    //消息通知
    ElNotification({
      title: "我的主页",
      message: h("i", { style: "color: teal" }, "欢迎回到主页！！！"),
      position: "bottom-right",
      duration: 1000,
    });

    let myChart_index = echarts.init(this.$refs.myChart_index); //1、初始化-lavam-crashes
    myChart_index.setOption(this.option_lavam); //1
  },

  methods: {
    getImageUrl(index) {
      // 根据索引获取对应的图片 URL
      return this.urls[index];
    },

    async initData() {
      this.myChart_index3.setOption({
        xAxis: {
          // X轴
          data: [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
            19, 20, 21, 22, 23, 24,
          ], // X轴的数据,是一个数组
          name: "时间(秒)", // X轴名字 字体颜色和大小
          nameTextStyle: {
            color: "#0e9e9e",
            fontSize: 10,
          },
          axisLabel: {
            // X轴刻度值的颜色和大小
            show: true,
            textStyle: {
              color: "#0e9e9e",
              fontSize: 15,
            },
            //解决横坐标自动隐藏问题
            // interval: 0
          },
        },
        yAxis: {
          type: "value",
          name: "总路径(Path)", // Y轴的名字 字体颜色和大小
          nameTextStyle: {
            color: "#0e9e9e",
            fontSize: 12,
          },
          axisLabel: {
            // Y轴刻度的颜色和大小
            show: true,
            textStyle: {
              color: "#0e9e9e",
              fontSize: 15,
            },
          },
        },
        series: [
          // Y轴的数据
          {
            name: "DEzzer", // 每一个是一个Y轴的折线
            type: "line",

            data: this.data.data_DEzzer, // 对应的数据数组
          },
          {
            name: "DARWIN",
            type: "line",

            data: this.data.data_DARWIN,
          },
          {
            name: "HavocMAB",
            type: "line",

            data: this.data.data_HavocMAB,
          },
          {
            name: "MOpt",
            type: "line",

            data: this.data.data_MOpt,
          },
          {
            name: "AFL",
            type: "line",

            data: this.data.data_AFL,
          },
        ],
      });
    },
    drawLine1() {
      this.myChart_index3 = echarts.init(this.$refs.myChart_index3);
      let option_path = {
        title: {
          // 标题名称
          text: "",
          textStyle: {
            fontSize: 20,
            color: "#009229",
          },
          left: "right",
        },
        tooltip: {
          trigger: "axis",
        },
        color: ["#005DAF", "#41AD7B", "#FDD55D", "#FB8F8F", "#A467C0"], // Y轴折线的颜色,与legend的data数据相匹配
        legend: {
          data: ["DEzzer", "DARWIN", "HavocMAB", "MOpt", "AFL"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [],
        },
        yAxis: {
          type: "value",
        },
        animation: true, // 是否展示动画
        animationDuration: 2000, // 动画时长  单位毫秒  此处设为20秒完成数据展示
        series: [
          {
            name: "DEzzer",
            type: "line", // 折线图
            symbol: "pin", // 取消数据点的标记
            smooth: true, // 平滑折线
          },
          {
            name: "DARWIN",
            type: "line", // 折线图
            symbol: "pin", // 取消数据点的标记
            smooth: true, // 平滑折线
          },
          {
            name: "HavocMAB",
            type: "line", // 折线图
            symbol: "pin", // 取消数据点的标记
            smooth: true, // 平滑折线
          },
          {
            name: "MOpt",
            type: "line", // 折线图
            symbol: "pin", // 取消数据点的标记
            smooth: true, // 平滑折线
          },
          {
            name: "AFL",
            type: "line", // 折线图
            symbol: "pin", // 取消数据点的标记
            smooth: true, // 平滑折线
          },
        ],
      };
      this.myChart_index3.setOption(option_path);
    },
  },
};
</script>

<template>
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
        style="width: 50%"
      >
        <template #header>
          <div class="card-header">
            <span class="label">step 6</span>
            <span class="header-label">覆盖率分析界面</span>
            <div class="card-header-tag-green"></div>
          </div>
        </template>

        <div class="buttons">
          <div class="column">
            <el-button
              type="primary"
              style="
                width: 200px;
                margin-top: 10px;
                font-size: 22px;
                height: 40px;
              "
              >代码行覆盖率生成</el-button
            >

            <div class="row">
              <el-button
                type="warning"
                style="
                  width: 200px;
                  margin-top: 10px;
                  font-size: 22px;
                  height: 40px;
                "
                >函数覆盖率生成</el-button
              >
              <el-button
                type="danger"
                plain
                style="
                  width: 150px;
                  margin-top: 10px;
                  margin-left: 100px;
                  font-size: 22px;
                  height: 40px;
                "
                >确定</el-button
              >
            </div>
            <el-button
              type="success"
              style="
                width: 200px;
                margin-top: 10px;
                font-size: 22px;
                height: 40px;
              "
              >分支覆盖率生成</el-button
            >
          </div>
        </div>
      </el-card>
      <el-card shadow="hover" class="box-card" style="width: 50%">
        <h1 style="text-align: center">GCC-7 覆盖率</h1>
        <div class="chart-container">
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
.card-header {
  display: flex;
  justify-content: center;
  align-items: center;
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
    text-align: center;
  }
}
.buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.column {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  flex-direction: row;
}
</style>
