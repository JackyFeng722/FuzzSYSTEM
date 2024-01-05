<script setup>
//用户信息管理界面 home主页
//管理员专用：管理表
import { ref } from "vue";
import { Delete, Edit, Search, Share, Upload } from "@element-plus/icons-vue";
import Dialog from "../components/Dialog.vue";
import { getData, SearchName, DeleteData } from "../api/index";
import { isNull } from "../utils/filter";
import { ElMessage, ElMessageBox } from "element-plus";

//对话框相关属性,dialogTitle为标题字符串类型
const dialogVisible = ref(false);
const dialogTitle = ref(false);
const dialogTableValue = ref({});
const tpye_color = ref("primary");
//引入禁止input
var disabled_data = ref();
//表格加载动画
const loading = ref(true);
//表格数据接收数组
const tableData = ref([]);
//当前页面的一些属性
//注意：响应式代理ref中的数据想要被获取就需要 访问 queryfrom.value.属性
const queryfrom = ref({
  query: "", //搜索栏--账号
  query_partment_id: "", //搜索栏--党组织编号
  query_partment_name: "", //搜索栏--党组织名称

  pagenum: 1, //当前页数
  pagesize: 12, //每页显示条目数
});
const total = ref(0);
//显示表格页面;
getData().then((res) => {
  if (res.result) {
    setTimeout(() => {
      loading.value = false;
    }, 300); //刷新当前页面
    // console.log("后端数据：", res.data);
    tableData.value = res.data;
    total.value = res.data.length;
  }
});

// const showdata = () => {
//   getData().then((res) => {
//     console.log("得到数据：", res.data);
//     tableData.value = res.data;
//     total.value = res.data.length;
//     console.log("数据tableData.value：", tableData.value);
//     console.log("数据total.value：", total.value);
//   });
//   alert("相应");
// };
//搜索框查询数据1
const searchdata = () => {
  SearchName({
    name: queryfrom.value.query,
    partment_id: null,
    partment_name: null,
  }).then((res) => {
    // console.log("前端发送数据：", queryfrom.value.query);
    //搜素结果提示信息
    if (res.result) {
      tableData.value = res.data;
      total.value = res.data.length;
      message_success();
    } else {
      message_failure();
    }
  });
};
//搜索框查询数据2
const searchdata2 = () => {
  SearchName({
    name: null,
    partment_id: queryfrom.value.query_partment_id,
    partment_name: null,
  }).then((res) => {
    //搜素结果提示信息
    if (res.result) {
      tableData.value = res.data;
      total.value = res.data.length;
      message_success();
    } else {
      message_failure();
    }
  });
};
//搜索框查询数据3
const searchdata3 = () => {
  SearchName({
    name: null,
    partment_id: null,
    partment_name: queryfrom.value.query_partment_name,
  }).then((res) => {
    //搜素结果提示信息
    if (res.result) {
      tableData.value = res.data;
      total.value = res.data.length;
      message_success();
    } else {
      message_failure();
    }
  });
};

//获取现在是第几页
const handleSizeChange = (pageSize) => {
  queryfrom.value.pagenum = 1; //到第一页
  queryfrom.value.pagesize = pageSize; //每页下拉显示数据
};
//每页获取有多少条数据
const handleCurrentChange = (pageNum) => {
  queryfrom.value.pagenum = pageNum; ///点击第几页
};
//button触发 对话框 相关
const handleDialogValue = (row) => {
  if (isNull(row)) {
    dialogTitle.value = true; //添加用户 为true
    disabled_data.value = false; //会话框党组织类别   :disabled='disabled_data' 启动禁用
    dialogTableValue.value = {};
  } else {
    dialogTitle.value = false; //编辑用户 为 false
    disabled_data.value = true; //会话框党组织类别   :disabled='disabled_data' 启动禁用
    //新功能：超级管理员隐藏权限

    dialogTableValue.value = JSON.parse(JSON.stringify(row));
  }
  dialogVisible.value = true;
  // console.log("对话框：", dialogVisible.value);
};
//删除操作
const deleteDialogValue = (row) => {
  ElMessageBox.confirm("将删除用户账号信息，是否继续?", "警告", {
    confirmButtonText: "是",
    cancelButtonText: "否",
    type: "warning",
  })
    .then(async () => {
      DeleteData({
        id: row.id,
        partment_category: row.partment_category, //选择 用户表格（职能部门 or 二级党组织）
      }).then((res) => {
        if (res.result) {
          // console.log("row.id值：", row.id);
          setTimeout(() => {
            location.reload();
          }, 1000); //刷新当前页面
          ElMessage({
            type: "success",
            message: "删除成功",
          });
        }
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除",
      });
    });
};

// 单元格:状态列字体颜色
const cellStyle = ({ row, column, rowIndex, columnIndex }) => {
  if (
    columnIndex === 3 &&
    (row.authority === "管理员" || row.authority === "超级管理员")
  ) {
    tpye_color.value = "success";

    return { "font-size": "14px" };
  }
  if (columnIndex === 3 && row.authority === "审核员") {
    return { "font-size": "14px" };
  }
  if (columnIndex === 3 && row.authority === "用户") {
    return { "font-size": "14px" };
  }
};

