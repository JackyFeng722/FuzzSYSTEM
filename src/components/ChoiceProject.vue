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
      data: {},
    };
  },
  filters: {},
  computed: {},
  watch: {},
  created() {},
  methods: {},
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
            <span class="label">step 5</span>
            <span class="header-label">被测程序选择界面</span>
            <div class="card-header-tag-green"></div>
          </div>
        </template>

        <div class="mb-4">
          <el-button
            style="
              width: 180px;
              margin-top: 30px;
              margin-left: 2px;
              font-size: 20px;
              height: 40px;
            "
            >编译器选择：</el-button
          >
          <el-button
            type="primary"
            round
            style="
              width: 80px;
              margin-top: 30px;
              margin-left: 10px;
              font-size: 20px;
              height: 40px;
            "
            >GCC7</el-button
          >
          <el-button
            type="success"
            round
            style="
              width: 80px;
              margin-top: 30px;
              margin-left: 10px;
              font-size: 20px;
              height: 40px;
            "
            >GCC8</el-button
          >
          <el-button
            type="info"
            round
            style="
              width: 80px;
              margin-top: 30px;
              margin-left: 10px;
              font-size: 20px;
              height: 40px;
            "
            >GCC9</el-button
          >
          <el-button
            type="warning"
            round
            style="
              width: 80px;
              margin-top: 30px;
              margin-left: 10px;
              font-size: 20px;
              height: 40px;
            "
            >LLVM</el-button
          >
        </div>
        <el-button
          type="danger"
          plain
          icon="Check"
          circle
          style="
            width: 100px;
            margin-top: 30px;
            margin-left: 40%;
            font-size: 22px;
            height: 50px;
          "
          >确定</el-button
        >
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
</style>
<style lang="scss" scoped>
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
