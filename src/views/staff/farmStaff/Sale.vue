<template>
  <div>
    <!-- 导航栏 -->
    <farmStaffNavbar />

    <!-- 主体内容 -->
    <div class="container" style="padding-top: 100px; padding-bottom: 120px;">
      <div class="row justify-content-center">
        <div class="col-xl-10">
          <div class="card-farm p-4">
            <!-- 页面标题 -->
            <div class="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 class="farm-title mb-2">
                  <i class="bi bi-cash-stack me-2"></i>产品销售
                </h2>
                <p class="text-muted mb-0">管理农产品的销售记录</p>
              </div>
              <button
                type="button"
                class="btn btn-farm-primary"
                data-bs-toggle="modal"
                data-bs-target="#productModal"
                @click="initProduct"
              >
                <i class="bi bi-plus-circle me-2"></i>添加产品
              </button>
            </div>

            <!-- 销售表格 -->
            <div class="table-responsive">
              <table class="table table-farm">
                <thead>
                  <tr>
                    <th class="text-center">
                      <i class="bi bi-tag me-1"></i>产品名
                    </th>
                    <th class="text-center">
                      <i class="bi bi-hash me-1"></i>数量
                    </th>
                    <th class="text-center">
                      <i class="bi bi-cash me-1"></i>单价
                    </th>
                    <th class="text-center">
                      <i class="bi bi-gear me-1"></i>操作
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(sale, index) in saleList"
                    :key="index"
                    class="table-row-hover"
                  >
                    <td class="text-center fw-bold text-farm-primary">
                      {{ sale.product.name }}
                    </td>
                    <td class="text-center">
                      <span class="amount-display">
                        {{ sale.amount }}{{ sale.product.unit }}
                      </span>
                    </td>
                    <td class="text-center">
                      <span class="price-display"> ¥{{ sale.price }} </span>
                    </td>
                    <td class="text-center">
                      <button
                        type="button"
                        class="btn btn-outline-danger btn-sm"
                        @click="deleteSale(index)"
                      >
                        <i class="bi bi-trash me-1"></i>删除
                      </button>
                    </td>
                  </tr>
                  <tr v-if="saleList.length === 0">
                    <td colspan="4" class="text-center text-muted py-4">
                      <i class="bi bi-cart-x me-2"></i>暂无销售记录
                    </td>
                  </tr>
                  <tr v-if="saleList.length > 0" class="total-row">
                    <td></td>
                    <td class="text-center fw-bold text-farm-primary">
                      <i class="bi bi-calculator me-1"></i>合计
                    </td>
                    <td class="text-center">
                      <span class="total-price"> ¥{{ totalPrice }} </span>
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- 提交按钮 -->
            <div class="text-center mt-4">
              <button
                type="button"
                class="btn btn-farm-success btn-lg"
                :disabled="saleList.length === 0"
                @click="addSaleList"
              >
                <i class="bi bi-check-circle me-2"></i>提交销售记录
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 产品选择模态框 -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable"
      >
        <div class="modal-content modal-farm">
          <div class="modal-header">
            <h5 class="modal-title" id="productModalLabel">
              <i class="bi bi-basket me-2"></i>产品列表
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body p-0">
            <!-- 类型选择 -->
            <div class="p-3 border-bottom">
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

            <!-- 产品表格 -->
            <div class="table-responsive">
              <table class="table table-farm mb-0">
                <thead class="table-header-sticky">
                  <tr>
                    <th class="text-center" width="80">
                      <i class="bi bi-check-circle me-1"></i>选择
                    </th>
                    <th class="text-center">
                      <i class="bi bi-tag me-1"></i>产品名
                    </th>
                    <th class="text-center">
                      <i class="bi bi-box me-1"></i>库存
                    </th>
                    <th class="text-center">
                      <i class="bi bi-shield-check me-1"></i>安全库存
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(product, index) in productList"
                    :key="index"
                    class="product-item-row"
                  >
                    <td class="text-center">
                      <button
                        type="button"
                        class="btn btn-outline-success btn-sm"
                        @click="choosedProduct(product)"
                        :class="{
                          'btn-success':
                            selectedProduct && selectedProduct.id === product.id
                        }"
                      >
                        <i
                          class="bi bi-check"
                          v-if="
                            selectedProduct && selectedProduct.id === product.id
                          "
                        ></i>
                        <i class="bi bi-plus" v-else></i>
                      </button>
                    </td>
                    <td class="fw-bold text-farm-primary">
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
                  </tr>
                  <tr v-if="productList.length === 0">
                    <td colspan="4" class="text-center text-muted py-4">
                      <i class="bi bi-emoji-frown me-2"></i>暂无产品数据
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- 分页器 -->
            <div
              class="d-flex justify-content-center py-3"
              v-if="pageBody1.pageList && pageBody1.pageList.length > 0"
            >
              <nav aria-label="产品分页">
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

          <!-- 模态框底部 -->
          <div class="modal-footer">
            <div class="row w-100 align-items-center">
              <div class="col-md-6">
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-tag me-1"></i>已选产品
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    readonly
                    :value="
                      selectedProduct ? selectedProduct.name : '请选择产品'
                    "
                    :placeholder="'请选择产品'"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="input-group">
                  <span class="input-group-text">数量</span>
                  <input
                    type="number"
                    class="form-control"
                    v-model="saleAmount"
                    min="1"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="input-group">
                  <span class="input-group-text">单价</span>
                  <input
                    type="number"
                    class="form-control"
                    v-model="salePrice"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
            </div>
            <div class="w-100 mt-3">
              <button
                type="button"
                class="btn btn-farm-primary w-100"
                @click="addProductToSale"
                :disabled="!selectedProduct || saleAmount <= 0 || salePrice < 0"
              >
                <i class="bi bi-check-circle me-2"></i>添加到销售单
              </button>
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
import { initProduct, doPage, addSaleList } from "@/api/farmStaff";
import farmStaffNavbar from "@/components/Header/FarmStaffNavbar.vue";
import footerNavbar from "@/components/FooterNavbar.vue";

