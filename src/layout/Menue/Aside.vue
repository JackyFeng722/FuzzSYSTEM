<template>
  <div class="menu">
    <el-aside class="aside-style">
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true"
      >
        <el-menu-item :index="v.url" v-for="(v, index) in items_a" :key="v.url">
          <el-icon>
            <component :is="items_a[index].icon"></component>
          </el-icon>

          <span slot="title">{{ v.title }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user_authority: "访客",
      items_a: [
        {
          title: "数据集选择界面",
          icon: "Platform",
          url: "/home/DatasetChoice",
        },
        {
          title: "训练参数设置界面",
          icon: "SetUp",
          url: "/home/TrainingSet",
        },
        {
          title: "生成策略和采样选择",
          icon: "Files",
          url: "/home/GenerateSample",
        },
        {
          title: "测试用例生成界面",
          icon: "DocumentCopy",
          url: "/home/TestcaseGeneration",
        },
        {
          title: "被测程序选择界面",
          icon: "Pointer",
          url: "/home/ChoiceProject",
        },

        {
          title: "覆盖率分析界面",
          icon: "DataAnalysis",
          url: "/home/CoverageAnalysis",
        },

        {
          title: "漏洞分析界面",
          icon: "DataAnalysis",
          url: "/home/VulnerabilityAnalysis",
        },

        // { title: "实验展示", icon: "SetUp", url: "/home/demonstration" },
      ],

      user_name: "",
      user_partment_category: "",
      user_partment_id: "",
    };
  },
};
</script>

<style lang="scss" scoped></style>
