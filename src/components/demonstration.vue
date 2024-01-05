<script setup>
//1、主页
import { ref, watch, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
const router = useRouter();
const active = ref(0);
//用户定义：
const switch_button = ref(false); //用户开关，默认关闭
const button_status = ref("启动");
const project = ref("size");

//内置参数
const resetProbability = ref(0.85); //新增路径概率因子
const CrashProbability = ref(0.05); //新增崩溃概率因子
const counter = ref(0); //计数器

//相关参数定义：
const run_time = ref(0); //执行时间
const last_new_path = ref(0); //上次的独特路径
const cycles_done = ref(0);
const total_paths = ref(0);
const uniq_crashes = ref(0);
const uniq_hangs = ref(0);
const total_crashes = ref(0);
const last_uniq_crash = ref(0); //"none seen yet"
const last_uniq_hang = ref("none seen yet");
const now_trying = ref("");
const stage_execs_1 = ref(1);
const stage_execs_2 = ref(0);
const total_execs = ref(0);
const exec_speed = ref(0);
const new_edges_on = ref(0);
const favored_paths = ref(0);

onMounted(() => {
  setInterval(() => {
    if (switch_button.value) {
      counter.value++;
      // 每分钟更新重置概率
      if (counter.value % 60 === 0) {
        resetProbability.value -= 0.01; //每分钟重置概率减少1% ，随时间推移越发不可能发现新路径
        CrashProbability.value += 0.02; //每分钟重置概率增加2% ，随时间推移越发可能发现独特崩溃

        if (resetProbability.value <= 0) resetProbability.value = 0.05; //达到阈值即重置概率---新增路径
        if (CrashProbability.value >= 0.5) CrashProbability.value = 0.5; //达到阈值即重置概率---独特崩溃
      }

      if (counter.value % 100 == 0) cycles_done.value++;
      // 重置 last_new_path
      const random_last_new_path = Math.random();
      const random_new_edges_on = Math.random();
      const random_favored_paths = Math.random();
      if (random_last_new_path <= resetProbability.value) {
        last_new_path.value = 0;
        total_paths.value++;
        if (random_new_edges_on <= 0.5) {
          new_edges_on.value++;
        }
        if (random_favored_paths <= 0.8) {
          favored_paths.value++;
        }
      } else {
        last_new_path.value++; //last_new_path每秒加1
      }
      // 重置 last_uniq_crash
      const random_last_uniq_crash = Math.random();

      if (random_last_uniq_crash <= CrashProbability.value) {
        last_uniq_crash.value = 0;
        uniq_crashes.value++;
        total_crashes.value++; //独特崩溃增加，则总崩溃也要先增加一下
        const random_crash_num = Math.floor(Math.random() * 2) + 0;
        total_crashes.value += random_crash_num; //总崩溃= 独特崩溃+ （一个介于 n 和 m 之间（包含 n 和 m）的随机整数）
      } else {
        last_uniq_crash.value++; //last_new_path每秒加1
      }

      run_time.value++; //run_time每秒加1
    }
  }, 1000);

  setInterval(() => {
    if (switch_button.value) {
      const random_now_trying = Math.random();
      if (random_now_trying <= 0.8) {
        now_trying.value = "havoc";
      } else {
        now_trying.value = "splice";
      }
      const random_stage_execs_1 = Math.floor(Math.random() * 9000) + 1000; // stage_execs分母
      const random_stage_execs_2 =
        random_stage_execs_1 - Math.floor(Math.random() * 5000); // stage_execs分子

      const random_total_execs = Math.floor(Math.random() * 2) + 0;
      const random_exec_speed = Math.floor(Math.random() * 1100) + 900;

      if (random_stage_execs_2 < 0) {
        random_stage_execs_2 = 0.3 * random_stage_execs_1;
      }
      stage_execs_1.value = random_stage_execs_1;
      stage_execs_2.value = random_stage_execs_2;
      total_execs.value = total_execs.value + random_total_execs;
      exec_speed.value = random_exec_speed;
    }
  }, 500);
});

const saveDataToLocal = () => {
  if (button_status.value === "启动") {
    switch_button.value = true;
    button_status.value = "关闭";
    ElMessage({
      message: "模糊测试启动",
      type: "success",
    });
  } else {
    button_status.value = "启动";
    switch_button.value = false;
    ElMessage({
      message: "模糊测试暂停",
      type: "warning",
    });
  }
};
</script>
<template>
  <el-card style="width: 99%">
    <div class="head">
      <span class="head_text"> Step1：模糊测试实验流程 </span>
    </div>
    <div class="steps">
      <el-steps :active="active" finish-status="success">
        <el-step title="进度 1 (进行中)" description="配置模糊测试相关参数" />
        <el-step title="进度 2 (未开始)" description="启动模糊测试" />
        <el-step title="进度 3 (未开始)" description="模糊测试实验结果" />
      </el-steps>
    </div>

    <div class="card_container">
      <el-card
        shadow="hover"
        class="fuzzing_card"
        :body-style="{ backgroundColor: '#000' }"
        style="width: 60%"
      >
        <div class="title_container">
          <div class="title">american fuzzy lop&nbsp (DARWIN)&nbsp</div>
          <div class="version">2.57b&nbsp&nbsp</div>
          <div class="program">({{ project }})</div>
        </div>

        <div class="container">
          <div class="left">
            <div class="small_title">
              process timing -------------------------------------
            </div>
            <el-row class="run_time title_container">
              <div class="little_title">run time :</div>
              <div class="content_color">
                {{ Math.floor(run_time / (24 * 60 * 60)) }} days,
                {{ Math.floor(run_time / (60 * 60)) % 24 }} hrs ,
                {{ Math.floor(run_time / 60) % 60 }}
                min , {{ run_time % 60 }} sec
              </div>
            </el-row>
            <el-row class="last_new_path title_container">
              <div class="little_title">last new path :</div>
              <div class="content_color">
                {{ Math.floor(last_new_path / (24 * 60 * 60)) }} days,
                {{ Math.floor(last_new_path / (60 * 60)) % 24 }} hrs ,
                {{ Math.floor(last_new_path / 60) % 60 }}
                min , {{ last_new_path % 60 }} sec
              </div>
            </el-row>
            <el-row class="last_uniq_crash title_container">
              <div class="little_title">last uniq crash :</div>
              <div class="content_color" v-if="uniq_crashes !== 0">
                {{ Math.floor(last_uniq_crash / (24 * 60 * 60)) }} days,
                {{ Math.floor(last_uniq_crash / (60 * 60)) % 24 }} hrs ,
                {{ Math.floor(last_uniq_crash / 60) % 60 }}
                min , {{ last_uniq_crash % 60 }} sec
              </div>
              <div class="content_color" v-else>none seen yet</div>
            </el-row>
            <el-row class="last_uniq_hang title_container">
              <div class="little_title">last uniq hang :</div>
              <div class="content_color">{{ last_uniq_hang }}</div>
            </el-row>
          </div>
          <div class="right">
            <div class="small_title">
              overall results -------------------------------------
            </div>
            <el-row class="cycles_done title_container">
              <div class="little_title">cycles done :</div>
              <div
                class="content_color"
                :style="cycles_done > 0 ? 'color: pink' : ''"
              >
                {{ cycles_done }}
              </div>
            </el-row>
            <el-row class="last_new_path title_container">
              <div class="little_title">total paths :</div>
              <div class="content_color">{{ total_paths }}</div>
            </el-row>
            <el-row class="last_uniq_crash title_container">
              <div class="little_title">uniq crashes :</div>
              <div
                class="content_color"
                :style="uniq_crashes > 0 ? 'color: red' : ''"
              >
                {{ uniq_crashes }}
              </div>
            </el-row>
            <el-row class="last_uniq_hang title_container">
              <div class="little_title">uniq hangs :</div>
              <div class="content_color">{{ uniq_hangs }}</div>
            </el-row>
          </div>
        </div>

        <div class="container">
          <div class="left">
            <div class="small_title">
              cycle progress -------------------------------------
            </div>
            <el-row class="run_time title_container">
              <div class="little_title">now processing :</div>
              <div class="content_color">94 (18.84%)</div>
            </el-row>
            <el-row class="last_new_path title_container">
              <div class="little_title">paths timed out :</div>
              <div class="content_color">0 (0.00%)</div>
            </el-row>
          </div>
          <div class="right">
            <div class="small_title">
              map coverage -------------------------------------
            </div>
            <el-row class="cycles_done title_container">
              <div class="little_title">map density :</div>
              <div class="content_color">0.36% / 1.62%</div>
            </el-row>
            <el-row class="last_new_path title_container">
              <div class="little_title">count coverage :</div>
              <div class="content_color">3.56 bits/tuple</div>
            </el-row>
          </div>
        </div>

        <div class="container">
          <div class="left">
            <div class="small_title">
              stage progress -------------------------------------
            </div>
            <el-row class="now_trying">
              <div class="little_title">now trying :</div>
              <div class="content_color">{{ now_trying }}</div>
            </el-row>
            <el-row class="stage_execs">
              <div class="little_title">stage execs :</div>
              <div class="content_color">
                {{ stage_execs_2 }}/{{ stage_execs_1 }} ({{
                  ((100 * stage_execs_2) / stage_execs_1).toFixed(2)
                }}%)
              </div>
            </el-row>
            <el-row class="total_execs">
              <div class="little_title">total execs :</div>
              <div class="content_color">{{ total_execs }} k</div>
            </el-row>
            <el-row class="exec_speed">
              <div class="little_title">exec speed :</div>
              <div class="content_color">{{ exec_speed }}/sec</div>
            </el-row>
          </div>
          <div class="right">
            <div class="small_title">
              finding in depth -----------------------------------
            </div>
            <el-row class="favored_paths">
              <div class="little_title">favored paths :</div>
              <div class="content_color">
                {{ favored_paths }} ({{
                  ((100 * favored_paths) / total_paths).toFixed(2)
                }}%)
              </div>
            </el-row>
            <el-row class="new_edges_on">
              <div class="little_title">new edges on :</div>
              <div class="content_color">
                {{ new_edges_on }} ({{
                  ((100 * new_edges_on) / total_paths).toFixed(2)
                }}%)
              </div>
            </el-row>
            <el-row class="total_crashes">
              <div class="little_title">total crashes :</div>
              <div
                class="content_color"
                :style="uniq_crashes > 0 ? 'color: red' : ''"
              >
                {{ total_crashes }} ({{ uniq_crashes }} unique)
              </div>
            </el-row>
            <el-row class="total_tmouts">
              <div class="little_title">total tmouts :</div>
              <div class="content_color">0 (0 unique)</div>
            </el-row>
          </div>
        </div>
      </el-card>
    </div>

    <el-row type="flex" justify="start">
      <div class="button">
        <el-button type="primary" @click.stop="saveDataToLocal">
          <!-- <router-link to="/home/preparation" class="router-link-no-underline"  v-show="!button_disable">
            <div class="first">下一步</div></router-link
          > -->
          <div class="first">{{ button_status }}</div>
        </el-button>
      </div>
    </el-row>
  </el-card>
</template>

<style></style>

<style scoped>
.card_container {
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100vh; 可根据需求调整高度 */
}

.content_color {
  color: #fff;
  width: 250px; /* 设置为固定的 300 像素宽度 */
}
.version {
  color: aqua;
}
.program {
  color: greenyellow;
}
.little_title {
  color: darkgrey;
  width: 140px; /* 设置为固定的 300 像素宽度 */
}

.title_container {
  display: flex;
}
.container {
  display: flex;
}
.left {
  flex-grow: 1.5;
  /* background-color: red; */
}

.right {
  flex-grow: 1;
}

.title {
  margin-left: 35%;
  color: #ffa800;
}
.small_title {
  color: aqua;
}

.button {
  margin-top: 15px;
  margin-left: 44.5%;
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
