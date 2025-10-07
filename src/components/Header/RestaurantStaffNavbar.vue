<template>
  <nav id="navbar" class="navbar navbar-expand-lg navbar-farm fixed-top">
    <div class="container-fluid">
      <!-- 品牌Logo和名称 -->
      <router-link
        :to="'/restaurantStaff'"
        class="navbar-brand navbar-brand-farm"
      >
        <div class="farm-logo"></div>
        <span>西塘草舍农场</span>
        <small class="d-block">餐厅服务系统</small>
      </router-link>

      <!-- 移动端切换按钮 -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="切换导航"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- 导航菜单 -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <!-- 结账 -->
          <li class="nav-item">
            <router-link to="/restaurantStaff/settleAccounts" class="nav-link">
              <i class="bi bi-credit-card me-2"></i>
              结账
            </router-link>
          </li>

          <!-- 报修报损 -->
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="repairDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-tools me-2"></i>
              报修报损
            </a>
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="repairDropdown"
            >
              <li>
                <router-link to="/restaurantStaff/repair" class="dropdown-item">
                  <i class="bi bi-exclamation-triangle me-2"></i>
                  上报
                </router-link>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <router-link
                  to="/restaurantStaff/repairComplete"
                  class="dropdown-item"
                >
                  <i class="bi bi-cart me-2"></i>
                  采购
                </router-link>
              </li>
            </ul>
          </li>

          <!-- 用户菜单 -->
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle user-menu"
              href="#"
              id="userDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-person-circle me-2"></i>
              {{ username }}
            </a>
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="userDropdown"
            >
              <li>
                <router-link
                  to="/restaurantStaff/passwordRestaurantStaff"
                  class="dropdown-item"
                >
                  <i class="bi bi-key me-2"></i>
                  修改密码
                </router-link>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <a class="dropdown-item text-danger" href="#" @click="loginOut">
                  <i class="bi bi-box-arrow-right me-2"></i>
                  退出登录
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "RestaurantStaffNavbar",
  data() {
    return {
      username: sessionStorage.getItem("username") || "餐厅员工"
    };
  },
  mounted() {
    // 导航栏入场动画
    this.animateNavbar();
  },
  methods: {
    animateNavbar() {
      const navbar = document.getElementById("navbar");
      if (navbar) {
        navbar.style.transform = "translateY(-100%)";
        navbar.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)";

        setTimeout(() => {
          navbar.style.transform = "translateY(0)";
        }, 100);
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

<style lang="scss" scoped>
.navbar-farm {
  background: linear-gradient(
    135deg,
    var(--farm-primary) 0%,
    var(--farm-success) 100%
  );
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
}

.navbar-nav .nav-link {
  padding: 0.75rem 1rem;
  margin: 0.25rem 0;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  color: rgba(255, 255, 255, 0.9) !important;
  font-weight: 500;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white !important;
    transform: translateY(-1px);
  }

  &.router-link-active {
    background: rgba(255, 255, 255, 0.2);
    color: white !important;
  }

  i {
    color: var(--farm-accent);
  }
}

.navbar-brand-farm {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white !important;
  text-decoration: none;
  font-weight: 700;

  span {
    font-size: 1.1rem;
    line-height: 1;
  }

  small {
    font-size: 0.7rem;
    opacity: 0.8;
    font-weight: 400;
  }

  &:hover {
    color: var(--farm-accent) !important;
    text-decoration: none;
  }
}

.farm-logo {
  width: 40px;
  height: 40px;
  background: var(--farm-accent);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);

  &::before {
    content: "🍽️";
    font-size: 20px;
    display: block;
  }
}

.dropdown-menu {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.75rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  padding: 0.5rem 0;
  margin-top: 0.25rem;
}

.dropdown-item {
  padding: 0.5rem 1rem;
  color: var(--farm-text-primary);
  transition: all 0.2s ease;
  border-radius: 0.5rem;
  margin: 0 0.5rem;

  &:hover {
    background: var(--farm-primary-light);
    color: var(--farm-primary);
    transform: translateX(4px);
  }

  &.text-danger:hover {
    background: rgba(220, 53, 69, 0.1);
    color: #dc3545;
  }

  i {
    width: 16px;
    opacity: 0.7;
  }
}

.user-menu {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2rem;
  padding: 0.5rem 1rem !important;

  &:hover {
    background: rgba(255, 255, 255, 0.2) !important;
  }
}

.navbar-toggler {
  border: none;
  padding: 0.25rem 0.5rem;

  &:focus {
    box-shadow: none;
  }
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.8%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='m4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

/* 响应式设计 */
@media (max-width: 991.98px) {
  .navbar-nav {
    padding: 1rem 0;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
    margin-top: 1rem;
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

  .dropdown-menu {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 0.5rem;
    margin-top: 0.5rem;
  }

  .nav-item {
    padding: 0.5rem 1rem;
  }

  .navbar-brand-farm {
    font-size: 0.9rem;
  }
}
</style>
