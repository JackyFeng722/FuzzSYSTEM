<script>
export default {
  data() {
    return {
      nowDate: null, //存放年月日变量
      nowTime: null, //存放时分秒变量
      timer: "", //定义一个定时器的变量
      currentTime: new Date(), // 获取当前时间
    };
  },
  created() {
    this.timer = setInterval(this.getTime, 1000);
  },
  methods: {
    getTime() {
      const date = new Date(); //对象
      const year = date.getFullYear(); //年
      const month = date.getMonth() + 1; //月
      const day = date.getDate(); //日
      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();
      const str = "";
      if (this.hour > 12) {
        this.hour -= 12;
        this.str = " AM";
      } else {
        this.str = " PM";
      }
      this.month = check(month); //汉字化 01月
      this.day = check(day); //
      this.hour = check(hour);
      this.minute = check(minute);
      this.second = check(second);
      function check(i) {
        const num = i < 10 ? "0" + i : i;
        return num;
      }
      this.nowDate = year + "年" + this.month + "月" + this.day + "日"; //拼接
      this.nowTime =
        this.hour + ":" + this.minute + ":" + this.second + this.str;
    },
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除定时器
    }
  },
};
</script>
<template>
  <div>{{ nowDate }}&nbsp;{{ nowTime }}</div>
</template>
