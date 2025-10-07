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
            <div class="text-center mb-4">
              <h2 class="farm-title mb-2">
                <i class="bi bi-basket3 me-2"></i>农家点餐
              </h2>
              <p class="text-muted">选择您喜欢的农家美食，享受绿色健康生活</p>
            </div>

            <!-- 本桌菜单区域 -->
            <div class="menu-section">
              <div
                class="d-flex justify-content-between align-items-center mb-3"
              >
                <h4 class="section-title mb-0">
                  <i class="bi bi-cup-hot me-2"></i>本桌菜单
                </h4>
                <button
                  type="button"
                  class="btn btn-farm-primary"
                  @click="showModal"
                >
                  <i class="bi bi-plus-circle me-2"></i>添加菜品
                </button>
              </div>

              <!-- 菜单表格 -->
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
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(ordering, index) in orderingList"
                      :key="index"
                      class="table-row-hover"
                    >
                      <td class="text-center fw-bold text-farm-primary">
                        {{ ordering.menu.name }}
                      </td>
                      <td class="text-center">
                        <div
                          class="quantity-controls d-inline-flex align-items-center"
                        >
                          <button
                            type="button"
                            class="btn btn-sm btn-outline-danger me-2"
                            @click="decreaseCount1(index)"
                            v-show="!isOrdered"
                            :disabled="ordering.count <= 1"
                          >
                            <i class="bi bi-dash"></i>
                          </button>
                          <span class="quantity-display">{{
                            ordering.count
                          }}</span>
                          <button
                            type="button"
                            class="btn btn-sm btn-outline-success ms-2"
                            @click="addCount1(index)"
                            v-show="!isOrdered"
                          >
                            <i class="bi bi-plus"></i>
                          </button>
                        </div>
                      </td>
                      <td class="text-center">
                        <span class="price-display">
                          ¥{{ ordering.menu.price | numFilter }}
                        </span>
                        <small class="text-muted"
                          >{{ ordering.menu.unite }}/份</small
                        >
                      </td>
                    </tr>
                    <tr v-if="orderingList.length === 0">
                      <td colspan="3" class="text-center text-muted py-4">
                        <i class="bi bi-basket2 me-2"></i
                        >暂无菜品，请点击"添加菜品"选择您喜欢的美食
                      </td>
                    </tr>
                    <tr v-if="orderingList.length > 0" class="total-row">
                      <td></td>
                      <td class="text-center fw-bold text-farm-primary">
                        <i class="bi bi-calculator me-1"></i>合计
                      </td>
                      <td class="text-center">
                        <span class="total-price">
                          ¥{{ totalPrice | numFilter }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- 提交按钮 -->
              <div class="text-center mt-4" v-if="!isOrdered">
                <button
                  type="button"
                  class="btn btn-farm-success btn-lg"
                  :disabled="orderingList.length === 0"
                  @click="addOrdering"
                >
                  <i class="bi bi-check-circle me-2"></i>确认提交订单
                </button>
              </div>

              <!-- 已提交状态 -->
              <div class="text-center mt-4" v-if="isOrdered">
                <div class="alert alert-farm-success" role="alert">
                  <h6 class="alert-heading">
                    <i class="bi bi-check-circle-fill me-2"></i>订单已提交
                  </h6>
                  您的订单已成功提交，请耐心等待美食制作完成！
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 自定义模态框 -->
    <div class="modal-overlay" v-if="isModalVisible" @click="hideModal">
      <div class="modal-content-custom" @click.stop>
        <div class="modal-header-custom">
          <h5 class="modal-title" id="orderModalLabel">
            <i class="bi bi-menu-button-wide me-2"></i>农家菜单
          </h5>
          <button
            type="button"
            class="btn-close-custom"
            @click="hideModal"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <div class="modal-body-custom">
          <!-- 菜单表格 -->
          <div class="table-responsive">
            <table class="table table-farm mb-0">
              <thead class="table-header-sticky">
                <tr>
                  <th class="text-center" width="80">
                    <i class="bi bi-check-circle me-1"></i>选择
                  </th>
                  <th class="text-center" width="120">
                    <i class="bi bi-image me-1"></i>图片
                  </th>
                  <th class="text-center">
                    <i class="bi bi-egg-fried me-1"></i>菜名
                  </th>
                  <th class="text-center" width="120">
                    <i class="bi bi-cash me-1"></i>单价
                  </th>
                  <th class="text-center" width="100">
                    <i class="bi bi-tags me-1"></i>类型
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(menu, index) in menuList1"
                  :key="index"
                  class="menu-item-row"
                >
                  <td class="text-center">
                    <button
                      type="button"
                      class="btn btn-outline-success btn-sm"
                      @click="getMenu(menu)"
                      :class="{
                        'btn-success':
                          selectedMenu && selectedMenu.id === menu.id
                      }"
                    >
                      <i
                        class="bi bi-check"
                        v-if="selectedMenu && selectedMenu.id === menu.id"
                      ></i>
                      <i class="bi bi-plus" v-else></i>
                    </button>
                  </td>
                  <td class="text-center">
                    <div class="menu-image-container">
                      <img
                        :src="require('@/assets/imgs/menu/' + menu.id + '.jpg')"
                        class="menu-image"
                        :alt="menu.name"
                      />
                    </div>
                  </td>
                  <td class="fw-bold text-farm-primary">
                    {{ menu.name }}
                  </td>
                  <td class="text-center">
                    <span class="price-text"
                      >¥{{ menu.price | numFilter }}</span
                    >
                    <br />
                    <small class="text-muted">{{ menu.unite }}/份</small>
                  </td>
                  <td class="text-center">
                    <span class="badge bg-farm-secondary">{{ menu.type }}</span>
                  </td>
                </tr>
                <tr v-if="menuList1.length === 0">
                  <td colspan="5" class="text-center text-muted py-4">
                    <i class="bi bi-emoji-frown me-2"></i>暂无菜品数据
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
            <nav aria-label="菜单分页">
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
                    :disabled="pageBody1.page === page"
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
        <div class="modal-footer-custom">
          <div class="row w-100 align-items-center">
            <div class="col-md-6">
              <div class="input-group">
                <span class="input-group-text">
                  <i class="bi bi-egg-fried me-1"></i>已选菜品
                </span>
                <input
                  type="text"
                  class="form-control"
                  readonly
                  :value="selectedMenu ? selectedMenu.name : '请选择菜品'"
                  :placeholder="'请选择菜品'"
                />
              </div>
            </div>
            <div class="col-md-3">
              <div class="d-flex align-items-center justify-content-center">
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm me-2"
                  @click="decreaseCount"
                  :disabled="count <= 1"
                >
                  <i class="bi bi-dash"></i>
                </button>
                <span class="quantity-display mx-2">{{ count }}</span>
                <button
                  type="button"
                  class="btn btn-outline-success btn-sm ms-2"
                  @click="addCount"
                >
                  <i class="bi bi-plus"></i>
                </button>
              </div>
            </div>
            <div class="col-md-3">
              <button
                type="button"
                class="btn btn-farm-primary w-100"
                @click="addMenu"
                :disabled="!selectedMenu"
              >
                <i class="bi bi-check-circle me-2"></i>确认添加
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
import { getOrdering, addOrdering } from "@/api/customer";
// import { cutOutNum } from "@/assets/js/cutOutNum";

