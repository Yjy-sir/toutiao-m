import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import './styles/index.less'// 字体图标
import 'amfe-flexible' // 根字体
import 'vant/lib/index.css'// vants
import './utils/dayjs' // 加载 datajs 初始化配置
Vue.use(Vant)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
