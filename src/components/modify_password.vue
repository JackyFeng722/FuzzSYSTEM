<script>
import PasswordLine from "./PasswordLine.vue"; // 引入密码复杂度校验组件
import { modify_password } from "../api/index";
export default {
  name: "修改密码",
  components: { PasswordLine },
  data() {
    var validatePass = (rule, value, callback) => {
      const reg =
        /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])[a-zA-Z0-9@#$%^&+=]*$/;
      if (value == "" || value == undefined || value == null) {
        callback();
      } else {
        if (!reg.test(value)) {
          callback(new Error("英文大小写、数字、特殊字符，不低于8位"));
        } else {
          callback();
        }
      }

      //   if (value === "") {
      //     callback(new Error("请输入密码"));
      //   } else {
      //     if (this.ruleForm.checkPass !== "") {
      //       this.$refs.ruleForm.validateField("checkPass");
      //     }
      //     callback();
      //   }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: ["blur", "change"] },
          {
            min: 8,
            max: 20,
            message: "长度在 8 到 20 个字符",
            trigger: "blur",
          },
          {
            // ^(?![A-Za-z0-9]+$)(?![a-z0-9\\W]+$)(?![A-Za-z\\W]+$)(?![A-Z0-9\\W]+$)[a-zA-Z0-9\\W]{8,20}$
          },
        ],
        checkPass: [{ validator: validatePass2, trigger: ["blur", "change"] }],
      },
      percentage: {
        type: Number,
        default: 0,
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          modify_password({
            id: sessionStorage.getItem("user_id"),
            password: this.ruleForm.pass,
            partment_category: sessionStorage.getItem("user_partment_category"),
          }).then((res) => {
            this.$message({
              //消息提示方法：type：success，warning，info，error
              message: "密码修改成功",
              type: "success",
            });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //showProgress() {},
    zeroCount(arr) {
      return arr.reduce((prev, next) => {
        prev[next] = prev[next] + 1 || 1;
        return prev;
      }, {});
    },
    random_data(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
  },
  computed: {
    //方法调用method中的方法
    //计算 进度条长度
    progressPercent() {
      if (!this.ruleForm.pass) return 0; //input 为空就 不显示进度条
      // n:数字  l:小写字母  u:大写字母  s:特殊字符
      const result = this.ruleForm.pass
        .split("")
        .map((val) => val.charCodeAt())
        .reduce(
          (pre, val, index) => {
            if (val < 48) pre.special += 1;
            else if (val < 58) pre.num += 1;
            else if (val < 65) pre.special += 1;
            else if (val < 91) pre.upper += 1;
            else if (val < 97) pre.special += 1;
            else if (val < 123) pre.lower += 1;
            else pre.special += 1;
            return pre;
          },
          { num: 0, lower: 0, upper: 0, special: 0 }
        );

      const arr = Object.values(result);

      const len = this.ruleForm.pass.length; //新密码长度
      const zCount = this.zeroCount(arr)["0"];

      if (len) {
        if (len == 2) return 1;
        if (len == 3) return this.random_data(2, 4);
        if (len == 4) return this.random_data(5, 9);
        if (len == 5) {
          return this.random_data(10, 15);
        }

        if (len == 6) return this.random_data(16, 28);
        if (len == 7) return this.random_data(29, 54);
        if (len >= 8) {
          if (!zCount) {
            return 100;
          } else if (zCount === 1) {
            return 80;
          } else if (zCount === 2) {
            return 65;
          } else {
            return 55;
          }
        }
      }
    },

    //显示进度条
    showProgress() {
      //修改长度
      this.percentage.default = this.progressPercent; //可以修改
      if (this.percentage.default > 0) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
<template>
  <div class="boddy">
    <el-card class="el-card">
      <div class="container">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div class="title">
            <div class="font_title">修改密码</div>
          </div>

          <el-form-item label="新密码" prop="pass" class="item_label">
            <el-tooltip
              popper-class="atooltip"
              placement="right"
              effect="light"
            >
              <template #content>
                长度8~20字符<br />不要使用空格、中文<br />
                包含含数字/英文字母/特殊符号三种组合<br />
                英文字母必须包含大写和小写两种组合
              </template>
              <el-input
                type="password"
                v-model="ruleForm.pass"
                autocomplete="off"
                show-password
                clearable
                placeholder="请输入新密码"
                prefix-icon="Lock"
                maxlength="20"
              ></el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item>
            <password-line :passwordVal="ruleForm.pass"></password-line>
            <div class="demo-all">
              <div class="demo-word" v-show="showProgress">密码强度：</div>
              <div class="demo-progress" v-show="showProgress">
                <el-progress :percentage="percentage.default" />
              </div>
            </div>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass" class="item_label">
            <el-input
              type="password"
              v-model="ruleForm.checkPass"
              autocomplete="off"
              show-password
              clearable
              placeholder="请输入确认密码"
              prefix-icon="Lock"
              maxlength="20"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <div class="button">
              <el-button type="primary" @click="submitForm('ruleForm')"
                >提交</el-button
              >
              <el-button type="warning" @click="resetForm('ruleForm')"
                >重置</el-button
              >
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
  <!-- <div class="demo-progress">
    <el-progress :percentage="progressPercent" />
    <el-progress :percentage="100" :format="format" />
    <el-progress :percentage="100" status="success" />
    <el-progress :percentage="100" status="warning" />
    <el-progress :percentage="50" status="exception" />
  </div> -->
</template>

<style lang="scss" scoped>
.boddy {
  margin-top: 2%;
  width: 50%;
  margin-left: 24%;
  // background-image: url(../assets/part.jpg);
  opacity: 0.89;
}
.container {
  position: relative;
  /* margin-top: 100px; */

  left: 4%;

  padding-top: 20px !important;
  // padding-right: 100px !important;
  // padding: 30px;
  width: 90%;
  height: 260px;
  //border: 2px dashed skyblue;
  border-radius: 20px;
  padding-right: 30px;
  /* background: rgba(157, 178, 241, 0.9) !important; */
  // background: rgba(232, 233, 233, 0.2);
  /* background: #d7e8ec; */
}

.title {
  position: relative;
  // left: 48%;

  font-size: larger;
}
.font_title {
  position: relative;
  font-size: 40px;
  text-align: center;
  margin-bottom: 30px;
  // margin-left: -12px;
  //color: #eaedf1;
  color: #e35452;
  font-weight: 900;
}

.button {
  position: absolute;
  top: 10px;
  left: 27%;
}

.el-card {
  margin: 0 45px;
  border-radius: 25px;
  //background-color: rgba(255, 255, 255, 0.1);
}
.demo-all {
  display: flex;
  width: 300px;
}
.demo-word {
  color: #e6a23c;
  margin-top: -15px;
  font-size: xx-small;
  margin-left: -60px;
}
.demo-progress {
  margin-left: 20px;
}
.demo-progress .el-progress--line {
  margin-top: -5px;
  margin-left: -20px;
  margin-bottom: 12px;
  width: 280px;
}
</style>

<style>
.item_label .el-form-item__label {
  /* color: #eaedf1; */
  color: #409eff;
  font-size: 18px;
}

.atooltip {
  background: #ffffff !important;
  color: black !important;
  /* font-weight: 400; */
  font-size: 12px;
  /* 不加!important不生效 */
  border: 1px solid #7dcaee !important;

  border-radius: 10px;
  /* height: 20px !important;
  line-height: 20px !important;
  padding: 0px 8px !important; */
}
/* //箭头颜色修改 */
/* .el-tooltip__popper .popper__arrow {
  border-width: 6px !important;
  border-color: rgb(7, 44, 76, 0.8) !important;
} */

/* //右箭头 */
/* .el-tooltip__popper[x-placement^="right"].popper__arrow:after {
  border-right-color: #f00505 !important;
}
.el-tooltip__popper[x-placement^="right"].popper__arrow {
  border-right-color: #f00505 !important;
} */
</style>
