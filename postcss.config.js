//  px  转为rem
module.exports = {
  plugins: {
    "postcss-pxtorem": {
      // lib-flexible  的 rem 适配方案 把一行分为10 份  每份就是 十分之一
      // vant
      rootValue({ file }) {
        return file.indexOf("vant") !== -1 ? 37.5 : 75;
      },
      // 配置要转换的 css 属性
      // * 表示所有
      propList: ["*"],
      exclude: "github-markdown",
    },
  },
};