//消息提示
const message_success = () => {
  ElMessage({
    message: "数据搜索完成！！！",
    type: "success",
  });
};
const message_failure = () => {
  ElMessage({
    message: "搜索结果为空！",
    type: "error",
  });
};
</script>
<template>
  <el-card>
    <div class="title">用户信息管理表</div>
    <el-row :gutter="20">
      <el-col :span="5">
        <el-input
          v-model="queryfrom.query"
          placeholder="请输入搜索的账号名称"
          clearable
          @keyup.enter.native="searchdata()"
        ></el-input>
      </el-col>
      <el-button type="primary" :icon="Search" @click="searchdata()"
        >搜索</el-button
      >
      <el-col :span="5">
        <el-input
          v-model="queryfrom.query_partment_id"
          placeholder="请输入搜索的党组织编号"
          clearable
          @keyup.enter.native="searchdata2()"
        ></el-input>
      </el-col>
      <el-button type="primary" :icon="Search" @click="searchdata2()"
        >搜索</el-button
      >
      <el-col :span="5">
        <el-input
          v-model="queryfrom.query_partment_name"
          placeholder="请输入搜索的党组织名称"
          clearable
          @keyup.enter.native="searchdata3()"
        ></el-input>
      </el-col>
      <el-button type="primary" :icon="Search" @click="searchdata3()"
        >搜索</el-button
      >
      <el-button type="success" :icon="Edit" @click="handleDialogValue()"
        >添加用户</el-button
      >
    </el-row>

    <el-table
      :data="
        tableData.slice(
          //分页需要对表格进行处理，很重要
          (queryfrom.pagenum - 1) * queryfrom.pagesize,
          queryfrom.pagenum * queryfrom.pagesize
        )
      "
      stripe
      style="width: 100%"
      :header-cell-style="{
        'font-size': '16px',
      }"
      v-loading="loading"
      element-loading-text="Loading..."
      :cell-style="cellStyle"
    >
      <!-- prop用于与子组件Dialog.vue 相关属性 传递信息 -->
      <el-table-column
        label="索引号"
        align="center"
        fixed="left"
        width="100"
        type="index"
        :index="
          (index) => {
            return index + 1 + (queryfrom.pagenum - 1) * queryfrom.pagesize;
          }
        "
      ></el-table-column
      >/>

      <el-table-column prop="name" label="账号" width="180" align="center">
        <!-- <template #default="scope">
          <el-tag>{{ scope.row.name }}</el-tag>
        </template> -->
      </el-table-column>

      <el-table-column
        prop="password"
        label="密码"
        width="200"
        align="center"
      />
      <el-table-column
        prop="authority"
        label="权限"
        width="180"
        align="center"
        sortable
      >
        <template #default="scope">
          <el-tag
            :type="
              scope.row.authority == '管理员'
                ? 'warning'
                : scope.row.authority == '审核员'
                ? 'success'
                : scope.row.authority == '用户'
                ? ''
                : 'danger'
            "
            v-show="scope.row.authority !== null"
            effect="plain"
            >{{ scope.row.authority }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="partment_category"
        label="党组织类别"
        width="160"
        align="center"
        sortable
      >
        <template #default="scope">
          <el-tag
            v-show="
              !(
                scope.row.partment_category === null ||
                scope.row.partment_category === '' ||
                scope.row.partment_category === '0'
              )
            "
            >{{ scope.row.partment_category }}</el-tag
          >
        </template>
      </el-table-column>

      <el-table-column
        prop="partment_id"
        label="党组织编号"
        width="180"
        align="center"
        sortable
      >
        <template #default="scope">
          <el-tag
            :type="scope.row.tag === '' ? '' : 'success'"
            v-show="scope.row.partment_id !== null"
            >{{ scope.row.partment_id }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="partment_name"
        label="党组织名称"
        width="210"
        align="center"
        sortable
      >
      </el-table-column>
      <el-table-column prop="option" label="操作" align="center">
        <template #default="{ row }" v-if="true">
          <el-button
            type="primary"
            size="small"
            @click="handleDialogValue(row)"
            :icon="Edit"
            >修改</el-button
          >
          <el-button
            type="danger"
            size="small"
            :icon="Delete"
            :disabled="
              !(row.authority === '审核员' || row.authority === '用户')
            "
            @click="deleteDialogValue(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="queryfrom.pagenum"
      v-model:page-size="queryfrom.pagesize"
      :page-sizes="[2, 5, 8, 12]"
      :small="small"
      :disabled="disabled"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
  <Dialog
    v-model="dialogVisible"
    :dialogTitle="dialogTitle"
    v-if="dialogVisible"
    :dialogTableValue="dialogTableValue"
    :disabled_data="disabled_data"
  ></Dialog>
</template>

<style lang="scss" scoped>
.title {
  font-size: 30px;
  font-weight: 500;
  text-align: center;
  // margin-top: 10px;
  margin-bottom: 20px;
}
</style>
