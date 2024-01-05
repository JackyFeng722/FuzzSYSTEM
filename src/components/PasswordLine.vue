<script>
export default {
  name: "PasswordLine",
  props: {
    passwordVal: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      bgColor: "",
      tipWord: 22,
    };
  },
  watch: {
    progressPercent(v) {
      if (v === 95) {
        this.bgColor = "#64BC38";
        this.tipWord = "complex ";
      } else if (v === 50) {
        this.bgColor = "#FAAD14";
        this.tipWord = "Medium";
      } else {
        this.bgColor = "#F56C6C";
        this.tipWord = "Simple ";
      }
    },
  },
  computed: {
    showProgress() {
      return this.passwordVal.length >= 8;
    },
    progressPercent() {
      if (!this.passwordVal) return 0;
      // n:数字  l:小写字母  u:大写字母  s:特殊字符
      const result = this.passwordVal
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

      const len = this.passwordVal.length;
      const zCount = this.zeroCount(arr)["0"];

      if (len >= 8) {
        if (!zCount) {
          return 95;
        } else if (zCount === 1 || zCount === 2) {
          return 50;
        } else {
          return 28;
        }
      }
    },
  },
  methods: {
    zeroCount(arr) {
      return arr.reduce((prev, next) => {
        prev[next] = prev[next] + 1 || 1;
        return prev;
      }, {});
    },
  },
};
</script>
<template>
  <div class="line-container" v-show="showProgress">
    <!-- <div
      class="line"
      :style="{
        width: `${progressPercent}%`,
        background: bgColor,
      }"
    ></div> -->
    <div
      class="tipWord"
      :style="{ color: bgColor, fontWeight: 'bold', fontSize: 18 + 'px' }"
    >
      {{ tipWord }}
    </div>
  </div>
</template>

<style scoped>
.line-container {
  position: relative;
  top: -10px;
}
.line-container,
.line {
  margin-top: 9px;
  background: #d9dae0;
  height: 8px;
  border-radius: 4px 5px 5px 4px;
}
.tipWord {
  width: 30px;
  position: absolute;
  left: 0;
  top: 4px;
}
</style>
