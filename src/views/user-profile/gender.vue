<template>
  <div class="usergender">
    <van-picker
      :default-index="value"
      title="标题"
      show-toolbar
      :columns="columns"
      @cancel="$emit('close')"
      @confirm="confirm"
      @change="onChange"
    />

    <!-- @confirm="onConfirm"
      @cancel="onCancel"
      @change="onChange" -->
  </div>
</template>

<script>
import { updateuser } from "@/api/user.js";
export default {
  name: "usergenders",
  data() {
    return {
      columns: ["男", "女"],
      datas: this.value,
    };
  },
  props: {
    value: {
      type: Number,
      redirect: true,
    },
  },
  methods: {
    async confirm() {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true, // 禁止背景点击
        duration: 0, // 持续展示
      });
      try {
        await updateuser({
          gender: this.datas,
        });
        this.$emit("input", this.datas);
        this.$emit("close");
        this.$toast.success("修改成功");
      } catch (err) {
        console.log(err);
        this.$toast.fail("更新失败 请稍后重试");
      }
    },
    onChange(picker, value, index) {
      this.datas = index
    },
  },
};
</script>

<style></style>
