<script>
//模板主页

import Breadcrumbb from "../components/Breadcrumbb.vue";
import Time from "../components/Time.vue";
import Aside from "../layout/Menue/Aside.vue";
export default {
  data() {
    return {
      user_authority: "访客",

      user_name: "",
      user_partment_category: "",
      user_partment_id: "",
    };
  },
  //初始化data后调用的钩子函数
  created() {
    //取本地数据
    //this.name = getToken('username');//登录时存储name
    var user_authority = (this.user_authority =
      sessionStorage.getItem("user_authority")); //-------------------------获取已存储的用户数据
    this.user_name = sessionStorage.getItem("user_name");
    this.user_partment_category = sessionStorage.getItem(
      "user_partment_category"
    );
    this.user_partment_id = sessionStorage.getItem("user_partment_id");
  },
  components: {
    Time,
    Breadcrumbb,
    Aside,
  },
  methods: {
    logout() {
      //退出登录
      localStorage.clear();
      sessionStorage.clear();
      this.$router.push({ name: "login" });
    },
    home() {
      //主页
      this.$router.push({ name: "首页" });
    },
    modify() {
      //修改密码
      this.$router.push({ name: "实验设计模块" });
    },
  },
};
</script>

<template>
  <div>
    <el-container>
      <el-header>
        <div>
          <span>面向C语言编译器的模糊测试平台</span>
        </div>
        <div>
          <div class="login_date"><Time></Time> &nbsp;</div>
          <div class="login_name">你好，</div>
          <div class="login_logo">欢迎您！</div>
          <el-avatar
            :size="40"
            class="avatar_icon"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          >
          </el-avatar>

          <el-dropdown>
            <div class="dropdown">
              <el-icon
                style="
                  margin-right: 10px;
                  margin-left: -20px;
                  margin-top: 20px;
                  color: #fff;
                "
                ><setting
              /></el-icon>
            </div>
            <template #dropdown>
              <div class="dropdown_body">
                <el-dropdown-menu>
                  <el-dropdown-item @click.native="home"
                    ><el-icon><HomeFilled /></el-icon>我的主页</el-dropdown-item
                  >
                  <el-dropdown-item @click.native="modify"
                    ><el-icon><Briefcase /></el-icon>实验设计</el-dropdown-item
                  >
                </el-dropdown-menu>
              </div>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <el-container>
        <el-aside width="200px"><Aside></Aside></el-aside>
        <el-main>
          <div class="body">
            <div class="table">
              <el-main>
                <Breadcrumbb></Breadcrumbb>
                <RouterView></RouterView
              ></el-main>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.el-header {
  background: linear-gradient(#304156, #304159, #304188);
  height: 70px;
  display: flex;
  justify-content: space-between;
  padding-left: 0px;
  align-items: center;
  color: #fff;
  font-size: 20px;
  div {
    display: flex;
    align-items: center;
    span {
      margin-left: 20px;
    }
  }
}

.el-aside {
  background-color: #304156;
  height: calc(100vh - 70px); // 设置左侧 aside 高度
  width: 200px !important;
  transition: width 0.5s;
}
.el-main {
  padding: 0;

  height: calc(100vh - 70px); // 设置主体 main 高度
}

.home {
  .header {
    position: absolute;
    width: 100%;
    overflow: hidden;
    .el-header {
      background: linear-gradient(#304156, #304159, #304188);
      color: #fff;
      display: flex;
      justify-content: space-between;

      .title {
        overflow: hidden;
        font-size: 24px;
        margin-left: -100px;
        margin-top: 13px;
      }
      .toolbar {
        display: flex;
        // margin-left: 1250px;
      }
    }
  }
  .content {
    position: absolute;
    width: 100%;
    top: 60px;
    bottom: 0;
    .menu {
      .el-aside {
        height: 100%;
      }
      .el-menu {
        height: 100%;
      }
    }
    .body {
      position: relative;
      //控制面包 和 主体
      width: 100%;
      .breadcrumb {
        position: relative;
        margin-top: 20px;
        height: 44px;
        margin-left: 1%;
        width: 89%; //面包屑下划线
      }
      .table {
        overflow: hidden;
        width: 99%;
        margin-left: -0.1%;
      }
    }
  }
}

.login_name_logo {
  margin-top: 20px;
  margin-left: 20px;
  width: 330px;
  display: flex;
  .popover_card {
    margin-right: 8px;
    margin-top: -8px;
    .avatar_icon {
      overflow: hidden;
      cursor: pointer; //经过页面时，鼠标会变成一只手
      :hover {
        transform: scale(1.2, 1.2); //图片按照比例，整体放大了1.2倍
        // transform: scale(2);
      }
    }
  }

  .login_date {
    margin-right: 8px;
    margin-top: 0px;
  }
  .login_name {
    // margin-top: 20px;
    margin-right: 8px;
    color: yellow;
    font-weight: 600;

    .login_logo {
      margin-right: 1px;
    }
  }
}
.dropdown {
  cursor: pointer; //经过页面时，鼠标会变成一只手
  :hover {
    transform: scale(1.1, 1.1); //图片按照比例，整体放大了1.2倍
  }
}

.admin_main {
  color: blue;
  text-align: center;
  display: block;
  padding: 0.6em 1.1em;
  appearance: none;
  border: 0;
}

.card {
  margin-top: -15px;
}

.layout-container-demo {
  /*设置内部填充为0，几个布局元素之间没有间距*/
  padding-left: 0px;

  /*外部间距也是如此设置*/
  margin: 0px;
  /*统一设置高度为100%*/
  height: 100%;
}

._title {
  font-size: 20px;
  margin-left: 0px;
}
.header-png {
  width: 300px;
  margin-left: 1px;
  margin-top: 18px;
  font-size: large;
  .png {
    margin-left: 0px;
    // margin-left: 20%;
    width: 67%;
    height: 100%;
  }
}

.aside-style {
  position: relative;
  width: 100%;
}
</style>
