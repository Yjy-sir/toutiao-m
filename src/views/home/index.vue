<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 频道列表 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <!-- 文章列表 -->
      <van-tab :title="obj.name" v-for="obj in list" :key="obj.id">
        <articleList :channel="obj"></articleList>
      </van-tab>
      <!-- 插槽 -->
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="show = true">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 文章列表 -->

    <!-- 频道列表 -->

    <!-- 频道弹出层 -->
    <van-popup
      v-model="show"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
      <Channeleait
        :myChannels="list"
        :active="active"
        @mychannel="btns"
      ></Channeleait>
    </van-popup>
  </div>
</template>
<script>
import { setUserInfo } from "@/api/user";
import { getItem } from "../../utils/storage";
import articleList from "./components/article-list.vue";
import Channeleait from "./components/channel-edit.vue";
import { mapState } from "vuex";
export default {
  components: {
    articleList,
    Channeleait
  },
  computed: {
    ...mapState(["user"]),
  },
  data() {
    return {
      active: 0, // 控制切换的index
      list: [],
      show: false,
    };
  },
  created() {
    this.userlist();
  },
  methods: {
    async userlist() {
      try {
        if (this.user) {
          const { data } = await setUserInfo();
          this.list = data.data.channels;
        } else {
          const datas = getItem("toutiao-channel");
          if (datas) {
            this.list = datas;
          } else {
            const { data } = await setUserInfo();
            this.list = data.data.channels;
          }
        }
      } catch (err) {
        this.$toast("获取失败 请稍后再试");
      }
    },
    btns(index, datas) {
      // 更新激活的频道
      this.active = index;
      // 关闭弹出层
      this.show = datas;
    },
  },
};
</script>

<style scoped lang="less">
.home-container {
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
}
/deep/ .channel-tabs {
  padding-top: 179px;
  .van-tabs__wrap {
    position: fixed;
    top: 92px;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .van-tab {
    border-right: 1px solid #edeff3;
    min-width: 200px;
    height: 80px;
    .van-tab__text {
      font-size: 27px;
      color: #777777;
    }
  }
}

.van-tab--active .van-tab__text {
  color: #333 !important;
  .van-tabs__line {
    width: 31px !important;
    height: 6px;
    background: rgba(50, 150, 250, 1);
    border-radius: 3px;
    bottom: 8px;
  }
  .van-tabs__nav {
    padding: 0;
  }
}
.placeholder {
  flex-shrink: 0;
  width: 66px;
  height: 82px;
}

.hamburger-btn {
  position: fixed;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 82px;
  background-color: #fff;
  opacity: 0.902;
  i.toutiao {
    font-size: 33px;
  }
  &:before {
    content: "";
    position: absolute;
    left: 0;
    width: 1px;
    height: 100%;
    background-image: url(~@/assets/gradient-gray-line.png);
    background-size: contain;
  }
}
</style>
