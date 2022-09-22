<template>
  <div>
    <van-nav-bar title="标题">
      <template #left>
        <van-icon name="cross" @click="$emit('close')" />
      </template>
    </van-nav-bar>

    <div class="scroll-wrap">
      <comment_item :comment="comment"></comment_item>

      <van-cell title="全部回复" />
      <comment_list :commentist="comment.com_id" type="c" :list="commentlist"></comment_list>
    </div>

    <div class="post-wrap">
      <van-button size="small" round class="post-btn" @click="ispostshow = true"
        >写评论</van-button
      >
    </div>

    <van-popup v-model="ispostshow" position="bottom">
      <comment_post
        :targer="comment.com_id"
        @CommentDates="datas"
      ></comment_post>
    </van-popup>
  </div>
</template>

<script>
import comment_item from "./comment-item.vue";
import comment_list from "./index.vue";
import comment_post from "./comment-post.vue";
export default {
  name: "commentReply",
  data() {
    return {
      ispostshow: false,
      commentlist: [],
    };
  },
  props: {
    comment: {
      type: Object,
      redirect: true,
    },
  },
  components: {
    comment_item,
    comment_list,
    comment_post,
  },
  methods: {
    datas(lists) {
      this.comment.reply_count++;

      this.ispostshow = false;

      this.commentlist.unshift(lists.new_obj);
    },
  },
};
</script>

<style lang="less" scoped>
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}

.post-wrap {
  height: 88px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px, solid #d8d8d8;
  .post-btn {
    width: 60%;
  }
}
</style>
