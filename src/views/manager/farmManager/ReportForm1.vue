<template>
  <div>
    <!-- 导航栏 -->
    <farmManagerNavbar />

    <!-- 主体内容 -->
    <div class="container" style="padding-top: 100px; padding-bottom: 120px;">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="card-farm p-4">
            <!-- 页面标题 -->
            <div class="text-center mb-4">
              <h2 class="farm-title mb-2">
                <i class="bi bi-file-earmark-bar-graph me-2"></i>报表管理
              </h2>
              <p class="text-muted">导出考勤、收入和支出相关报表数据</p>
            </div>

            <!-- 考勤报表区域 -->
            <div class="report-section mb-4">
              <div class="section-header">
                <h4 class="section-title">
                  <i class="bi bi-clock-history me-2"></i>考勤报表
                </h4>
                <p class="section-description">导出指定月份的员工考勤数据</p>
              </div>
              <div class="row align-items-center">
                <div class="col-md-3">
                  <label class="form-label-farm">
                    <i class="bi bi-calendar-month me-1"></i>选择月份：
                  </label>
                </div>
                <div class="col-md-6">
                  <input
                    type="month"
                    class="form-control form-control-farm"
                    v-model="formattedDate"
                  />
                </div>
                <div class="col-md-3">
                  <button
                    type="button"
                    class="btn btn-farm-primary w-100"
                    @click="downloadAttendanceExcel"
                    :disabled="isDownloading.attendance"
                  >
                    <span v-if="isDownloading.attendance">
                      <i class="bi bi-arrow-clockwise me-2 spin"></i>导出中...
                    </span>
                    <span v-else>
                      <i class="bi bi-download me-2"></i>导出 Excel
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <hr class="section-divider" />

            <!-- 农场收入报表区域 -->
            <div class="report-section mb-4">
              <div class="section-header">
                <h4 class="section-title">
                  <i class="bi bi-cash-coin me-2"></i>农场收入报表
                </h4>
                <p class="section-description">导出指定时期的农场收入数据</p>
              </div>

              <!-- 月度收入报表 -->
              <div class="row align-items-center mb-3">
                <div class="col-md-3">
                  <label class="form-label-farm">
                    <i class="bi bi-calendar-month me-1"></i>月度收入：
                  </label>
                </div>
                <div class="col-md-6">
                  <input
                    type="month"
                    class="form-control form-control-farm"
                    v-model="formattedDate1"
                  />
                </div>
                <div class="col-md-3">
                  <button
                    type="button"
                    class="btn btn-farm-success w-100"
                    @click="downloadMonthSaleExcel"
                    :disabled="isDownloading.monthSale"
                  >
                    <span v-if="isDownloading.monthSale">
                      <i class="bi bi-arrow-clockwise me-2 spin"></i>导出中...
                    </span>
                    <span v-else>
                      <i class="bi bi-download me-2"></i>导出月报
                    </span>
                  </button>
                </div>
              </div>

              <!-- 日度收入报表 -->
              <div class="row align-items-center">
                <div class="col-md-3">
                  <label class="form-label-farm">
                    <i class="bi bi-calendar-date me-1"></i>日度收入：
                  </label>
                </div>
                <div class="col-md-6">
                  <input
                    type="date"
                    class="form-control form-control-farm"
                    v-model="formattedDate2"
                  />
                </div>
                <div class="col-md-3">
                  <button
                    type="button"
                    class="btn btn-outline-success w-100"
                    @click="downloadDaySaleExcel"
                    :disabled="isDownloading.daySale"
                  >
                    <span v-if="isDownloading.daySale">
                      <i class="bi bi-arrow-clockwise me-2 spin"></i>导出中...
                    </span>
                    <span v-else>
                      <i class="bi bi-download me-2"></i>导出日报
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <hr class="section-divider" />

            <!-- 农场支出报表区域 -->
            <div class="report-section">
              <div class="section-header">
                <h4 class="section-title">
                  <i class="bi bi-cash-stack me-2"></i>农场支出报表
                </h4>
                <p class="section-description">导出指定时期的农场支出数据</p>
              </div>

              <!-- 月度支出报表 -->
              <div class="row align-items-center mb-3">
                <div class="col-md-3">
                  <label class="form-label-farm">
                    <i class="bi bi-calendar-month me-1"></i>月度支出：
                  </label>
                </div>
                <div class="col-md-6">
                  <input
                    type="month"
                    class="form-control form-control-farm"
                    v-model="formattedDate3"
                  />
                </div>
                <div class="col-md-3">
                  <button
                    type="button"
                    class="btn btn-farm-warning w-100"
                    @click="downloadMonthPurchaseExcel"
                    :disabled="isDownloading.monthPurchase"
                  >
                    <span v-if="isDownloading.monthPurchase">
                      <i class="bi bi-arrow-clockwise me-2 spin"></i>导出中...
                    </span>
                    <span v-else>
                      <i class="bi bi-download me-2"></i>导出月报
                    </span>
                  </button>
                </div>
              </div>

              <!-- 日度支出报表 -->
              <div class="row align-items-center">
                <div class="col-md-3">
                  <label class="form-label-farm">
                    <i class="bi bi-calendar-date me-1"></i>日度支出：
                  </label>
                </div>
                <div class="col-md-6">
                  <input
                    type="date"
                    class="form-control form-control-farm"
                    v-model="formattedDate4"
                  />
                </div>
                <div class="col-md-3">
                  <button
                    type="button"
                    class="btn btn-outline-warning w-100"
                    @click="downloadDayPurchaseExcel"
                    :disabled="isDownloading.dayPurchase"
                  >
                    <span v-if="isDownloading.dayPurchase">
                      <i class="bi bi-arrow-clockwise me-2 spin"></i>导出中...
                    </span>
                    <span v-else>
                      <i class="bi bi-download me-2"></i>导出日报
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <!-- 操作说明 -->
            <div class="alert alert-farm-info mt-4" role="alert">
              <h6 class="alert-heading">
                <i class="bi bi-info-circle me-2"></i>操作说明
              </h6>
              <ul class="mb-0 small">
                <li>请选择正确的日期范围，系统会生成对应的 Excel 报表</li>
                <li>导出的报表会自动下载到您的默认下载目录</li>
                <li>如果数据量较大，请耐心等待导出完成</li>
                <li>建议在低峰时间进行大量数据导出操作</li>
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
import {
  downloadAttendanceExcel,
  downloadDaySaleExcel,
  downloadMonthSaleExcel,
  downloadDayPurchaseExcel,
  downloadMonthPurchaseExcel
} from "@/api/farmManager.js";
import farmManagerNavbar from "@/components/Header/FarmManagerNavbar.vue";
import footerNavbar from "@/components/FooterNavbar.vue";

