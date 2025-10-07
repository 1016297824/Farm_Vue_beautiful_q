<template>
  <div>
    <!-- 导航栏 -->
    <restaurantStaffNavbar />

    <!-- 主体内容 -->
    <div class="container" style="padding-top: 100px; padding-bottom: 120px;">
      <div class="row justify-content-center">
        <div class="col-xl-10">
          <div class="card-farm p-4">
            <!-- 页面标题 -->
            <div class="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 class="farm-title mb-2">
                  <i class="bi bi-receipt me-2"></i>顾客订单管理
                </h2>
                <p class="text-muted mb-0">查看和处理顾客订单</p>
              </div>
            </div>

            <!-- 顾客订单表格 -->
            <div class="table-responsive">
              <table class="table table-farm">
                <thead>
                  <tr>
                    <th class="text-center">
                      <i class="bi bi-hash me-1"></i>订单号
                    </th>
                    <th class="text-center">
                      <i class="bi bi-table me-1"></i>桌位
                    </th>
                    <th class="text-center">
                      <i class="bi bi-person me-1"></i>顾客姓名
                    </th>
                    <th class="text-center">
                      <i class="bi bi-eye me-1"></i>操作
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(reserve, index) in reserveList"
                    :key="index"
                    class="table-row-hover"
                  >
                    <td class="text-center fw-bold text-farm-primary">
                      {{ reserve.no }}
                    </td>
                    <td class="text-center">
                      {{ reserve.diningTable.id }}号桌
                    </td>
                    <td class="text-center">
                      {{ reserve.customer.name }}
                    </td>
                    <td class="text-center">
                      <div class="btn-group" role="group">
                        <button
                          type="button"
                          class="btn btn-outline-primary btn-sm me-2"
                          data-bs-toggle="modal"
                          data-bs-target="#orderModal"
                          @click="getOrdering(reserve.no)"
                        >
                          <i class="bi bi-eye me-1"></i>查看
                        </button>
                        <button
                          type="button"
                          class="btn btn-outline-danger btn-sm"
                          @click="deleteReserve(reserve.no)"
                        >
                          <i class="bi bi-trash me-1"></i>取消订单
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="reserveList.length === 0">
                    <td colspan="4" class="text-center text-muted py-4">
                      <i class="bi bi-receipt me-2"></i>暂无顾客订单
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
              <nav aria-label="订单分页">
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

    <!-- 订单详情模态框 -->
    <div
      class="modal fade"
      id="orderModal"
      tabindex="-1"
      aria-labelledby="orderModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content modal-farm">
          <div class="modal-header">
            <h5 class="modal-title" id="orderModalLabel">
              <i class="bi bi-receipt me-2"></i>订单详情
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <div class="order-details">
              <div
                v-if="orderingList.length === 0"
                class="text-center py-4 text-muted"
              >
                <i class="bi bi-receipt me-2"></i>暂无订单详情
              </div>
              <div v-else>
                <div class="table-responsive">
                  <table class="table table-farm">
                    <thead>
                      <tr>
                        <th class="text-center">
                          <i class="bi bi-egg-fried me-1"></i>菜名
                        </th>
                        <th class="text-center">
                          <i class="bi bi-hash me-1"></i>份数
                        </th>
                        <th class="text-center">
                          <i class="bi bi-cash me-1"></i>单价
                        </th>
                        <th class="text-center">
                          <i class="bi bi-calculator me-1"></i>小计
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(ordering, index) in orderingList"
                        :key="index"
                      >
                        <td class="text-center fw-bold text-farm-primary">
                          {{ ordering.menu.name }}
                        </td>
                        <td class="text-center">
                          {{ ordering.count }}
                        </td>
                        <td class="text-center">
                          ¥{{ ordering.menu.price | numFilter }}
                        </td>
                        <td class="text-center">
                          ¥{{
                            (ordering.menu.price * ordering.count) | numFilter
                          }}
                        </td>
                      </tr>
                      <tr class="total-row">
                        <td
                          colspan="3"
                          class="text-center fw-bold text-farm-primary"
                        >
                          <i class="bi bi-calculator me-1"></i>合计
                        </td>
                        <td class="text-center">
                          <span class="total-price"
                            >¥{{ totalPrice | numFilter }}</span
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              <i class="bi bi-x-circle me-2"></i>关闭
            </button>
            <button
              type="button"
              class="btn btn-farm-success"
              :disabled="orderingList.length === 0"
              @click="settleAccounts"
            >
              <i class="bi bi-cash-stack me-2"></i>结账
            </button>
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
  getReserve as getReserveList,
  doPage,
  getOrdering,
  deleteReserve,
  settleAccounts
} from "@/api/restaurantStaff.js";
import restaurantStaffNavbar from "@/components/Header/RestaurantStaffNavbar.vue";
import footerNavbar from "@/components/FooterNavbar.vue";

