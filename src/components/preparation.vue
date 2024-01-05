<script setup>
//制备模块

import { ref, watchEffect } from "vue";
import { Delete, Edit, Search, Share, Upload } from "@element-plus/icons-vue";
import png1 from "../assets/images/1.png";
import png3 from "../assets/images/3.png";
import png4 from "../assets/images/4.png";
import png5 from "../assets/images/5.png";
import png6 from "../assets/images/6.png";
import png7 from "../assets/images/7.png";
import png8 from "../assets/images/8.png";
import png10 from "../assets/images/10.png";
import png12 from "../assets/images/12.png";
import png13 from "../assets/images/13.png";
import png14 from "../assets/images/14.png";
import png15 from "../assets/images/15.png";

const dialogTableVisible = ref(false); //对话框表格:是否显示
//对话框相关属性,dialogTitle为标题字符串类型
const dialogVisible = ref(false);
const dialogTitle = ref("");
const dialogTableValue = ref({});
//审核进度
const active = ref(1);

const selectedOption_method = ref(""); // 用于存储选择的值
const selectedOption_drug = ref(""); // 用于存储选择的值
const options_method = ref([
  { id: 1, value: "溶剂法", label: "溶剂法" },
  { id: 2, value: "熔融法", label: "熔融法" },
  { id: 3, value: "溶剂-熔融法", label: "溶剂-熔融法" },
]);
const options_drug = ref([
  { id: 1, value: "槲皮素", label: "槲皮素" },
  { id: 2, value: "芹菜素", label: "芹菜素" },
]);
const list_item = ref([
  { name: "常用仪器", value: false },
  { name: "常用试剂", value: false },
  { name: "实验仪器", value: false },
]);
const list_item_value = ref(true);

//18个常用仪器
const tagItems = ref([
      { id: 1, label: '分析天平', checked: false },
      { id: 2, label: '恒温磁力搅拌机', checked: false },
      { id: 3, label: '真空干燥箱', checked: false },
      { id: 4, label: '冷冻干燥机', checked: false },
      { id: 5, label: '探头式超声波粉碎仪', checked: false },
      { id: 6, label: '离心机', checked: false },
      { id: 7, label: '真空泵', checked: false },
      { id: 8, label: '称量纸', checked: false },
      { id: 9, label: '封口膜', checked: false },
      { id: 10, label: '小药勺', checked: false },
      { id: 11, label: '透析袋', checked: false },
      { id: 12, label: '培养皿', checked: false },
      { id: 13, label: '冰箱', checked: false },
      { id: 14, label: '烧杯', checked: false },
      { id: 15, label: '研体', checked: false },
      { id: 16, label: '筛网', checked: false },
      { id: 17, label: '量筒', checked: false },
      { id: 18, label: '滴管', checked: false },
])

//8个常用试剂
const reagent1 = ref(false);
const reagent2 = ref(false);
const reagent3 = ref(false);
const reagent4 = ref(false);
const reagent5 = ref(false);
const reagent6 = ref(false);
const reagent7 = ref(false);
const reagent8 = ref(false);

//12个实验仪器
const experiment1 = ref(false);
const experiment2 = ref(false);
const experiment3 = ref(false);
const experiment4 = ref(false);
const experiment5 = ref(false);
const experiment6 = ref(false);
const experiment7 = ref(false);
const experiment8 = ref(false);
const experiment9 = ref(false);
const experiment10 = ref(false);
const experiment11 = ref(false);
const experiment12 = ref(false);
const experiment13 = ref(false);
const experiment14 = ref(false);
const experiment15 = ref(false);

const onChange_instrument =(tagId)=>{
  // // 翻转该标签项的 checked 值
  tagItems.value[tagId-1].checked = !tagItems.value[tagId-1].checked;
  // console.log(tagId)
  let result = false;
  for (let i = 0; i < tagItems.value.length; i++) {
    const item = tagItems.value[i].checked;
    // console.log(item); // 在每次循环中处理 item 的值
    // 进行逻辑或操作
    result = result || item;
  }
  if(result){
    list_item.value[0].value = true;
  }else{
    list_item.value[0].value = false;
  }
}