export default {
  name: "OrderAdd",
  components: {
    customerNavbar: () => import("@/components/Header/CustomerNavbar.vue"),
    footerNavbar: () => import("@/components/FooterNavbar.vue")
  },
  data: () => ({
    no: null,
    count: 1,
    selectedMenu: null,
    isModalVisible: false, // 控制自定义模态框显示
    pageBody1: {
      page: null,
      pages: null,
      pageList: []
    },
    isOrdered: null,
    menu: {
      id: null,
      name: null,
      price: null,
      unite: null,
      type: null
    },
    menuList1: [],
    menuList: [],
    ordering: {
      id: null,
      count: null,
      menu: null,
      reserve: null
    },
    orderingList: []
  }),
  methods: {
    showModal() {
      this.initModel();
      this.isModalVisible = true;
      // 防止背景滚动
      document.body.style.overflow = "hidden";
    },
    hideModal() {
      this.isModalVisible = false;
      // 恢复背景滚动
      document.body.style.overflow = "";
    },
    initModel() {
      this.count = 1;
      this.menu.name = "";
      this.doPage(1);
    },
    getMenu(menu) {
      console.log("getMenu called with:", menu);
      this.menu = JSON.parse(JSON.stringify(menu));
      this.selectedMenu = menu;
      console.log("selectedMenu updated to:", this.selectedMenu);
    },
    addCount() {
      console.log("addCount called, current count:", this.count);
      this.count++;
      console.log("count after increment:", this.count);
    },
    decreaseCount() {
      console.log("decreaseCount called, current count:", this.count);
      if (this.count != 1) {
        this.count--;
      }
      console.log("count after decrement:", this.count);
    },
    addCount1(index) {
      this.orderingList[index].count++;
    },
    decreaseCount1(index) {
      this.orderingList[index].count--;
      if (this.orderingList[index].count == 0) {
        this.$delete(this.orderingList, index);
      }
    },
    addMenu() {
      console.log("addMenu called");
      console.log("Current menu:", this.menu);
      console.log("Current selectedMenu:", this.selectedMenu);
      if (this.menu.name != "") {
        let result = false;
        for (let i = 0; i < this.orderingList.length; i++) {
          if (this.menu.name == this.orderingList[i].menu.name) {
            result = true;
          }
        }
        if (result == true) {
          alert("已添加这个菜品！");
        } else {
          this.ordering.count = this.count;
          this.ordering.menu = this.menu;
          this.orderingList.push(JSON.parse(JSON.stringify(this.ordering)));
          console.log("Added menu to orderingList:", this.ordering);
          // 隐藏模态框
          this.hideModal();
        }
      } else {
        alert("请选菜！");
      }
    },
    addOrdering() {
      let con = confirm("是否提交?\n注意：提交后不可更改！");
      if (con == true) {
        addOrdering(this.no, this.orderingList);
      }
    },
    doPage(page) {
      // 确保menuList存在且不为空
      if (!this.menuList || this.menuList.length === 0) {
        console.warn("menuList is empty or undefined");
        return;
      }

      this.menuList1 = [];
      const pageSize = 5; // 每页显示的菜品数量

      // 计算总页数
      const totalPages = Math.ceil(this.menuList.length / pageSize);
      this.pageBody1.pages = totalPages;

      // 设置当前页
      this.pageBody1.page = page;

      // 计算当前页的数据
      const startIndex = (page - 1) * pageSize;
      const endIndex = Math.min(startIndex + pageSize, this.menuList.length);

      for (let i = startIndex; i < endIndex; i++) {
        this.menuList1.push(this.menuList[i]);
      }

      // 生成页码列表
      this.pageBody1.pageList = [];
      let startPage, endPage;

      if (totalPages <= 5) {
        // 如果总页数小于等于5，显示所有页码
        startPage = 1;
        endPage = totalPages;
      } else {
        // 如果总页数大于5，显示当前页附近的页码
        if (page <= 3) {
          startPage = 1;
          endPage = 5;
        } else if (page + 1 >= totalPages) {
          startPage = totalPages - 4;
          endPage = totalPages;
        } else {
          startPage = page - 2;
          endPage = page + 2;
        }
      }

      // 填充页码列表
      for (let i = startPage; i <= endPage; i++) {
        this.pageBody1.pageList.push(i);
      }
    },
    handleEscKey(event) {
      // 按ESC键隐藏模态框
      if (event.key === "Escape" && this.isModalVisible) {
        this.hideModal();
      }
    }
  },
  computed: {
    totalPrice: function() {
      let totalPrice = 0;
      if (this.orderingList.length != 0) {
        for (let i = 0; i < this.orderingList.length; i++) {
          totalPrice =
            (totalPrice * 10000 +
              this.orderingList[i].count *
                100 *
                (this.orderingList[i].menu.price * 100)) /
            10000;
        }
        return totalPrice;
      } else {
        return null;
      }
    }
  },
  filters: {
    numFilter(value) {
      let realVal = "";
      if (!isNaN(value) && value !== "") {
        // 截取当前数据到小数点后两位
        realVal = parseFloat(value).toFixed(2);
      } else {
        realVal = "--";
      }
      return realVal;
    }
  },
  created() {
    this.no = this.$route.query.no;
    // 只有当no存在时才调用getOrdering
    if (this.no) {
      getOrdering(this.no);
    }
    bus.$on(bus.isOrdered, data => {
      this.isOrdered = data;
    });
    bus.$on(bus.pageBody1, data => {
      this.pageBody1 = data;
    });
    bus.$on(bus.orderingList, data => {
      this.orderingList = data;
    });
    bus.$on(bus.menuList1, data => {
      this.menuList1 = data;
    });
    bus.$on(bus.menuList, data => {
      this.menuList = data;
      // 当menuList更新时，初始化第一页
      if (
        this.menuList &&
        this.menuList.length > 0 &&
        (!this.pageBody1.page || this.pageBody1.page === null)
      ) {
        this.doPage(1);
      }
    });
    bus.$on(bus.reserve, data => {
      this.ordering.reserve = data;
    });
  },
  mounted() {
    // 添加ESC键监听
    document.addEventListener("keydown", this.handleEscKey);
  },
  beforeDestroy() {
    bus.$off(bus.isOrdered);
    bus.$off(bus.pageBody1);
    bus.$off(bus.orderingList);
    bus.$off(bus.menuList1);
    bus.$off(bus.menuList);
    bus.$off(bus.reserve);
    // 移除ESC键监听
    document.removeEventListener("keydown", this.handleEscKey);
    // 确保恢复背景滚动
    document.body.style.overflow = "";
  }
};
</script>

