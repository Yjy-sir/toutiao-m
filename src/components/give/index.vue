<template>
  <!-- 点赞 -->
  <van-button
    :icon="value !== 1 ?  'good-job' : 'good-job-o'"
    @click="gives"
    :loading="loading"
  />
</template>

<script>
import { give, cancel_give } from "../../api/user";
export default {
  data() {
    return {
      loading: false,
    };
  },
  props: {
    value: {
      type: Number,
      redirect: true,
    },
    arcticleId: {
      type: [Number, String],
      redirect: true,
    },
  },
  methods: {
    async gives() {
      this.loading = true;
      let status = -1
      try {
        if (this.value == 1) {
          await cancel_give(this.arcticleId);
          status = 0
        } else {
          await give(this.arcticleId);
          status = 1
        }
        this.$emit("input", status);
        this.$toast.success(this.value == 1? '点赞成功' : '取消点赞')
      } catch (err) {
        this.$toast.fail("点赞失败 请稍后重试");
      }
      this.loading = false;
    },
  },
};
</script>

<style></style>
