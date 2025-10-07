// 主页面
<template>
  <div id="app" class="bg">
    <!-- Toast 容器 -->
    <div
      class="toast-container position-fixed top-0 end-0 p-3"
      style="z-index: 9999;"
    ></div>

    <!-- 路由视图 -->
    <router-view />

    <!-- 全局弹窗 -->
    <alert />
  </div>
</template>

<script>
import "@/assets/css/farm-theme.css";

export default {
  name: "App",
  components: {
    alert: () => import("@/components/AlertDialog")
  },
  mounted() {
    // 创建 Toast 容器
    if (!document.querySelector(".toast-container")) {
      const toastContainer = document.createElement("div");
      toastContainer.className =
        "toast-container position-fixed top-0 end-0 p-3";
      toastContainer.style.zIndex = "9999";
      document.body.appendChild(toastContainer);
    }
  }
};
</script>

<style>
/* 全局样式覆盖 */
#app {
  position: relative;
  z-index: 0;
}

/* 确保 Toast 容器在最顶层 */
.toast-container {
  z-index: 9999 !important;
}
</style>
