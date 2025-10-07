<template>
  <div>
    <!-- 导航栏 -->
    <farmStaffNavbar />

    <!-- 主体内容 -->
    <div class="container" style="padding-top: 100px; padding-bottom: 120px;">
      <div class="row justify-content-center">
        <div class="col-xl-12">
          <div class="card-farm p-4">
            <!-- 页面标题 -->
            <div class="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 class="farm-title mb-2">
                  <i class="bi bi-basket me-2"></i>餐厅物资管理
                </h2>
                <p class="text-muted mb-0">
                  管理餐厅物资的库存、采购和使用记录
                </p>
              </div>
              <button
                type="button"
                class="btn btn-farm-primary"
                data-bs-toggle="modal"
                data-bs-target="#addRestaurantMaterialModal"
                @click="addRestaurantMaterial"
              >
                <i class="bi bi-plus-circle me-2"></i>新建采购信息
              </button>
            </div>

            <!-- 物资表格 -->
            <div class="table-responsive">
              <table class="table table-farm">
                <thead>
                  <tr>
                    <th class="text-center">
                      <i class="bi bi-tag me-1"></i>物资名
                    </th>
                    <th class="text-center">
                      <i class="bi bi-box me-1"></i>当前库存
                    </th>
                    <th class="text-center">
                      <i class="bi bi-shield-check me-1"></i>安全库存
                    </th>
                    <th class="text-center">
                      <i class="bi bi-exclamation-triangle me-1"></i>库存状态
                    </th>
                    <th class="text-center">
                      <i class="bi bi-gear me-1"></i>操作
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(restaurantMaterial,
                    index) in restaurantMaterialList"
                    :key="index"
                    class="table-row-hover"
                  >
                    <td class="text-center fw-bold text-farm-primary">
                      {{ restaurantMaterial.name }}
                    </td>
                    <td class="text-center">
                      <span class="inventory-amount">
                        {{ restaurantMaterial.amount
                        }}{{ restaurantMaterial.unit }}
                      </span>
                    </td>
                    <td class="text-center">
                      <span class="safe-amount">
                        {{ restaurantMaterial.safeAmount
                        }}{{ restaurantMaterial.unit }}
                      </span>
                    </td>
                    <td class="text-center">
                      <span
                        v-if="
                          restaurantMaterial.amount <=
                            restaurantMaterial.safeAmount
                        "
                        class="badge bg-danger"
                      >
                        <i class="bi bi-exclamation-triangle me-1"></i>库存不足
                      </span>
                      <span v-else class="badge bg-success">
                        <i class="bi bi-check-circle me-1"></i>库存充足
                      </span>
                    </td>
                    <td class="text-center">
                      <div class="btn-group-vertical btn-group-sm" role="group">
                        <button
                          type="button"
                          class="btn btn-farm-primary btn-sm mb-1"
                          data-bs-toggle="modal"
                          data-bs-target="#purchaseModal"
                          @click="
                            addRestaurantMaterialPurchase(restaurantMaterial)
                          "
                        >
                          <i class="bi bi-cart-plus me-1"></i>采购
                        </button>
                        <button
                          type="button"
                          class="btn btn-outline-warning btn-sm mb-1"
                          data-bs-toggle="modal"
                          data-bs-target="#consumptionModal"
                          @click="
                            abnormalConsumptionRestaurantMaterial(
                              restaurantMaterial
                            )
                          "
                        >
                          <i class="bi bi-exclamation-circle me-1"></i>异常消耗
                        </button>
                        <button
                          type="button"
                          class="btn btn-farm-success btn-sm mb-1"
                          data-bs-toggle="modal"
                          data-bs-target="#useModal"
                          @click="UseRestaurantMaterial(restaurantMaterial)"
                        >
                          <i class="bi bi-check-square me-1"></i>使用
                        </button>
                        <button
                          type="button"
                          class="btn btn-outline-danger btn-sm"
                          @click="deleteRestaurantMaterial(restaurantMaterial)"
                        >
                          <i class="bi bi-trash me-1"></i>删除
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="restaurantMaterialList.length === 0">
                    <td colspan="5" class="text-center text-muted py-4">
                      <i class="bi bi-basket me-2"></i>暂无餐厅物资数据
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
              <nav aria-label="餐厅物资分页">
                <ul class="pagination pagination-farm">
                  <li
                    class="page-item"
                    :class="{ disabled: pageBody1.page === 1 }"
                  >
                    <button
                      type="button"
                      class="page-link"
                      @click="doPage2(1)"
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
                      @click="doPage2(page)"
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
                      @click="doPage2(pageBody1.pages)"
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

    <!-- 采购模态框 -->
    <div
      class="modal fade"
      id="purchaseModal"
      tabindex="-1"
      aria-labelledby="purchaseModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content modal-farm">
          <div class="modal-header">
            <h5 class="modal-title" id="purchaseModalLabel">
              <i class="bi bi-cart-plus me-2"></i>物资采购
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <div class="purchase-form">
              <div class="mb-3">
                <label class="form-label-farm">物资名称：</label>
                <input
                  type="text"
                  class="form-control form-control-farm"
                  v-model="purchase.restaurantMaterial.name"
                  readonly
                />
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label-farm">采购数量：</label>
                  <input
                    type="number"
                    class="form-control form-control-farm"
                    v-model="purchase.amount"
                    min="1"
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label-farm">单价：</label>
                  <input
                    type="number"
                    class="form-control form-control-farm"
                    v-model="purchase.price"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label-farm">供应商：</label>
                <input
                  type="text"
                  class="form-control form-control-farm"
                  v-model="purchase.supplier"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              <i class="bi bi-x-circle me-2"></i>取消
            </button>
            <button
              type="button"
              class="btn btn-farm-primary"
              @click="addPurchaseData"
            >
              <i class="bi bi-check-circle me-2"></i>确认采购
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
  initRestaurantMaterial,
  doPage2,
  deleteRestaurantMaterial,
  addRestaurantMaterialPurchase as addPurchaseData
} from "@/api/farmStaff";
import farmStaffNavbar from "@/components/Header/FarmStaffNavbar.vue";
import footerNavbar from "@/components/FooterNavbar.vue";

