// 点餐界面
<template>
  <div>
    <!-- 导航栏 -->
    <customerNavbar />

    <!-- 主体内容 -->
    <div class="container" style="padding-top: 100px; padding-bottom: 120px;">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="card-farm p-4">
            <!-- 页面标题 -->
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h2 class="farm-title mb-0">
                <i class="bi bi-calendar-check me-2"></i>我的订单
              </h2>
              <router-link
                to="/customer/reserveAdd"
                class="btn btn-farm-primary"
              >
                <i class="bi bi-plus-circle me-2"></i>没有订单，去添加
              </router-link>
            </div>

            <!-- 订单网格 -->
            <div class="row g-4" v-if="reserveLists && reserveLists.length > 0">
              <div
                class="col-12"
                v-for="(reserveList, listIndex) in reserveLists"
                :key="listIndex"
              >
                <div class="row g-3">
                  <div
                    class="col-lg-4 col-md-6 col-sm-6"
                    v-for="(reserve, index) in reserveList"
                    :key="index"
                  >
                    <div
                      class="card-farm order-card h-100"
                      @click="orderAdd(reserve.no)"
                    >
                      <div class="card-body text-center p-3">
                        <div class="order-image-container mb-3">
                          <img
                            src="@/assets/imgs/diningtable.jpg"
                            class="img-fluid order-image"
                            :alt="'订单号：' + reserve.no"
                            :title="'订单号：' + reserve.no"
                          />
                          <div class="order-overlay">
                            <i class="bi bi-eye-fill"></i>
                          </div>
                        </div>
                        <h5 class="order-title">
                          {{ reserve.diningTable.id }}号桌
                        </h5>
                        <p class="order-number text-muted mb-2">
                          <i class="bi bi-receipt me-1"></i>
                          订单号：{{ reserve.no }}
                        </p>
                        <div class="order-actions">
                          <span class="badge bg-farm-primary"
                            >点击查看详情</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 空状态 -->
            <div v-else class="text-center py-5">
              <i class="bi bi-calendar-x display-1 text-muted mb-3"></i>
              <h5 class="text-muted mb-3">暂无订单</h5>
              <p class="text-muted mb-4">您还没有任何订单记录</p>
              <router-link
                to="/customer/reserveAdd"
                class="btn btn-farm-primary btn-lg"
              >
                <i class="bi bi-plus-circle me-2"></i>立即预订
              </router-link>
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
import { getReserve } from "@/api/customer";

export default {
  name: "Order",
  components: {
    customerNavbar: () => import("@/components/Header/CustomerNavbar"),
    footerNavbar: () => import("@/components/FooterNavbar")
  },
  data() {
    return {
      reserveLists: null
    };
  },
  mounted() {
    // 页面加载动画效果
    this.animatePageEntry();
    // 加载订单数据
    getReserve();
  },
  created() {
    bus.$on(bus.reserveLists, data => {
      // 添加数据加载动画
      setTimeout(() => {
        this.reserveLists = data || [];
      }, 300);
    });
  },
  beforeDestroy() {
    bus.$off(bus.reserveLists);
  },
  methods: {
    addReserve() {
      this.$router.push("reserveAdd");
    },

    async orderAdd(no) {
      try {
        // 添加页面切换动画
        await this.animatePageExit();
        this.$router.push({
          path: "orderAdd",
          query: {
            no: no
          }
        });
      } catch (error) {
        console.error("页面跳转失败:", error);
        this.$router.push({
          path: "orderAdd",
          query: {
            no: no
          }
        });
      }
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
  }
};
</script>

<style lang="scss" scoped>
/* 订单卡片样式 */
.order-card {
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-5px);
    border-color: var(--farm-primary);
    box-shadow: 0 0.5rem 1rem rgba(76, 175, 80, 0.2);
  }
}

/* 订单图片容器 */
.order-image-container {
  position: relative;
  overflow: hidden;
  border-radius: 0.75rem;

  .order-image {
    width: 100%;
    height: 180px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .order-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(76, 175, 80, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;

    i {
      color: white;
      font-size: 2rem;
    }
  }

  &:hover {
    .order-image {
      transform: scale(1.05);
    }

    .order-overlay {
      opacity: 1;
    }
  }
}

/* 订单标题 */
.order-title {
  color: var(--farm-primary);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

/* 订单号 */
.order-number {
  font-size: 0.85rem;
  font-family: "Courier New", monospace;
}

/* 订单操作 */
.order-actions {
  margin-top: 0.5rem;

  .badge {
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
    border-radius: 1rem;
  }
}

/* 背景微之改进 */
.bg-farm-primary {
  background: var(--farm-primary) !important;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .order-image-container .order-image {
    height: 150px;
  }

  .order-card {
    margin-bottom: 1rem;
  }
}

@media (max-width: 576px) {
  .order-image-container .order-image {
    height: 120px;
  }
}
</style>
