// 用户登录 - 农场主题
<template>
  <div>
    <!-- 导航栏 -->
    <loginNavbar />

    <!-- 主体 -->
    <div class="container" style="padding-top: 100px; padding-bottom: 120px;">
      <div class="row justify-content-center">
        <div class="col-lg-4 col-md-5 col-sm-7 col-10">
          <div class="card-farm p-3">
            <!-- 表单头部 -->
            <div class="text-center mb-3">
              <h3 class="farm-title mb-2">
                <i class="bi bi-leaf me-2"></i>欢迎登录
              </h3>
              <p class="text-farm-muted mb-0">西塘草舍农场管理系统</p>
            </div>

            <!-- 登录表单 -->
            <form @submit.prevent="login">
              <!-- 用户名输入 -->
              <div class="form-group-farm">
                <label class="form-label-farm">
                  <i class="bi bi-person me-1"></i>用户名
                </label>
                <input
                  type="text"
                  class="form-control form-control-farm"
                  v-model="userBody.username"
                  @input="clearUsernameError"
                  placeholder="请输入用户名"
                  required
                  :class="{ 'is-invalid': usernameMessage }"
                />
                <div v-if="usernameMessage" class="invalid-feedback-farm">
                  <i class="bi bi-exclamation-circle me-1"></i
                  >{{ usernameMessage }}
                </div>
              </div>

              <!-- 密码输入 -->
              <div class="form-group-farm">
                <label class="form-label-farm">
                  <i class="bi bi-lock me-1"></i>密码
                </label>
                <input
                  type="password"
                  class="form-control form-control-farm"
                  v-model="userBody.password"
                  @input="clearPasswordError"
                  placeholder="请输入密码"
                  required
                  :class="{ 'is-invalid': passwordMessage }"
                />
                <div v-if="passwordMessage" class="invalid-feedback-farm">
                  <i class="bi bi-exclamation-circle me-1"></i
                  >{{ passwordMessage }}
                </div>
              </div>

              <!-- 登录按钮 -->
              <div class="d-grid mb-2">
                <button
                  type="submit"
                  class="btn btn-farm-primary"
                  :disabled="isSubmitting"
                >
                  <span
                    v-if="isSubmitting"
                    class="spinner-border spinner-border-sm me-2"
                  ></span>
                  <i v-else class="bi bi-box-arrow-in-right me-2"></i>
                  {{ isSubmitting ? "登录中..." : "登录" }}
                </button>
              </div>

              <!-- 注册链接 -->
              <div class="text-center">
                <span class="text-farm-muted">没有账号？</span>
                <router-link
                  to="/register"
                  class="text-farm-secondary text-decoration-none fw-medium ms-1"
                >
                  立即注册
                </router-link>
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
  data() {
    return {
      userBody: {
        username: "",
        password: ""
      },
      usernameMessage: "",
      passwordMessage: "",
      isSubmitting: false
    };
  },
  mounted() {
    // 页面加载动画效果
    this.animatePageEntry();
  },
  methods: {
    async login() {
      // 清除错误信息
      this.usernameMessage = "";
      this.passwordMessage = "";

      // 表单验证
      if (!this.validateForm()) {
        return;
      }

      try {
        this.isSubmitting = true;

        const response = await login(this.userBody);

        if (response.data === "登录成功") {
          sessionStorage.setItem("username", this.userBody.username);

          // 显示成功消息
          this.$farmMessage.success(`欢迎回来，${this.userBody.username}!`);

          // 页面离开动画
          await this.animatePageExit();

          // 跳转到主页
          this.$router.replace("/customer/reserve");
        } else {
          this.$farmMessage.error("用户名或密码错误");
        }
      } catch (error) {
        console.error("登录错误:", error);
        this.$farmMessage.error("登录失败，请稍后重试");
      } finally {
        this.isSubmitting = false;
      }
    },

    validateForm() {
      let isValid = true;

      if (!this.userBody.username?.trim()) {
        this.usernameMessage = "用户名不能为空";
        isValid = false;
      }

      if (!this.userBody.password?.trim()) {
        this.passwordMessage = "密码不能为空";
        isValid = false;
      } else if (this.userBody.password.length < 6) {
        this.passwordMessage = "密码至少6位";
        isValid = false;
      }

      return isValid;
    },

    clearUsernameError() {
      this.usernameMessage = "";
    },

    clearPasswordError() {
      this.passwordMessage = "";
    },

    animatePageEntry() {
      const container = document.querySelector(".container");
      if (container) {
        container.style.opacity = "0";
        container.style.transform = "translateY(20px)";
        container.style.transition = "all 0.6s ease";

        setTimeout(() => {
          container.style.opacity = "1";
          container.style.transform = "translateY(0)";
        }, 100);
      }
    },

    async animatePageExit() {
      const container = document.querySelector(".container");
      if (container) {
        container.style.opacity = "0";
        container.style.transform = "translateY(-20px)";

        return new Promise(resolve => {
          setTimeout(resolve, 300);
        });
      }
    }
  },

  components: {
    loginNavbar: () => import("@/components/Header/LoginNavbar"),
    footerNavbar: () => import("@/components/FooterNavbar")
  }
};
</script>

<style scoped>
/* 表单动画效果 */
.card-farm {
  animation: fadeInUp 0.6s ease;
}

/* 输入框验证状态 */
.form-control.is-invalid {
  border-color: var(--bs-danger) !important;
  box-shadow: 0 0 0 0.2rem rgba(244, 67, 54, 0.15) !important;
}

/* 加载按钮状态 */
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .container {
    padding-top: 80px !important;
    padding-bottom: 60px !important;
  }

  .card-farm {
    margin: 0 1rem;
  }
}

@media (max-width: 576px) {
  .container {
    padding-top: 70px !important;
  }

  .farm-title {
    font-size: 1.5rem !important;
  }
}
</style>
