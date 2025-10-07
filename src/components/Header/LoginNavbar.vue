// 登录导航栏 - 绿色主题
<template>
  <div id="navbar" class="fixed-top shadow-sm">
    <nav class="navbar navbar-expand-lg" style="height:60px; background: linear-gradient(90deg, #2e7d32 0%, #4caf50 100%);">
      <div class="container-fluid">
        <span class="navbar-brand mb-0 h1 d-flex items-center">
          <img src="@/assets/imgs/Windows12.jpg" width="36" height="36" alt="" class="mr-2 rounded-full shadow-md"/>
          <span class="text-white font-weight-bold" style="font-size: 1.2rem; letter-spacing: 0.5px;">西塘草舍农场</span>
        </span>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "LoginNavbar"
};
</script>

<style scoped>
.navbar-brand {
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.navbar-brand:hover {
  transform: scale(1.02);
}

/* 响应式调整 */
@media (max-width: 576px) {
  .navbar {
    height: 55px !important;
  }
  
  .navbar-brand img {
    width: 30px !important;
    height: 30px !important;
  }
  
  .navbar-brand span {
    font-size: 1rem !important;
  }
}
</style>
