// 用户登录 - 绿色主题
<template>
  <div>
    <!-- 导航栏 -->
    <loginNavbar />

    <!-- 主体 -->
    <div class="container" style="padding-top: 80px; padding-bottom: 80px;">
      <div class="row justify-content-center">
        <div class="col-lg-4 col-md-5 col-sm-7 max-w-md">
          <div class="farm-card p-8 transform transition-all duration-500 hover:scale-[1.01] shadow-xl">
            <div class="text-center mb-6">
              <h2 class="farm-title" style="font-size: 2rem;">
                <i class="fas fa-leaf mr-2 text-green-600"></i>欢迎登录
              </h2>
              <p class="text-gray-500 mt-2">西塘草舍农场管理系统</p>
            </div>
            
            <form @submit.prevent="login" class="space-y-6">
              <div class="form-group">
                <label class="block text-left text-gray-700 mb-2 font-medium">
                  <i class="fas fa-user mr-1"></i>用户名
                </label>
                <input
                  type="text"
                  class="farm-input"
                  v-model="userBody.username"
                  @keyup="writeUsername"
                  placeholder="请输入用户名"
                  required
                  :class="{ 'border-red-500': usernameMessage }"
                />
                <p v-if="usernameMessage" class="text-red-500 text-sm mt-1 animate-fadeIn">
                  <i class="fas fa-exclamation-circle mr-1"></i>{{ usernameMessage }}
                </p>
              </div>
              
              <div class="form-group">
                <label class="block text-left text-gray-700 mb-2 font-medium">
                  <i class="fas fa-lock mr-1"></i>密码
                </label>
                <input
                  type="password"
                  class="farm-input"
                  v-model="userBody.password"
                  @keyup="writePassword"
                  placeholder="请输入密码"
                  required
                  :class="{ 'border-red-500': passwordMessage }"
                />
                <p v-if="passwordMessage" class="text-red-500 text-sm mt-1 animate-fadeIn">
                  <i class="fas fa-exclamation-circle mr-1"></i>{{ passwordMessage }}
                </p>
              </div>
              
              <div class="text-right">
                <button
                  type="submit"
                  class="farm-btn farm-btn-primary w-full py-3 font-medium shadow-lg hover:shadow-xl transform transition-all duration-300 flex items-center justify-center"
                  :disabled="isSubmitting"
                >
                  <i v-if="isSubmitting" class="fas fa-circle-notch fa-spin mr-2"></i>
                  <i v-else class="fas fa-sign-in-alt mr-2"></i>
                  {{ isSubmitting ? '登录中...' : '登录' }}
                </button>
              </div>
              
              <div class="text-center pt-3">
                <span class="text-gray-600">没有账号？</span>
                <a href="/register" class="farm-link ml-1 font-medium">
                  立即注册
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- 页脚 -->
    <footerNavbar />
  </div>
</template>

<script>
import { login } from "@/api/login";

export default {
  name: "Login",
  data: () => ({
    userBody: {
      username: null,
      password: null
    },
    usernameMessage: null,
    passwordMessage: null,
    isSubmitting: false
  }),
  mounted() {
    // 页面加载动画效果
    document.querySelector('.container').style.opacity = '0';
    document.querySelector('.container').style.transform = 'translateY(20px)';
    document.querySelector('.container').style.transition = 'all 0.6s ease';
    
    setTimeout(() => {
      document.querySelector('.container').style.opacity = '1';
      document.querySelector('.container').style.transform = 'translateY(0)';
    }, 300);
  },
  methods: {
    login: function() {
      this.usernameMessage = null;
      this.passwordMessage = null;
      
      if (!this.userBody.username) {
        this.usernameMessage = "用户名不能为空";
        return;
      }
      
      if (!this.userBody.password) {
        this.passwordMessage = "密码不能为空";
        return;
      }
      
      // 设置加载状态
      this.isSubmitting = true;
      
      login(this.userBody).then(response => {
        if (response.data == "登录成功") {
          sessionStorage.setItem("username", this.userBody.username);
          
          // 登录成功动画
          document.querySelector('.container').style.opacity = '0';
          document.querySelector('.container').style.transform = 'translateY(-20px)';
          
          setTimeout(() => {
            this.$router.replace("/customer/reserve");
          }, 500);
        } else {
          alert("用户名或密码错误");
          this.isSubmitting = false;
        }
      }).catch(error => {
        console.error('登录错误:', error);
        alert('登录失败，请稍后重试');
        this.isSubmitting = false;
      });
    },
    writeUsername: function() {
      this.usernameMessage = null;
    },
    writePassword: function() {
      this.passwordMessage = null;
    }
  },
  components: {
    loginNavbar: () => import("@/components/Header/LoginNavbar"),
    footerNavbar: () => import("@/components/FooterNavbar")
  }
};
</script>

<style scoped>
/* 表单元素样式 */
.form-group {
  position: relative;
}

.space-y-5 > * {
  margin-bottom: 1.25rem;
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .container {
    padding-top: 80px !important;
    padding-bottom: 80px !important;
  }
  
  .farm-title {
    font-size: 1.5rem !important;
  }
  
  .farm-card {
    padding: 1.5rem !important;
  }
}

@media (max-width: 576px) {
  .container {
    padding-top: 70px !important;
    padding-bottom: 70px !important;
  }
  
  .col-sm-8 {
    padding-left: 10px !important;
    padding-right: 10px !important;
  }
}
</style>
