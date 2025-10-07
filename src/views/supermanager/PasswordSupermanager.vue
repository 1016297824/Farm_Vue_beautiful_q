<template>
  <div>
    <!-- 导航栏 -->
    <superManagerNavbar />

    <!-- 主体内容 -->
    <div class="container" style="padding-top: 100px; padding-bottom: 120px;">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="card-farm p-4">
            <!-- 页面标题 -->
            <div class="text-center mb-4">
              <h2 class="farm-title mb-2">
                <i class="bi bi-key me-2"></i>修改密码
              </h2>
              <p class="text-muted">为了账户安全，请定期更换密码</p>
            </div>

            <!-- 密码修改表单 -->
            <form @submit.prevent="changePassword">
              <div class="mb-3">
                <label class="form-label-farm">
                  <i class="bi bi-person me-1"></i>工号：
                </label>
                <input
                  type="text"
                  class="form-control form-control-farm"
                  readonly
                  v-model="userBodyChangePassword.username"
                />
              </div>

              <div class="mb-3">
                <label class="form-label-farm">
                  <i class="bi bi-lock me-1"></i>旧密码：
                </label>
                <div class="input-group">
                  <input
                    :type="showOldPassword ? 'text' : 'password'"
                    class="form-control form-control-farm"
                    v-model="userBodyChangePassword.password"
                    @keyup="writePassword"
                    placeholder="请输入旧密码"
                  />
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    @click="showOldPassword = !showOldPassword"
                  >
                    <i
                      :class="showOldPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"
                    ></i>
                  </button>
                </div>
                <div class="form-text text-danger" v-if="passwordMessage">
                  {{ passwordMessage }}
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label-farm">
                  <i class="bi bi-lock-fill me-1"></i>新密码：
                </label>
                <div class="input-group">
                  <input
                    :type="showNewPassword ? 'text' : 'password'"
                    class="form-control form-control-farm"
                    v-model="userBodyChangePassword.newPassword"
                    @keyup="writeNewPassword"
                    placeholder="请输入新密码"
                  />
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    @click="showNewPassword = !showNewPassword"
                  >
                    <i
                      :class="showNewPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"
                    ></i>
                  </button>
                </div>
                <div class="form-text text-danger" v-if="newPasswordMessage">
                  {{ newPasswordMessage }}
                </div>
              </div>

              <div class="mb-4">
                <label class="form-label-farm">
                  <i class="bi bi-lock-fill me-1"></i>确认新密码：
                </label>
                <div class="input-group">
                  <input
                    :type="showConfirmPassword ? 'text' : 'password'"
                    class="form-control form-control-farm"
                    v-model="userBodyChangePassword.newPassword1"
                    @keyup="writeNewPassword1"
                    placeholder="请再次输入新密码"
                  />
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    @click="showConfirmPassword = !showConfirmPassword"
                  >
                    <i
                      :class="
                        showConfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'
                      "
                    ></i>
                  </button>
                </div>
                <div class="form-text text-danger" v-if="newPassword1Message">
                  {{ newPassword1Message }}
                </div>
              </div>

              <div class="d-grid">
                <button type="submit" class="btn btn-farm-primary btn-lg">
                  <i class="bi bi-check-circle me-2"></i>确认修改
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
import { changePassword } from "@/api/supermanager.js";
import superManagerNavbar from "@/components/Header/SuperManagerNavbar.vue";
import footerNavbar from "@/components/FooterNavbar.vue";

export default {
  name: "PasswordSupermanager",
  components: {
    superManagerNavbar,
    footerNavbar
  },
  data() {
    return {
      showOldPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
      userBodyChangePassword: {
        username: sessionStorage.getItem("username"),
        password: null,
        newPassword: null,
        newPassword1: null
      },
      passwordMessage: null,
      newPasswordMessage: null,
      newPassword1Message: null
    };
  },
  methods: {
    changePassword() {
      // 重置错误信息
      this.passwordMessage = null;
      this.newPasswordMessage = null;
      this.newPassword1Message = null;

      // 验证输入
      if (!this.userBodyChangePassword.password) {
        this.passwordMessage = "请输入旧密码！";
        return;
      }

      if (!this.userBodyChangePassword.newPassword) {
        this.newPasswordMessage = "请输入新密码！";
        return;
      }

      if (!this.userBodyChangePassword.newPassword1) {
        this.newPassword1Message = "请确认新密码！";
        return;
      }

      if (
        this.userBodyChangePassword.newPassword !==
        this.userBodyChangePassword.newPassword1
      ) {
        this.newPassword1Message = "两次输入密码不一致，请再次确认！";
        return;
      }

      // 密码强度检查
      if (this.userBodyChangePassword.newPassword.length < 6) {
        this.newPasswordMessage = "新密码长度不能少于6位！";
        return;
      }

      changePassword(this.userBodyChangePassword);
    },
    writePassword() {
      this.passwordMessage = null;
    },
    writeNewPassword() {
      this.newPasswordMessage = null;
    },
    writeNewPassword1() {
      this.newPassword1Message = null;
    }
  }
};
</script>

<style scoped>
.form-label-farm {
  font-weight: 600;
  color: var(--farm-green-dark);
  margin-bottom: 0.5rem;
}

.form-control-farm {
  border: 2px solid var(--farm-border-light);
  border-radius: 8px;
  padding: 0.75rem;
  transition: border-color 0.3s ease;
}

.form-control-farm:focus {
  border-color: var(--farm-green);
  box-shadow: 0 0 0 0.2rem rgba(76, 175, 80, 0.25);
}

.btn-farm-primary {
  background: linear-gradient(
    135deg,
    var(--farm-green),
    var(--farm-green-dark)
  );
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
}

.btn-farm-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(76, 175, 80, 0.4);
  background: linear-gradient(135deg, var(--farm-green-dark), #2e7d32);
}

@media (max-width: 768px) {
  .card-farm {
    padding: 1.5rem !important;
  }

  .farm-title {
    font-size: 1.5rem;
  }
}
</style>
