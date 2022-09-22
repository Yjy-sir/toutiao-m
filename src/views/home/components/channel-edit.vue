<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        @click="edit"
        size="mini"
        round
        type="danger"
        plain
        class="edit-btn"
        >{{ control ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid class="channel-item" :gutter="10">
      <van-grid-item
        class="grid-item"
        :text="obj.name"
        v-for="(obj, index) in myChannels"
        :key="obj.id"
        @click="onmychannelclick(obj, index)"
      >
        <!-- includes 判断某个数组是否包含指定的值 有返回 true 否者 false    要做一个取反-->
        <van-icon
          slot="icon"
          name="clear"
          v-show="control && !fiexchannels.includes(obj.id)"
        ></van-icon>
        <!-- 同步高亮 -->
        <span slot="text" class="text" :class="{ active: index === active }">{{
          obj.name
        }}</span>
      </van-grid-item>
    </van-grid>

    <van-cell :border="false">
      <div slot="title" class="title-text">推荐频道</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        icon="plus"
        :text="obj.name"
        v-for="obj in recommendChannels"
        :key="obj.id"
        @click="btn(obj)"
      />
    </van-grid>
  </div>
</template>

<script>
import { allpost, allpostdelect } from "@/api/user";
import { mapState } from "vuex";
import { setItem } from "../../../utils/storage";
import { allpostsave } from "@/api/user";
export default {
  data() {
    return {
      name: "channeledit",
      list: [],
      control: false,
      fiexchannels: [0], // 固定频道 不允许删除  [0] id
    };
  },
  props: {
    myChannels: {
      type: Array,
      redirect: true,
    },
    active: {
      type: Number,
      redirect: true,
    },
  },
  computed: {
    ...mapState(["user"]),
    recommendChannels() {
      const chanels = [];
      this.list.forEach((channel) => {
        const res = this.myChannels.find((myChannels) => {
          return myChannels.id === channel.id;
        });

        if (!res) {
          chanels.push(channel);
        }
      });
      return chanels;
    },
  },
  created() {
    this.allposts();
  },
  methods: {
    async allposts() {
      try {
        const { data } = await allpost();
        this.list = data.data.channels;
        // console.log(res);
      } catch (err) {
        console.log(err);
      }
    },
    async btn(obj) {
      this.myChannels.push(obj);

      if (this.user) {
        try {
          await allpostsave({
            id: obj.id,
            seq: this.myChannels.length,
          });
        } catch (err) {
          this.$toast("保存失败 请稍后重试");
        }
      } else {
        // 未登录
        setItem("toutiao-channel", this.myChannels);
      }
    },
    edit() {
      this.control = !this.control;
    },
    onmychannelclick(obj, index) {
      if (this.control) {
        // 如果是固定  则不删除
        if (this.fiexchannels.includes(obj.id)) {
          return;
        }
        // 编辑
        if (index <= this.active) {
          this.$emit("mychannel", this.active - 1, true);
        }
        this.myChannels.splice(index, 1);

        //如果未登录 则删除存储到本地的数据
        // 如果已登录 则删除存储到线上的数据
        if (this.user) {
          allpostdelect(obj.id);
        } else {
          // 未登录
          setItem("toutiao-channel", this.myChannels);
        }
      } else {
        // 跳转
        this.$emit("mychannel", index, false);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
  //文字
  .title-text {
    font-size: 32px;
    color: #333;
  }
  //按钮
  .edit-btn {
    width: 104px;
    height: 48px;
    color: #f85959;
    border: #f85959 1px solid;
  }
  .grid-item {
    width: 160px;
    height: 86px;
    /deep/.van-grid-item__content {
      white-space: nowrap;
      background-color: #f5f5f6;
      .van-grid-item__text,
      .text {
        color: #222;
        font-size: 28px;
        margin-top: 0;
      }
      .active {
        color: red;
      }
    }
  }
   /deep/ .van-grid-item__icon-wrapper {
    position: unset;
    position: absolute;
    right: -10px;
    top: -10px;
    font-size: 36px;
    color: #ccc;
  }

  /deep/ .van-icon-close {
    position: absolute;
    right: -10px;
    top: -10px;
    font-size: 36px;
    color: #ccc;
  }
  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        color: #222;
        .van-icon {
          font-size: 24px;
        }
      }
    }
  }
}
/deep/ .van-icon-plus  {
  padding-right: 6px;
}
</style>
