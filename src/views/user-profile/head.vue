<template>
  <div class="update-avatar">
    <img :src="img" class="img" ref="img" />
    <div class="toolbar">
      <span @click="$emit('close')">取消</span>
      <span @click="requesthead">完成</span>
    </div>
  </div>
</template>

<script>
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import { updateuserdata } from "@/api/user.js";
export default {
  name: "userhead",
  props: {
    img: {
      type: [String, Object],
      redirect: true,
    },
  },
  data() {
    return {
      cropper: null,
    };
  },
  mounted() {
    const image = this.$refs.img;
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: "move",
      aspectRatio: 1,
      //   autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
    });
  },
  methods: {
    requesthead() {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true, // 禁止背景点击
        duration: 0, // 持续展示
      });
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        const formData = new FormData();
        console.log(blob);
        formData.append("photo", blob);
        const { data } = await updateuserdata(formData);
        this.$emit("close");
        this.$toast.success('修改成功')
        this.$emit("user-photo", data.data.photo);
      });
    },
  },
};
</script>

<style scoped lang="less">
.update-avatar {
  background: #000;
  width: 100%;
  height: 100%;
  .toolbar {
    position: fixed;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    color: #fff;
    padding: 0 15px;
    box-sizing: border-box;
  }
  .img {
    max-width: 100%;
  }
}
</style>
