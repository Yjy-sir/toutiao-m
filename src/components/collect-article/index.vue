<template>
  <van-button
    :icon="value ? 'star' : 'star-o'"
    :class="{}"
    @click="onCollect"
    :loading="loading"
  />
</template>

<script>
import { collect, cancel_collect } from "@/api/user.js";
export default {
  name: "CollectArtiace",
  data() {
    return {
      loading: false,
    };
  },
  props: {
    value: {
      type: Boolean,
      redirect: true,
    },
    arcticleId: {
        type: [Number,String],
        redirect: true
    }
  },
  methods: {
    async onCollect() {
      this.loading = true;

      try {
        if(this.value) {
            await cancel_collect(this.arcticleId)
        } else {
            await collect(this.arcticleId)
        }
        // 更新视图
        this.$emit('input', !this.value )
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (err) {
        this.$toast.fail("操作失败 请重试");
        console.log(err);
      }
      this.loading = false;
    },
  },
};
</script>

<style scoped lang="less">
    
</style>
