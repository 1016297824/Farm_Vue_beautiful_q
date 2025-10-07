// 报修报损
<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="col-lg-8 m-auto">
          <br />
          <br />
          <br />
          <form action="">
            <div class="form-group text-left">
              <div class="row">
                <div class="col-lg-12">
                  <div class="row">
                    <div class="col-lg-2">
                      <label for="" class="font-weight-bold">选择类型</label>
                    </div>
                    <div class="col-lg-3">
                      <select class="form-control" v-model="repair.repairType">
                        <option
                          v-for="(rt, index) in repairType"
                          :key="index"
                          :value="rt"
                        >
                          {{ rt }}
                        </option>
                      </select>
                    </div>
                    <div class="col-lg-7"></div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <br />
            <div class="form-group">
              <label for="comment">{{ repair.repairType + "内容：" }}</label>
              <p style="color: red;">
                {{ repair1Message }}
              </p>
              <textarea
                class="form-control"
                rows="3"
                id="comment"
                v-model="repair.content"
                @keyup="contentWrite"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="comment">{{ repair.repairType + "原因：" }}</label>
              <p style="color: red;">
                {{ repair2Message }}
              </p>
              <textarea
                class="form-control"
                rows="7"
                id="comment"
                v-model="repair.cause"
                @keyup="causeWrite"
              ></textarea>
            </div>
            <br />
            <div class="col-lg-12" style="text-align:center">
              <input
                type="button"
                value="提交"
                class="btn btn-primary"
                @click="submitRepair"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import bus from "@/util/Bus";
import { submitRepair } from "@/api/restaurantStaff.js";

export default {
  name: "Repair",
  data: () => ({
    repairType: ["报修", "报损"],
    repair: {
      repairType: "报修",
      content: null,
      cause: null
    },
    repair1Message: null,
    repair2Message: null
  }),
  methods: {
    submitRepair() {
      if (this.repair.content == null || this.repair.cause == null) {
        if (this.repair.content == null) {
          this.repair1Message = "请输入" + this.repair.repairType + "内容！";
        }
        if (this.repair.cause == null) {
          this.repair2Message = "请输入" + this.repair.repairType + "内容！";
        }
      } else {
        submitRepair(this.repair);
      }
    },
    contentWrite() {
      this.repair1Message = null;
    },
    causeWrite() {
      this.repair2Message = null;
    }
  },
  created() {
    bus.$on(bus.repair, data => {
      this.repair = data;
    });
  },
  beforeDestroy() {
    bus.$off(bus.repair);
  }
};
</script>
