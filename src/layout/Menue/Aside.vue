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
        { title: "实验展示", icon: "SetUp", url: "/home/demonstration" },
        { title: "结果评估", icon: "HomeFilled", url: "/home/result" },
        // { title: "制备模块", icon: "Filter", url: "/home/preparation" },
        { title: "种子调度", icon: "Platform", url: "/home/preparation_3d" },
        { title: "变异调度", icon: "Platform", url: "/home/preparation_3d" },
        // { title: "实验评估", icon: "PieChart", url: "/home/evaluate" },
      ],

      user_name: "",
      user_partment_category: "",
      user_partment_id: "",
    };
  },
};
</script>

<style lang="scss" scoped></style>
