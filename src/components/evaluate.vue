<script setup>
//3、评估模块

import { ref,onMounted } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter();
const random_number=ref(Math.floor(Math.random()*100)+1);
const selectedOption_method = ref("槲皮素"); // 用于存储选择的值
// const selectedOption_drug = ref(""); // 用于存储选择的值
const options_drug = ref([
  { id: 1, value: "槲皮素", label: "槲皮素",index: "2小时体外释放率(%)"},
  { id: 2, value: "芹菜素", label: "芹菜素",index: '包封率'},
]);
//审核进度
const active = ref(2);
//表格数据接收数组-槲皮素
const tableData =ref([
  {
    index: "1",
    type: "PVPk300",
    radio: "1:4",
    time: "10",
    hour: "51.92%",
  },
  {
    index: "2",
    type: "PEG6000",
    radio: "1:5",
    time: "20",
    hour: "48.11%",
  },
  {
    index: "3",
    type: "泊洛沙姆188",
    radio: "1:7",
    time: "30",
    hour: "53.38%",
  },
  {
    index: "4",
    type: sessionStorage.getItem("admin_type"),
    radio: sessionStorage.getItem("admin_radio"),
    time: sessionStorage.getItem("admin_time"),
    hour:
      sessionStorage.getItem("admin_radio") !== null &&
      sessionStorage.getItem("admin_time") !== null &&
      sessionStorage.getItem("admin_type") !== null
        ? 
        Math.floor(Math.random() * (68 - 50 + 1)) + 55 +"."+random_number.value+"%"
        : "",
  },
]);
//表格数据接收数组-芹菜素
const tableData2 =ref( [
  {
    index: "1",
    radio_v: "1:5",
    radio_w: "1:10",
    time: "10",
    encapsulation : "61.17%",
  },
  {
    index: "2",
    radio_v: "1:10",
    radio_w: "1:10",
    time: "10",
    encapsulation: "63.12%",
  },
  {
    index: "3",
    radio_v: "1:15",
    radio_w: "1:10",
    time: "10",
    encapsulation: "61.04%",
  },
  {
    index: "4",
    radio_v: sessionStorage.getItem("admin_radio_v"),
    radio_w: sessionStorage.getItem("admin_radio_w"),
    time: sessionStorage.getItem("admin_time_2"),
    encapsulation:
      (sessionStorage.getItem("admin_radio_v") === null &&
      sessionStorage.getItem("admin_radio_w") === null &&
      sessionStorage.getItem("admin_time_2") === null)
        ? 
        ""
        : Math.floor(Math.random() * (67 - 50 + 1)) + 55 +"."+random_number.value+"%",
  },
]);
const skip=()=>{
  const a =(sessionStorage.getItem("admin_radio_v") === null &&
      sessionStorage.getItem("admin_radio_w") === null &&
      sessionStorage.getItem("admin_time_2") ===null);
  console.log(  sessionStorage.getItem("admin_radio_v"))
  console.log(  sessionStorage.getItem("admin_radio_w"))
  console.log(  sessionStorage.getItem("admin_time_2"))
  console.log('over:',a)
  router.push('/home/evaluate_result');
}

onMounted(() => {
  const result_quercetin = parseFloat(tableData.value[3].hour.replace(/%/g, '')) / 100; // 移除百分号并转换为小数
  const result_apigenin = parseFloat(tableData2.value[3].encapsulation.replace(/%/g, '')) / 100; // 移除百分号并转换为小数
  if(result_quercetin===null ||result_quercetin=='') result_quercetin = 0;
  if(result_apigenin==null || result_apigenin=='')result_apigenin = 0;
  console.log(result_quercetin,result_apigenin)
  sessionStorage.setItem("quercetin",result_quercetin.toFixed(3)) //quercetin槲皮素：最后行模拟数据
  sessionStorage.setItem("apigenin",result_apigenin.toFixed(3))//apigenin芹菜素：最后行模拟数据 
})
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
        <el-step title="进度 3 (进行中)" description="质量指标评估" />
      </el-steps>
    </div>

    <div class="max_title">
      <div class="Experimental_theme">
    <span>药物：</span>
    <el-select
      v-model="selectedOption_method"
      placeholder="槲皮素"
      class="select"
   
    >
      <el-option
        v-for="option in options_drug"
        :key="option.value"
        :label="option.label"
        :value="option.value"
      ></el-option>
    </el-select>
    <p class="mass-index">
      质量指标：
      <span :style="{ color: selectedOption_method === '槲皮素' ? 'green' : 'blue' }">
        {{ selectedOption_method === '槲皮素' ? '2小时体外释放率(%)' : '包封率' }}
      </span>
    </p>
  </div>   
    </div>

    <div class="table" v-show="selectedOption_method=='槲皮素'">
      <el-table :data="tableData" border style="width: 85%">
        <el-table-column prop="index" label="序号" width="220" />
        <el-table-column prop="type" label="载体类型" width="220">
        </el-table-column>
        <el-table-column
          prop="radio"
          label="药物与载体的质量比(w/w)"
          width="220"
        >
        </el-table-column>
        <el-table-column prop="time" label="搅拌时间"> </el-table-column>
        <el-table-column
          prop="hour"
          label="2小时体外释放率"
          :center="true"
          class="result_text"
        >
          <template v-slot="{ row }">
            <div
              class="custom-cell"
              :style="{ color: 'red', textAlign: 'center', fontSize: '18px' }"
            >
              <span class="cell-content">{{ row.hour }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table" v-show="selectedOption_method=='芹菜素'">
      <el-table :data="tableData2" border style="width: 85%">
        <el-table-column prop="index" label="序号" width="220" />
        <el-table-column prop="radio_v" label="油相与水相的比例(v/v)" width="220">
        </el-table-column>
        <el-table-column
          prop="radio_w"
          label="药物与载体的质量比(w/w)"
          width="220"
        >
        </el-table-column>
        <el-table-column prop="time" label="搅拌时间"> </el-table-column>
        <el-table-column
          prop="encapsulation"
          label="包封率"
          :center="true"
          class="result_text"
        >
          <template v-slot="{ row }">
            <div
              class="custom-cell"
              :style="{ color: 'red', textAlign: 'center', fontSize: '18px' }"
            >
              <span class="cell-content">{{ row.encapsulation }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-row type="flex" justify="start">
      <div class="button_under">
        <el-button type="success" @click="skip">
            <div class="first">继续</div> 
        </el-button>
      </div>
    </el-row>
  </el-card>
</template>

<style scoped>
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
  margin-left: 10px;
  font-size: large;
  font-weight: bold;
}
.button_under {
  margin-top: 20px;
  margin-left: 46%;
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
