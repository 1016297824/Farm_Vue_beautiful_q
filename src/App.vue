// 主页面
<template>
  <div id="app" class="bg">
    <router-view />
    <alert />
  </div>
</template>

<script>
import "@/assets/css/myCSS.css";

export default {
  components: { alert: () => import("@/components/AlertDialog") }
};
</script>
