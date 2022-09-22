<template>
  <div class="userbirthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('colse')"
      @confirm="confirm"
    />
  </div>
</template>

<script>
import { updateuser } from "@/api/user.js";
import dayjs from "dayjs";
export default {
  name: "userbirthday",
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value),
    };
  },
  props: {
    value: {
      type: [String, Number, Object],
      redirect: true,
    },
  },
  methods: {
    async confirm() {
      var currentDate = dayjs(this.currentDate).format("YYYY-MM-DD");
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true, // 禁止背景点击
        duration: 0, // 持续展示
      });
      try {
        await updateuser({
          birthday: currentDate,
        });
        this.$emit("input", currentDate);
        this.$emit("close");
        this.$toast.success("修改成功");
      } catch (err) {
        console.log(err);
        this.$toast.fail("更新失败 请稍后重试");
      }
    },
  },
};
</script>

<style></style>
