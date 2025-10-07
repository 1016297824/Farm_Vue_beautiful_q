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
                  <i class="bi bi-seedling me-2"></i>{{ productType }}原料管理
                </h2>
                <p class="text-muted mb-0">
                  管理农场{{ productType }}原料的库存、采购和成熟记录
                </p>
              </div>
            </div>

            <!-- 类型选择区域 -->
            <div class="type-selection-section mb-4">
              <div class="row align-items-center">
                <div class="col-md-3">
                  <label class="form-label-farm">
                    <i class="bi bi-tags me-1"></i>选择类型：
                  </label>
                </div>
                <div class="col-md-4">
                  <select
                    class="form-select form-control-farm"
                    v-model="productType"
                    @change="changeProductType"
                  >
                    <option
                      v-for="(type, index) in productTypeList"
                      :key="index"
                      :value="type"
                    >
                      {{ type }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <!-- 原料表格 -->
            <div class="table-responsive">
              <table class="table table-farm">
                <thead>
                  <tr>
                    <th class="text-center">
                      <i class="bi bi-tag me-1"></i>
                      {{
                        productType == "家禽"
                          ? "幼崽"
                          : productType == "鱼类"
                          ? "鱼苗"
                          : "植株/种子"
                      }}
                    </th>
                    <th class="text-center">
                      <i class="bi bi-box me-1"></i>当前库存
                    </th>
                    <th class="text-center">
                      <i class="bi bi-gear me-1"></i>操作
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(product, index) in productList"
                    :key="index"
                    class="table-row-hover"
                  >
                    <td class="text-center fw-bold text-farm-primary">
                      {{ product.name }}
                    </td>
                    <td class="text-center">
                      <span class="inventory-amount">
                        {{
                          productType == "鱼类"
                            ? product.amount
                            : product.baseAmount
                        }}{{ product.baseUnit }}
                      </span>
                    </td>
                    <td class="text-center">
                      <div class="btn-group-vertical btn-group-sm" role="group">
                        <button
                          type="button"
                          class="btn btn-farm-primary btn-sm mb-1"
                          data-bs-toggle="modal"
                          data-bs-target="#purchaseModal"
                          @click="addPurchase(product)"
                        >
                          <i class="bi bi-cart-plus me-1"></i>采购
                        </button>
                        <button
                          type="button"
                          class="btn btn-outline-warning btn-sm mb-1"
                          data-bs-toggle="modal"
                          data-bs-target="#consumptionModal"
                          @click="abnormalConsumption1(product)"
                        >
                          <i class="bi bi-exclamation-circle me-1"></i>异常消耗
                        </button>
                        <button
                          type="button"
                          class="btn btn-farm-success btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target="#produceModal"
                          @click="produce1(product)"
                        >
                          <i class="bi bi-arrow-up-circle me-1"></i>成熟
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="productList.length === 0">
                    <td colspan="3" class="text-center text-muted py-4">
                      <i class="bi bi-seedling me-2"></i>暂无{{
                        productType
                      }}原料数据
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
              <nav :aria-label="productType + '分页'">
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
              <i class="bi bi-cart-plus me-2"></i>{{ productType }}原料采购
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
                <label class="form-label-farm">原料名称：</label>
                <input
                  type="text"
                  class="form-control form-control-farm"
                  v-model="purchaseProduct.name"
                  readonly
                />
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label-farm">采购数量：</label>
                  <input
                    type="number"
                    class="form-control form-control-farm"
                    v-model="purchaseAmount"
                    min="1"
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label-farm">单价：</label>
                  <input
                    type="number"
                    class="form-control form-control-farm"
                    v-model="purchasePrice"
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
                  v-model="purchaseSupplier"
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
              @click="savePurchase"
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
import { initProduct, doPage, addPurchase } from "@/api/farmStaff";
import farmStaffNavbar from "@/components/Header/FarmStaffNavbar.vue";
import footerNavbar from "@/components/FooterNavbar.vue";

export default {
  name: "RawMaterial",
  components: {
    farmStaffNavbar,
    footerNavbar
  },
  data() {
    return {
      productType: "蔬菜",
      productTypeList: ["蔬菜", "水果", "家禽", "鱼类"],
      productList: [],
      pageBody1: {
        page: 1,
        pages: 1,
        pageList: []
      },
      purchaseProduct: {
        id: null,
        name: null
      },
      purchaseAmount: 0,
      purchasePrice: 0,
      purchaseSupplier: ""
    };
  },
  methods: {
    changeProductType() {
      initProduct(this.productType);
    },
    doPage(page) {
      doPage(page, this.productType);
    },
    addPurchase(product) {
      this.purchaseProduct = JSON.parse(JSON.stringify(product));
      this.purchaseAmount = 0;
      this.purchasePrice = 0;
      this.purchaseSupplier = "";
    },
    savePurchase() {
      if (this.purchaseAmount > 0 && this.purchasePrice >= 0) {
        addPurchase(
          this.purchaseProduct.id,
          this.purchaseAmount,
          this.purchasePrice,
          this.purchaseSupplier
        );
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("purchaseModal")
        );
        if (modal) modal.hide();
      } else {
        alert("请填写有效的采购信息");
      }
    },
    abnormalConsumption1(product) {
      this.purchaseProduct = JSON.parse(JSON.stringify(product));
    },
    produce1(product) {
      this.purchaseProduct = JSON.parse(JSON.stringify(product));
    }
  },
  created() {
    initProduct(this.productType);

    bus.$on(bus.productList, data => {
      this.productList = data || [];
    });
    bus.$on(bus.pageBody1, data => {
      this.pageBody1 = data || { page: 1, pages: 1, pageList: [] };
    });
  },
  beforeDestroy() {
    bus.$off(bus.productList);
    bus.$off(bus.pageBody1);
  }
};
</script>

<style scoped>
.type-selection-section {
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

.inventory-amount {
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
