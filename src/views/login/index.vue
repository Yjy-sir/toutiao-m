<template>
  <div>
    <!--  导航栏 -->
    <van-nav-bar class="page-nav" title="登录">
      <van-icon slot="left" name="cross" @click="$router.back()" />
      </van-nav-bar>
    <!-- 登录框 -->
    <van-form @submit="onSubmit" ref="loginfrom">
      <!-- 手机号输入框 -->
      <van-field name="mobile" placeholder="请输入手机号" v-model="user.mobile" :rules="userFormRules.mobile" type="number" maxlength="11">
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <!-- 验证码输入框 -->
      <van-field name="code" placeholder="请输入验证码" v-model="user.code" :rules="userFormRules.code" type="number" maxlength="6">
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <!-- 验证码按钮 -->
        <template #button>
          <!-- 倒计时 -->
          <!--finish倒计时结束后触发  -->
        <van-count-down
          v-if="count_time"
          :time="time"
          format="ss s"
          @finish="count_time = false"
        />
          <van-button
            v-else
            class="send-sms-btn"
            round
            size="small"
            type="default"
            @click="onSedSms"
            native-type="button"
          >发送验证码</van-button>
        </template>
      </van-field>

      <!-- 登录按钮 -->
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user.js'
export default {
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      time: 1000 * 60,
      count_time: false
    }
  },
  methods: {
    async onSubmit () {
      //  获取表单数据
      const user = this.user
      // 表单验证
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0 // 展示时长 设置为0 toast 不会消失
      })
      // 提交表单请求登录
      try {
        const res = await login(user)
        // $store: 使用 vuex里面的变量 规定使用 $store
        // commit：提交 把获取的token值 传到 setUser 身上
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('登入成功')
        // 登入成功 跳回原来的页面
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          console.log('手机号或验证码错误')
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败,请稍后重试')
        }
      }
    },

    async onSedSms () {
      // 校验手机号
      try {
        await this.$refs.loginfrom.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 验证通过 显示倒计时
      this.count_time = true

      // 请求发送验证码
      try {
        await getSmsCode(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        this.count_time = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了, 请稍后重试')
        } else {
          this.$toast('发送失败, 请稍后重试')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.iconfont {
  font-size: 37px;
}
.send-sms-btn {
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  font-size: 22px;
  color: #666;
}
.login-btn-wrap {
  padding: 53px 33px;
  .login-btn {
    background-color: #6db4fb;
    border: none;
  }
}
.page-nav {
  background-color: #3296fa;
  .van-nav-bar__title, .van-icon {
    color: #fff;
  }
}
</style>