const onChange_reagent = (status) => {
  if (status === "reagent1") {
    // 处理 checked1 的状态变化
    reagent1.value = !reagent1.value;
  } else if (status === "reagent2") {
    // 处理 checked2 的状态变化
    reagent2.value = !reagent2.value;
  } else if (status === "reagent3") {
    reagent3.value = !reagent3.value;
  } else if (status === "reagent4") {
    reagent4.value = !reagent4.value;
  } else if (status === "reagent5") {
    reagent5.value = !reagent5.value;
  } else if (status === "reagent6") {
    reagent6.value = !reagent6.value;
  } else if (status === "reagent7") {
    reagent7.value = !reagent7.value;
  } else if (status === "reagent8") {
    reagent8.value = !reagent8.value;
  }
  if (
    reagent1.value ||
    reagent2.value ||
    reagent3.value ||
    reagent4.value ||
    reagent5.value ||
    reagent6.value ||
    reagent7.value ||
    reagent8.value
  ) {
    list_item.value[1].value = true;
  } else list_item.value[1].value = false;
};

const onChange_experiment = (status) => {
  if (status === "experiment1") {
    // 处理 checked1 的状态变化
    experiment1.value = !experiment1.value;
  } else if (status === "experiment2") {
    // 处理 checked2 的状态变化
    experiment2.value = !experiment2.value;
  } else if (status === "experiment3") {
    experiment3.value = !experiment3.value;
  } else if (status === "experiment4") {
    experiment4.value = !experiment4.value;
  } else if (status === "experiment5") {
    experiment5.value = !experiment5.value;
  } else if (status === "experiment6") {
    experiment6.value = !experiment6.value;
  } else if (status === "experiment7") {
    experiment7.value = !experiment7.value;
  } else if (status === "experiment8") {
    experiment8.value = !experiment8.value;
  } else if (status === "experiment9") {
    experiment9.value = !experiment9.value;
  } else if (status === "experiment10") {
    experiment10.value = !experiment10.value;
  } else if (status === "experiment11") {
    experiment11.value = !experiment11.value;
  } else if (status === "experiment12") {
    experiment12.value = !experiment12.value;
  } else if (status === "experiment13") {
    experiment13.value = !experiment13.value;
  } else if (status === "experiment14") {
    experiment14.value = !experiment14.value;
  } else if (status === "experiment15") {
    experiment15.value = !experiment15.value;
  }
  if (
    experiment1.value ||
    experiment2.value ||
    experiment3.value ||
    experiment4.value ||
    experiment5.value ||
    experiment6.value ||
    experiment7.value ||
    experiment8.value ||
    experiment9.value ||
    experiment10.value ||
    experiment11.value ||
    experiment12.value ||
    experiment13.value ||
    experiment14.value ||
    experiment15.value
  ) {
    list_item.value[2].value = true;
  } else list_item.value[2].value = false;
};

