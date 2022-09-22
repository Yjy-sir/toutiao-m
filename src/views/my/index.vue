<template>
  <div class="my-container">
    <!-- 已登录部分 -->
    <div v-if="user" class="header user-info">
      <!-- 头像名称部分 -->
      <div class="base-info">
        <!-- 左边 -->
        <div class="left">
          <van-image
            class="avatar"
            :src="UserInfo.photo"
            round
            fit="cover"
          />
          <span class="name">{{ UserInfo.name }}</span>
        </div>
        <!-- 右边 -->
        <div class="right">
          <van-button size="mini" round to="/user/profile">编辑资料</van-button>
        </div>
      </div>

      <!-- 关注 粉丝部分 -->
      <div class="data-stats">
        <div class="data-item">
          <span class="count">8</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">66</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">88</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">88</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>

    <!-- 未登录部分 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img src="@/assets/mobile.png" alt="" class="mobile-img" />
        <span class="tetx">登录 / 注册</span>
      </div>
    </div>

    <!-- 导航部分 -->
    <van-grid class="grid-nav" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>

    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <van-cell v-if="user" @click="exitlogin" class="logout-cell" title="退出登录" center />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  data () {
    return {
      UserInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    if (this.user) {
      this.LoaderOptions()
    }
  },
  methods: {
    exitlogin () {
      // 退出提示
      this.$dialog.confirm({
        title: '您确定要退出吗？'
      }).then(() => {
        this.$store.commit('setUser', null)
      }).catch(() => {
        console.log(1)
      })
    },
    async LoaderOptions () {
      try {
        const { data } = await getUserInfo()
        console.log(data)
        this.UserInfo = data.data
      } catch {
        this.$toast('数据获取失败 请稍后再试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 361px;
  background: url("~@/assets/banner.png");
  background-size: cover;
}
.not-login {
  display: flex;
  justify-content: center;
  align-items: center;
  .login-btn {
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;

    .mobile-img {
      width: 132px;
      height: 132px;
    }
    .tetx {
      font-size: 35px;
      color: #fff;
      margin-top: 20px;
    }
  }
}

.user-info {
  .base-info {
    height: 231px;
    padding: 76px 32px 23px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      .avatar {
        width: 132px;
        height: 132px;
        vertical-align: middle;
        border: 4px solid #fff;
      }
      .name {
        color: #fff;
        font-size: 40px;
        margin-left: 23px;
      }
    }
  }
  .data-stats {
    height: 130px;
    display: flex;
    justify-content: space-around;
    .data-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #fff;
      .count {
        font-size: 40px;
      }
      .text {
        font-size: 32px;
      }
    }
  }
}

.grid-nav {
  .grid-item {
    height: 141px;
    i.iconfont {
      font-size: 45px;
    }
    .icon-shoucang {
      color: #ed5253;
    }
    .icon-lishi {
      color: #ff9d1d;
    }
    span.text {
      font-size: 33px;
    }
  }
}
.logout-cell {
  height: 100px;
  text-align: center;
  color: #eb5253;
  margin: 10px 0;
  font-size: 30px;
}
</style>
