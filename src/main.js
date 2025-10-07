import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";

// Bootstrap 5 CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Icons
import "bootstrap-icons/font/bootstrap-icons.css";

// Bootstrap 5 JavaScript (按需引入)
import { Modal, Toast, Dropdown, Collapse, Tooltip } from "bootstrap";

// 全局挂载 Bootstrap（用于在组件中直接访问）
window.bootstrap = { Modal, Toast, Dropdown, Collapse, Tooltip };

// Bootstrap 工具类
import BootstrapUtils, { ModalUtils, ToastUtils } from "@/utils/BootstrapUtils";

// 农场主题UI组件库 - 暂时注释掉避免错误
// import FarmUI from "@/components/ui";

// 全局注册Bootstrap组件
Vue.prototype.$bootstrap = {
  Modal,
  Toast,
  Dropdown,
  Collapse,
  Tooltip
};

// 全局注册 Bootstrap 工具类
Vue.prototype.$modal = ModalUtils;
Vue.prototype.$toast = ToastUtils;
Vue.prototype.$bs = BootstrapUtils;

// 安装农场主题UI组件库 - 暂时注释
// Vue.use(FarmUI);

// 农场主题全局消息插件优化
Vue.prototype.$farmMessage = {
  success: message => ToastUtils.success(message),
  error: message => ToastUtils.error(message),
  warning: message => ToastUtils.warning(message),
  info: message => ToastUtils.info(message)
};

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
