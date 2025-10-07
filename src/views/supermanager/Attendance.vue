<template>
  <div>
    <!-- 导航栏 -->
    <superManagerNavbar />

    <!-- 主体内容 -->
    <div class="container" style="padding-top: 100px; padding-bottom: 120px;">
      <div class="row justify-content-center">
        <div class="col-xl-10">
          <div class="card-farm p-4">
            <!-- 页面标题 -->
            <div class="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 class="farm-title mb-2">
                  <i class="bi bi-clock-history me-2"></i>考勤管理
                </h2>
                <p class="text-muted mb-0">管理员工考勤信息</p>
              </div>
            </div>

            <!-- 日期选择区域 -->
            <div class="date-selection-section mb-4">
              <div class="row align-items-center">
                <div class="col-md-3">
                  <label class="form-label-farm">
                    <i class="bi bi-calendar-date me-1"></i>选择日期：
                  </label>
                </div>
                <div class="col-md-4">
                  <input
                    type="date"
                    class="form-control form-control-farm"
                    v-model="formattedDate"
                    @change="chooseDate"
                  />
                </div>
                <div class="col-md-5 text-end">
                  <button
                    type="button"
                    class="btn btn-farm-primary"
                    @click="updateAttendance"
                  >
                    <i class="bi bi-check-circle me-2"></i>提交考勤
                  </button>
                </div>
              </div>
            </div>

            <!-- 考勤表格 -->
            <div class="table-responsive">
              <table class="table table-farm">
                <thead>
                  <tr>
                    <th class="text-center">
                      <i class="bi bi-person-badge me-1"></i>工号
                    </th>
                    <th class="text-center">
                      <i class="bi bi-person me-1"></i>姓名
                    </th>
                    <th class="text-center">
                      <i class="bi bi-clock me-1"></i>工时
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(attendance, index) in attendanceList1"
                    :key="index"
                    class="table-row-hover"
                  >
                    <td class="text-center fw-bold text-farm-primary">
                      {{ attendance.staff.username }}
                    </td>
                    <td class="text-center">
                      {{ attendance.staff.name }}
                    </td>
                    <td class="text-center">
                      <select
                        class="form-select form-control-farm"
                        v-model="attendance.workingHours"
                        @change="changeWorkingHours(attendance)"
                      >
                        <option
                          v-for="(workingHours, index) in workingHoursList"
                          :key="index"
                          :value="workingHours"
                        >
                          {{ workingHours }} 小时
                        </option>
                      </select>
                    </td>
                  </tr>
                  <tr v-if="attendanceList1.length === 0">
                    <td colspan="3" class="text-center text-muted py-4">
                      <i class="bi bi-clock-history me-2"></i>暂无考勤数据
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- 分页器 -->
            <div
              class="d-flex justify-content-center"
              v-if="pageBody1.pageList && pageBody1.pageList.length > 1"
            >
              <nav aria-label="考勤分页">
                <ul class="pagination pagination-farm">
                  <li
                    class="page-item"
                    :class="{ disabled: pageBody1.page === 1 }"
                  >
                    <button
                      type="button"
                      class="page-link"
                      @click="doPage(1)"
                      :disabled="pageBody1.page === 1"
                    >
                      <i class="bi bi-chevron-double-left"></i>
                    </button>
                  </li>
                  <li
                    v-for="(page, index) in pageBody1.pageList"
                    :key="index"
                    class="page-item"
                    :class="{ active: pageBody1.page === page }"
                  >
                    <button
                      type="button"
                      class="page-link"
                      @click="doPage(page)"
                    >
                      {{ page }}
                    </button>
                  </li>
                  <li
                    class="page-item"
                    :class="{ disabled: pageBody1.page === pageBody1.pages }"
                  >
                    <button
                      type="button"
                      class="page-link"
                      @click="doPage(pageBody1.pages)"
                      :disabled="pageBody1.page === pageBody1.pages"
                    >
                      <i class="bi bi-chevron-double-right"></i>
                    </button>
                  </li>
                </ul>
              </nav>
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
import bus from "@/util/Bus";
import {
  initAttendance,
  updateAttendance,
  chooseDate
} from "@/api/supermanager.js";
import superManagerNavbar from "@/components/Header/SuperManagerNavbar.vue";
import footerNavbar from "@/components/FooterNavbar.vue";

export default {
  name: "Attendance",
  components: {
    superManagerNavbar,
    footerNavbar
  },
  data() {
    return {
      choosedDate: new Date(),
      attendanceList: [],
      attendanceList1: [],
      pageBody1: {
        page: 1,
        pages: 1,
        pageList: []
      },
      workingHoursList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    };
  },
  computed: {
    formattedDate: {
      get() {
        const year = this.choosedDate.getFullYear();
        const month = String(this.choosedDate.getMonth() + 1).padStart(2, "0");
        const day = String(this.choosedDate.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      },
      set(value) {
        this.choosedDate = new Date(value);
      }
    }
  },
  methods: {
    updateAttendance() {
      if (confirm(`是否提交更改？`)) {
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
    initAttendance(this.choosedDate);

    bus.$on(bus.attendanceList, data => {
      this.attendanceList = data || [];
      this.doPage(1);
    });
    bus.$on(bus.pageBody1, data => {
      this.pageBody1 = data || { page: 1, pages: 1, pageList: [] };
    });
  },
  beforeDestroy() {
    bus.$off(bus.attendanceList);
    bus.$off(bus.pageBody1);
  }
};
</script>

<style scoped>
.date-selection-section {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 2px solid var(--farm-border-light);
}

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

.table-farm thead {
  background: linear-gradient(
    135deg,
    var(--farm-green),
    var(--farm-green-dark)
  );
  color: white;
}

.table-row-hover:hover {
  background: linear-gradient(
    135deg,
    rgba(76, 175, 80, 0.05),
    rgba(129, 199, 132, 0.05)
  );
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
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
}

.btn-farm-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(76, 175, 80, 0.4);
  background: linear-gradient(135deg, var(--farm-green-dark), #2e7d32);
}

.pagination-farm {
  --bs-pagination-color: var(--farm-green-dark);
  --bs-pagination-border-color: var(--farm-border-light);
  --bs-pagination-hover-color: white;
  --bs-pagination-hover-bg: var(--farm-green);
  --bs-pagination-active-bg: var(--farm-green-dark);
}

@media (max-width: 768px) {
  .card-farm {
    padding: 1.5rem !important;
  }

  .farm-title {
    font-size: 1.5rem;
  }

  .date-selection-section .row > div {
    margin-bottom: 1rem;
  }

  .date-selection-section .row > div:last-child {
    margin-bottom: 0;
  }
}
</style>
