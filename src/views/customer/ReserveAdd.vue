<template>
  <div>
    <!-- 导航栏 -->
    <customerNavbar />

    <!-- 主体内容 -->
    <div class="container" style="padding-top: 100px; padding-bottom: 120px;">
      <div class="row justify-content-center">
        <div class="col-xl-10">
          <div class="card-farm p-4">
            <!-- 页面标题 -->
            <div class="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 class="farm-title mb-2">
                  <i class="bi bi-calendar-plus me-2"></i>新增预订
                </h2>
                <p class="text-muted mb-0">选择您的用餐时间和心仪桌位</p>
              </div>
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="back"
              >
                <i class="bi bi-arrow-left me-2"></i>返回
              </button>
            </div>

            <!-- 时间选择区域 -->
            <div class="time-selection-section mb-4">
              <h4 class="section-title mb-3">
                <i class="bi bi-clock me-2"></i>选择时间
                <small class="text-muted">(营业时间：9:00-21:00)</small>
              </h4>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label-farm">
                    <i class="bi bi-calendar-date me-1"></i>开始时间：
                  </label>
                  <input
                    type="datetime-local"
                    class="form-control form-control-farm"
                    v-model="formattedStartTime"
                    @change="startTimeChange"
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label-farm">
                    <i class="bi bi-calendar-check me-1"></i>结束时间：
                  </label>
                  <input
                    type="datetime-local"
                    class="form-control form-control-farm"
                    v-model="formattedEndTime"
                    @change="endTimeChange"
                  />
                </div>
              </div>
            </div>

            <!-- 餐桌选择区域 -->
            <div class="table-selection-section">
              <h4 class="section-title mb-3">
                <i class="bi bi-table me-2"></i>可用餐桌
              </h4>

              <div class="table-responsive">
                <table class="table table-farm">
                  <thead>
                    <tr>
                      <th class="text-center">
                        <i class="bi bi-hash me-1"></i>餐桌号
                      </th>
                      <th class="text-center">
                        <i class="bi bi-tags me-1"></i>桌位类型
                      </th>
                      <th class="text-center">
                        <i class="bi bi-gear me-1"></i>操作
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(dt, index) in diningTableList"
                      :key="index"
                      class="table-row-hover"
                    >
                      <td class="text-center fw-bold text-farm-primary">
                        {{ dt.id }}号桌
                      </td>
                      <td class="text-center">
                        <span class="badge bg-farm-secondary">{{
                          dt.type
                        }}</span>
                      </td>
                      <td class="text-center">
                        <button
                          type="button"
                          class="btn btn-farm-success btn-sm"
                          @click="reserveAdd(dt)"
                        >
                          <i class="bi bi-calendar-check me-2"></i>预订
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
import { initDiningTable, doPage, reserveAdd } from "@/api/customer";
import customerNavbar from "@/components/Header/CustomerNavbar.vue";
import footerNavbar from "@/components/FooterNavbar.vue";

export default {
  name: "ReserveAdd",
  components: {
    customerNavbar,
    footerNavbar
  },
  data() {
    return {
      diningTableList: [],
      pageBody: {
        page: 1,
        pages: 1,
        pageList: [1],
        startTime: null,
        endTime: null
      }
    };
  },
  computed: {
    formattedStartTime: {
      get() {
        if (!this.pageBody.startTime) return "";
        const date = new Date(this.pageBody.startTime);
        return date.toISOString().slice(0, 16);
      },
      set(value) {
        this.pageBody.startTime = new Date(value);
      }
    },
    formattedEndTime: {
      get() {
        if (!this.pageBody.endTime) return "";
        const date = new Date(this.pageBody.endTime);
        return date.toISOString().slice(0, 16);
      },
      set(value) {
        this.pageBody.endTime = new Date(value);
      }
    }
  },
  methods: {
    doPage(page) {
      // 将日期时间转换为后端可以解析的格式
      const pageBodyToSend = {
        ...this.pageBody,
        startTime: this.pageBody.startTime
          ? this.pageBody.startTime
              .toISOString()
              .slice(0, 19)
              .replace("T", " ")
          : null,
        endTime: this.pageBody.endTime
          ? this.pageBody.endTime
              .toISOString()
              .slice(0, 19)
              .replace("T", " ")
          : null
      };

      this.pageBody.page = page;
      doPage(pageBodyToSend);
    },
    reserveAdd(dt) {
      // 将日期时间转换为后端可以解析的格式
      const pageBodyToSend = {
        ...this.pageBody,
        startTime: this.pageBody.startTime
          ? this.pageBody.startTime
              .toISOString()
              .slice(0, 19)
              .replace("T", " ")
          : null,
        endTime: this.pageBody.endTime
          ? this.pageBody.endTime
              .toISOString()
              .slice(0, 19)
              .replace("T", " ")
          : null
      };

      const confirmed = confirm(
        `确认预订：${dt.id}号桌\n时间：${this.pageBody.startTime}至${this.pageBody.endTime}\n注意：预订后取消需联系工作人员`
      );
      if (confirmed) {
        this.pageBody.page = 1;
        reserveAdd(dt, pageBodyToSend);
      }
    },
    back() {
      this.$router.push("/customer/reserve");
    },
    startTimeChange() {
      if (this.pageBody.startTime && this.pageBody.endTime) {
        if (
          this.pageBody.startTime.getTime() >= this.pageBody.endTime.getTime()
        ) {
          this.pageBody.endTime = new Date(
            this.pageBody.startTime.getTime() + 60 * 60 * 1000
          );
        }
      }
      this.loadDiningTables();
    },
    endTimeChange() {
      this.loadDiningTables();
    },
    loadDiningTables() {
      if (this.pageBody.startTime && this.pageBody.endTime) {
        // 将日期时间转换为后端可以解析的格式
        const pageBodyToSend = {
          ...this.pageBody,
          startTime: this.pageBody.startTime
            ? this.pageBody.startTime
                .toISOString()
                .slice(0, 19)
                .replace("T", " ")
            : null,
          endTime: this.pageBody.endTime
            ? this.pageBody.endTime
                .toISOString()
                .slice(0, 19)
                .replace("T", " ")
            : null
        };

        initDiningTable(pageBodyToSend);
      }
    }
  },
  created() {
    bus.$on(bus.diningTableList, data => {
      this.diningTableList = data || [];
    });
    bus.$on(bus.pageBody2, data => {
      this.pageBody = { ...this.pageBody, ...data };
    });
  },
  beforeDestroy() {
    bus.$off(bus.diningTableList);
    bus.$off(bus.pageBody2);
  }
};
</script>

<style scoped>
.time-selection-section,
.table-selection-section {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 2px solid var(--farm-border-light);
}

.section-title {
  color: var(--farm-green-dark);
  font-weight: 600;
  font-size: 1.3rem;
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

.bg-farm-secondary {
  background: linear-gradient(135deg, #6c757d, #495057) !important;
  color: white;
}
</style>
