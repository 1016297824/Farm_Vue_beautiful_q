// 考勤管理（农场管理员）
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
                    <label for="" class="font-weight-bold">考勤信息</label>
                    <el-date-picker
                      v-model="choosedDate"
                      style="float:right"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      @change="chooseDate"
                    >
                    </el-date-picker>
                  </div>
                </div>
              </div>
              <hr />
              <table class="table table-borderless">
                <thead>
                  <tr>
                    <th style="text-align: center;" class="text-truncate">
                      工号
                    </th>
                    <th style="text-align: center;" class="text-truncate">
                      姓名
                    </th>
                    <th style="text-align: center;" class="text-truncate">
                      工时
                    </th>
                    <td>
                      <input
                        type="button"
                        value="提交"
                        class="btn btn-primary offset-lg-6"
                        style="float:right"
                        @click="updateAttendance"
                      />
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(attendance, index) in attendanceList1"
                    :key="index"
                  >
                    <td style="text-align: center;" class="text-truncate">
                      {{ attendance.staff.username }}
                    </td>
                    <td style="text-align: center;" class="text-truncate">
                      {{ attendance.staff.name }}
                    </td>
                    <td style="text-align: center;" class="text-truncate">
                      <select
                        v-model="attendance.workingHours"
                        @change="changeWorkingHours(attendance)"
                      >
                        <option
                          v-for="(workingHours, index) in workingHoursList"
                          :key="index"
                          :value="workingHours"
                        >
                          {{ workingHours }}
                        </option>
                      </select>
                      {{ "小时" }}
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
                    v-for="(page, index) in pageBody1.pageList"
                    :key="index"
                    :class="
                      pageBody1.page == page ? 'page-item active' : 'page-item'
                    "
                  >
                    <a class="page-link" href="#" @click="doPage(page)">
                      {{ page }}
                    </a>
                  </li>
                  <li class="page-item">
                    <a
                      class="page-link"
                      href="#"
                      aria-label="Next"
                      @click="doPage(pageBody1.pages)"
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
    </div>
  </div>
</template>

<script>
import bus from "@/util/Bus";
// import moment from "moment";
import {
  initAttendance,
  updateAttendance,
  chooseDate
} from "@/api/farmManager.js";

export default {
  name: "Attendance1",
  data: () => ({
    choosedDate: new Date(),
    attendanceList: [],
    attendanceList1: [],
    pageBody1: {
      page: null,
      pages: null,
      pageList: []
    },
    workingHoursList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  }),
  methods: {
    updateAttendance() {
      let con = confirm(`是否提交更改？`);
      if (con == true) {
        updateAttendance(this.attendanceList, this.choosedDate);
      }
    },
    changeWorkingHours(attendance) {
      for (let i = 0; i < this.attendanceList.length; i++) {
        if (this.attendanceList[i].id == attendance.id) {
          this.attendanceList[i].workingHours = attendance.workingHours;
        }
      }
    },
    chooseDate() {
      chooseDate(this.choosedDate);
    },
    doPage(page) {
      this.attendanceList1 = [];
      if (this.pageBody1.pages <= 5) {
        if (this.pageBody1.pages == page) {
          for (let i = (page - 1) * 5; i < this.attendanceList.length; i++) {
            this.attendanceList1.push(this.attendanceList[i]);
          }
        } else {
          for (let i = (page - 1) * 5; i < page * 5; i++) {
            this.attendanceList1.push(this.attendanceList[i]);
          }
        }
      } else {
        this.pageBody1.pageList = [];
        if (page > this.pageBody1.pages - 2) {
          for (
            let i = this.pageBody1.pages - 5;
            i < this.pageBody1.pages;
            i++
          ) {
            this.pageBody1.pageList.push(i + 1);
          }
          if (this.pageBody1.pages == page) {
            for (let i = (page - 1) * 5; i < this.attendanceList.length; i++) {
              this.attendanceList1.push(this.attendanceList[i]);
            }
          } else {
            for (let i = (page - 1) * 5; i < page * 5; i++) {
              this.attendanceList1.push(this.attendanceList[i]);
            }
          }
        } else if (page <= 2) {
          for (let i = 0; i < 5; i++) {
            this.pageBody1.pageList.push(i + 1);
          }
          for (let i = (page - 1) * 5; i < page * 5; i++) {
            this.attendanceList1.push(this.attendanceList[i]);
          }
        } else {
          for (let i = page - 2; i <= page + 2; i++) {
            this.pageBody1.pageList.push(i);
          }
          for (let i = (page - 1) * 5; i < page * 5; i++) {
            this.attendanceList1.push(this.attendanceList[i]);
          }
        }
      }
      this.pageBody1.page = page;
    }
  },
  created() {
    initAttendance();
    bus.$on(bus.attendanceList, data => {
      this.attendanceList = data;
    });
    bus.$on(bus.attendanceList1, data => {
      this.attendanceList1 = data;
    });
    bus.$on(bus.pageBody1, data => {
      this.pageBody1 = data;
    });
  },
  beforeDestroy() {
    bus.$off(bus.attendanceList);
    bus.$off(bus.attendanceList1);
    bus.$off(bus.pageBody1);
  }
};
</script>