export default {
  name: "RestaurantMaterial",
  components: {
    farmStaffNavbar,
    footerNavbar
  },
  data() {
    return {
      restaurantMaterialList: [],
      pageBody1: {
        page: 1,
        pages: 1,
        pageList: []
      },
      restaurantMaterial: {
        id: null,
        name: null,
        amount: null,
        unit: null,
        safeAmount: null
      },
      purchase: {
        id: null,
        amount: null,
        price: null,
        supplier: null,
        restaurantMaterial: {
          id: null,
          name: null
        }
      }
    };
  },
  methods: {
    doPage2(page) {
      doPage2(page);
    },
    addRestaurantMaterial() {
      this.restaurantMaterial = {
        id: null,
        name: null,
        amount: null,
        unit: null,
        safeAmount: null
      };
    },
    addRestaurantMaterialPurchase(restaurantMaterial) {
      this.restaurantMaterial = JSON.parse(JSON.stringify(restaurantMaterial));
      this.purchase = {
        id: null,
        amount: null,
        price: null,
        supplier: null,
        restaurantMaterial: {
          id: restaurantMaterial.id,
          name: restaurantMaterial.name
        }
      };
    },
    deleteRestaurantMaterial(restaurantMaterial) {
      if (confirm(`确定要删除 ${restaurantMaterial.name} 吗？`)) {
        deleteRestaurantMaterial(restaurantMaterial.id);
      }
    },
    abnormalConsumptionRestaurantMaterial(restaurantMaterial) {
      this.restaurantMaterial = JSON.parse(JSON.stringify(restaurantMaterial));
    },
    UseRestaurantMaterial(restaurantMaterial) {
      this.restaurantMaterial = JSON.parse(JSON.stringify(restaurantMaterial));
    },
    addPurchaseData() {
      if (this.purchase.amount && this.purchase.price) {
        addPurchaseData(this.purchase);
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("purchaseModal")
        );
        if (modal) modal.hide();
      } else {
        alert("请填写完整的采购信息");
      }
    }
  },
  created() {
    initRestaurantMaterial();

    bus.$on(bus.restaurantMaterialList, data => {
      this.restaurantMaterialList = data || [];
    });
    bus.$on(bus.pageBody1, data => {
      this.pageBody1 = data || { page: 1, pages: 1, pageList: [] };
    });
  },
  beforeDestroy() {
    bus.$off(bus.restaurantMaterialList);
    bus.$off(bus.pageBody1);
  }
};
</script>

<style scoped>
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

.inventory-amount,
.safe-amount {
  font-weight: 600;
  color: var(--farm-green-dark);
}

.btn-group-vertical .btn {
  min-width: 100px;
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
  .btn-group-vertical .btn {
    min-width: 80px;
    font-size: 0.8rem;
  }
}
</style>
