// 添加员工
<template>
  <div class="container">
    <br />
    <br />
    <br />
    <br />
    <br />
    <div class="row">
      <div class="col-lg-12">
        <div class="col-lg-12">
          <div class="col-lg-4 m-auto">
            <form action="">
              <input
                type="text"
                class="form-control"
                style="position:fixed;bottom:-9999px;"
              />
              <input
                type="password"
                class="form-control"
                style="position:fixed;bottom:-9999px;"
              />
              <div class="form-group text-left">
                <label for="">姓名</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="staff.name"
                  @keyup="writeName"
                />
                <p style="color: red;">
                  {{ nameMessage }}
                </p>
              </div>
              <div class="form-group text-left">
                <label for="">身份证号</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="staff.idCardNo"
                  @keyup="writeIdCardNo"
                />
                <p style="color: red;">
                  {{ idCardNoMessage }}
                </p>
              </div>
              <div class="form-group text-left">
                <label for="">电话号码</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="staff.telNumber"
                  @keyup="writeTelNumber"
                />
                <p style="color: red;">
                  {{ telNumberMessage }}
                </p>
              </div>
              <div class="form-group text-left">
                <label for="">邮箱</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="staff.email"
                  @keyup="writeEmail"
                />
                <p style="color: red;">
                  {{ emailMessage }}
                </p>
              </div>
              <div class="form-group text-left">
                <label for="">住址</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="staff.address"
                  @keyup="writeAddress"
                />
                <p style="color: red;">
                  {{ addressMessage }}
                </p>
              </div>
              <div class="col-lg-12" style="text-align:center">
                <input
                  type="button"
                  value="添加"
                  class="btn btn-primary"
                  @click="addStaff"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import { addStaff } from "@/api/farmManager";

export default {
  name: "StaffAdd",
  data: () => ({
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
  }),
  methods: {
    addStaff() {
      if (
        this.staff.name == null ||
        this.staff.idCardNo == null ||
        this.staff.telNumber == null ||
        this.staff.email == null ||
        this.staff.address == null
      ) {
        if (this.staff.name == null) {
          this.nameMessage = "姓名不能为空！";
        }
        if (this.staff.idCardNo == null) {
          this.idCardNoMessage = "身份证号不能为空！";
        }
        if (this.staff.telNumber == null) {
          this.telNumberMessage = "手机号不能为空！";
        }
        if (this.staff.email == null) {
          this.emailMessage = "邮箱不能为空！";
        }
        if (this.staff.address == null) {
          this.addressMessage = "住址不能为空！";
        }
      } else {
        let result = true;
        var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        var regIdCardNo = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        var regTelNulber = /^(\+86)?1[3456789]\d{9}$/;
        if (!regEmail.test(this.staff.email)) {
          result = false;
          this.emailMessage = "邮箱格式不正确！";
        }
        if (!regIdCardNo.test(this.staff.idCardNo)) {
          result = false;
          this.idCardNoMessage = "身份证号格式不正确！";
        }
        if (!regTelNulber.test(this.staff.telNumber)) {
          result = false;
          this.telNumberMessage = "手机号格式不正确！";
        }

        if (result) {
          addStaff(this.staff);
        }
      }
      // addStaff(this.staff);
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
