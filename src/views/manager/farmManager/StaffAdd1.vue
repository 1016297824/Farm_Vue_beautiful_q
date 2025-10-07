// 添加员工
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
                <i class="bi bi-person-plus-fill me-2"></i>添加员工
              </h2>
              <p class="text-muted">填写员工基本信息，所有字段都是必填项</p>
            </div>

            <!-- 员工信息表单 -->
            <form @submit.prevent="addStaff">
              <!-- 隐藏的自动填充防止字段 -->
              <input type="text" style="display:none;" autocomplete="off" />
              <input type="password" style="display:none;" autocomplete="off" />

              <!-- 姓名 -->
              <div class="mb-3">
                <label class="form-label-farm required">
                  <i class="bi bi-person me-1"></i>姓名
                </label>
                <input
                  type="text"
                  class="form-control form-control-farm"
                  :class="{
                    'is-invalid': nameMessage,
                    'is-valid': staff.name && !nameMessage
                  }"
                  v-model="staff.name"
                  @input="validateName"
                  placeholder="请输入员工姓名"
                  autocomplete="off"
                  required
                />
                <div v-if="nameMessage" class="text-danger mt-1">
                  <i class="bi bi-exclamation-triangle me-1"></i
                  >{{ nameMessage }}
                </div>
              </div>

              <!-- 身份证号 -->
              <div class="mb-3">
                <label class="form-label-farm required">
                  <i class="bi bi-card-text me-1"></i>身份证号
                </label>
                <input
                  type="text"
                  class="form-control form-control-farm"
                  :class="{
                    'is-invalid': idCardNoMessage,
                    'is-valid': staff.idCardNo && !idCardNoMessage
                  }"
                  v-model="staff.idCardNo"
                  @input="validateIdCardNo"
                  placeholder="请输兕18位身份证号码"
                  maxlength="18"
                  autocomplete="off"
                  required
                />
                <div v-if="idCardNoMessage" class="text-danger mt-1">
                  <i class="bi bi-exclamation-triangle me-1"></i
                  >{{ idCardNoMessage }}
                </div>
                <div
                  v-else-if="staff.idCardNo && !idCardNoMessage"
                  class="text-success mt-1"
                >
                  <i class="bi bi-check-circle me-1"></i>身份证号格式正确
                </div>
              </div>

              <!-- 电话号码 -->
              <div class="mb-3">
                <label class="form-label-farm required">
                  <i class="bi bi-telephone me-1"></i>电话号码
                </label>
                <input
                  type="tel"
                  class="form-control form-control-farm"
                  :class="{
                    'is-invalid': telNumberMessage,
                    'is-valid': staff.telNumber && !telNumberMessage
                  }"
                  v-model="staff.telNumber"
                  @input="validateTelNumber"
                  placeholder="请输入11位手机号码"
                  maxlength="11"
                  autocomplete="off"
                  required
                />
                <div v-if="telNumberMessage" class="text-danger mt-1">
                  <i class="bi bi-exclamation-triangle me-1"></i
                  >{{ telNumberMessage }}
                </div>
                <div
                  v-else-if="staff.telNumber && !telNumberMessage"
                  class="text-success mt-1"
                >
                  <i class="bi bi-check-circle me-1"></i>手机号码格式正确
                </div>
              </div>

              <!-- 邮箱 -->
              <div class="mb-3">
                <label class="form-label-farm required">
                  <i class="bi bi-envelope me-1"></i>邮箱地址
                </label>
                <input
                  type="email"
                  class="form-control form-control-farm"
                  :class="{
                    'is-invalid': emailMessage,
                    'is-valid': staff.email && !emailMessage
                  }"
                  v-model="staff.email"
                  @input="validateEmail"
                  placeholder="请输入邮箱地址，如：zhangsan@farm.com"
                  autocomplete="off"
                  required
                />
                <div v-if="emailMessage" class="text-danger mt-1">
                  <i class="bi bi-exclamation-triangle me-1"></i
                  >{{ emailMessage }}
                </div>
                <div
                  v-else-if="staff.email && !emailMessage"
                  class="text-success mt-1"
                >
                  <i class="bi bi-check-circle me-1"></i>邮箱格式正确
                </div>
              </div>

              <!-- 住址 -->
              <div class="mb-4">
                <label class="form-label-farm required">
                  <i class="bi bi-geo-alt me-1"></i>家庭住址
                </label>
                <textarea
                  class="form-control form-control-farm"
                  :class="{
                    'is-invalid': addressMessage,
                    'is-valid': staff.address && !addressMessage
                  }"
                  v-model="staff.address"
                  @input="validateAddress"
                  placeholder="请输入详细家庭住址"
                  rows="3"
                  autocomplete="off"
                  required
                ></textarea>
                <div v-if="addressMessage" class="text-danger mt-1">
                  <i class="bi bi-exclamation-triangle me-1"></i
                  >{{ addressMessage }}
                </div>
              </div>

              <!-- 提交按钮组 -->
              <div class="d-grid gap-2">
                <button
                  type="submit"
                  class="btn btn-farm-primary btn-lg"
                  :disabled="isSubmitting || !isFormValid"
                >
                  <span v-if="isSubmitting">
                    <i class="bi bi-arrow-clockwise me-2 spin"></i>添加中...
                  </span>
                  <span v-else>
                    <i class="bi bi-person-plus me-2"></i>添加员工
                  </span>
                </button>
                <div class="row g-2">
                  <div class="col">
                    <button
                      type="button"
                      class="btn btn-outline-secondary w-100"
                      @click="resetForm"
                    >
                      <i class="bi bi-arrow-clockwise me-2"></i>重置表单
                    </button>
                  </div>
                  <div class="col">
                    <button
                      type="button"
                      class="btn btn-outline-primary w-100"
                      @click="goBack"
                    >
                      <i class="bi bi-arrow-left me-2"></i>返回列表
                    </button>
                  </div>
                </div>
              </div>
            </form>

            <!-- 注意事项 -->
            <div class="alert alert-farm-info mt-4" role="alert">
              <h6 class="alert-heading">
                <i class="bi bi-info-circle me-2"></i>注意事项
              </h6>
              <ul class="mb-0 small">
                <li>所有字段都是必填项，请确保信息准确无误</li>
                <li>身份证号将用于员工身份验证，请确保真实有效</li>
                <li>手机号码用于紧急联系，请保持畅通</li>
                <li>添加成功后，系统将自动生成员工工号和初始密码</li>
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
import { addStaff } from "@/api/farmManager";
import farmManagerNavbar from "@/components/Header/FarmManagerNavbar.vue";
import footerNavbar from "@/components/FooterNavbar.vue";

