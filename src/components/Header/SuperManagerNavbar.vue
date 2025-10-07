// 超级管理员导航 - 农场主题
<template>
  <div id="navbar" class="fixed-top">
    <nav class="navbar navbar-expand-lg navbar-farm">
      <div class="container-fluid">
        <!-- 品牌Logo -->
        <a class="navbar-brand-farm" href="#">
          <div class="farm-logo"></div>
          <span>西塘草舍农场 - 超级管理</span>
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
          <ul class="navbar-nav ms-auto navbar-nav-farm">
            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/supermanager/staffShow"
                :class="{ active: $route.path.includes('staff') }"
              >
                <i class="bi bi-people me-1"></i>员工管理
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/supermanager/attendance"
                :class="{ active: $route.path.includes('attendance') }"
              >
                <i class="bi bi-calendar-check me-1"></i>考勤管理
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/supermanager/reportForm"
                :class="{ active: $route.path.includes('report') }"
              >
                <i class="bi bi-file-earmark-text me-1"></i>报表打印
              </router-link>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="bi bi-person-badge me-1"></i>{{ username }}
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <router-link
                    class="dropdown-item"
                    to="/supermanager/passwordSupermanager"
                  >
                    <i class="bi bi-key me-2"></i>修改密码
                  </router-link>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a
                    class="dropdown-item text-danger"
                    @click="loginOut"
                    href="#"
                  >
                    <i class="bi bi-box-arrow-right me-2"></i>退出登录
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "SuperManagerNavbar",
  data() {
    return {
      username: sessionStorage.getItem("username") || "超级管理员"
    };
  },
  methods: {
    toggleMobileNav() {
      const navbarNav = document.getElementById("navbarNav");
      if (navbarNav) {
        navbarNav.classList.toggle("show");
      }
    },

    async loginOut() {
      try {
        if (!confirm("确定要退出登录吗？")) {
          return;
        }

        // 添加退出动画
        const navbar = document.getElementById("navbar");
        if (navbar) {
          navbar.style.transition = "all 0.3s ease";
          navbar.style.transform = "translateY(-100%)";
        }

        // 清除session
        sessionStorage.removeItem("username");

        // 显示退出消息
        this.$farmMessage.success("已安全退出登录");

        // 延迟跳转
        setTimeout(() => {
          this.$router.replace("/login");
        }, 300);
      } catch (error) {
        console.error("退出登录失败:", error);
        this.$farmMessage.error("退出登录失败");
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

@media (min-width: 769px) {
  .navbar-toggler {
    display: none;
  }
}
</style>
