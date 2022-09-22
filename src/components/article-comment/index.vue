<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :immediate-check="false"
    @load="onLoad"
  >
    <!-- <comment_item v-for="(item,index) in list" :key="index" :title="item.content" :comment="item" /> -->
    <comment_item
      v-for="(item, index) in list"
      :key="index"
      :comment="item"
      @replayclick="$emit('replyclick', $event)"
    ></comment_item>
  </van-list>
</template>

<script>
import { comment_list } from "@/api/user";
import comment_item from "./comment-item.vue";
export default {
  name: "commemt_list",
  components: {
    comment_item,
  },
  props: {
    commentist: {
      type: [Number, String],
      redirect: true,
    },
    list: {
      type: Array,
      default: () => [],  // 默认写法
    },
    type: {
        type: String,
        default: 'a'
    }
  },
  data() {
    return {
      //   list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
    };
  },
  created() {
    this.loading = true
    this.onLoad();
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await comment_list({
          type: this.type,
          source: this.commentist,
          offset: this.offset,
          limit: this.limit,
        });
        console.log(data);
        const { results } = data.data;
        this.list.push(...results);
        // 总条数
        this.$emit("lists", data.data.total_count);
        this.loading = false;
        if (results.length) {
          this.offset = data.data.last_id;
        } else {
          this.finished = true;
        }
      } catch (err) {
        this.$toast.fail("获取数据失败 请稍后重试");
      }
    },
  },
};
</script>

<style></style>