export default {
  name: "ReportForm1",
  components: {
    farmManagerNavbar,
    footerNavbar
  },
  data() {
    return {
      choosedDate: new Date(),
      choosedDate1: new Date(),
      choosedDate2: new Date(),
      choosedDate3: new Date(),
      choosedDate4: new Date(),
      isDownloading: {
        attendance: false,
        monthSale: false,
        daySale: false,
        monthPurchase: false,
        dayPurchase: false
      }
    };
  },
  computed: {
    formattedDate: {
      get() {
        const date = new Date(this.choosedDate);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        return `${year}-${month}`;
      },
      set(value) {
        this.choosedDate = new Date(value + "-01");
      }
    },
    formattedDate1: {
      get() {
        const date = new Date(this.choosedDate1);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        return `${year}-${month}`;
      },
      set(value) {
        this.choosedDate1 = new Date(value + "-01");
      }
    },
    formattedDate2: {
      get() {
        const date = new Date(this.choosedDate2);
        return date.toISOString().split("T")[0];
      },
      set(value) {
        this.choosedDate2 = new Date(value);
      }
    },
    formattedDate3: {
      get() {
        const date = new Date(this.choosedDate3);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        return `${year}-${month}`;
      },
      set(value) {
        this.choosedDate3 = new Date(value + "-01");
      }
    },
    formattedDate4: {
      get() {
        const date = new Date(this.choosedDate4);
        return date.toISOString().split("T")[0];
      },
      set(value) {
        this.choosedDate4 = new Date(value);
      }
    }
  },
  mounted() {
    this.animatePageEntry();
  },
  methods: {
    async downloadAttendanceExcel() {
      if (this.isDownloading.attendance) return;

      try {
        this.isDownloading.attendance = true;
        await downloadAttendanceExcel(this.choosedDate);
        this.showToast(
          `${this.formatMonth(this.choosedDate)} 考勤报表导出成功`,
          "success"
        );
      } catch (error) {
        console.error("导出考勤报表失败:", error);
        this.showToast("导出失败，请稍后重试", "danger");
      } finally {
        this.isDownloading.attendance = false;
      }
    },

    async downloadMonthSaleExcel() {
      if (this.isDownloading.monthSale) return;

      try {
        this.isDownloading.monthSale = true;
        await downloadMonthSaleExcel(this.choosedDate1);
        this.showToast(
          `${this.formatMonth(this.choosedDate1)} 月度收入报表导出成功`,
          "success"
        );
      } catch (error) {
        console.error("导出月度收入报表失败:", error);
        this.showToast("导出失败，请稍后重试", "danger");
      } finally {
        this.isDownloading.monthSale = false;
      }
    },

    async downloadDaySaleExcel() {
      if (this.isDownloading.daySale) return;

      try {
        this.isDownloading.daySale = true;
        await downloadDaySaleExcel(this.choosedDate2);
        this.showToast(
          `${this.formatDate(this.choosedDate2)} 日度收入报表导出成功`,
          "success"
        );
      } catch (error) {
        console.error("导出日度收入报表失败:", error);
        this.showToast("导出失败，请稍后重试", "danger");
      } finally {
        this.isDownloading.daySale = false;
      }
    },

    async downloadMonthPurchaseExcel() {
      if (this.isDownloading.monthPurchase) return;

      try {
        this.isDownloading.monthPurchase = true;
        await downloadMonthPurchaseExcel(this.choosedDate3);
        this.showToast(
          `${this.formatMonth(this.choosedDate3)} 月度支出报表导出成功`,
          "success"
        );
      } catch (error) {
        console.error("导出月度支出报表失败:", error);
        this.showToast("导出失败，请稍后重试", "danger");
      } finally {
        this.isDownloading.monthPurchase = false;
      }
    },

    async downloadDayPurchaseExcel() {
      if (this.isDownloading.dayPurchase) return;

      try {
        this.isDownloading.dayPurchase = true;
        await downloadDayPurchaseExcel(this.choosedDate4);
        this.showToast(
          `${this.formatDate(this.choosedDate4)} 日度支出报表导出成功`,
          "success"
        );
      } catch (error) {
        console.error("导出日度支出报表失败:", error);
        this.showToast("导出失败，请稍后重试", "danger");
      } finally {
        this.isDownloading.dayPurchase = false;
      }
    },

    formatDate(date) {
      if (!date) return "";
      const d = new Date(date);
      return `${d.getFullYear()}年${(d.getMonth() + 1)
        .toString()
        .padStart(2, "0")}月${d
        .getDate()
        .toString()
        .padStart(2, "0")}日`;
    },

    formatMonth(date) {
      if (!date) return "";
      const d = new Date(date);
      return `${d.getFullYear()}年${(d.getMonth() + 1)
        .toString()
        .padStart(2, "0")}月`;
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
        delay: 4000
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

.report-section {
  background: rgba(76, 175, 80, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(76, 175, 80, 0.2);
  transition: all 0.3s ease;
}

.report-section:hover {
  background: rgba(76, 175, 80, 0.08);
  border-color: rgba(76, 175, 80, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.15);
}

.section-header {
  margin-bottom: 1rem;
}

.section-title {
  color: var(--farm-primary);
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.section-description {
  color: #6c757d;
  font-size: 0.9rem;
  margin-bottom: 0;
}

.section-divider {
  border: none;
  height: 2px;
  background: linear-gradient(
    to right,
    var(--farm-primary),
    var(--farm-secondary)
  );
  margin: 2rem 0;
  border-radius: 1px;
}

.form-control-farm {
  border: 2px solid var(--farm-primary-light);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.form-control-farm:focus {
  border-color: var(--farm-primary);
  box-shadow: 0 0 0 0.2rem rgba(76, 175, 80, 0.25);
}

.btn-farm-success {
  background-color: #28a745;
  border-color: #28a745;
  color: white;
}

.btn-farm-success:hover {
  background-color: #218838;
  border-color: #1e7e34;
}

.btn-farm-warning {
  background-color: #ffc107;
  border-color: #ffc107;
  color: #212529;
}

.btn-farm-warning:hover {
  background-color: #e0a800;
  border-color: #d39e00;
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

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .report-section {
    padding: 1rem;
  }

  .section-title {
    font-size: 1.1rem;
  }

  .row.align-items-center > .col-md-3,
  .row.align-items-center > .col-md-6,
  .row.align-items-center > .col-md-3 {
    margin-bottom: 0.5rem;
  }
}
</style>
