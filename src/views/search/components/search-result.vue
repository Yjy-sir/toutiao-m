<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item, index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { allpostsearch } from "@/api/user.js";
export default {
  name: "SearchResult",
  components: {},
  props: {
    searchText: {
      type: String,
      redirect: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        const { data } = await allpostsearch({
          page: this.page, // 页数
          per_page: 20, // 数据条数
          q: this.searchText, // 搜索关键字
        });
        console.log(data);
        const { results } = data.data;
        this.list.push(...results);

        this.loading = false

        if( results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch {
        this.$toast("数据获取失败 请稍后重试");
      }
      // // 异步更新数据
      // // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1)
      //   }

      //   // 加载状态结束
      //   this.loading = false

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true
      //   }
      // }, 1000)
    },
  },
};
</script>

<style scoped lang="less"></style>