watchEffect(() => {
  list_item_value.value =
    list_item.value[0].value &&
    list_item.value[1].value &&
    list_item.value[2].value;
});
</script>
<template>
  <el-card class="card_father">
    <div class="head">
      <span class="head_text"> Step2：制备模块 </span>
    </div>
    <div class="steps">
      <el-steps :active="active" finish-status="success">
        <el-step
          title="进度 1 (已完成)"
          description="选择不同实验设计优化方法、影响因素(温度、浓度、制备方法等)、水平、指标，设计制剂方案"
        />
        <el-step title="进度 2 (进行中)" description="实验方案制备" />
        <el-step title="进度 3 (未开始)" description="质量指标评估" />
      </el-steps>
    </div>
    <div>
      <el-row type="flex" justify="start">
        <div class="Experimental_theme title">实验设计方案</div>

        <div class="Experimental_theme">
          实验方法：
          <el-select
            v-model="selectedOption_method"
            placeholder="溶剂法"
            class="select"
          >
            <el-option
              v-for="option in options_method"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            ></el-option>
          </el-select>
        </div>
        <div class="Experimental_theme">
          药物名称：
          <el-select
            v-model="selectedOption_drug"
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
        </div>
      </el-row>
    </div>
    <div class="containers">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card class="card">
            <template #header>
              <div class="card-header">
                <span class="card_title_1">实验仪器与试剂选择情况</span>
              </div>
            </template>
            <div class="item_container">
              <div v-for="list in list_item" :key="list.id" class="item">
                <div class="name">{{ list.name }}</div>
                <div :class="!list.value ? 'value' : 'value_color'">
                  {{ list.value ? "✔ 已选择" : "未选择" }}
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="card">
            <template #header>
              <div class="card-header">
                <span class="card_title_1">常用仪器</span>
              </div>
            </template>
            <!-- <div v-for="o in 1" :key="o">
              <el-check-tag
                :checked="checked1"
                class="tag_item"
                @change="onChange_instrument('checked1')"
                >分析天平</el-check-tag
              >
              <el-check-tag
                :checked="checked2"
                class="tag_item"
                @change="onChange_instrument('checked2')"
                >恒温磁力搅拌机</el-check-tag
              >

              <el-check-tag
                :checked="checked3"
                class="tag_item"
                @change="onChange_instrument('checked3')"
                >真空干燥箱</el-check-tag
              >
              <el-check-tag
                :checked="checked4"
                class="tag_item"
                @change="onChange_instrument('checked4')"
                >离心机</el-check-tag
              >
              <el-check-tag
                :checked="checked8"
                class="tag_item"
                @change="onChange_instrument('checked8')"
                >烧杯</el-check-tag
              >
              <el-check-tag
                :checked="checked5"
                class="tag_item"
                @change="onChange_instrument('checked5')"
                >冷冻干燥机</el-check-tag
              >
              <el-check-tag
                :checked="checked6"
                class="tag_item"
                @change="onChange_instrument('checked6')"
                >真空泵</el-check-tag
              >
              <el-check-tag
                :checked="checked7"
                class="tag_item"
                @change="onChange_instrument('checked7')"
                >冰箱</el-check-tag
              >

              <el-check-tag
                :checked="checked9"
                class="tag_item"
                @change="onChange_instrument('checked9')"
                >称量纸</el-check-tag
              >
            </div> -->

            <div>
              <el-check-tag
                v-for="tag in tagItems"
                :key="tag.id"
                :checked="tag.checked"
                class="tag_item"
                @change="onChange_instrument(tag.id)"
              >
                {{ tag.label }}
              </el-check-tag>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="card">
            <template #header>
              <div class="card-header">
                <span class="card_title_1">常用试剂</span>
              </div>
            </template>
            <div v-for="o in 1" :key="o">
              <el-check-tag
                :checked="reagent1"
                class="tag_item"
                @change="onChange_reagent('reagent1')"
                >槲皮素</el-check-tag
              >
              <el-check-tag
                :checked="reagent2"
                class="tag_item"
                @change="onChange_reagent('reagent2')"
                >芹菜素</el-check-tag
              >

              <el-check-tag
                :checked="reagent3"
                class="tag_item"
                @change="onChange_reagent('reagent3')"
                >PVPk300</el-check-tag
              >
              <el-check-tag
                :checked="reagent4"
                class="tag_item"
                @change="onChange_reagent('reagent4')"
                >PEG6000</el-check-tag
              >
              <el-check-tag
                :checked="reagent5"
                class="tag_item"
                @change="onChange_reagent('reagent5')"
                >泊洛沙姆188</el-check-tag
              >
              <el-check-tag
                :checked="reagent6"
                class="tag_item"
                @change="onChange_reagent('reagent6')"
                >无水乙醇</el-check-tag
              >
              <el-check-tag
                :checked="reagent7"
                class="tag_item"
                @change="onChange_reagent('reagent7')"
                >纯化水</el-check-tag
              >
              <el-check-tag
                :checked="reagent8"
                class="tag_item"
                @change="onChange_reagent('reagent8')"
                >DMF有机溶剂</el-check-tag
              >
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-card class="card under-cards">
      <template #header>
        <div class="card-header">
          <span class="card_title_2">实验仪器</span>
        </div>
      </template>
      <div v-for="o in 1" :key="o">
        <el-check-tag
          :checked="experiment1"
          class="tag_item2"
          @change="onChange_experiment('experiment1')"
          >药物称量</el-check-tag
        >
        <el-check-tag
          :checked="experiment2"
          class="tag_item2"
          @change="onChange_experiment('experiment2')"
          >载体称重</el-check-tag
        >

        <el-check-tag
          :checked="experiment3"
          class="tag_item2"
          @change="onChange_experiment('experiment3')"
          >冷冻固化</el-check-tag
        >
        <el-check-tag
          :checked="experiment4"
          class="tag_item2"
          @change="onChange_experiment('experiment4')"
          >真空干燥</el-check-tag
        >
        <el-check-tag
          :checked="experiment5"
          class="tag_item2"
          @change="onChange_experiment('experiment5')"
          >研磨过筛</el-check-tag
        >
        <el-check-tag
          :checked="experiment6"
          class="tag_item2"
          @change="onChange_experiment('experiment6')"
          >搅拌溶解</el-check-tag
        >
        <el-check-tag
          :checked="experiment7"
          class="tag_item2"
          @change="onChange_experiment('experiment7')"
          >冷冻干燥</el-check-tag
        >
        <el-check-tag
          :checked="experiment8"
          class="tag_item2"
          @change="onChange_experiment('experiment8')"
          >加热蒸发</el-check-tag
        >
        <el-check-tag
          :checked="experiment9"
          class="tag_item2"
          @change="onChange_experiment('experiment9')"
          >搅拌均匀</el-check-tag
        >
        <el-check-tag
          :checked="experiment10"
          class="tag_item2"
          @change="onChange_experiment('experiment10')"
          >量取纯水</el-check-tag
        >
        <el-check-tag
          :checked="experiment11"
          class="tag_item2_2"
          @change="onChange_experiment('experiment11')"
          >量取有机溶剂</el-check-tag
        >
      </div>
      <div v-for="o in 1" :key="o">
        <img :src="png1" alt="Image" class="image" />
        <img :src="png1" alt="Image" class="image" />
        <img :src="png3" alt="Image" class="image" />
        <img :src="png4" alt="Image" class="image" />
        <img :src="png5" alt="Image" class="image" />
        <img :src="png6" alt="Image" class="image" />
        <img :src="png7" alt="Image" class="image" />
        <img :src="png8" alt="Image" class="image" />
        <img :src="png8" alt="Image" class="image" />
        <img :src="png10" alt="Image" class="image" />
        <img :src="png10" alt="Image" class="image" />
      </div>
      <div>
        <el-check-tag
          :checked="experiment12"
          class="tag_item3"
          @change="onChange_experiment('experiment12')"
          >超声</el-check-tag
        >
        <el-check-tag
          :checked="experiment13"
          class="tag_item3"
          @change="onChange_experiment('experiment13')"
          >透析</el-check-tag
        >
        <el-check-tag
          :checked="experiment14"
          class="tag_item3"
          @change="onChange_experiment('experiment14')"
          >熔融</el-check-tag
        >
        <el-check-tag
          :checked="experiment15"
          class="tag_item3"
          @change="onChange_experiment('experiment15')"
          >离心</el-check-tag
        >
      </div>
      <img :src="png12" alt="Image" class="image" />
      <img :src="png13" alt="Image" class="image" />
      <img :src="png8" alt="Image" class="image" />
      <img :src="png15" alt="Image" class="image" />
    </el-card>

    <el-row type="flex" justify="start">
      <div class="button_under">
        <el-button type="primary" :disabled="!list_item_value">
          <router-link
            to="/home/preparation_3d"
            class="router-link-no-underline"
          >
            <div class="first" v-show="list_item_value">
              下一步
            </div></router-link
          >
          <div class="first" v-show="!list_item_value">下一步</div>
        </el-button>
      </div>
    </el-row>
  </el-card>
