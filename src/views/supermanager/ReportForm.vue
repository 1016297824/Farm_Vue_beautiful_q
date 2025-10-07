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
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { downloadAttendanceExcel } from "@/api/supermanager.js";

export default {
  name: "ReportForm",
  data: () => ({
    choosedDate: new Date()
  }),
  methods: {
    downloadAttendanceExcel() {
      downloadAttendanceExcel(this.choosedDate);
    }
  }
};
</script>
