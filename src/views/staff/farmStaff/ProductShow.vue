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
                  <i class="bi bi-egg-fill me-2"></i>{{ productType }}管理
                </h2>
                <p class="text-muted mb-0">
                  管理农场{{ productType }}的库存、生产和销售记录
                </p>
              </div>
              <button
                type="button"
                class="btn btn-farm-primary"
                data-bs-toggle="modal"
                data-bs-target="#productModal"
                @click="addProduct"
              >
                <i class="bi bi-plus-circle me-2"></i>添加农产品
              </button>
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

            <!-- 产品表格 -->
            <div class="table-responsive">
              <table class="table table-farm">
                <thead>
                  <tr>
                    <th class="text-center">
                      <i class="bi bi-tag me-1"></i>农产品名
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
                    v-for="(product, index) in productList"
                    :key="index"
                    class="table-row-hover"
                  >
                    <td class="text-center fw-bold text-farm-primary">
                      {{ product.name }}
                    </td>
                    <td class="text-center">
                      <span class="inventory-amount">
                        {{ product.amount }}{{ product.unit }}
                      </span>
                    </td>
                    <td class="text-center">
                      <span class="safe-amount">
                        {{ product.safeAmount }}{{ product.unit }}
                      </span>
                    </td>
                    <td class="text-center">
                      <span
                        v-if="product.amount <= product.safeAmount"
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
                          data-bs-target="#produceModal"
                          @click="produce(product)"
                        >
                          <i class="bi bi-tools me-1"></i>生产
                        </button>
                        <button
                          type="button"
                          class="btn btn-outline-warning btn-sm mb-1"
                          data-bs-toggle="modal"
                          data-bs-target="#consumptionModal"
                          @click="abnormalConsumption(product)"
                        >
                          <i class="bi bi-exclamation-circle me-1"></i>异常消耗
                        </button>
                        <button
                          type="button"
                          class="btn btn-outline-danger btn-sm"
                          @click="deleteProduct(product)"
                        >
                          <i class="bi bi-trash me-1"></i>删除
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="productList.length === 0">
                    <td colspan="5" class="text-center text-muted py-4">
                      <i class="bi bi-egg me-2"></i>暂无{{ productType }}数据
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

    <!-- 添加产品模态框 -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content modal-farm">
          <div class="modal-header">
            <h5 class="modal-title" id="productModalLabel">
              <i class="bi bi-egg-fill me-2"></i>添加{{ productType }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <div class="product-form">
              <div class="mb-3">
                <label class="form-label-farm">{{ productType }}名称：</label>
                <input
                  type="text"
                  class="form-control form-control-farm"
                  v-model="product.name"
                />
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label-farm">单位：</label>
                  <input
                    type="text"
                    class="form-control form-control-farm"
                    v-model="product.unit"
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label-farm">安全库存：</label>
                  <input
                    type="number"
                    class="form-control form-control-farm"
                    v-model="product.safeAmount"
                    min="0"
                  />
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
              <i class="bi bi-x-circle me-2"></i>取消
            </button>
            <button
              type="button"
              class="btn btn-farm-primary"
              @click="saveProduct"
            >
              <i class="bi bi-check-circle me-2"></i>保存
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 生产模态框 -->
    <div
      class="modal fade"
      id="produceModal"
      tabindex="-1"
      aria-labelledby="produceModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content modal-farm">
          <div class="modal-header">
            <h5 class="modal-title" id="produceModalLabel">
              <i class="bi bi-tools me-2"></i>{{ productType }}生产
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <div class="produce-form">
              <div class="mb-3">
                <label class="form-label-farm">{{ productType }}名称：</label>
                <input
                  type="text"
                  class="form-control form-control-farm"
                  v-model="produceProduct.name"
                  readonly
                />
              </div>
              <div class="mb-3">
                <label class="form-label-farm">生产数量：</label>
                <input
                  type="number"
                  class="form-control form-control-farm"
                  v-model="produceAmount"
                  min="1"
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
              @click="saveProduce"
            >
              <i class="bi bi-check-circle me-2"></i>确认生产
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
  initProduct,
  doPage,
  modifyProduct as saveProduct,
  produce as saveProduce,
  deleteProduct
} from "@/api/farmStaff";
import farmStaffNavbar from "@/components/Header/FarmStaffNavbar.vue";
import footerNavbar from "@/components/FooterNavbar.vue";

export default {
  name: "ProductShow",
  components: {
    farmStaffNavbar,
    footerNavbar
  },
  data() {
    return {
      productType: "蔬菜",
      productTypeList: ["蔬菜", "水果", "禽蛋", "肉类"],
      productList: [],
      pageBody1: {
        page: 1,
        pages: 1,
        pageList: []
      },
      product: {
        id: null,
        name: null,
        productType: null,
        amount: 0,
        unit: null,
        safeAmount: 0
      },
      produceProduct: {
        id: null,
        name: null
      },
      produceAmount: 0
    };
  },
  methods: {
    changeProductType() {
      initProduct(this.productType);
    },
    doPage(page) {
      doPage(page, this.productType);
    },
    addProduct() {
      this.product = {
        id: null,
        name: null,
        productType: this.productType,
        amount: 0,
        unit: null,
        safeAmount: 0
      };
    },
    saveProduct() {
      if (this.product.name && this.product.unit) {
        saveProduct(this.product, this.productType);
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("productModal")
        );
        if (modal) modal.hide();
      } else {
        alert("请填写完整的产品信息");
      }
    },
    produce(product) {
      this.produceProduct = JSON.parse(JSON.stringify(product));
      this.produceAmount = 0;
    },
    saveProduce() {
      if (this.produceAmount > 0) {
        saveProduce(this.produceProduct.id, this.produceAmount);
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("produceModal")
        );
        if (modal) modal.hide();
      } else {
        alert("请输入有效的生产数量");
      }
    },
    deleteProduct(product) {
      if (confirm(`确定要删除 ${product.name} 吗？`)) {
        deleteProduct(product.id, this.productType);
      }
    },
    abnormalConsumption(product) {
      this.produceProduct = JSON.parse(JSON.stringify(product));
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