<style scoped>
/* 基础样式 */
.menu-section {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.section-title {
  color: var(--farm-green-dark);
  font-weight: 600;
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

.quantity-display {
  font-weight: 600;
  color: var(--farm-green-dark);
  background: rgba(76, 175, 80, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
}

.price-display,
.total-price {
  font-weight: 600;
  color: var(--farm-green-dark);
}

.menu-image {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
}

/* 自定义模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

.modal-content-custom {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  max-width: 1140px;
  width: 95%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header-custom {
  background: linear-gradient(
    135deg,
    var(--farm-green),
    var(--farm-green-dark)
  );
  color: white;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 500;
}

.btn-close-custom {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-close-custom:hover {
  opacity: 0.75;
}

.modal-body-custom {
  padding: 0;
  overflow-y: auto;
  flex: 1;
}

.modal-footer-custom {
  padding: 1rem 1.5rem;
  border-top: 1px solid #dee2e6;
  background-color: #f8f9fa;
}

.table-header-sticky {
  position: sticky;
  top: 0;
  z-index: 10;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .modal-content-custom {
    width: 98%;
    height: 95vh;
  }

  .card-farm {
    padding: 1.5rem !important;
  }

  .farm-title {
    font-size: 1.5rem;
  }

  .modal-body-custom {
    max-height: calc(95vh - 120px);
  }

  .modal-footer-custom .row > div {
    margin-bottom: 0.5rem;
  }

  .modal-footer-custom .row > div:last-child {
    margin-bottom: 0;
  }
}
</style>