export default {
  name: "SettleAccounts",
  components: {
    restaurantStaffNavbar,
    footerNavbar
  },
  data() {
    return {
      reserveList: [],
      pageBody1: {
        page: 1,
        pages: 1,
        pageList: []
      },
      orderingList: [],
      totalPrice: 0
    };
  },
  filters: {
    numFilter(value) {
      if (!value) return "0.00";
      return parseFloat(value).toFixed(2);
    }
  },
  methods: {
    doPage(page) {
      doPage(page);
    },
    getOrdering(no) {
      getOrdering(no);
    },
    deleteReserve(no) {
      if (confirm(`确定要取消订单号为 ${no} 的订单吗？`)) {
        deleteReserve(no);
      }
    },
    settleAccounts() {
      if (this.orderingList.length > 0) {
        if (
          confirm(
            `确定要为该订单结账吗？\n\n合计金额：¥${this.totalPrice.toFixed(2)}`
          )
        ) {
          settleAccounts();

          // 关闭模态框
          const modal = bootstrap.Modal.getInstance(
            document.getElementById("orderModal")
          );
          if (modal) modal.hide();
        }
      }
    }
  },
  created() {
    getReserveList();

    bus.$on(bus.reserveList, data => {
      this.reserveList = data || [];
    });
    bus.$on(bus.pageBody1, data => {
      this.pageBody1 = data || { page: 1, pages: 1, pageList: [] };
    });
    bus.$on(bus.orderingList, data => {
      this.orderingList = data || [];

      // 计算总价
      this.totalPrice = this.orderingList.reduce((total, ordering) => {
        return total + ordering.menu.price * ordering.count;
      }, 0);
    });
  },
  beforeDestroy() {
    bus.$off(bus.reserveList);
    bus.$off(bus.pageBody1);
    bus.$off(bus.orderingList);
  }
};
</script>

<style scoped>
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

.total-row {
  background: linear-gradient(
    135deg,
    rgba(76, 175, 80, 0.1),
    rgba(129, 199, 132, 0.1)
  );
  font-weight: 600;
}

.total-price {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--farm-green-dark);
}

.modal-farm .modal-header {
  background: linear-gradient(
    135deg,
    var(--farm-green),
    var(--farm-green-dark)
  );
  color: white;
}

.pagination-farm {
  --bs-pagination-color: var(--farm-green-dark);
  --bs-pagination-border-color: var(--farm-border-light);
  --bs-pagination-hover-color: white;
  --bs-pagination-hover-bg: var(--farm-green);
  --bs-pagination-active-bg: var(--farm-green-dark);
}

.btn-farm-success {
  background: linear-gradient(135deg, #28a745, #20c997);
  border: none;
  color: white;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(40, 167, 69, 0.3);
}

.btn-farm-success:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(40, 167, 69, 0.4);
  background: linear-gradient(135deg, #20c997, #17a2b8);
  color: white;
}

@media (max-width: 768px) {
  .card-farm {
    padding: 1.5rem !important;
  }

  .farm-title {
    font-size: 1.5rem;
  }

  .modal-dialog {
    margin: 0.5rem;
  }
}
</style>
