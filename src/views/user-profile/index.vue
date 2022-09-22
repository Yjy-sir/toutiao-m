<template>
  <div class="user-profile">
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />

    <input type="file" ref="file" hidden @change="inputChange" />

    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image round fit="cover" :src="list.photo" class="avater" />
    </van-cell>
    <van-cell title="昵称" :value="list.name" is-link @click="isshow = true" />
    <van-cell
      title="性别"
      :value="list.gender === 1 ? '女' : '男'"
      is-link
      @click="usergender = true"
    />
    <van-cell
      title="生日"
      :value="list.birthday"
      is-link
      @click="usergbirthday = true"
    />

    <!-- 修改昵称 -->
    <van-popup v-model="isshow" position="bottom" :style="{ height: '80%' }">
      <nick_name
        @close="isshow = false"
        v-model="list.name"
        v-if="isshow"
      ></nick_name>
    </van-popup>

    <!-- 修改性别 -->
    <van-popup
      v-model="usergender"
      position="bottom"
      :style="{ height: '80%' }"
    >
      <gender v-if="usergender" v-model="list.gender" @close="usergender = false"></gender>
    </van-popup>

    <!-- 修改年龄 -->
    <van-popup
      v-model="usergbirthday"
      position="bottom"
      :style="{ height: '80%' }"
    >
      <birthday
        v-if="usergbirthday"
        v-model="list.birthday"
        @close="usergbirthday = false"
      ></birthday>
    </van-popup>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    <!-- 修改头像 -->
    <van-popup
      v-model="userghead"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <heads :img="img" @close="userghead = false" @user-photo="list.photo = $event"></heads>
    </van-popup>
  </div>
</template>

<script>
import { individual_resume } from "@/api/user.js";
import nick_name from "./nickname.vue";
import gender from "./gender.vue";
import birthday from "./birthday.vue";
import heads from "./head.vue";
export default {
  name: "UserProfile",
  data() {
    return {
      list: [],
      isshow: false, // 修改昵称弹出层
      usergender: false, // 性别
      usergbirthday: false, //年龄
      userghead: false,
      img: null,
    };
  },
  components: {
    nick_name,
    gender,
    birthday,
    heads,
  },
  created() {
    this.loaduserdata();
  },
  methods: {
    async loaduserdata() {
      try {
        const { data } = await individual_resume();
        // console.log(data);
        this.list = data.data;
      } catch (err) {
        this.$toast.fail("信息获取失败 请稍后重试");
        console.log(err);
      }
    },
    inputChange() {
      const files = this.$refs.file.files[0];

      this.img = window.URL.createObjectURL(files);
      this.userghead = true;
      this.$refs.file.value = "";
    },
  },
};
</script>

<style scoped lang="less">
.user-profile {
  .avater {
    width: 60px;
    height: 60px;
  }
  .van-popup {
    background: #f5f7f9;
  }
}
</style>
