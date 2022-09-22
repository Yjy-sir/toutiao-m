<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isnull">
        <span @click="$emit('delectall',[])">全部删除</span>
        &nbsp; &nbsp;
        <span @click="isnull = false">完成</span>
      </div>
      <van-icon name="delete" v-else @click="isnull = true" />
    </van-cell>
    <van-cell
      :title="obj"
      v-for="(obj, index) in searchistorries"
      :key="index"
      @click="delect_list(obj, index)"
    >
      <van-icon name="close" v-show="isnull" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  components: {},
  props: {
    searchistorries: {
      type: Array,
      redirect: true,
    },
  },
  data() {
    return {
      isnull: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    delect_list(item, index) {
      if (this.isnull) {
        this.searchistorries.splice(index, 1);
      } else {
        this.$emit("search", item);
      }
      
    },
  },
};
</script>

<style scoped lang="less"></style>
