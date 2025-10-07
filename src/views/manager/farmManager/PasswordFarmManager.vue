<template>
  <div>
    <!-- 导航栏 -->
    <farmManagerNavbar />

    <!-- 主体内容 -->
    <div class="container" style="padding-top: 100px; padding-bottom: 120px;">
      <div class="row justify-content-center">
        <div class="col-lg-6 col-md-8">
          <div class="card-farm p-4">
            <!-- 页面标题 -->
            <div class="text-center mb-4">
              <h2 class="farm-title mb-2">
                <i class="bi bi-shield-lock me-2"></i>修改密码
              </h2>
              <p class="text-muted">为了您的账户安全，请定期更新密码</p>
            </div>

            <!-- 密码修改表单 -->
            <form @submit.prevent="changePassword">
              <!-- 隐藏的用户名和密码防止自动填充 -->
              <input
                type="text"
                style="display:none;"
                autocomplete="username"
              />
              <input
                type="password"
                style="display:none;"
                autocomplete="current-password"
              />

              <!-- 工号显示 -->
              <div class="mb-3">
                <label class="form-label-farm">
                  <i class="bi bi-person-badge me-1"></i>工号
                </label>
                <input
                  type="text"
                  class="form-control form-control-farm"
                  readonly
                  v-model="userBodyChangePassword.username"
                  autocomplete="off"
                />
              </div>

              <!-- 旧密码 -->
              <div class="mb-3">
                <label class="form-label-farm required">
                  <i class="bi bi-lock me-1"></i>旧密码
                </label>
                <div class="position-relative">
                  <input
                    type="password"
                    class="form-control form-control-farm"
                    :class="{ 'is-invalid': passwordMessage }"
                    v-model="userBodyChangePassword.password"
                    @input="writePassword"
                    placeholder="请输入当前密码"
                    autocomplete="current-password"
                    required
                  />
                  <i
                    class="bi bi-eye position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
                    style="cursor: pointer;"
                    @click="togglePasswordVisibility('password')"
                  ></i>
                </div>
                <div v-if="passwordMessage" class="text-danger mt-1">
                  <i class="bi bi-exclamation-triangle me-1"></i
                  >{{ passwordMessage }}
                </div>
              </div>

              <!-- 新密码 -->
              <div class="mb-3">
                <label class="form-label-farm required">
                  <i class="bi bi-key me-1"></i>新密码
                </label>
                <div class="position-relative">
                  <input
                    type="password"
                    class="form-control form-control-farm"
                    :class="{ 'is-invalid': newPasswordMessage }"
                    v-model="userBodyChangePassword.newPassword"
                    @input="writeNewPassword"
                    placeholder="请输入新密码（至少6位）"
                    autocomplete="new-password"
                    required
                  />
                  <i
                    class="bi bi-eye position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
                    style="cursor: pointer;"
                    @click="togglePasswordVisibility('newPassword')"
                  ></i>
                </div>
                <div v-if="newPasswordMessage" class="text-danger mt-1">
                  <i class="bi bi-exclamation-triangle me-1"></i
                  >{{ newPasswordMessage }}
                </div>
                <div
                  v-if="
                    !newPasswordMessage && userBodyChangePassword.newPassword
                  "
                  class="text-muted mt-1"
                >
                  <small>
                    <i class="bi bi-info-circle me-1"></i>
                    密码强度：
                    <span
                      :class="
                        getPasswordStrengthClass(
                          userBodyChangePassword.newPassword
                        )
                      "
                    >
                      {{
                        getPasswordStrengthText(
                          userBodyChangePassword.newPassword
                        )
                      }}
                    </span>
                  </small>
                </div>
              </div>

              <!-- 确认新密码 -->
              <div class="mb-4">
                <label class="form-label-farm required">
                  <i class="bi bi-check2-square me-1"></i>确认新密码
                </label>
                <div class="position-relative">
                  <input
                    type="password"
                    class="form-control form-control-farm"
                    :class="{
                      'is-invalid': newPassword1Message,
                      'is-valid':
                        userBodyChangePassword.newPassword1 &&
                        userBodyChangePassword.newPassword ===
                          userBodyChangePassword.newPassword1
                    }"
                    v-model="userBodyChangePassword.newPassword1"
                    @input="writeNewPassword1"
                    placeholder="请再次输入新密码"
                    autocomplete="new-password"
                    required
                  />
                  <i
                    class="bi bi-eye position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
                    style="cursor: pointer;"
                    @click="togglePasswordVisibility('newPassword1')"
                  ></i>
                </div>
                <div v-if="newPassword1Message" class="text-danger mt-1">
                  <i class="bi bi-exclamation-triangle me-1"></i
                  >{{ newPassword1Message }}
                </div>
                <div
                  v-else-if="
                    userBodyChangePassword.newPassword1 &&
                      userBodyChangePassword.newPassword ===
                        userBodyChangePassword.newPassword1
                  "
                  class="text-success mt-1"
                >
                  <i class="bi bi-check-circle me-1"></i>密码一致
                </div>
              </div>

              <!-- 提交按钮 -->
              <div class="d-grid gap-2">
                <button
                  type="submit"
                  class="btn btn-farm-primary btn-lg"
                  :disabled="isSubmitting || !isFormValid"
                >
                  <span v-if="isSubmitting">
                    <i class="bi bi-arrow-clockwise me-2 spin"></i>修改中...
                  </span>
                  <span v-else>
                    <i class="bi bi-check-lg me-2"></i>修改密码
                  </span>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  @click="resetForm"
                >
                  <i class="bi bi-arrow-clockwise me-2"></i>重置
                </button>
              </div>
            </form>

            <!-- 安全提示 -->
            <div class="alert alert-farm-info mt-4" role="alert">
              <h6 class="alert-heading">
                <i class="bi bi-shield-check me-2"></i>安全提示
              </h6>
              <ul class="mb-0 small">
                <li>密码长度至少 6 位，建议 8 位以上</li>
                <li>包含大小写字母、数字和特殊字符</li>
                <li>不要使用常见密码或个人信息</li>
                <li>定期更换密码，保障账户安全</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 页脚 -->
    <footerNavbar />
  </div>
