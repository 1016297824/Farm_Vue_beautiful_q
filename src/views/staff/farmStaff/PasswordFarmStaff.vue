<template>
  <div>
    <!-- 导航栏 -->
    <farmStaffNavbar />

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
                <div v-if="newPasswordMessage" class="text-danger mt-1">
                  <i class="bi bi-exclamation-triangle me-1"></i
                  >{{ newPasswordMessage }}
                </div>
              </div>

              <!-- 确认新密码 -->
              <div class="mb-4">
                <label class="form-label-farm required">
                  <i class="bi bi-check2-square me-1"></i>确认新密码
                </label>
                <input
                  type="password"
                  class="form-control form-control-farm"
                  :class="{ 'is-invalid': newPassword1Message }"
                  v-model="userBodyChangePassword.newPassword1"
                  @input="writeNewPassword1"
                  placeholder="请再次输入新密码"
                  autocomplete="new-password"
                  required
                />
                <div v-if="newPassword1Message" class="text-danger mt-1">
                  <i class="bi bi-exclamation-triangle me-1"></i
                  >{{ newPassword1Message }}
                </div>
              </div>

              <!-- 提交按钮 -->
              <div class="d-grid gap-2">
                <button
                  type="submit"
                  class="btn btn-farm-primary btn-lg"
                  :disabled="isSubmitting"
                >
                  <span v-if="isSubmitting">
                    <i class="bi bi-arrow-clockwise me-2 spin"></i>修改中...
                  </span>
                  <span v-else>
                    <i class="bi bi-check-lg me-2"></i>修改密码
                  </span>
                </button>
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
import { changePassword } from "@/api/farmStaff.js";
import farmStaffNavbar from "@/components/Header/FarmStaffNavbar.vue";
import footerNavbar from "@/components/FooterNavbar.vue";

export default {
  name: "PasswordFarmStaff",
  components: {
    farmStaffNavbar,
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
      isSubmitting: false
    };
  },
  mounted() {
    this.animatePageEntry();
  },
  methods: {
    async changePassword() {
      if (
        this.userBodyChangePassword.password == null ||
        this.userBodyChangePassword.newPassword == null ||
        this.userBodyChangePassword.newPassword1 == null
      ) {
        if (this.userBodyChangePassword.password == null) {
          this.passwordMessage = "请输入旧密码！";
        }
        if (this.userBodyChangePassword.newPassword == null) {
          this.newPasswordMessage = "请输入新密码！";
        }
        if (this.userBodyChangePassword.newPassword1 == null) {
          this.newPassword1Message = "请确认新密码！";
        }
      } else if (
        this.userBodyChangePassword.newPassword !=
        this.userBodyChangePassword.newPassword1
      ) {
        this.newPassword1Message = "两次输入密码不一致，请再次确认！";
      } else {
        try {
          this.isSubmitting = true;
          await changePassword(this.userBodyChangePassword);
          this.showToast("密码修改成功！", "success");
          setTimeout(() => {
            this.$router.go(-1);
          }, 1500);
        } catch (error) {
          console.error("修改密码失败:", error);
          this.showToast("密码修改失败，请重试", "danger");
        } finally {
          this.isSubmitting = false;
        }
      }
    },

    writePassword() {
      this.passwordMessage = null;
    },

    writeNewPassword() {
      this.newPasswordMessage = null;
    },

    writeNewPassword1() {
      this.newPassword1Message = null;
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
}

.form-control-farm:focus {
  border-color: var(--farm-primary);
  box-shadow: 0 0 0 0.2rem rgba(76, 175, 80, 0.25);
}

.card-farm {
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: none;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
}
</style>
