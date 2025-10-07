// 添加订单
<template>
  <div class="container">
    <div class="row">
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
                <div class="col-lg-8">
                  <label for="" class="font-weight-bold">选择时间</label>
                  <span>(9:00~21:00)</span>
                  <input
                    type="button"
                    class="btn btn-light offset-lg-3"
                    style="float:right"
                    value="返回"
                    @click="back"
                  />
                </div>
              </div>
              <br />
              <div class="row">
                <div class="col-lg-8">
                  <span>开始时间：</span>
                  <el-date-picker
                    v-model="pageBody.startTime"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm"
                    placeholder="选择日期时间"
                    :picker-options="pickerOptionsStartTime"
                    @change="startTimeChange"
                  >
                  </el-date-picker>
                  <!-- {{ pageBody.startTime }} -->
                </div>
              </div>
              <br />
              <span>结束时间：</span>
              <el-date-picker
                v-model="pageBody.endTime"
                type="datetime"
                format="yyyy-MM-dd HH:00"
                placeholder="选择日期时间"
                :picker-options="pickerOptionsEndTime"
                @change="endTimeChange"
              >
              </el-date-picker>
              <!-- {{ pageBody.endTime }} -->
              <!-- {{ pageBody.endTime | formatDate }} -->
            </div>
            <table class="table table-borderless">
              <thead>
                <tr>
                  <th class="text-truncate">
                    餐桌号
                  </th>
                  <th class="text-truncate">
                    类型
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(dt, index) in diningTableList" :key="index">
                  <td class="text-truncate">{{ dt.id }}</td>
                  <td class="text-truncate">{{ dt.type }}</td>
                  <td>
                    <input
                      type="button"
                      value="预定"
                      class="btn btn-primary"
                      @click="reserveAdd(dt)"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <nav aria-label="Page navigation">
              <ul class="pagination">
                <li class="page-item">
                  <a
                    class="page-link"
                    href="#"
                    aria-label="Previous"
                    @click="doPage(1)"
                  >
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                  </a>
                </li>
                <li
                  v-for="(page, index) in pageBody.pageList"
                  :key="index"
                  :class="
                    pageBody.page == page ? 'page-item active' : 'page-item'
                  "
                >
                  <a class="page-link" href="#" @click="doPage(page)">{{
                    page
                  }}</a>
                </li>
                <li class="page-item">
                  <a
                    class="page-link"
                    href="#"
                    aria-label="Next"
                    @click="doPage(pageBody.pages)"
                  >
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                  </a>
                </li>
              </ul>
            </nav>
          </form>
        </div>
      </div>
    </div>
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import bus from "@/util/Bus";
import moment from "moment";
import { formatDate } from "@/assets/js/date";
import { initDiningTable, doPage, reserveAdd } from "@/api/customer";

