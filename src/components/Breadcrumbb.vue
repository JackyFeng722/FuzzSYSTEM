<script setup>
//导航栏标签tag
import { useRoute, useRouter } from "vue-router";
import { watch, ref } from "vue";
const route = useRoute();
const breadcrumbList = ref([]);
const router = useRouter();
const breadcrumbList_router = ref([]);
const initBreakcrumbList = () => {
  breadcrumbList.value = route.matched; //完整路由表
  breadcrumbList_router.value = router.matched;
  // console.log(" breadcrumbList.value:", breadcrumbList.value);
  // console.log("路由表route.matched：", route.matched);
  // console.log("路由表route.path", route.path);
  // console.log("路由表route.name", route.name);
  // console.log("路由表route.matched：", route.matched);
  // console.log("路由表route.matched.path：", route.matched[1].path);
  // console.log("路由表route.path：", route.path);
  //console.log("路由表route.name:", route.name);
};
var tags = ref([
  //需要内存
  {
    name: "首页",
    path: "/home/hall",
  },
  // {
  //   name: "修改密码",
  //   path: "/home/modify_password",
  //   title: "修改密码",
  // },
]);

const monitor = () => {
  for (var i = 0; i < tags.value.length; i++) {
    if (tags.value[i].name === breadcrumbList.value[1].name) {
      //找到
      // console.log("找到数据:", i); //不操作,立刻停下
      // console.log("name：", tags.value[i].name);
      return;
    }
    if (i == tags.value.length - 1) {
      //到末尾了
      //没找到
      //console.log("没找到:", i); //始终为0
      //console.log("name：", tags.value[i].name);
      //动态添加 tags 路由表
      tags.value.push({
        name: breadcrumbList.value[1].name,
        path: breadcrumbList.value[1].path,
      });
      return;
    }
  }
};
const toLastView = () => {
  const latestView = tags.value.slice(-1)[0];
  //console.log("跳转：", latestView);
  router.push({ path: latestView.path });
};
// tag的关闭是通过手动删除数据实现的
const handleClose = (tag, index) => {
  //console.dir(tag);
  if (index) {
    tags.value.splice(index, 1);
  }
  //关闭后要跳转：判断：是否当前是被关掉的页面
  toLastView();
  // console.log("index:", index);
};

//点击跳转标签页
const clickTags = (item) => {
  router.push({ path: item.path });
};

watch(
  //监听
  route,
  () => {
    initBreakcrumbList();
    // console.log("监听name：", breadcrumbList.value[1].name);
    // console.log("监听path：", breadcrumbList.value[1].path);
    // console.log("开始tags.value.length:", tags.value.length);
    //breadcrumbList.value[1].name
    monitor();
    // console.log("监听响应数据：", tags.value);
    // console.log("最后tags.value.length:", tags.value.length);
  },
  { deep: true, immediate: true }
);
</script>
<template>
  <div class="breadcrumb_all">
    <div class="breadcrumb_front">
      <el-icon style="color: red" :size="13"><LocationInformation /></el-icon>
      当前位置：
    </div>

    <div class="breadcrumb_back">
      <el-breadcrumb separator="/">
        <transition-group name="breadcrumb">
          <el-breadcrumb-item
            v-for="(item, index) in breadcrumbList"
            :key="index"
          >
            <div
              class="no-redirect"
              v-if="index === breadcrumbList / length - 1"
            >
              {{ item.name }}
            </div>
            <div class="redirect" v-else @click="handleRedirect(item.path)">
              {{ item.name }}
            </div>
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
    </div>
  </div>

  <div class="tags">
    <el-tag
      v-for="(item, index) in tags"
      :key="item.path"
      :closable="item.name !== '首页'"
      @click="clickTags(item)"
      @close="handleClose(item, index)"
      size="medium"
      :effect="item.name === route.name ? 'dark' : 'light'"
      class="tags_spacing"
    >
      <div class="tag_div">
        <el-icon :size="9"><HelpFilled /></el-icon> {{ item.name }}
      </div>
    </el-tag>
  </div>
</template>

<style lang="scss" scoped>
.no-redirect {
  color: #97a8be;
  cursor: text;
  font-size: medium;
  margin-top: 3px;
}
.redirect {
  color: #666;
  cursor: text;
  cursor: pointer;
  font-weight: 600;
  font-size: medium;
  padding-top: 3px;

  &:hover {
    color: #304156;
  }
}
.breadcrumb_all {
  position: relative;
  overflow: hidden;
  display: flex;
  border-bottom: 1px solid #f3f4f5;
  // background-color: aqua;
  height: 26px;
  text-align: center;
  // .breadcrumb_front {
  // }
  .breadcrumb_front {
    overflow: hidden;
  }
  .breadcrumb_back {
    font-size: small;
  }
}
.tags {
  overflow: hidden;
  height: 27px;
  padding-top: 5px;
  border-bottom: 2px solid #e7e7e7;
  // cursor: pointer;
  .tag_div {
    padding-right: 1px;
    margin-left: 1px;
  }
  .tags_spacing {
    margin-right: 5px;
    cursor: pointer;
  }
}
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all 0.5s;
}

.breadcrumb-leave-active {
  position: absolute;
}

.app-breadcrumb.el-breadcrumb {
  margin-left: 8px;
}
/* breadcrumb transition */
// .v-enter-active,
// .v-leave-active {
//   transition: all 0.5s;
// }

// .v-enter,
// .v-leave-active {
//   opacity: 0;
//   transform: translateX(20px);
// }

// .v-move {
//   transition: all 0.5s;
// }

// .v-leave-active {
//   position: absolute;
// }
</style>
