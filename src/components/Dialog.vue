<script setup>
//home页面的dialog会话框
import { reactive, ref, defineEmits, defineProps, watch } from "vue";
import { AddData, ModifyData, DeleteData } from "../api/index";
import { ElMessage } from "element-plus";

const origin_name = ref("");
const disabled_authority = ref("false"); //显示权限管理？
// const disabled_data = false;
//表单校验formRef，一定要注册到表单上：ref='formRef'
const formRef = ref(null);
// const dialogVisible = ref(false); //声明：子组件可以调用父组件的方法并且可以传参
const formLabelWidth = "120px"; //用户名称、密码宽度
//表单属性
const form = reactive({
  name: "", //
  password: "",
  authority: "",

  partment_category: "", //党组织类别
  partment_id: "", //党组织编号
  partment_name: "", //党组织名称

  ID: 0, //存储对应对话框栏目的数据id
  delivery: false,
  type: [],
});
//表单校验
const rules = reactive({
  name: [
    {
      required: true,
      message: "请设置用户名",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请设置密码",
      trigger: "blur",
    },
    { min: 4, max: 20, message: "密码长度为4~20", trigger: "blur" },
  ],
  authority: [
    {
      required: true,
      message: "请设置权限",
      trigger: "blur",
    },
    { min: 1, message: "必填项", trigger: "blur" },
  ],
  partment_category: [
    {
      required: true,
      message: "请设置所属党组织类别",
      trigger: "blur",
    },
    { min: 1, message: "必填项", trigger: "blur" },
  ],
  partment_id: [
    {
      required: true,
      message: "请设置所属党组织编号",
      trigger: "blur",
    },
    { min: 1, message: "必填项", trigger: "blur" },
  ],
  partment_name: [
    {
      required: true,
      message: "请设置所属党组织名称",
      trigger: "blur",
    },
    { min: 1, message: "必填项", trigger: "blur" },
  ],
});
//接受父组件数据
const props = defineProps({
  disabled_data: {
    type: Boolean,
    default: "",
    required: true,
  },
  dialogTitle: {
    type: Boolean,
    required: true,
  },
  dialogTableValue: {
    //给form表单的当前响应值赋值
    type: Object,
    default: () => {
      //空对象
    },
  },
});
//监听值的改变情况
watch(
  () => props.dialogTableValue,
  () => {
    //给form表单的当前响应值赋值，用于后面 添加和修改数据库
    console.log(props.dialogTableValue);
    // console.log(
    //   "检测nameprops 和 nameform：",
    //   props.dialogTableValue.name,//之前的数据
    //   form.name //此时为空
    // );
    origin_name.value = form.name = props.dialogTableValue.name;

    form.password = props.dialogTableValue.password;
    form.ID = props.dialogTableValue.id;
    form.authority = props.dialogTableValue.authority;
    form.partment_category = props.dialogTableValue.partment_category;
    form.partment_id = props.dialogTableValue.partment_id;
    form.partment_name = props.dialogTableValue.partment_name;
    // console.log("查看authority：", props.dialogTableValue.authority);
    disabled_authority.value =
      props.dialogTableValue.authority === "管理员" ? true : false;
  },
  { deep: true, immediate: true }
);
//更新modelValue 和 取消操作
const emits = defineEmits(["update:modelValue", "initUserList"]);
const handleClose = () => {
  emits("update:modelValue", false);
  //   emits("initUserList"); //测试
};

