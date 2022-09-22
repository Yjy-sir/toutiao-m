<template>
  <div class="post-comment">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="优质评论将会被优先展示"
      show-word-limit
    />
    <van-button
      class="issue"
      type="primary"
      size="small"
      @click="ArticleComments"
      :disabled="!message.length"
      >发布</van-button
    >
  </div>
</template>

<script>
import { Article_Comments } from "@/api/user";
export default {
  name: "PostComment",
  components: {},
  props: {
    targer: {
      type: [Object, Number, String],
      redirect: true,
    },
  },
  data() {
    return {
      message: "",
    };
  },
  inject: {
    type: [Object, Number, String],
    default: null,
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async ArticleComments() {
      try {
        const { data } = await Article_Comments({
          target: this.targer.toString(), //id可以为文章id或评论的id
          content: this.message,
          art_id: this.articleId ? this.articleId.toString() : this.articleId,
        });
        console.log(data);
        // 数据传给父组件
        this.$emit("CommentDates", data.data);

        // 评论列表发布完成之后 清空列表
        this.message = "";
        // console.log(res);
      } catch (err) {
        console.log(err);
        this.$toast.fail("获取失败 请稍后重试");
      }
    },
  },
};
</script>

<style scoped lang="less">
.post-comment {
  display: flex;
  padding: 15px;
  align-items: center;

  .post-field {
    background: #f5f7f9;
    margin-right: 15px;
  }
  .issue {
    background-color: #008c8c;
    width: 100px;
    height: 80px;
  }
}
</style>
