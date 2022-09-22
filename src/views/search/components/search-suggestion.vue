<template>
  <div class="search-suggestion">
    <van-cell icon="search" v-for="(obj, index) in suggestions" :key="index">
      <div slot="title" v-html="heightText(obj)" @click="$emit('seace',obj)"></div>
    </van-cell>
  </div>
</template>

<script>
import { loadallposts } from "@/api/user.js";
import { debounce } from "lodash";
export default {
  name: "SearchSuggestion",
  components: {},
  props: {
    searchText: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      suggestions: [],
    };
  },
  computed: {},
  watch: {
    searchText: {
      //searchText 发生变化的 时候就会调用 handler
      // handler(value) {
      //   this.loadSearchSuggestion(value)
      // },
      handler: debounce(function (value) {
        this.loadSearchSuggestion(value);
      }, 300),
      immediate: true, // 该回调将会在监听开始之后立即调用
    },
  },
  created() {},
  mounted() {},
  methods: {
    async loadSearchSuggestion(q) {
      try {
        const { data } = await loadallposts(q);
        this.suggestions = data.data.options;
      } catch {
        this.$toast("获取失败");
      }
    },

    heightText(text) {
      const highlightStr = `<span class='active'>${this.searchText} </span>`;

      const reg = new RegExp(this.searchText, "gi");
      // text.replace(/匹配的内容/gi, highlightStr)
      return text.replace(reg, highlightStr);
    },
  },
};
</script>

<style scoped lang="less">
.search-suggestion {
  /deep/ .active {
    color: pink;
  }
}
</style>
