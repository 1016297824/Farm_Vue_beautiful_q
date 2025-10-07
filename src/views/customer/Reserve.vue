// 顾客预定 - 绿色主题
<template>
  <div>
    <!-- 导航栏 -->
    <customerNavbar />

    <!-- 主体 -->
    <div class="container" style="padding-top: 100px; padding-bottom: 120px;">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="card-farm p-4">
            <!-- 标题栏 -->
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h2 class="farm-title mb-0">
                <i class="bi bi-calendar-check me-2"></i>我的预订记录
              </h2>
              <button
                type="button"
                class="btn btn-farm-primary"
                @click="addReserve"
              >
                <i class="bi bi-plus-circle me-2"></i>新增预订
              </button>
            </div>

            <!-- 表格 -->
            <div class="table-responsive">
              <table class="table table-farm">
                <thead>
                  <tr>
                    <th>订单号</th>
                    <th>桌位</th>
                    <th>开始时间</th>
                    <th>结束时间</th>
                    <th>下单时间</th>
                    <th class="text-center">操作</th>
                  </tr>
                </thead>
                <tbody v-if="reserveList && reserveList.length > 0">
                  <tr v-for="(reserve, index) in reserveList" :key="index">
                    <td class="fw-medium">{{ reserve.no }}</td>
                    <td>{{ reserve.diningTable.id }}</td>
                    <td>{{ reserve.startTime | formatDate }}</td>
                    <td>{{ reserve.endTime | formatDate }}</td>
                    <td class="text-muted">
                      {{ reserve.insertTime | formatDate }}
                    </td>
                    <td class="text-center">
                      <button
                        type="button"
                        class="btn btn-farm-secondary btn-sm me-2"
                        @click="viewDetails(reserve)"
                        title="查看详情"
                      >
                        <i class="bi bi-eye"></i>
                      </button>
                      <button
                        type="button"
                        class="btn btn-outline-danger btn-sm"
                        @click="deleteReserve(reserve.no)"
                        title="取消预订"
                      >
                        <i class="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- 空数据状态 -->
            <div
              v-if="reserveList && reserveList.length === 0"
              class="text-center py-5"
            >
              <i class="bi bi-calendar-x display-1 text-muted mb-3"></i>
              <h5 class="text-muted mb-3">暂无预订记录</h5>
              <p class="text-muted">点击“新增预订”按钮开始您的预订</p>
              <button class="btn btn-farm-primary mt-3" @click="addReserve">
                <i class="bi bi-plus-circle me-2"></i>立即预订
              </button>
            </div>

            <!-- 加载状态 -->
            <div v-if="reserveList === null" class="text-center py-5">
              <div class="spinner-border text-success mb-3" role="status">
                <span class="visually-hidden">加载中...</span>
              </div>
              <p class="text-muted">正在加载预订信息...</p>
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
import { formatDate } from "@/assets/js/date";
import { getReserve, deleteReserve } from "@/api/customer";

export default {
  name: "Reserve",
  data() {
    return {
      reserveList: null
    };
  },
  methods: {
    async addReserve() {
      try {
        // 添加页面切换动画
        await this.animatePageExit();
        this.$router.push("/customer/reserveAdd");
      } catch (error) {
        console.error("页面跳转失败:", error);
        this.$router.push("/customer/reserveAdd");
      }
    },

    async deleteReserve(no) {
      try {
        const confirmed = confirm(`确定要取消以下预订吗？\n订单号：${no}`);
        if (confirmed) {
          await deleteReserve(no);
          this.$farmMessage.success("预订已成功取消");
          // 重新加载数据
          this.loadReserveData();
        }
      } catch (error) {
        console.error("取消预订失败:", error);
        this.$farmMessage.error("取消预订失败，请稍后重试");
      }
    },

    viewDetails(reserve) {
      // 查看预订详情
      this.$farmMessage.info(
        `订单号：${reserve.no}\n桌位：${reserve.diningTable.id}`
      );
    },

    loadReserveData() {
      this.reserveList = null;
      getReserve();
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

    async animatePageExit() {
      const container = document.querySelector(".container");
      if (container) {
        container.style.opacity = "0";
        container.style.transform = "translateX(20px)";
        container.style.transition = "all 0.3s ease";

        return new Promise(resolve => {
          setTimeout(resolve, 300);
        });
      }
    }
  },

  filters: {
    formatDate(time) {
      if (!time) return "--";
      const date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },

  created() {
    bus.$on(bus.reserveList, data => {
      // 添加数据加载动画
      setTimeout(() => {
        this.reserveList = data || [];
      }, 300);
    });
  },

  mounted() {
    // 页面加载动画效果
    this.animatePageEntry();

    // 加载订单数据
    setTimeout(() => {
      this.loadReserveData();
    }, 500);
  },

  beforeDestroy() {
    bus.$off(bus.reserveList);
  },

  components: {
    customerNavbar: () => import("@/components/Header/CustomerNavbar"),
    footerNavbar: () => import("@/components/FooterNavbar")
  }
};
</script>

<style scoped>
/* 页面动画效果 */
.card-farm {
  animation: fadeInUp 0.6s ease;
}

/* 表格增强样式 */
.table-farm tbody tr:hover {
  background-color: var(--farm-green-50) !important;
  transform: translateX(2px);
  transition: all 0.2s ease;
}

/* 按钮动画 */
.btn {
  transition: all 0.2s ease;
}

.btn:hover {
  transform: translateY(-1px);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .container {
    padding-top: 80px !important;
    padding-bottom: 60px !important;
  }

  .card-farm {
    margin: 0 1rem;
  }

  .table-responsive {
    border-radius: 0.5rem;
    overflow: hidden;
  }

  .btn {
    font-size: 0.875rem;
  }
}

@media (max-width: 576px) {
  .container {
    padding-top: 70px !important;
  }

  .farm-title {
    font-size: 1.25rem !important;
  }

  .table-farm th,
  .table-farm td {
    padding: 0.5rem 0.25rem;
    font-size: 0.8rem;
  }

  .btn-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
  }
}

/* 加载动画 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 空状态动画 */
.display-1 {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

@media (max-width: 576px) {
  .flex.items-center.justify-between {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .farm-btn {
    width: 100%;
  }

  th,
  td {
    padding: 0.75rem 1rem !important;
  }
}
</style>
