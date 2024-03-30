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
            <span class="label">step 2</span>
            <span class="header-label">训练参数设置界面</span>
            <div class="card-header-tag-green"></div>
          </div>
        </template>

        <div class="buttons">
          <div class="column">
            <div class="row">
              <el-button
                type="primary"
                plain
                style="
                  width: 150px;
                  margin-top: 10px;
                  font-size: 22px;
                  height: 40px;
                "
                >epoch</el-button
              >
              <el-input
                v-model="input"
                style="
                  width: 150px;
                  height: 40px;
                  margin-top: 10px;
                  margin-left: 20px;
                "
                placeholder="当前轮数"
              />
              <el-button
                type="info"
                plain
                style="
                  width: 20px;
                  margin-top: 10px;
                  margin-left: 1px;
                  font-size: 22px;
                  height: 40px;
                "
                >轮</el-button
              >
            </div>
            <div class="row">
              <el-button
                type="success"
                plain
                style="
                  width: 150px;
                  margin-top: 10px;
                  font-size: 22px;
                  height: 40px;
                "
                >初始学习率</el-button
              >
              <el-input
                v-model="input"
                style="
                  width: 150px;
                  height: 40px;
                  margin-top: 10px;
                  margin-left: 20px;
                "
              />
              <el-button
                type="info"
                plain
                style="
                  width: 20px;
                  margin-top: 10px;
                  margin-left: 1px;
                  font-size: 22px;
                  height: 40px;
                "
                >%</el-button
              >
            </div>
            <div class="row">
              <el-button
                type="danger"
                plain
                style="
                  width: 150px;
                  margin-top: 10px;
                  font-size: 22px;
                  height: 40px;
                "
                >丢弃率</el-button
              >
              <el-input
                v-model="input"
                style="
                  width: 150px;
                  height: 40px;
                  margin-top: 10px;
                  margin-left: 20px;
                "
              />
              <el-button
                type="info"
                plain
                style="
                  width: 20px;
                  margin-top: 10px;
                  margin-left: 1px;
                  font-size: 22px;
                  height: 40px;
                "
                >%</el-button
              >
            </div>

            <div class="row">
              <el-button
                type="warning"
                plain
                style="
                  width: 150px;
                  margin-top: 10px;
                  font-size: 22px;
                  height: 40px;
                "
                >batch size</el-button
              >
              <el-input
                v-model="input"
                style="
                  width: 150px;
                  height: 40px;
                  margin-top: 10px;
                  margin-left: 20px;
                "
              />
            </div>

            <div class="row">
              <el-button
                type="warning"
                plain
                style="
                  width: 150px;
                  margin-top: 10px;
                  font-size: 22px;
                  height: 40px;
                "
                >训练数据量</el-button
              >
              <el-input
                v-model="input"
                style="
                  width: 150px;
                  height: 40px;
                  margin-top: 10px;
                  margin-left: 20px;
                "
              />
            </div>

            <el-button
              type="danger"
              plain
              icon="Check"
              circle
              style="
                width: 100px;
                margin-top: 30px;
                margin-left: 110px;
                font-size: 22px;
                height: 50px;
              "
              >确定</el-button
            >
          </div>
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