</template>

<script>
import { changePassword } from "@/api/farmManager.js";
import farmManagerNavbar from "@/components/Header/FarmManagerNavbar.vue";
import footerNavbar from "@/components/FooterNavbar.vue";

export default {
  name: "PasswordFarmManager",
  components: {
    farmManagerNavbar,
    footerNavbar
  },
  data() {
    return {
      userBodyChangePassword: {
        username: sessionStorage.getItem("username"),
        password: null,
        newPassword: null,
        newPassword1: null
      },
      passwordMessage: null,
      newPasswordMessage: null,
      newPassword1Message: null,
      isSubmitting: false,
      showPassword: false,
      showNewPassword: false,
      showNewPassword1: false
    };
  },
  computed: {
    isFormValid() {
      return (
        this.userBodyChangePassword.password &&
        this.userBodyChangePassword.newPassword &&
        this.userBodyChangePassword.newPassword1 &&
        this.userBodyChangePassword.newPassword ===
          this.userBodyChangePassword.newPassword1 &&
        this.userBodyChangePassword.newPassword.length >= 6 &&
        !this.passwordMessage &&
        !this.newPasswordMessage &&
        !this.newPassword1Message
      );
    }
  },
  mounted() {
    this.animatePageEntry();
  },
  methods: {
    async changePassword() {
      // 清除之前的错误信息
      this.clearMessages();

      // 验证表单
      if (!this.validateForm()) {
        return;
      }

      try {
        this.isSubmitting = true;
        await changePassword(this.userBodyChangePassword);

        this.showToast("密码修改成功！", "success");

        // 延迟跳转，让用户看到成功消息
        setTimeout(() => {
          this.$router.go(-1); // 返回上一页
        }, 1500);
      } catch (error) {
        console.error("修改密码失败:", error);
        this.showToast("密码修改失败，请检查旧密码是否正确", "danger");
      } finally {
        this.isSubmitting = false;
      }
    },

    validateForm() {
      let isValid = true;

      // 验证旧密码
      if (!this.userBodyChangePassword.password) {
        this.passwordMessage = "请输入旧密码！";
        isValid = false;
      }

      // 验证新密码
      if (!this.userBodyChangePassword.newPassword) {
        this.newPasswordMessage = "请输入新密码！";
        isValid = false;
      } else if (this.userBodyChangePassword.newPassword.length < 6) {
        this.newPasswordMessage = "新密码长度至少6位！";
        isValid = false;
      } else if (
        this.userBodyChangePassword.newPassword ===
        this.userBodyChangePassword.password
      ) {
        this.newPasswordMessage = "新密码不能与旧密码相同！";
        isValid = false;
      }

      // 验证确认密码
      if (!this.userBodyChangePassword.newPassword1) {
        this.newPassword1Message = "请确认新密码！";
        isValid = false;
      } else if (
        this.userBodyChangePassword.newPassword !==
        this.userBodyChangePassword.newPassword1
      ) {
        this.newPassword1Message = "两次输入密码不一致，请重新输入！";
        isValid = false;
      }

      return isValid;
    },

    clearMessages() {
      this.passwordMessage = null;
      this.newPasswordMessage = null;
      this.newPassword1Message = null;
    },

    writePassword() {
      this.passwordMessage = null;

      // 检查是否与新密码相同
      if (
        this.userBodyChangePassword.newPassword &&
        this.userBodyChangePassword.password ===
          this.userBodyChangePassword.newPassword
      ) {
        this.newPasswordMessage = "新密码不能与旧密码相同！";
      } else if (this.newPasswordMessage === "新密码不能与旧密码相同！") {
        this.newPasswordMessage = null;
      }
    },

    writeNewPassword() {
      this.newPasswordMessage = null;

      const password = this.userBodyChangePassword.newPassword;

      if (password) {
        if (password.length < 6) {
          this.newPasswordMessage = "密码长度至少6位！";
        } else if (password === this.userBodyChangePassword.password) {
          this.newPasswordMessage = "新密码不能与旧密码相同！";
        }

        // 重新验证确认密码
        if (this.userBodyChangePassword.newPassword1) {
          this.writeNewPassword1();
        }
      }
    },

    writeNewPassword1() {
      this.newPassword1Message = null;

      if (this.userBodyChangePassword.newPassword1) {
        if (
          this.userBodyChangePassword.newPassword !==
          this.userBodyChangePassword.newPassword1
        ) {
          this.newPassword1Message = "两次输入密码不一致！";
        }
      }
    },

    togglePasswordVisibility(field) {
      switch (field) {
        case "password":
          this.showPassword = !this.showPassword;
          break;
        case "newPassword":
          this.showNewPassword = !this.showNewPassword;
          break;
        case "newPassword1":
          this.showNewPassword1 = !this.showNewPassword1;
          break;
      }
    },

    getPasswordStrength(password) {
      if (!password) return 0;

      let strength = 0;

      // 长度
      if (password.length >= 8) strength += 2;
      else if (password.length >= 6) strength += 1;

      // 包含小写字母
      if (/[a-z]/.test(password)) strength += 1;

      // 包含大写字母
      if (/[A-Z]/.test(password)) strength += 1;

      // 包含数字
      if (/\d/.test(password)) strength += 1;

      // 包含特殊字符
      if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;

      return strength;
    },

    getPasswordStrengthText(password) {
      const strength = this.getPasswordStrength(password);
      if (strength <= 2) return "弱";
      if (strength <= 4) return "中等";
      return "强";
    },

    getPasswordStrengthClass(password) {
      const strength = this.getPasswordStrength(password);
      if (strength <= 2) return "text-danger";
      if (strength <= 4) return "text-warning";
      return "text-success";
    },

    resetForm() {
      this.userBodyChangePassword.password = null;
      this.userBodyChangePassword.newPassword = null;
      this.userBodyChangePassword.newPassword1 = null;
      this.clearMessages();
      this.showToast("表单已重置", "info");
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

    showToast(message, type = "info") {
      const toastContainer =
        document.querySelector(".toast-container") ||
        this.createToastContainer();

      const toast = document.createElement("div");
      toast.className = "toast align-items-center text-white border-0";
      toast.classList.add(`bg-${type}`);
      toast.setAttribute("role", "alert");
      toast.setAttribute("aria-live", "assertive");
      toast.setAttribute("aria-atomic", "true");

      toast.innerHTML = `
        <div class="d-flex">
          <div class="toast-body">
            <i class="bi bi-${this.getToastIcon(type)} me-2"></i>${message}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      `;

      toastContainer.appendChild(toast);

      const bsToast = new bootstrap.Toast(toast, {
        autohide: true,
        delay: 3000
      });

      bsToast.show();

      toast.addEventListener("hidden.bs.toast", () => {
        toastContainer.removeChild(toast);
      });
    },

    createToastContainer() {
      const container = document.createElement("div");
      container.className = "toast-container position-fixed top-0 end-0 p-3";
      container.style.zIndex = "9999";
      document.body.appendChild(container);
      return container;
    },

    getToastIcon(type) {
      switch (type) {
        case "success":
          return "check-circle-fill";
        case "danger":
          return "exclamation-triangle-fill";
        case "warning":
          return "exclamation-triangle-fill";
        default:
          return "info-circle-fill";
      }
    }
  }
};
</script>

<style scoped>
.required::after {
  content: " *";
  color: var(--bs-danger);
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.form-control-farm {
  border: 2px solid var(--farm-primary-light);
  border-radius: 8px;
  transition: all 0.3s ease;
  padding-right: 2.5rem;
}

.form-control-farm:focus {
  border-color: var(--farm-primary);
  box-shadow: 0 0 0 0.2rem rgba(76, 175, 80, 0.25);
}

.form-control-farm:read-only {
  background-color: #f8f9fa;
  border-color: #dee2e6;
  cursor: not-allowed;
}

.alert-farm-info {
  background-color: rgba(76, 175, 80, 0.1);
  border: 1px solid var(--farm-primary-light);
  border-radius: 8px;
  color: var(--farm-primary-dark);
}

.card-farm {
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: none;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
}

.btn-farm-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