export default {
  name: "StaffAdd1",
  components: {
    farmManagerNavbar,
    footerNavbar
  },
  data() {
    return {
      staff: {
        name: "",
        idCardNo: "",
        telNumber: "",
        email: "",
        address: ""
      },
      nameMessage: null,
      idCardNoMessage: null,
      telNumberMessage: null,
      emailMessage: null,
      addressMessage: null,
      isSubmitting: false
    };
  },
  computed: {
    isFormValid() {
      return (
        this.staff.name.trim() &&
        this.staff.idCardNo.trim() &&
        this.staff.telNumber.trim() &&
        this.staff.email.trim() &&
        this.staff.address.trim() &&
        !this.nameMessage &&
        !this.idCardNoMessage &&
        !this.telNumberMessage &&
        !this.emailMessage &&
        !this.addressMessage
      );
    }
  },
  mounted() {
    this.animatePageEntry();
  },
  methods: {
    async addStaff() {
      // 清除之前的错误信息
      this.clearMessages();

      // 验证表单
      if (!this.validateAllFields()) {
        return;
      }

      try {
        this.isSubmitting = true;

        // 格式化数据
        const staffData = {
          name: this.staff.name.trim(),
          idCardNo: this.staff.idCardNo.trim().toUpperCase(),
          telNumber: this.staff.telNumber.trim(),
          email: this.staff.email.trim().toLowerCase(),
          address: this.staff.address.trim()
        };

        await addStaff(staffData);

        this.showToast(`员工 ${staffData.name} 添加成功！`, "success");

        // 延迟跳转，让用户看到成功消息
        setTimeout(() => {
          this.$router.push("/manager/farmManager/staffShow1");
        }, 1500);
      } catch (error) {
        console.error("添加员工失败:", error);

        // 根据错误类型显示不同消息
        if (error.message && error.message.includes("身份证")) {
          this.idCardNoMessage = "身份证号已存在，请检查后重试";
        } else if (error.message && error.message.includes("手机")) {
          this.telNumberMessage = "手机号已存在，请检查后重试";
        } else if (error.message && error.message.includes("邮箱")) {
          this.emailMessage = "邮箱地址已存在，请检查后重试";
        } else {
          this.showToast("添加员工失败，请检查信息后重试", "danger");
        }
      } finally {
        this.isSubmitting = false;
      }
    },

    validateAllFields() {
      let isValid = true;

      // 验证姓名
      if (!this.staff.name.trim()) {
        this.nameMessage = "请输入员工姓名！";
        isValid = false;
      } else if (this.staff.name.trim().length < 2) {
        this.nameMessage = "姓名至少需要 2 个字符！";
        isValid = false;
      }

      // 验证身份证
      if (!this.staff.idCardNo.trim()) {
        this.idCardNoMessage = "请输入身份证号！";
        isValid = false;
      } else if (!this.isValidIdCard(this.staff.idCardNo)) {
        this.idCardNoMessage = "身份证号格式不正确！";
        isValid = false;
      }

      // 验证手机号
      if (!this.staff.telNumber.trim()) {
        this.telNumberMessage = "请输入手机号码！";
        isValid = false;
      } else if (!this.isValidPhone(this.staff.telNumber)) {
        this.telNumberMessage = "手机号码格式不正确！";
        isValid = false;
      }

      // 验证邮箱
      if (!this.staff.email.trim()) {
        this.emailMessage = "请输入邮箱地址！";
        isValid = false;
      } else if (!this.isValidEmail(this.staff.email)) {
        this.emailMessage = "邮箱地址格式不正确！";
        isValid = false;
      }

      // 验证地址
      if (!this.staff.address.trim()) {
        this.addressMessage = "请输入家庭住址！";
        isValid = false;
      } else if (this.staff.address.trim().length < 5) {
        this.addressMessage = "请输入详细的住址信息！";
        isValid = false;
      }

      return isValid;
    },

    validateName() {
      this.nameMessage = null;
      const name = this.staff.name.trim();

      if (name && name.length < 2) {
        this.nameMessage = "姓名至少需要 2 个字符";
      } else if (name && name.length > 20) {
        this.nameMessage = "姓名不能超过 20 个字符";
      }
    },

    validateIdCardNo() {
      this.idCardNoMessage = null;
      const idCard = this.staff.idCardNo.trim();

      if (idCard && !this.isValidIdCard(idCard)) {
        this.idCardNoMessage = "请输入正确的 18 位身份证号码";
      }
    },

    validateTelNumber() {
      this.telNumberMessage = null;
      const phone = this.staff.telNumber.trim();

      if (phone && !this.isValidPhone(phone)) {
        this.telNumberMessage = "请输入正确的 11 位手机号码";
      }
    },

    validateEmail() {
      this.emailMessage = null;
      const email = this.staff.email.trim();

      if (email && !this.isValidEmail(email)) {
        this.emailMessage = "请输入正确的邮箱地址格式";
      }
    },

    validateAddress() {
      this.addressMessage = null;
      const address = this.staff.address.trim();

      if (address && address.length < 5) {
        this.addressMessage = "请输入详细的住址信息（至少5个字符）";
      } else if (address && address.length > 200) {
        this.addressMessage = "地址信息不能超过 200 个字符";
      }
    },

    // 校验函数
    isValidIdCard(idCard) {
      const regIdCard = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      return regIdCard.test(idCard);
    },

    isValidPhone(phone) {
      const regPhone = /^1[3-9]\d{9}$/;
      return regPhone.test(phone);
    },

    isValidEmail(email) {
      const regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regEmail.test(email);
    },

    clearMessages() {
      this.nameMessage = null;
      this.idCardNoMessage = null;
      this.telNumberMessage = null;
      this.emailMessage = null;
      this.addressMessage = null;
    },

    resetForm() {
      this.staff = {
        name: "",
        idCardNo: "",
        telNumber: "",
        email: "",
        address: ""
      };
      this.clearMessages();
      this.showToast("表单已重置", "info");
    },

    goBack() {
      if (this.hasFormData()) {
        if (confirm("表单中有未保存的数据，确定要离开吗？")) {
          this.$router.push("/manager/farmManager/staffShow1");
        }
      } else {
        this.$router.push("/manager/farmManager/staffShow1");
      }
    },

    hasFormData() {
      return (
        this.staff.name.trim() ||
        this.staff.idCardNo.trim() ||
        this.staff.telNumber.trim() ||
        this.staff.email.trim() ||
        this.staff.address.trim()
      );
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
  padding: 0.75rem 1rem;
}

.form-control-farm:focus {
  border-color: var(--farm-primary);
  box-shadow: 0 0 0 0.2rem rgba(76, 175, 80, 0.25);
}

.form-control-farm.is-valid {
  border-color: #198754;
}

.form-control-farm.is-invalid {
  border-color: #dc3545;
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

.form-control-farm:invalid {
  border-color: #dc3545;
}

.form-control-farm:valid:not(:placeholder-shown) {
  border-color: #198754;
}

@media (max-width: 768px) {
  .card-farm {
    margin: 1rem;
    padding: 1rem !important;
  }

  .farm-title {
    font-size: 1.5rem;
  }
}
</style>
