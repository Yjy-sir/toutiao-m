<template>
  <div class="search-container">
    <!-- 搜索框 -->
    <form action="/" class="search-from">
      <van-search
        v-model="searchText"
        background="#008c8c"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResult = false"
      />

      <!-- 搜索结果 -->
      <searchresult v-if="isResult" :searchText="searchText"></searchresult>

      <!-- 联想建议 -->
      <searchsuggestion
        v-else-if="searchText"
        :searchText="searchText"
        @seace="onSearch"
      ></searchsuggestion>

      <!-- 搜索历史 -->
      <searchhistory
        v-else
        :searchistorries="searchistorries"
        @delectall="searchistorries = []"
        @search="onSearch"
      ></searchhistory>
    </form>
  </div>
</template>

<script>
import searchhistory from "./components/search-history.vue";
import searchsuggestion from "./components/search-suggestion.vue";
import searchresult from "./components/search-result.vue";
import { getItem, setItem } from "../../utils/storage";
export default {
  name: "Searchindex",
  components: {
    searchhistory,
    searchsuggestion,
    searchresult,
  },
  data() {
    return {
      isResult: false,
      searchText: "",
      searchistorries: getItem('searchistorries')|| [] // 历史记录的数据
    };
  },
  methods: {
    onSearch(val) {
      this.searchText = val;

      const index = this.searchistorries.indexOf(val);
      if (index !== -1) {
        this.searchistorries.splice(index, 1);
      }
      this.searchistorries.unshift(val);

      this.isResult = true;
    },
    onCancel() {
      this.$router.back();
    },
  },
  watch: {
    searchistorries(val) {
      setItem("searchistorries", val);
    },
  },
};
</script>

<style scoped lang="less">
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-from {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
