<script setup>
//2、制备模块--3D演示
import { ref, watchEffect, reactive, onBeforeUnmount, onMounted } from "vue";
import video from "../assets/video/video2.mp4";
//审核进度
const active = ref(1);
const video_src =ref("https://aliyun.oss.careyshop.cn/uploads/files/20191113/9bbf7ac9-a452-445b-8152-4443bc3505e8.mp4?type=aliyu")
// const posterImage = ref("@/assets/1.PNG");
// const videoSource = ref("../assets/video.mp4");
// const isPlaying = ref(false);
</script>
<template>
  <el-card class="card_father">
    <div class="head">
      <span class="head_text"> Step2：制备模块(3D演示)</span>
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
  </el-card>

  <div class="video-container">
    <el-card class="card-content" style="transform: scale(1.05)">
      <template #header>
        <div class="card-header">
          <span>3D演示</span>
        </div>
      </template>
      <video
        id="fullscreen-video"
        controls
        autoplay
        muted
        :src=video
      ></video>

      <el-row type="flex" justify="start">
        <div class="button_under">
          <el-button type="primary">
            <router-link to="/home/evaluate" class="router-link-no-underline">
              <div class="first">下一步</div></router-link
            >
          </el-button>
        </div>
      </el-row>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.video-container {
  margin-top: 2%;
  display: flex;
  justify-content: center;
  video {
    max-width: 100%;
  }
}

.card-header {
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  text-align: center;
  font-size: 20px;
  border-radius: 4px 4px 0 0;
}

.card-content {
  position: relative;
  overflow: hidden;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
}

.card-content video {
  width: 100%;
  height: auto;
  object-fit: cover;
  filter: brightness(80%);
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

.button_under {
  margin-top: 5px;
  margin-left: 42%;
}
</style>
