// 用户注册 - 绿色主题
<template>
  <div>
    <!-- 导航栏 -->
    <loginNavbar />

    <!-- 主体 -->
    <div class="container" style="padding-top: 100px; padding-bottom: 100px;">
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-6 col-sm-8">
          <div
            class="farm-card p-6 transform transition-all duration-500 hover:scale-[1.01]"
          >
            <h2 class="farm-title text-center mb-6" style="font-size: 1.8rem;">
              <i class="fas fa-seedling mr-2"></i>用户注册
            </h2>

            <form @submit.prevent="register" class="space-y-5">
              <div class="form-group">
                <label class="block text-left text-gray-700 mb-2 font-medium">
                  <i class="fas fa-mobile-alt mr-1"></i>手机号
                </label>
                <input
                  type="tel"
                  class="farm-input"
                  v-model="customer.username"
                  @keyup="writeUsername"
                  placeholder="请输入手机号码"
                  required
                  :class="{ 'border-red-500': phoneMessage }"
                />
                <p
                  v-if="phoneMessage"
                  class="text-red-500 text-sm mt-1 animate-fadeIn"
                >
                  <i class="fas fa-exclamation-circle mr-1"></i
                  >{{ phoneMessage }}
                </p>
              </div>

              <div class="form-group">
                <label class="block text-left text-gray-700 mb-2 font-medium">
                  <i class="fas fa-user mr-1"></i>姓名
                </label>
                <input
                  type="text"
                  class="farm-input"
                  v-model="customer.name"
                  @keyup="writeName"
                  placeholder="请输入真实姓名"
                  required
                  :class="{ 'border-red-500': nameMessage }"
                />
                <p
                  v-if="nameMessage"
                  class="text-red-500 text-sm mt-1 animate-fadeIn"
                >
                  <i class="fas fa-exclamation-circle mr-1"></i
                  >{{ nameMessage }}
                </p>
              </div>

              <div class="form-group">
                <label class="block text-left text-gray-700 mb-2 font-medium">
                  <i class="fas fa-lock mr-1"></i>密码
                </label>
                <input
                  type="password"
                  class="farm-input"
                  v-model="customer.password"
                  @keyup="writePassword"
                  placeholder="请设置密码（8-20位字符）"
                  required
                  minlength="8"
                  maxlength="20"
                  :class="{ 'border-red-500': passwordMessage }"
                />
                <p
                  v-if="passwordMessage"
                  class="text-red-500 text-sm mt-1 animate-fadeIn"
                >
                  <i class="fas fa-exclamation-circle mr-1"></i
                  >{{ passwordMessage }}
                </p>
              </div>

              <div class="form-group">
                <label class="block text-left text-gray-700 mb-2 font-medium">
                  <i class="fas fa-lock-open mr-1"></i>确认密码
                </label>
                <input
                  type="password"
                  class="farm-input"
                  v-model="password1"
                  @keyup="writePassword1"
                  placeholder="请再次输入密码"
                  required
                  :class="{ 'border-red-500': password1Message }"
                />
                <p
                  v-if="password1Message"
                  class="text-red-500 text-sm mt-1 animate-fadeIn"
                >
                  <i class="fas fa-exclamation-circle mr-1"></i
                  >{{ password1Message }}
                </p>
              </div>

              <div class="text-right">
                <button
                  type="submit"
                  class="farm-btn farm-btn-primary w-full py-2 font-medium shadow-lg hover:shadow-xl transform transition-all duration-300"
                >
                  <i class="fas fa-user-plus mr-2"></i>注册
                </button>
              </div>

              <div class="text-center pt-3">
                <span class="text-gray-600">已有账号？</span>
                <a href="/login" class="farm-link ml-1 font-medium">
                  立即登录
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部 -->
    <footerNavbar />
  </div>
</template>

<script>
import { register } from "@/api/login.js";

export default {
  name: "Register",
  data: () => ({
    customer: {
      username: null,
      password: null,
      name: null
    },
    password1: null,
    phoneMessage: null,
    passwordMessage: null,
    password1Message: null,
    nameMessage: null
  }),
  mounted() {
    // 页面加载动画效果
    document.querySelector(".container").style.opacity = "0";
    document.querySelector(".container").style.transform = "translateY(20px)";
    document.querySelector(".container").style.transition = "all 0.6s ease";

    setTimeout(() => {
      document.querySelector(".container").style.opacity = "1";
      document.querySelector(".container").style.transform = "translateY(0)";
    }, 300);
  },
  methods: {
    register: function() {
      // 重置所有错误消息
      this.phoneMessage = null;
      this.passwordMessage = null;
      this.password1Message = null;
      this.nameMessage = null;

      // 验证表单
      if (!this.customer.username) {
        this.phoneMessage = "请输入手机号！";
        return;
      }

      if (!this.customer.name) {
        this.nameMessage = "请输入姓名！";
        return;
      }

      if (!this.customer.password) {
        this.passwordMessage = "密码不能为空！";
        return;
      }

      if (!this.password1) {
        this.password1Message = "请再次确认密码！";
        return;
      }

      // 验证手机号格式
      let re = /^1(3|4|5|6|7|8|9)\d{9}$/;
      if (!re.test(this.customer.username)) {
        this.phoneMessage = "请输入正确的手机号！";
        return;
      }

      // 验证密码长度
      if (
        this.customer.password.length < 8 ||
        this.customer.password.length > 20
      ) {
        this.passwordMessage = "密码长度应为8-20位字符！";
        return;
      }

      // 验证密码一致性
      if (this.customer.password != this.password1) {
        this.password1Message = "两次输入密码不一致，请再次确认！";
        return;
      }

      // 添加注册按钮加载状态
      const registerButton = document.querySelector('button[type="submit"]');
      const originalText = registerButton.innerHTML;
      registerButton.disabled = true;
      registerButton.innerHTML =
        '<i class="fas fa-spinner fa-spin mr-2"></i>注册中...';

      // 提交注册请求
      register(this.customer)
        .then(() => {
          // 注册成功后显示成功信息并跳转登录页面
          alert("注册成功！");
          this.$router.replace("/login");
        })
        .catch(error => {
          console.error('注册错误:', error);
          alert('注册失败，请稍后重试');
          registerButton.disabled = false;
          registerButton.innerHTML = originalText;
        });
    },
    writeUsername: function() {
      this.phoneMessage = null;
    },
    writePassword: function() {
      this.passwordMessage = null;
    },
    writePassword1: function() {
      this.password1Message = null;
    },
    writeName: function() {
      this.nameMessage = null;
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
