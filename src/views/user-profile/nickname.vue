<template>
  <div class="nickname" style="padding: 10px">
    <van-nav-bar
      title="编辑昵称"
      left-text="取消"
      right-text="确定"
      @click-left="btn"
      @click-right="updatas"
    />
    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import { updateuser } from "@/api/user";
export default {
  data() {
    return {
      message: this.value,
    };
  },
  props: {
    value: {
      type: String,
      redirect: true,
    },
  },
  methods: {
    btn() {
      this.$emit("close");
      // this.message = this.value;
    },
    async updatas() {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true, // 禁止背景点击
        duration: 0,    // 持续展示
      });
      try {
        await updateuser({
          name: this.message,
        });
        this.$emit("input", this.message);
        this.$emit("close");
        this.$toast.success('修改成功')
      } catch (err) {
        this.$toast.fail("更新失败 请稍后重试");
        console.log(err);
      }
    },
  },
};
</script>

<style scoped lang="less"></style>