export default {
  name: "ReserveAdd",
  data: () => ({
    diningTableList: null,
    pageBody: {
      page: null,
      pages: null,
      pageList: null,
      startTime: null,
      endTime: null
    },
    pickerOptionsStartTime: {
      disabledDate: time => {
        return (
          time.getTime() < Date.now() - 8.64e7 ||
          time.getTime() > Date.now() + 6 * 8.64e7
        );
      }
    },
    pickerOptionsEndTime: {
      disabledDate: time => {
        return (
          time.getTime() < Date.now() - 8.64e7 ||
          time.getTime() > Date.now() + 6 * 8.64e7
        );
      }
    }
  }),
  methods: {
    doPage(page) {
      this.pageBody.page = page;
      doPage(this.pageBody);
    },
    reserveAdd(dt) {
      let con = confirm(
        `确认预定：${dt.id}号桌\n时间：${this.pageBody.startTime}至${this.pageBody.endTime}\n注意：预定后取消需联系工作人员`
      );
      if (con == true) {
        this.pageBody.page = 1;
        reserveAdd(dt, this.pageBody);
      }
    },
    back() {
      this.$router.push("reserve");
    },
    startTimeChange() {
      this.pageBody.startTime = new Date(this.pageBody.startTime);
      this.pageBody.endTime = new Date(this.pageBody.endTime);
      if (
        this.pageBody.startTime.getTime() >= this.pageBody.endTime.getTime()
      ) {
        let newEndTime = new Date(this.pageBody.startTime);
        this.pageBody.endTime = new Date(
          newEndTime.getTime() + 1 * 60 * 60 * 1000
        );
      }
      let newDate1 = new Date(this.pageBody.startTime);
      let newDate2 = new Date(this.pageBody.endTime);
      newDate1.setHours(9);
      newDate1.setMinutes(0);
      newDate1.setSeconds(0);
      newDate1.setMilliseconds(0);
      newDate2.setHours(21);
      newDate2.setMinutes(0);
      newDate2.setSeconds(0);
      newDate2.setMilliseconds(0);
      if (newDate1.getTime() > this.pageBody.startTime.getTime()) {
        this.pageBody.startTime.setHours(9);
        this.pageBody.endTime.setHours(10);
      }
      if (newDate2.getTime() <= this.pageBody.startTime.getTime()) {
        this.pageBody.startTime.setHours(20);
        this.pageBody.endTime.setHours(21);
      }
      this.pageBody.startTime.setMinutes(0);
      this.pageBody.startTime.setSeconds(0);
      this.pageBody.startTime.setMilliseconds(0);
      this.pageBody.endTime.setMinutes(0);
      this.pageBody.endTime.setSeconds(0);
      this.pageBody.endTime.setMilliseconds(0);
      this.pageBody.startTime = moment(this.pageBody.startTime)
        .utcOffset(480)
        .format("YYYY-MM-DD HH:mm:ss");
      this.pageBody.endTime = moment(this.pageBody.endTime)
        .utcOffset(480)
        .format("YYYY-MM-DD HH:mm:ss");
      this.doPage(1);
    },
    endTimeChange() {
      this.pageBody.startTime = new Date(this.pageBody.startTime);
      this.pageBody.endTime = new Date(this.pageBody.endTime);
      if (
        this.pageBody.startTime.getTime() >= this.pageBody.endTime.getTime()
      ) {
        let newStartTime = new Date(this.pageBody.endTime);
        this.pageBody.startTime = new Date(
          newStartTime.getTime() - 1 * 60 * 60 * 1000
        );
      }
      let newDate1 = new Date(this.pageBody.startTime);
      let newDate2 = new Date(this.pageBody.endTime);
      newDate1.setHours(9);
      newDate1.setMinutes(0);
      newDate1.setSeconds(0);
      newDate1.setMilliseconds(0);
      newDate2.setHours(21);
      newDate2.setMinutes(0);
      newDate2.setSeconds(0);
      newDate2.setMilliseconds(0);
      if (newDate1.getTime() >= this.pageBody.endTime.getTime()) {
        this.pageBody.startTime.setHours(9);
        this.pageBody.endTime.setHours(10);
      }
      if (newDate2.getTime() < this.pageBody.endTime.getTime()) {
        this.pageBody.startTime.setHours(20);
        this.pageBody.endTime.setHours(21);
      }
      this.pageBody.startTime.setMinutes(0);
      this.pageBody.startTime.setSeconds(0);
      this.pageBody.startTime.setMilliseconds(0);
      this.pageBody.endTime.setMinutes(0);
      this.pageBody.endTime.setSeconds(0);
      this.pageBody.endTime.setMilliseconds(0);
      this.pageBody.startTime = moment(this.pageBody.startTime)
        .utcOffset(480)
        .format("YYYY-MM-DD HH:mm:ss");
      this.pageBody.endTime = moment(this.pageBody.endTime)
        .utcOffset(480)
        .format("YYYY-MM-DD HH:mm:ss");
      this.doPage(1);
    }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh : 00 : 00");
    }
  },
  created() {
    initDiningTable();
    bus.$on(bus.diningTableList, data => {
      this.diningTableList = data;
    });
    bus.$on(bus.pageBody, data => {
      this.pageBody = data;
    });
  },
  mounted() {},
  beforeDestroy() {
    bus.$off(bus.diningTableList);
    bus.$off(bus.pageBody);
  }
};
</script>