</template>

<style lang="scss" scoped>
.image {
  margin-left: 2px;
  margin-bottom: 5px;
  margin-right: 13px;
}
.image2 {
  margin-left: 10px;
}

.item_container {
  display: flex;
  justify-content: center; /* 水平居中对齐 */
  align-items: center; /* 垂直居中对齐 */
}

.item {
  margin-left: 25px;
  margin-right: 20px;
}

.name {
  // margin-right: 40px;
  font-weight: bold;
  font-size: large;
}

.value {
  margin-top: 10px;
  margin-left: 9px;
  color: red;
}
.value_color {
  margin-top: 10px;
  margin-left: 9px;
  color: green;
}

.card_father {
  width: 99%;
}
.containers {
  margin-top: 10px;
}

.card {
  margin-top: 20px;
  padding: 20px;
  flex: 1; /* 使用flex: 1使两个卡片平分横向空间 */
  height: 210px;
}
.under-cards {
  height: 100%;
}

.card-header {
  text-align: center;
  align-items: center;
  margin-bottom: 1px;
  margin-top: -20px;
}
.Experimental_theme {
  margin-top: 10px;
  margin-right: 180px;
  font-size: large;
}
.title {
  margin-left: 10px;
  font-size: large;
  font-weight: bold;
}
.select {
  margin-left: 10px;
}
.card_title_1,
.card_title_2,
.card_title_3 {
  align-items: center;
  color: #006ac2;
  font-size: 16px;
  font-weight: bold;
}

.tag_item {
  margin-right: 5px;
  margin-bottom: 5px;
}
.tag_item2 {
  margin-right: 25px;
  margin-bottom: 10px;
}
.tag_item2_2 {
  margin-left: -15px;
  margin-bottom: 10px;
}
.tag_item3 {
  margin-right: 32px;
  margin-bottom: 10px;
  margin-left: 20px;
}

.button {
  margin-top: 5px;
  margin-left: 44.5%;
}

.button_under {
  margin-top: 14px;
  margin-left: 46%;
}

.head {
  text-align: center;
  font-size: 30px;
  font-weight: 400;
  margin-bottom: 5px;
  .head_text {
    color: #006ac2;
  }
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
