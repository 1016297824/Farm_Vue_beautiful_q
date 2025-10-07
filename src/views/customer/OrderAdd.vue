// 添加点餐信息
<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="col-lg-8 m-auto">
          <br />
          <br />
          <br />
          <br />
          <br />
          <form>
            <div class="form-group text-left">
              <label for="" class="font-weight-bold">本桌菜单</label>
              <input
                type="button"
                value="添加"
                class="btn btn-primary"
                style="float:right"
                data-toggle="modal"
                data-target="#order"
                :disabled="isOrdered"
                @click="initModel"
              />
            </div>
            <hr />
            <br />
            <table class="table table-borderless">
              <thead>
                <tr>
                  <th style="text-align: center;" class="text-truncate">
                    菜名
                  </th>
                  <th style="text-align: center;" class="text-truncate">
                    份数
                  </th>
                  <th style="text-align: center;" class="text-truncate">
                    单价
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(ordering, index) in orderingList" :key="index">
                  <td class="text-truncate text-center">
                    {{ ordering.menu.name }}
                  </td>
                  <td
                    class="text-truncate text-center"
                    style="text-align: center;"
                  >
                    <a
                      href="#"
                      @click="decreaseCount1(index)"
                      v-show="!isOrdered"
                    >
                      <span class="iconfont icon-icon-test1"></span>
                    </a>
                    {{ ordering.count }}
                    <a href="#" @click="addCount1(index)" v-show="!isOrdered">
                      <span class="iconfont icon-icon-test2"></span>
                    </a>
                  </td>
                  <td class="text-truncate text-center">
                    {{ ordering.menu.price | numFilter }}
                    {{ ordering.menu.unite + "/份" }}
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td
                    class="text-center font-weight-bold"
                    v-show="orderingList.length != 0"
                  >
                    合计
                  </td>
                  <td
                    v-show="orderingList.length != 0"
                    class="text-center font-weight-bold"
                  >
                    {{ totalPrice | numFilter }} {{ "元" }}
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="row">
              <div class="col-lg-12" style="text-align:center">
                <input
                  type="button"
                  class="btn btn-primary"
                  value="提交"
                  :disabled="orderingList.length == 0"
                  v-show="!isOrdered"
                  @click="addOrdering"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- model -->
    <div
      class="modal fade"
      id="order"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">菜单</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="panel panel-default">
              <div class="panel-body" id="pageProduct">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th style="text-align: center;" class="text-truncate">
                        选项
                      </th>
                      <th
                        style="text-align: center;"
                        class="text-truncate"
                        width="113"
                      >
                        图片
                      </th>
                      <th style="text-align: center;" width="187">菜名</th>
                      <th style="text-align: center;" width="112">单价</th>
                      <th style="text-align: center;">类型</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(menu, index) in menuList1" :key="index">
                      <td class="m-auto">
                        <a href="#" @click="getMenu(menu)">
                          <span class="iconfont icon-xuanzhongduigou"></span>
                        </a>
                      </td>
                      <td>
                        <img
                          :src="
                            require('@/assets/imgs/menu/' + menu.id + '.jpg')
                          "
                          class="img-fluid"
                        />
                      </td>
                      <td class="text-truncate">
                        {{ menu.name }}
                      </td>
                      <td class="text-truncate">
                        {{ menu.price | numFilter }}{{ menu.unite + "/份" }}
                      </td>
                      <td class="text-truncate">
                        {{ menu.type }}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <nav aria-label="Page navigation">
                  <ul class="pagination">
                    <li class="page-item">
                      <a
                        class="page-link"
                        href="#"
                        aria-label="Previous"
                        @click="doPage(1)"
                      >
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                      </a>
                    </li>
                    <li
                      v-for="(page, index) in pageBody1.pageList"
                      :key="index"
                      :class="
                        pageBody1.page == page
                          ? 'page-item active'
                          : 'page-item'
                      "
                    >
                      <a class="page-link" href="#" @click="doPage(page)">
                        {{ page }}
                      </a>
                    </li>
                    <li class="page-item">
                      <a
                        class="page-link"
                        href="#"
                        aria-label="Next"
                        @click="doPage(pageBody1.pages)"
                      >
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Next</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="row">
              <div class="col-lg-6" align="left">
                <div class="input-group input-group-ms">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-ms">
                      菜名
                    </span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-ms"
                    readonly
                    v-model="menu.name"
                  />
                </div>
              </div>
              <div class="col-lg-3" align="center">
                <a href="#" @click="decreaseCount">
                  <span class="iconfont icon-icon-test1"></span>
                </a>
                {{ count }}
                <a href="#" @click="addCount">
                  <span class="iconfont icon-icon-test2"></span>
                </a>
              </div>
              <div class="col-lg-3" align="right">
                <button
                  type="button"
                  class="btn btn-primary btn-sm"
                  @click="addMenu"
                >
                  确认
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import bus from "@/util/Bus";
import { getOrdering, addOrdering } from "@/api/customer";
import $ from "jquery";
// import { cutOutNum } from "@/assets/js/cutOutNum";

export default {
  name: "OrderAdd",
  data: () => ({
    no: null,
    count: 1,
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
    initModel() {
      this.count = 1;
      this.menu.name = "";
      this.doPage(1);
    },
    getMenu(menu) {
      this.menu = JSON.parse(JSON.stringify(menu));
    },
    addCount() {
      this.count++;
    },
    decreaseCount() {
      if (this.count != 1) {
        this.count--;
      }
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
          $("#order").modal("hide");
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
      this.menuList1 = [];
      if (this.pageBody1.pages <= 5) {
        if (this.pageBody1.pages == page) {
          for (let i = (page - 1) * 5; i < this.menuList.length; i++) {
            this.menuList1.push(this.menuList[i]);
          }
        } else {
          for (let i = (page - 1) * 5; i < page * 5; i++) {
            this.menuList1.push(this.menuList[i]);
          }
        }
      } else {
        this.pageBody1.pageList = [];
        if (page > this.pageBody1.pages - 2) {
          for (
            let i = this.pageBody1.pages - 5;
            i < this.pageBody1.pages;
            i++
          ) {
            this.pageBody1.pageList.push(i + 1);
          }
          if (this.pageBody1.pages == page) {
            for (let i = (page - 1) * 5; i < this.menuList.length; i++) {
              this.menuList1.push(this.menuList[i]);
            }
          } else {
            for (let i = (page - 1) * 5; i < page * 5; i++) {
              this.menuList1.push(this.menuList[i]);
            }
          }
        } else if (page <= 2) {
          for (let i = 0; i < 5; i++) {
            this.pageBody1.pageList.push(i + 1);
          }
          for (let i = (page - 1) * 5; i < page * 5; i++) {
            this.menuList1.push(this.menuList[i]);
          }
        } else {
          for (let i = page - 2; i <= page + 2; i++) {
            this.pageBody1.pageList.push(i);
          }
          for (let i = (page - 1) * 5; i < page * 5; i++) {
            this.menuList1.push(this.menuList[i]);
          }
        }
      }
      this.pageBody1.page = page;
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
    getOrdering(this.no);
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
    });
    bus.$on(bus.reserve, data => {
      this.ordering.reserve = data;
    });
  },
  beforeDestroy() {
    bus.$off(bus.isOrdered);
    bus.$off(bus.pageBody1);
    bus.$off(bus.orderingList);
    bus.$off(bus.menuList1);
    bus.$off(bus.menuList);
    bus.$off(bus.reserve);
  }
};
</script>