//数据库添加数据函数（add、表单校验、消息提示）
const add_data = () => {
  //表单验证:一定要在表单里面有 ref= "formRef"实现表单数据绑定
  formRef.value.validate(async (valid) => {
    console.log(valid);
    if (valid) {
      //后端校验：是否修改成已存在的用户名
      props.dialogTitle === true
        ? AddData({
            name: form.name,
            password: form.password,
            authority: form.authority,
            partment_category: form.partment_category,
            partment_id: form.partment_id,
            partment_name: form.partment_name,
          }).then((res) => {
            if (res.result) {
              handleClose(); //插入完成后关闭
              //message_success(); //消息提示
              setTimeout(() => {
                location.reload();
              }, 1000); //刷新当前页面
              message_success();
            } else {
              message_error();
            }
          })
        : ModifyData({
            origin_name: origin_name.value, //父组件的name，用于对比子组件name
            name: form.name,
            password: form.password,
            id: form.ID,
            authority: form.authority,
            partment_category: form.partment_category,
            partment_id: form.partment_id,
            partment_name: form.partment_name,
          }).then((res) => {
            if (res.result) {
              handleClose(); //插入完成后关闭
              //message_success(); //消息提示
              setTimeout(() => {
                location.reload();
              }, 1000); //刷新当前页面
              message_success();
            } else {
              message_error();
            }
            // console.log("编辑窗口对应的form.authority信息:", form.authority);
          });
    } else {
      console.log("error submit!!");
      return false;
    }
  });
};
//消息提示
const message_success = () => {
  ElMessage({
    message: "用户数据插入成功！！！",
    type: "success",
  });
};
const message_error = () => {
  ElMessage({
    message: "不允许重复添加用户名,数据插入失败！！！",
    type: "error",
  });
};
</script>
//:before-close就是 仅当用户通过点击关闭图标或遮罩关闭生效
<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="dialogTitle"
    width="30%"
    :before-close="handleClose"
    custom-class="my-dialog"
  >
    <template #header>
      <div>
        <div class="titleClass_Dialog" v-if="dialogTitle">
          <el-icon><CirclePlusFilled /></el-icon>&ensp;添加用户
        </div>
        <div class="titleClass_Dialog" v-else="dialogTitle">
          <el-icon><EditPen /></el-icon>&ensp;修改用户
        </div>
      </div>
    </template>
    <el-form :model="form" :rules="rules" ref="formRef">
      <el-form-item label="用户名称" :label-width="formLabelWidth" prop="name">
        <el-input
          v-model="form.name"
          autocomplete="off"
          maxlength="50"
          show-word-limit
        />
      </el-form-item>

      <el-form-item
        label="用户密码"
        :label-width="formLabelWidth"
        prop="password"
      >
        <el-input
          v-model="form.password"
          autocomplete="off"
          maxlength="50"
          show-word-limit
        />
      </el-form-item>

      <el-form-item
        label="权限管理"
        :label-width="formLabelWidth"
        prop="authority"
      >
        <el-select
          v-model="form.authority"
          placeholder="权限管理"
          :disabled="disabled_authority"
        >
          <!-- <el-option label="管理员" value="管理员" /> -->
          <el-option label="审核员" value="审核员" />
          <el-option label="用户" value="用户" />
        </el-select>
      </el-form-item>

      <el-form-item
        label="党组织类别"
        :label-width="formLabelWidth"
        prop="partment_category"
      >
        <el-select
          v-model="form.partment_category"
          placeholder="党组织类别"
          :disabled="disabled_data"
        >
          <!-- <el-option label="管理员" value="管理员" /> -->
          <el-option label="1（二级党组织）" value="1" />
          <el-option label="2（职能部门支部）" value="2" />
        </el-select>
      </el-form-item>

      <el-form-item
        label="党组织编号"
        :label-width="formLabelWidth"
        prop="partment_id"
      >
        <el-input
          v-model="form.partment_id"
          autocomplete="off"
          maxlength="50"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="党组织名称"
        :label-width="formLabelWidth"
        prop="partment_name"
      >
        <el-input
          v-model="form.partment_name"
          autocomplete="off"
          maxlength="50"
          show-word-limit
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="add_data">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss">
.el-button--text {
  margin-right: 15px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
.titleClass_Dialog {
  font-size: 20px;
}
.el-dialog__header {
  margin-right: -1px;
  position: relative;

  background-color: #3e97df;
  color: azure;
  font-size: 30px;

  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
}
.my-dialog {
  //用于设置对话框圆角
  // background-color: #000;95,147,249
  //background: rgba(157, 178, 241, 0.9) !important; //弹出层透明
  //background: rgba(0, 0, 0, 0);
  border-radius: 15px;
}

.el-form-item .el-select {
  width: 100%;
}
</style>
