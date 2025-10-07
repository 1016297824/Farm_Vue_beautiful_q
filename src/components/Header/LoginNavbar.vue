// 登录导航栏 - 农场主题
<template>
  <div id="navbar" class="fixed-top">
    <nav class="navbar navbar-expand-lg navbar-farm">
      <div class="container-fluid">
        <a class="navbar-brand-farm" href="#">
          <!-- CSS 绘制的农场 Logo -->
          <div class="farm-logo"></div>
          <span>西塘草舍农场</span>
        </a>

        <!-- 移动端折叠按钮 -->
        <button
          class="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          @click="toggleMobileNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- 导航菜单 -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" href="/login">
                <i class="bi bi-person me-1"></i>登录
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/register">
                <i class="bi bi-person-plus me-1"></i>注册
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "LoginNavbar",
  methods: {
    toggleMobileNav() {
      const navbarNav = document.getElementById("navbarNav");
      if (navbarNav) {
        navbarNav.classList.toggle("show");
      }
    }
  }
};
</script>

<style scoped>
/* 自定义汉堡菜单按钮 */
.navbar-toggler {
  padding: 0.25rem 0.5rem;
  font-size: 1rem;
  border: none !important;
  outline: none;
}

.navbar-toggler:focus {
  box-shadow: none;
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.8%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='m4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

/* 响应式调整 */
@media (max-width: 768px) {
  .navbar-collapse {
    background: var(--farm-green-600);
    margin-top: 1rem;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  }

  .navbar-nav .nav-link {
    padding: 0.75rem 1rem;
    margin: 0.25rem 0;
    border-radius: 0.5rem;
  }

  .navbar-brand-farm span {
    font-size: 1rem;
  }

  .farm-logo {
    width: 32px;
    height: 32px;
  }

  .farm-logo::before {
    font-size: 16px;
  }
}

@media (max-width: 576px) {
  .navbar {
    padding: 0.5rem 1rem;
  }

  .navbar-brand-farm {
    font-size: 0.9rem;
  }
}
</style>
