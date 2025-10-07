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
                  <i class="bi bi-tools me-2"></i>报修报损管理
                </h2>
                <p class="text-muted mb-0">查看和处理报修报损记录</p>
              </div>
            </div>

            <!-- 报修报损表格 -->
            <div class="table-responsive">
              <table class="table table-farm">
                <thead>
                  <tr>
                    <th class="text-center">
                      <i class="bi bi-hash me-1"></i>编号
                    </th>
                    <th class="text-center">
                      <i class="bi bi-calendar-date me-1"></i>日期
                    </th>
                    <th class="text-center">
                      <i class="bi bi-tags me-1"></i>类型
                    </th>
                    <th class="text-center">
                      <i class="bi bi-eye me-1"></i>操作
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(repair, index) in repairList"
                    :key="index"
                    class="table-row-hover"
                  >
                    <td class="text-center fw-bold text-farm-primary">
                      {{ repair.id }}
                    </td>
                    <td class="text-center">
                      {{ repair.insertTime | formatDate }}
                    </td>
                    <td class="text-center">
                      <span
                        class="badge"
                        :class="
                          repair.repairType === '报修'
                            ? 'bg-warning'
                            : 'bg-danger'
                        "
                      >
                        {{ repair.repairType }}
                      </span>
                    </td>
                    <td class="text-center">
                      <div class="btn-group" role="group">
                        <button
                          type="button"
                          class="btn btn-outline-primary btn-sm me-2"
                          data-bs-toggle="modal"
                          data-bs-target="#repairModal"
                          @click="checkRepair(repair)"
                        >
                          <i class="bi bi-eye me-1"></i>查看
                        </button>
                        <button
                          type="button"
                          class="btn btn-outline-danger btn-sm"
                          @click="deleteRepair(repair)"
                        >
                          <i class="bi bi-trash me-1"></i>取消
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="repairList.length === 0">
                    <td colspan="4" class="text-center text-muted py-4">
                      <i class="bi bi-tools me-2"></i>暂无报修报损记录
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
              <nav aria-label="报修报损分页">
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

    <!-- 详细信息模态框 -->
    <div
      class="modal fade"
      id="repairModal"
      tabindex="-1"
      aria-labelledby="repairModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content modal-farm">
          <div class="modal-header">
            <h5 class="modal-title" id="repairModalLabel">
              <i class="bi bi-info-circle me-2"></i>详细信息
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <div class="repair-details">
              <div class="mb-3">
                <label class="form-label-farm">
                  <i class="bi bi-card-text me-1"></i
                  >{{ repair.repairType }}内容：
                </label>
                <textarea
                  readonly
                  class="form-control form-control-farm"
                  rows="3"
                  v-model="repair.content"
                ></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label-farm">
                  <i class="bi bi-question-circle me-1"></i
                  >{{ repair.repairType }}原因：
                </label>
                <textarea
                  readonly
                  class="form-control form-control-farm"
                  rows="5"
                  v-model="repair.cause"
                ></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label-farm">
                  <i class="bi bi-cash me-1"></i>处理费用：
                </label>
                <div class="input-group">
                  <input
                    type="number"
                    class="form-control form-control-farm"
                    v-model="repair.price"
                    @keyup="writePrice"
                    min="0"
                    step="0.01"
                  />
                  <span class="input-group-text">元</span>
                </div>
                <div class="form-text text-danger" v-if="priceMessage">
                  {{ priceMessage }}
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
              class="btn btn-farm-primary"
              @click="completeRepair"
            >
              <i class="bi bi-check-circle me-2"></i>完成处理
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
  getRepair as getRepairList,
  doPage1 as doPage,
  deleteRepair,
  completeRepair
} from "@/api/restaurantStaff.js";
import restaurantStaffNavbar from "@/components/Header/RestaurantStaffNavbar.vue";
import footerNavbar from "@/components/FooterNavbar.vue";

export default {
  name: "RepairComplete",
  components: {
    restaurantStaffNavbar,
    footerNavbar
  },
  data() {
    return {
      repairList: [],
      pageBody1: {
        page: 1,
        pages: 1,
        pageList: []
      },
      repair: {
        id: null,
        repairType: "报修",
        content: null,
        cause: null,
        price: null,
        insertTime: null
      },
      priceMessage: null
    };
  },
  filters: {
    formatDate(time) {
      if (!time) return "--";
      const date = new Date(time);
      return `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date
        .getDate()
        .toString()
        .padStart(2, "0")} ${date
        .getHours()
        .toString()
        .padStart(2, "0")}:${date
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
    }
  },
  methods: {
    doPage(page) {
      doPage(page);
    },
    checkRepair(repair) {
      this.repair = JSON.parse(JSON.stringify(repair));
      this.priceMessage = null;
    },
    deleteRepair(repair) {
      if (
        confirm(`确定要取消编号为 ${repair.id} 的${repair.repairType}记录吗？`)
      ) {
        deleteRepair(repair.id);
      }
    },
    completeRepair() {
      // 重置错误信息
      this.priceMessage = null;

      // 验证价格输入
      if (this.repair.price === null || this.repair.price === "") {
        this.priceMessage = "请输入处理费用！";
        return;
      }

      if (this.repair.price < 0) {
        this.priceMessage = "处理费用不能为负数！";
        return;
      }

      completeRepair(this.repair);

      // 关闭模态框
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("repairModal")
      );
      if (modal) modal.hide();
    },
    writePrice() {
      this.priceMessage = null;
    }
  },
  created() {
    getRepairList();

    bus.$on(bus.repairList, data => {
      this.repairList = data || [];
    });
    bus.$on(bus.pageBody1, data => {
      this.pageBody1 = data || { page: 1, pages: 1, pageList: [] };
    });
  },
  beforeDestroy() {
    bus.$off(bus.repairList);
    bus.$off(bus.pageBody1);
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

@media (max-width: 768px) {
  .card-farm {
    padding: 1.5rem !important;
  }

  .farm-title {
    font-size: 1.5rem;
  }
}
</style>
