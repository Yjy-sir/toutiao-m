<template>
  <van-button
    v-if="followed"
    :loading="loading"
    class="follow-btn"
    round
    size="small"
    @click="onfollow"
    >已关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="onfollow"
    :loading="loading"
    >关注</van-button
  >
</template>

<script>
import { cancel_attention, attention } from "@/api/user.js";
export default {
  name: "Followuser",
  data() {
    return {
      loading: false,
    };
  },
  props: {
    followed: {
      type: Boolean,
      redirect: true,
    },
    user_id: {
      type: [Number, String, Object],
      redirect: true,
    },
  },
  methods: {
    async onfollow() {
      this.loading = true;
      try {
        if (this.followed) {
          await cancel_attention(this.user_id);
        } else {
          await attention(this.user_id);
        }
        // this.article.is_followed = !this.article.is_followed;
        this.$emit('update-is_follow' , !this.followed)
      } catch (err) {
        let message = "操作失败 请稍后重试";
        if (err.response && err.response.status === 400) {
          message = "您不能关注自己！";
        }
        this.$toast(message);
      }
      this.loading = false;
    },
  },
};
</script>

<style></style>
