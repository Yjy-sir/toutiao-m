<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="btn"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">{{ article.pubdate }}</div>
          <!-- 模板中的  $event 是事件参数-->
          <FollowUser
            :followed="article.is_followed"
            class="follow-btn"
            :user_id="article.aut_id"
            @update-is_follow="article.is_followed = $event"
          ></FollowUser>
          <!-- <van-button
            v-if="article.is_followed"
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
          > -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="countimgs"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 文章评论列表 -->
        <comment_list
          :commentist="article.art_id"
          :list="commentlist"
          @lists="arr = $event"
          @replyclick="replyclick"
        ></comment_list>

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="ispostshow = true"
            >写评论</van-button
          >
          <van-icon name="comment-o" :info="arr" color="#777" />
          <collect_article
            class="btn-item"
            v-model="article.is_collected"
            :arcticleId="article.art_id"
          ></collect_article>

          <!-- 点赞 -->
          <give v-model="article.attitude" :arcticleId="article.art_id"></give>
          <!-- <van-icon color="#777" name="good-job-o" /> -->
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
        <!-- 发布评论 -->
        <van-popup v-model="ispostshow" position="bottom">
          <comment_post
            :targer="article.art_id"
            @CommentDates="lists"
          ></comment_post>
        </van-popup>
      </div>
      <!-- /加载完成-文章详情 -->
      <!-- 文章评论 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button @click="userarticleparticulars" class="retry-btn"
          >点击重试</van-button
        >
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <!-- 评论 -->
    <van-popup v-model="isreplyshow" position="bottom" style="height: 100%">
      <comment_reply
        v-if="isreplyshow"
        :comment="currebtComment"
        @close="isreplyshow = false"
      ></comment_reply>
    </van-popup>
  </div>
</template>

<script>
import { articleparticulars } from "@/api/user";
import { ImagePreview } from "vant";
import FollowUser from "@/components/follow-user";
import collect_article from "@/components/collect-article";
import give from "@/components/give";
import comment_list from "@/components/article-comment";
import comment_post from "@/components/article-comment/comment-post";
import comment_reply from '@/components/article-comment/comment-reply'
export default {
  name: "ArticleIndex",
  provide: function () {
  return {
    articleId: this.articleId
  }
},
  components: {
    FollowUser,
    collect_article,
    give,
    comment_list,
    comment_post,
    comment_reply
  },
  props: {
    articleId: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      article: [],  // 文章详情
      loading: false,
      errStatus: 0,
      arr: 0,
      ispostshow: false, // 控制弹出层
      commentlist: [], //评论列表
      isreplyshow: false, // 评论回复弹出层
      currebtComment:{} //当前点击的评论项
    };
  },
  computed: {},
  watch: {},
  created() {
    this.userarticleparticulars();
  },
  mounted() {},
  methods: {
    async userarticleparticulars() {
      this.loading = true;
      try {
        const { data } = await articleparticulars(this.articleId);
        console.log(data);
        this.article = data.data;
      } catch {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404;
        }
        this.$toast("文章获取失败 请稍后重试");
      }
      this.loading = false;
      this.$nextTick(() => {
        this.perviewImage();
      });
    },
    perviewImage() {
      const articlecount = this.$refs["countimgs"];
      const arr = articlecount.querySelectorAll("img");
      let newImags = [];
      arr.forEach((item, index) => {
        newImags.push(item.src);
        item.onclick = () => {
          ImagePreview({
            newImags,
            // 起始位置 从 0 开始
            startPosition: index,
          });
        };
      });
    },
    btn() {
      this.$router.back();
    },
    lists (datas) {
      // 关闭弹层
      this.ispostshow = false
      // 评论发布的内容显示到列表顶部
      this.commentlist.unshift(datas.new_obj)
    },
    replyclick (item) {
      console.log(item);
      this.currebtComment = item
      // 评论回复弹出层
      this.isreplyshow = true
    }
  },
};
</script>

<style scoped lang="less">
@import "./github-markdown.css";
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
      // color: #fff;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/ .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
  /deep/ .reply-btn {
    width: 156px;
  }
}
</style>
