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
                <i class="bi bi-person-plus me-2"></i>添加员工
              </h2>
              <p class="text-muted">填写员工基本信息</p>
            </div>

            <!-- 员工信息表单 -->
            <form @submit.prevent="addStaff">
              <div class="mb-3">
                <label class="form-label-farm">
                  <i class="bi bi-person me-1"></i>姓名：
                </label>
                <input
                  type="text"
                  class="form-control form-control-farm"
                  v-model="staff.name"
                  @keyup="writeName"
                  placeholder="请输入员工姓名"
                />
                <div class="form-text text-danger" v-if="nameMessage">
                  {{ nameMessage }}
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label-farm">
                  <i class="bi bi-card-text me-1"></i>身份证号：
                </label>
                <input
                  type="text"
                  class="form-control form-control-farm"
                  v-model="staff.idCardNo"
                  @keyup="writeIdCardNo"
                  placeholder="请输入身份证号"
                />
                <div class="form-text text-danger" v-if="idCardNoMessage">
                  {{ idCardNoMessage }}
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label-farm">
                  <i class="bi bi-telephone me-1"></i>电话号码：
                </label>
                <input
                  type="text"
                  class="form-control form-control-farm"
                  v-model="staff.telNumber"
                  @keyup="writeTelNumber"
                  placeholder="请输入手机号码"
                />
                <div class="form-text text-danger" v-if="telNumberMessage">
                  {{ telNumberMessage }}
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label-farm">
                  <i class="bi bi-envelope me-1"></i>邮箱：
                </label>
                <input
                  type="email"
                  class="form-control form-control-farm"
                  v-model="staff.email"
                  @keyup="writeEmail"
                  placeholder="请输入邮箱地址"
                />
                <div class="form-text text-danger" v-if="emailMessage">
                  {{ emailMessage }}
                </div>
              </div>

              <div class="mb-4">
                <label class="form-label-farm">
                  <i class="bi bi-house me-1"></i>住址：
                </label>
                <input
                  type="text"
                  class="form-control form-control-farm"
                  v-model="staff.address"
                  @keyup="writeAddress"
                  placeholder="请输入详细住址"
                />
                <div class="form-text text-danger" v-if="addressMessage">
                  {{ addressMessage }}
                </div>
              </div>

              <div class="d-grid">
                <button type="submit" class="btn btn-farm-primary btn-lg">
                  <i class="bi bi-check-circle me-2"></i>添加员工
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
import { addStaff } from "@/api/supermanager";
import superManagerNavbar from "@/components/Header/SuperManagerNavbar.vue";
import footerNavbar from "@/components/FooterNavbar.vue";

export default {
  name: "StaffAdd",
  components: {
    superManagerNavbar,
    footerNavbar
  },
  data() {
    return {
      staff: {
        name: null,
        idCardNo: null,
        telNumber: null,
        email: null,
        address: null
      },
      nameMessage: null,
      idCardNoMessage: null,
      telNumberMessage: null,
      emailMessage: null,
      addressMessage: null
    };
  },
  methods: {
    addStaff() {
      // 重置错误信息
      this.nameMessage = null;
      this.idCardNoMessage = null;
      this.telNumberMessage = null;
      this.emailMessage = null;
      this.addressMessage = null;

      // 验证必填字段
      let hasError = false;
      
      if (!this.staff.name) {
        this.nameMessage = "姓名不能为空！";
        hasError = true;
      }
      
      if (!this.staff.idCardNo) {
        this.idCardNoMessage = "身份证号不能为空！";
        hasError = true;
      }
      
      if (!this.staff.telNumber) {
        this.telNumberMessage = "手机号不能为空！";
        hasError = true;
      }
      
      if (!this.staff.email) {
        this.emailMessage = "邮箱不能为空！";
        hasError = true;
      }
      
      if (!this.staff.address) {
        this.addressMessage = "住址不能为空！";
        hasError = true;
      }
      
      if (hasError) {
        return;
      }

      // 验证格式
      let isValid = true;
      
      // 邮箱格式验证
      var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!regEmail.test(this.staff.email)) {
        this.emailMessage = "邮箱格式不正确！";
        isValid = false;
      }
      
      // 身份证号格式验证
      var regIdCardNo = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
      if (!regIdCardNo.test(this.staff.idCardNo)) {
        this.idCardNoMessage = "身份证号格式不正确！";
        isValid = false;
      }
      
      // 手机号格式验证
      var regTelNumber = /^(\+86)?1[3456789]\d{9}$/;
      if (!regTelNumber.test(this.staff.telNumber)) {
        this.telNumberMessage = "手机号格式不正确！";
        isValid = false;
      }
      
      // 姓名长度验证
      if (this.staff.name.length < 2) {
        this.nameMessage = "姓名长度不能少于2个字符！";
        isValid = false;
      }
      
      // 住址长度验证
      if (this.staff.address.length < 5) {
        this.addressMessage = "住址长度不能少于5个字符！";
        isValid = false;
      }

      if (isValid) {
        addStaff(this.staff);
      }
    },
    writeName() {
      this.nameMessage = null;
    },
    writeIdCardNo() {
      this.idCardNoMessage = null;
    },
    writeTelNumber() {
      this.telNumberMessage = null;
    },
    writeEmail() {
      this.emailMessage = null;
    },
    writeAddress() {
      this.addressMessage = null;
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
  background: linear-gradient(135deg, var(--farm-green), var(--farm-green-dark));
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