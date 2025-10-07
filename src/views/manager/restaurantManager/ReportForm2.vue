<template>
  <div>
    <!-- 导航栏 -->
    <restaurantManagerNavbar />

    <!-- 主体内容 -->
    <div class="container" style="padding-top: 100px; padding-bottom: 120px;">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="card-farm p-4">
            <!-- 页面标题 -->
            <div class="text-center mb-4">
              <h2 class="farm-title mb-2">
                <i class="bi bi-file-earmark-bar-graph me-2"></i>餐厅报表管理
              </h2>
              <p class="text-muted">导出餐厅考勤、收入和支出相关报表数据</p>
            </div>

            <!-- 考勤报表区域 -->
            <div class="report-section mb-4">
              <div class="section-header">
                <h4 class="section-title">
                  <i class="bi bi-clock-history me-2"></i>考勤报表
                </h4>
                <p class="section-description">导出指定月份的餐厅员工考勤数据</p>
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

            <!-- 餐厅收入报表区域 -->
            <div class="report-section mb-4">
              <div class="section-header">
                <h4 class="section-title">
                  <i class="bi bi-cash-coin me-2"></i>餐厅收入报表
                </h4>
                <p class="section-description">导出指定时期的餐厅收入数据</p>
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

            <!-- 餐厅支出报表区域 -->
            <div class="report-section">
              <div class="section-header">
                <h4 class="section-title">
                  <i class="bi bi-cash-stack me-2"></i>餐厅支出报表
                </h4>
                <p class="section-description">导出指定时期的餐厅支出数据</p>
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
} from "@/api/restaurantManager.js";
import restaurantManagerNavbar from "@/components/Header/RestaurantManagerNavbar.vue";
import footerNavbar from "@/components/FooterNavbar.vue";

export default {
  name: "ReportForm2",
  components: {
    restaurantManagerNavbar,
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
        const year = this.choosedDate.getFullYear();
        const month = String(this.choosedDate.getMonth() + 1).padStart(2, "0");
        return `${year}-${month}`;
      },
      set(value) {
        const [year, month] = value.split("-");
        this.choosedDate = new Date(year, month - 1, 1);
      }
    },
    formattedDate1: {
      get() {
        const year = this.choosedDate1.getFullYear();
        const month = String(this.choosedDate1.getMonth() + 1).padStart(2, "0");
        return `${year}-${month}`;
      },
      set(value) {
        const [year, month] = value.split("-");
        this.choosedDate1 = new Date(year, month - 1, 1);
      }
    },
    formattedDate2: {
      get() {
        const year = this.choosedDate2.getFullYear();
        const month = String(this.choosedDate2.getMonth() + 1).padStart(2, "0");
        const day = String(this.choosedDate2.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      },
      set(value) {
        this.choosedDate2 = new Date(value);
      }
    },
    formattedDate3: {
      get() {
        const year = this.choosedDate3.getFullYear();
        const month = String(this.choosedDate3.getMonth() + 1).padStart(2, "0");
        return `${year}-${month}`;
      },
      set(value) {
        const [year, month] = value.split("-");
        this.choosedDate3 = new Date(year, month - 1, 1);
      }
    },
    formattedDate4: {
      get() {
        const year = this.choosedDate4.getFullYear();
        const month = String(this.choosedDate4.getMonth() + 1).padStart(2, "0");
        const day = String(this.choosedDate4.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      },
      set(value) {
        this.choosedDate4 = new Date(value);
      }
    }
  },
  methods: {
    async downloadAttendanceExcel() {
      try {
        this.isDownloading.attendance = true;
        await downloadAttendanceExcel(this.choosedDate);
        this.showToast("考勤报表导出成功！", "success");
      } catch (error) {
        console.error("导出考勤报表失败:", error);
        this.showToast("导出失败，请稍后重试", "error");
      } finally {
        this.isDownloading.attendance = false;
      }
    },
    async downloadMonthSaleExcel() {
      try {
        this.isDownloading.monthSale = true;
        await downloadMonthSaleExcel(this.choosedDate1);
        this.showToast("月度收入报表导出成功！", "success");
      } catch (error) {
        console.error("导出月度收入报表失败:", error);
        this.showToast("导出失败，请稍后重试", "error");
      } finally {
        this.isDownloading.monthSale = false;
      }
    },
    async downloadDaySaleExcel() {
      try {
        this.isDownloading.daySale = true;
        await downloadDaySaleExcel(this.choosedDate2);
        this.showToast("日度收入报表导出成功！", "success");
      } catch (error) {
        console.error("导出日度收入报表失败:", error);
        this.showToast("导出失败，请稍后重试", "error");
      } finally {
        this.isDownloading.daySale = false;
      }
    },
    async downloadMonthPurchaseExcel() {
      try {
        this.isDownloading.monthPurchase = true;
        await downloadMonthPurchaseExcel(this.choosedDate3);
        this.showToast("月度支出报表导出成功！", "success");
      } catch (error) {
        console.error("导出月度支出报表失败:", error);
        this.showToast("导出失败，请稍后重试", "error");
      } finally {
        this.isDownloading.monthPurchase = false;
      }
    },
    async downloadDayPurchaseExcel() {
      try {
        this.isDownloading.dayPurchase = true;
        await downloadDayPurchaseExcel(this.choosedDate4);
        this.showToast("日度支出报表导出成功！", "success");
      } catch (error) {
        console.error("导出日度支出报表失败:", error);
        this.showToast("导出失败，请稍后重试", "error");
      } finally {
        this.isDownloading.dayPurchase = false;
      }
    },
    showToast(message, type = "info") {
      // 创建 Toast 提示
      const toastHtml = `
        <div class="toast align-items-center text-white border-0 position-fixed" style="top: 20px; right: 20px; z-index: 9999;" role="alert">
          <div class="d-flex">
            <div class="toast-body">
              <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-triangle' : 'info-circle'} me-2"></i>
              ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
          </div>
        </div>
      `;
      
      const toastElement = document.createElement('div');
      toastElement.innerHTML = toastHtml;
      const toast = toastElement.firstElementChild;
      
      // 设置背景色
      if (type === 'success') {
        toast.classList.add('bg-success');
      } else if (type === 'error') {
        toast.classList.add('bg-danger');
      } else {
        toast.classList.add('bg-info');
      }
      
      document.body.appendChild(toast);
      
      const bsToast = new bootstrap.Toast(toast, {
        autohide: true,
        delay: 3000
      });
      
      bsToast.show();
      
      // 清理DOM
      toast.addEventListener('hidden.bs.toast', () => {
        document.body.removeChild(toast);
      });
    }
  }
};
</script>

