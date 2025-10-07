<template>
  <div>
    <!-- 导航栏 -->
    <customerNavbar />

    <!-- 主体内容 -->
    <div class="container" style="padding-top: 100px; padding-bottom: 120px;">
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-6 col-sm-8">
          <div class="card-farm p-4">
            <!-- 表单头部 -->
            <div class="text-center mb-4">
              <h3 class="farm-title mb-2">
                <i class="bi bi-key me-2"></i>修改密码
              </h3>
              <p class="text-farm-muted mb-0">保护您的账户安全</p>
            </div>

            <!-- 修改密码表单 -->
            <form @submit.prevent="changePassword">
              <!-- 手机号显示 -->
              <div class="form-group-farm">
                <label class="form-label-farm">
                  <i class="bi bi-phone me-1"></i>手机号
                </label>
                <input
                  type="text"
                  class="form-control form-control-farm"
                  v-model="userBodyChangePassword.username"
                  readonly
                  style="background-color: #f8f9fa;"
                />
              </div>

              <!-- 旧密码输入 -->
              <div class="form-group-farm">
                <label class="form-label-farm">
                  <i class="bi bi-lock me-1"></i>旧密码
                </label>
                <input
                  type="password"
                  class="form-control form-control-farm"
                  v-model="userBodyChangePassword.password"
                  @input="clearPasswordError"
                  placeholder="请输入当前密码"
                  required
                  :class="{ 'is-invalid': passwordMessage }"
                />
                <div v-if="passwordMessage" class="invalid-feedback-farm">
                  <i class="bi bi-exclamation-circle me-1"></i
                  >{{ passwordMessage }}
                </div>
              </div>

              <!-- 新密码输入 -->
              <div class="form-group-farm">
                <label class="form-label-farm">
                  <i class="bi bi-shield-lock me-1"></i>新密码
                </label>
                <input
                  type="password"
                  class="form-control form-control-farm"
                  v-model="userBodyChangePassword.newPassword"
                  @input="clearNewPasswordError"
                  placeholder="请输入新密码（8-20位字符）"
                  required
                  minlength="8"
                  maxlength="20"
                  :class="{ 'is-invalid': newPasswordMessage }"
                />
                <div v-if="newPasswordMessage" class="invalid-feedback-farm">
                  <i class="bi bi-exclamation-circle me-1"></i
                  >{{ newPasswordMessage }}
                </div>
                <small class="form-text text-muted">密码长度8-20位字符</small>
              </div>

              <!-- 确认新密码输入 -->
              <div class="form-group-farm">
                <label class="form-label-farm">
                  <i class="bi bi-shield-check me-1"></i>确认新密码
                </label>
                <input
                  type="password"
                  class="form-control form-control-farm"
                  v-model="userBodyChangePassword.newPassword1"
                  @input="clearNewPassword1Error"
                  placeholder="请再次输入新密码"
                  required
                  :class="{ 'is-invalid': newPassword1Message }"
                />
                <div v-if="newPassword1Message" class="invalid-feedback-farm">
                  <i class="bi bi-exclamation-circle me-1"></i
                  >{{ newPassword1Message }}
                </div>
              </div>

              <!-- 提交按钮 -->
              <div class="d-grid mb-3">
                <button
                  type="submit"
                  class="btn btn-farm-primary"
                  :disabled="isSubmitting"
                >
                  <span
                    v-if="isSubmitting"
                    class="spinner-border spinner-border-sm me-2"
                  ></span>
                  <i v-else class="bi bi-check-circle me-2"></i>
                  {{ isSubmitting ? "修改中..." : "修改密码" }}
                </button>
              </div>

              <!-- 返回链接 -->
              <div class="text-center">
                <router-link
                  to="/customer/reserve"
                  class="text-farm-secondary text-decoration-none fw-medium"
                >
                  <i class="bi bi-arrow-left me-1"></i>返回主页
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
import { changePassword } from "@/api/customer.js";

export default {
  name: "Password",
  components: {
    customerNavbar: () => import("@/components/Header/CustomerNavbar"),
    footerNavbar: () => import("@/components/FooterNavbar")
  },
  data() {
    return {
      userBodyChangePassword: {
        username: sessionStorage.getItem("username") || "",
        password: "",
        newPassword: "",
        newPassword1: ""
      },
      passwordMessage: "",
      newPasswordMessage: "",
      newPassword1Message: "",
      isSubmitting: false
    };
  },
  mounted() {
    // 页面加载动画效果
    this.animatePageEntry();
  },
  methods: {
    async changePassword() {
      // 重置所有错误消息
      this.clearAllErrors();

      // 验证表单
      if (!this.validateForm()) {
        return;
      }

      try {
        this.isSubmitting = true;

        await changePassword(this.userBodyChangePassword);

        // 修改成功
        this.$farmMessage.success("密码修改成功！");

        // 清空表单
        this.resetForm();
      } catch (error) {
        console.error("修改密码错误:", error);
        this.$farmMessage.error("修改密码失败，请稍后重试");
      } finally {
        this.isSubmitting = false;
      }
    },

    validateForm() {
      let isValid = true;

      // 验证旧密码
      if (!this.userBodyChangePassword.password?.trim()) {
        this.passwordMessage = "请输入旧密码！";
        isValid = false;
      }

      // 验证新密码
      if (!this.userBodyChangePassword.newPassword?.trim()) {
        this.newPasswordMessage = "请输入新密码！";
        isValid = false;
      } else if (this.userBodyChangePassword.newPassword.length < 8) {
        this.newPasswordMessage = "新密码长度不能少于8位！";
        isValid = false;
      } else if (this.userBodyChangePassword.newPassword.length > 20) {
        this.newPasswordMessage = "新密码长度不能超过20位！";
        isValid = false;
      }

      // 验证确认密码
      if (!this.userBodyChangePassword.newPassword1?.trim()) {
        this.newPassword1Message = "请确认新密码！";
        isValid = false;
      } else if (
        this.userBodyChangePassword.newPassword !==
        this.userBodyChangePassword.newPassword1
      ) {
        this.newPassword1Message = "两次输入的密码不一致！";
        isValid = false;
      }

      return isValid;
    },

    clearPasswordError() {
      this.passwordMessage = "";
    },

    clearNewPasswordError() {
      this.newPasswordMessage = "";
    },

    clearNewPassword1Error() {
      this.newPassword1Message = "";
    },

    clearAllErrors() {
      this.passwordMessage = "";
      this.newPasswordMessage = "";
      this.newPassword1Message = "";
    },

    resetForm() {
      this.userBodyChangePassword.password = "";
      this.userBodyChangePassword.newPassword = "";
      this.userBodyChangePassword.newPassword1 = "";
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
    }
  }
};
</script>
