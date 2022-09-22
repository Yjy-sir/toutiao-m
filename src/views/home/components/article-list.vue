<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isRefreshLoading"
      :success-text="refreshSuccessText"
      :success-duration="1500"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="(item, index) in list"
          :key="index"
          :title="item.title"
        /> -->

        <itemuser v-for="(item, index) in list" :key="index" :article="item"/>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { setarticle } from "@/api/user";
import itemuser from "@/views/home/components/itemuser";
export default {
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [], //文章列表数据
      loading: false, //
      finished: false, // 是否加载结束
      refreshing: false,
      timestamp: null, // 请求下一页数据的时间戳
      error: false, //
      isRefreshLoading: false,
      refreshSuccessText: "",
    };
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await setarticle({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
        });

        //请求的数据 放到 list 数组中
        const { results } = data.data;
        this.list.push(...results);

        // 加载之后 把 loading 设置为 false
        this.loading = false;

        //判断数据是否加载完成
        if (results.length) {
          // 更新下一页的事件戳
          this.timestamp = data.data.pre_timestamp;
        } else {
          // 没有数据了
          this.finished = true;
        }
      } catch (err) {
        console.log(err);

        this.error = true;
        this.loading = false;
      }
    },

    async onRefresh() {
      try {
        const { data } = await setarticle({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1, // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        });

        //请求的数据 放到 list 数组中
        const { results } = data.data;
        this.list.unshift(...results);

        // 加载之后 把 loading 设置为 false
        this.isRefreshLoading = false;

        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`;
        //判断数据是否加载完成
      } catch (err) {
        thius.isRefreshLoading = false;
        this.refreshSuccessText = "刷新失败";
      }
    },
  },
  components: {
    itemuser,
  },
};
</script>

<style scoped lang="less">
.article-list {
  height: 83vh;
  overflow-y: auto;
}

</style>