<style scoped>
/* 报表页面专用样式 */
.report-section {
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  border: 1px solid var(--farm-border-light);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.report-section:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.section-header {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--farm-green-light);
}

.section-title {
  color: var(--farm-green-dark);
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
}

.section-description {
  color: var(--farm-text-muted);
  margin-bottom: 0;
  font-size: 0.95rem;
}

.section-divider {
  border: none;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--farm-green-light),
    transparent
  );
  margin: 2rem 0;
}

/* 表单样式 */
.form-label-farm {
  font-weight: 600;
  color: var(--farm-green-dark);
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.form-control-farm {
  border: 2px solid var(--farm-border-light);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
}

.form-control-farm:focus {
  border-color: var(--farm-green);
  box-shadow: 0 0 0 0.2rem rgba(76, 175, 80, 0.25);
  background: #fff;
}

/* 按钮增强样式 */
.btn-farm-primary {
  background: linear-gradient(135deg, var(--farm-green), var(--farm-green-dark));
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
}

.btn-farm-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(76, 175, 80, 0.4);
  background: linear-gradient(135deg, var(--farm-green-dark), #2e7d32);
}

.btn-farm-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.btn-farm-success {
  background: linear-gradient(135deg, #28a745, #20c997);
  border: none;
  color: white;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(40, 167, 69, 0.3);
}

.btn-farm-success:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(40, 167, 69, 0.4);
  background: linear-gradient(135deg, #20c997, #17a2b8);
  color: white;
}

.btn-farm-warning {
  background: linear-gradient(135deg, #ffc107, #fd7e14);
  border: none;
  color: #212529;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(255, 193, 7, 0.3);
}

.btn-farm-warning:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(255, 193, 7, 0.4);
  background: linear-gradient(135deg, #fd7e14, #dc3545);
  color: white;
}

.btn-outline-success,
.btn-outline-warning {
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  border-width: 2px;
}

.btn-outline-success:hover,
.btn-outline-warning:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

/* 加载动画 */
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

/* 信息提示框样式 */
.alert-farm-info {
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
  border: 1px solid #90caf9;
  border-radius: 12px;
  color: #1565c0;
}

.alert-farm-info .alert-heading {
  color: #0d47a1;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.alert-farm-info ul li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.alert-farm-info ul li:last-child {
  margin-bottom: 0;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .container {
    padding-left: 15px;
    padding-right: 15px;
  }
  
  .report-section {
    padding: 1rem;
  }
  
  .section-title {
    font-size: 1.2rem;
  }
  
  .row.align-items-center > .col-md-3,
  .row.align-items-center > .col-md-6,
  .row.align-items-center > .col-md-3 {
    margin-bottom: 1rem;
  }
  
  .row.align-items-center > .col-md-3:last-child,
  .row.align-items-center > .col-md-6:last-child {
    margin-bottom: 0;
  }
}

@media (max-width: 576px) {
  .card-farm {
    padding: 1.5rem !important;
  }
  
  .farm-title {
    font-size: 1.5rem;
  }
  
  .btn {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
}
</style>
