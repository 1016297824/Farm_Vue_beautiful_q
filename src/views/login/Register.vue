// 用户注册 - 农场主题
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
                <i class="bi bi-person-plus me-2"></i>用户注册
              </h3>
              <p class="text-farm-muted mb-0">加入西塘草舍农场大家庭</p>
            </div>

            <!-- 注册表单 -->
            <form @submit.prevent="register">
              <!-- 手机号输入 -->
              <div class="form-group-farm">
                <label class="form-label-farm">
                  <i class="bi bi-phone me-1"></i>手机号
                </label>
                <input
                  type="tel"
                  class="form-control form-control-farm"
                  v-model="customer.username"
                  @input="clearPhoneError"
                  placeholder="请输入手机号码"
                  required
                  :class="{ 'is-invalid': phoneMessage }"
                />
                <div v-if="phoneMessage" class="invalid-feedback-farm">
                  <i class="bi bi-exclamation-circle me-1"></i
                  >{{ phoneMessage }}
                </div>
              </div>

              <!-- 姓名输入 -->
              <div class="form-group-farm">
                <label class="form-label-farm">
                  <i class="bi bi-person me-1"></i>姓名
                </label>
                <input
                  type="text"
                  class="form-control form-control-farm"
                  v-model="customer.name"
                  @input="clearNameError"
                  placeholder="请输入真实姓名"
                  required
                  :class="{ 'is-invalid': nameMessage }"
                />
                <div v-if="nameMessage" class="invalid-feedback-farm">
                  <i class="bi bi-exclamation-circle me-1"></i>{{ nameMessage }}
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
                  v-model="customer.password"
                  @input="clearPasswordError"
                  placeholder="请设置密码（8-20位字符）"
                  required
                  minlength="8"
                  maxlength="20"
                  :class="{ 'is-invalid': passwordMessage }"
                />
                <div v-if="passwordMessage" class="invalid-feedback-farm">
                  <i class="bi bi-exclamation-circle me-1"></i
                  >{{ passwordMessage }}
                </div>
                <small class="form-text text-muted">密码长度8-20位字符</small>
              </div>

              <!-- 确认密码输入 -->
              <div class="form-group-farm">
                <label class="form-label-farm">
                  <i class="bi bi-shield-lock me-1"></i>确认密码
                </label>
                <input
                  type="password"
                  class="form-control form-control-farm"
                  v-model="password1"
                  @input="clearPassword1Error"
                  placeholder="请再次输入密码"
                  required
                  :class="{ 'is-invalid': password1Message }"
                />
                <div v-if="password1Message" class="invalid-feedback-farm">
                  <i class="bi bi-exclamation-circle me-1"></i
                  >{{ password1Message }}
                </div>
              </div>

              <!-- 注册按钮 -->
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
                  <i v-else class="bi bi-person-plus me-2"></i>
                  {{ isSubmitting ? "注册中..." : "注册" }}
                </button>
              </div>

              <!-- 登录链接 -->
              <div class="text-center">
                <span class="text-farm-muted">已有账号？</span>
                <router-link
                  to="/login"
                  class="text-farm-secondary text-decoration-none fw-medium ms-1"
                >
                  立即登录
                </router-link>
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
  data() {
    return {
      customer: {
        username: "",
        password: "",
        name: ""
      },
      password1: "",
      phoneMessage: "",
      passwordMessage: "",
      password1Message: "",
      nameMessage: "",
      isSubmitting: false
    };
  },
  mounted() {
    // 页面加载动画效果
    this.animatePageEntry();
  },
  methods: {
    async register() {
      // 重置所有错误消息
      this.clearAllErrors();

      // 验证表单
      if (!this.validateForm()) {
        return;
      }

      try {
        this.isSubmitting = true;

        await register(this.customer);

        // 注册成功
        this.$farmMessage.success("注册成功！欢迎加入西塘草舍农场！");

        // 页面离开动画
        await this.animatePageExit();

        // 跳转登录页面
        this.$router.replace("/login");
      } catch (error) {
        console.error("注册错误:", error);
        this.$farmMessage.error("注册失败，请稍后重试");
      } finally {
        this.isSubmitting = false;
      }
    },

    validateForm() {
      let isValid = true;

      // 验证手机号
      if (!this.customer.username) {
        this.phoneMessage = "请输入手机号！";
        isValid = false;
      } else if (!/^1[3-9]\d{9}$/.test(this.customer.username)) {
        this.phoneMessage = "请输入正确的手机号！";
        isValid = false;
      }

      // 验证姓名
      if (!this.customer.name) {
        this.nameMessage = "请输入姓名！";
        isValid = false;
      } else if (!/^[\u4e00-\u9fa5a-zA-Z]{2,10}$/.test(this.customer.name)) {
        this.nameMessage = "姓名格式不正确！";
        isValid = false;
      }

      // 验证密码
      if (!this.customer.password) {
        this.passwordMessage = "密码不能为空！";
        isValid = false;
      } else if (
        this.customer.password.length < 8 ||
        this.customer.password.length > 20
      ) {
        this.passwordMessage = "密码长度应为8-20位字符！";
        isValid = false;
      }

      // 验证确认密码
      if (!this.password1) {
        this.password1Message = "请再次确认密码！";
        isValid = false;
      } else if (this.customer.password !== this.password1) {
        this.password1Message = "两次输入密码不一致，请再次确认！";
        isValid = false;
      }

      return isValid;
    },

    clearAllErrors() {
      this.phoneMessage = "";
      this.passwordMessage = "";
      this.password1Message = "";
      this.nameMessage = "";
    },

    clearPhoneError() {
      this.phoneMessage = "";
    },

    clearPasswordError() {
      this.passwordMessage = "";
    },

    clearPassword1Error() {
      this.password1Message = "";
    },

    clearNameError() {
      this.nameMessage = "";
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
