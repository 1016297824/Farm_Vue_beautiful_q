<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="col-lg-12">
          <div class="col-lg-8 m-auto">
            <br />
            <br />
            <br />
            <br />
            <br />
            <form action="">
              <div class="form-group text-left">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="row">
                      <div class="col-lg-4">
                        <label for="" class="font-weight-bold">考勤信息:</label>
                      </div>
                      <div class="col-lg-4">
                        <el-date-picker
                          v-model="choosedDate"
                          type="month"
                          placeholder="选择月"
                        >
                        </el-date-picker>
                      </div>
                      <div class="col-lg-4">
                        <input
                          type="button"
                          class="btn btn-primary"
                          style="float:right"
                          value="导出"
                          @click="downloadAttendanceExcel"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div class="form-group text-left">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="row">
                      <div class="col-lg-4">
                        <label for="" class="font-weight-bold">农场收入:</label>
                      </div>
                      <div class="col-lg-4">
                        <el-date-picker
                          v-model="choosedDate1"
                          type="month"
                          placeholder="选择月"
                        >
                        </el-date-picker>
                      </div>
                      <div class="col-lg-4">
                        <input
                          type="button"
                          class="btn btn-primary"
                          style="float:right"
                          value="导出"
                          @click="downloadMonthSaleExcel"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div class="row">
                  <div class="col-lg-12">
                    <div class="row">
                      <div class="col-lg-4"></div>
                      <div class="col-lg-4">
                        <el-date-picker
                          v-model="choosedDate2"
                          type="date"
                          placeholder="选择日"
                        >
                        </el-date-picker>
                      </div>
                      <div class="col-lg-4">
                        <input
                          type="button"
                          class="btn btn-primary"
                          style="float:right"
                          value="导出"
                          @click="downloadDaySaleExcel"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div class="form-group text-left">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="row">
                      <div class="col-lg-4">
                        <label for="" class="font-weight-bold">农场支出:</label>
                      </div>
                      <div class="col-lg-4">
                        <el-date-picker
                          v-model="choosedDate3"
                          type="month"
                          placeholder="选择月"
                        >
                        </el-date-picker>
                      </div>
                      <div class="col-lg-4">
                        <input
                          type="button"
                          class="btn btn-primary"
                          style="float:right"
                          value="导出"
                          @click="downloadMonthPurchaseExcel"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div class="row">
                  <div class="col-lg-12">
                    <div class="row">
                      <div class="col-lg-4"></div>
                      <div class="col-lg-4">
                        <el-date-picker
                          v-model="choosedDate4"
                          type="date"
                          placeholder="选择日"
                        >
                        </el-date-picker>
                      </div>
                      <div class="col-lg-4">
                        <input
                          type="button"
                          class="btn btn-primary"
                          style="float:right"
                          value="导出"
                          @click="downloadDayPurchaseExcel"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  downloadAttendanceExcel,
  downloadDaySaleExcel,
  downloadMonthSaleExcel,
  downloadDayPurchaseExcel,
  downloadMonthPurchaseExcel
} from "@/api/farmManager.js";

export default {
  name: "ReportForm1",
  data: () => ({
    choosedDate: new Date(),
    choosedDate1: new Date(),
    choosedDate2: new Date(),
    choosedDate3: new Date(),
    choosedDate4: new Date()
  }),
  methods: {
    downloadAttendanceExcel() {
      downloadAttendanceExcel(this.choosedDate);
    },
    downloadMonthSaleExcel() {
      downloadMonthSaleExcel(this.choosedDate1);
    },
    downloadDaySaleExcel() {
      downloadDaySaleExcel(this.choosedDate2);
    },
    downloadMonthPurchaseExcel() {
      downloadMonthPurchaseExcel(this.choosedDate3);
    },
    downloadDayPurchaseExcel() {
      downloadDayPurchaseExcel(this.choosedDate4);
    }
  }
};
</script>