export default {
  name: "Sale",
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
      selectedProduct: null,
      saleAmount: 1,
      salePrice: 0,
      saleList: []
    };
  },
  computed: {
    totalPrice() {
      return this.saleList
        .reduce((total, sale) => {
          return total + sale.amount * sale.price;
        }, 0)
        .toFixed(2);
    }
  },
  methods: {
    changeProductType() {
      initProduct(this.productType);
    },
    doPage(page) {
      doPage(page, this.productType);
    },
    initProduct() {
      this.selectedProduct = null;
      this.saleAmount = 1;
      this.salePrice = 0;
      initProduct(this.productType);
    },
    choosedProduct(product) {
      this.selectedProduct = JSON.parse(JSON.stringify(product));
      this.salePrice = product.price || 0;
    },
    addProductToSale() {
      if (this.selectedProduct && this.saleAmount > 0 && this.salePrice >= 0) {
        // 检查是否已存在该产品
        const existingIndex = this.saleList.findIndex(
          sale => sale.product.id === this.selectedProduct.id
        );
        if (existingIndex >= 0) {
          // 如果已存在，更新数量和价格
          this.saleList[existingIndex].amount = this.saleAmount;
          this.saleList[existingIndex].price = this.salePrice;
        } else {
          // 如果不存在，添加新产品
          this.saleList.push({
            product: this.selectedProduct,
            amount: this.saleAmount,
            price: this.salePrice
          });
        }

        // 关闭模态框
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("productModal")
        );
        if (modal) modal.hide();
      } else {
        alert("请选择产品并填写有效的数量和价格");
      }
    },
    deleteSale(index) {
      this.saleList.splice(index, 1);
    },
    addSaleList() {
      if (this.saleList.length > 0) {
        if (confirm("确定要提交这些销售记录吗？")) {
          addSaleList(this.saleList);
          this.saleList = [];
        }
      }
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

.amount-display,
.price-display {
  font-weight: 600;
  color: var(--farm-green-dark);
}

.total-price {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--farm-green-dark);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.total-row {
  background: linear-gradient(
    135deg,
    rgba(76, 175, 80, 0.1),
    rgba(129, 199, 132, 0.1)
  );
  font-weight: 600;
}

.modal-farm .modal-header {
  background: linear-gradient(
    135deg,
    var(--farm-green),
    var(--farm-green-dark)
  );
  color: white;
}

.table-header-sticky {
  position: sticky;
  top: 0;
  z-index: 10;
}

.product-item-row:hover {
  background: linear-gradient(
    135deg,
    rgba(76, 175, 80, 0.05),
    rgba(129, 199, 132, 0.05)
  );
  transform: translateY(-1px);
}

.inventory-amount,
.safe-amount {
  font-weight: 600;
  color: var(--farm-green-dark);
}

.pagination-farm {
  --bs-pagination-color: var(--farm-green-dark);
  --bs-pagination-border-color: var(--farm-border-light);
  --bs-pagination-hover-color: white;
  --bs-pagination-hover-bg: var(--farm-green);
  --bs-pagination-active-bg: var(--farm-green-dark);
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

.btn-farm-primary {
  background: linear-gradient(
    135deg,
    var(--farm-green),
    var(--farm-green-dark)
  );
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
}

.btn-farm-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(76, 175, 80, 0.4);
  background: linear-gradient(135deg, var(--farm-green-dark), #2e7d32);
}

.btn-farm-success {
  background: linear-gradient(135deg, #28a745, #20c997);
  border: none;
  color: white;
  border-radius: 8px;
  padding: 0.75rem 2rem;
  font-weight: 600;
  font-size: 1rem;
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
