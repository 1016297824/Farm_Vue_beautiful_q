// 顾客导航 - 绿色主题
<template>
  <div id="navbar" class="fixed-top shadow-md">
    <nav class="navbar navbar-expand-lg" style="height:60px; background: linear-gradient(90deg, #2e7d32 0%, #4caf50 100%);">
      <div class="container-fluid">
        <span class="navbar-brand mb-0 h1 d-flex items-center">
          <img src="@/assets/imgs/Windows12.jpg" width="36" height="36" alt="" class="mr-2 rounded-full shadow-md"/>
          <span class="text-white font-weight-bold" style="font-size: 1.2rem; letter-spacing: 0.5px;">西塘草舍农场</span>
        </span>
        
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="nav navbar-nav">
            <li class="nav-item mx-1">
              <a class="nav-link text-white" href="reserve" v-bind:class="{ 'nav-link-active': currentPath === '/customer/reserve' }">
                <i class="fas fa-calendar-alt mr-1"></i>预定
              </a>
            </li>
            <li class="nav-item mx-1">
              <a class="nav-link text-white" href="order" v-bind:class="{ 'nav-link-active': currentPath === '/customer/order' }">
                <i class="fas fa-utensils mr-1"></i>点餐
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle text-white"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                style="display: flex; align-items: center;"
              >
                <i class="fas fa-user-circle mr-1"></i><span> {{ username }} </span>
              </a>
              <ul class="dropdown-menu dropdown-menu-right shadow-lg" style="border-radius: 8px; overflow: hidden; margin-top: 8px;">
                <li>
                  <a class="dropdown-item" href="password"> 
                    <i class="fas fa-key mr-2"></i>修改密码 
                  </a>
                </li>
                <div class="dropdown-divider"></div>
                <li>
                  <a class="dropdown-item text-danger" @click="loginOut"> 
                    <i class="fas fa-sign-out-alt mr-2"></i>退出登录 
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
  name: "CustomerNavbar",
  data: () => ({
    username: sessionStorage.getItem("username"),
    currentPath: ''
  }),
  mounted() {
    this.currentPath = this.$route.path;
    this.$router.afterEach((to) => {
      this.currentPath = to.path;
    });
  },
  methods: {
    loginOut: function() {
      // 添加退出动画
      const navbar = document.getElementById('navbar');
      navbar.style.transition = 'all 0.3s ease';
      navbar.style.transform = 'translateY(-100%)';
      
      setTimeout(() => {
        this.$router.replace("/login");
      }, 300);
    }
  }
};
</script>

<style scoped>
/* 导航链接样式 */
.nav-link {
  transition: all 0.3s ease;
  padding: 10px 16px !important;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
}

/* 激活链接样式 */
.nav-link-active {
  background-color: rgba(255, 255, 255, 0.25) !important;
  font-weight: 600;
}

/* 下拉菜单样式 */
.dropdown-item {
  transition: all 0.3s ease;
  padding: 10px 20px;
}

.dropdown-item:hover {
  background-color: #f1f8e9 !important;
  transform: translateX(4px);
}

/* 品牌标志样式 */
.navbar-brand {
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.navbar-brand:hover {
  transform: scale(1.02);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .navbar {
    height: auto !important;
  }
  
  .nav-item {
    margin: 2px 0 !important;
  }
  
  .navbar-nav {
    margin-top: 10px !important;
    margin-bottom: 10px !important;
  }
  
  .dropdown-menu {
    margin-top: 0 !important;
  }
}

@media (max-width: 576px) {
  .navbar-brand img {
    width: 30px !important;
    height: 30px !important;
  }
  
  .navbar-brand span {
    font-size: 1rem !important;
  }
}
</style>
