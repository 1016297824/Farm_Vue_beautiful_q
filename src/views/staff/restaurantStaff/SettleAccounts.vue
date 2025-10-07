// 餐厅员工结账
<template>
  <div class="container">
    <!-- 主体 -->
    <div class="row">
      <div class="col-lg-12">
        <div class="col-lg-8 m-auto">
          <br />
          <br />
          <br />
          <br />
          <br />
          <form action="">
            <div class="form-group text-left">
              <label for="" class="font-weight-bold">顾客订单</label>
            </div>
            <hr />
            <br />
            <table class="table table-borderless">
              <thead>
                <tr>
                  <th style="text-align: center;" class="text-truncate">
                    订单号
                  </th>
                  <th style="text-align: center;" class="text-truncate">
                    桌位
                  </th>
                  <th style="text-align: center;" class="text-truncate">
                    顾客姓名
                  </th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(reserve, index) in reserveList" :key="index">
                  <td style="text-align: center;" class="text-truncate">
                    {{ reserve.no }}
                  </td>
                  <td style="text-align: center;" class="text-truncate">
                    {{ reserve.diningTable.id }}
                  </td>
                  <td style="text-align: center;" class="text-truncate">
                    {{ reserve.customer.name }}
                  </td>
                  <td style="text-align: center;" class="text-truncate">
                    <a
                      href="#"
                      data-toggle="modal"
                      data-target="#order"
                      @click="getOrdering(reserve.no)"
                    >
                      查看
                    </a>
                  </td>
                  <td>
                    <input
                      type="button"
                      value="取消订单"
                      class="btn btn-light"
                      @click="deleteReserve(reserve.no)"
                    />
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
                    pageBody1.page == page ? 'page-item active' : 'page-item'
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
            <h5 class="modal-title" id="exampleModalLongTitle">
              订单详情
            </h5>
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
                <p v-show="orderingList.length == 0">无</p>
                <table
                  class="table table-borderless"
                  v-show="orderingList.length != 0"
                >
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
                        {{ ordering.count }}
                      </td>
                      <td class="text-truncate text-center">
                        {{ ordering.menu.price | numFilter }}
                        {{ ordering.menu.unite + "/份" }}
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td class="text-center font-weight-bold">
                        合计
                      </td>
                      <td class="text-center font-weight-bold">
                        {{ totalPrice | numFilter }} {{ "元" }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="col-lg-12" style="text-align:center">
              <input
                type="button"
                value="结账"
                class="btn btn-primary"
                :disabled="orderingList.length == 0"
                @click="settleAccounts"
              />
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
import {
  getReserve,
  doPage,
  deleteReserve,
  getOrdering,
  settleAccounts
} from "@/api/restaurantStaff.js";
import $ from "jquery";

export default {
  name: "SettleAccounts",
  data: () => ({
    reserveList: null,
    orderingList: [],
    reserveNo: null,
    pageBody1: {
      page: null,
      pages: null,
      pageList: []
    }
  }),
  methods: {
    getOrdering(no) {
      this.reserveNo = no;
      getOrdering(no);
    },
    doPage(page) {
      this.pageBody1.page = page;
      doPage(this.pageBody1);
    },
    deleteReserve(no) {
      let con = confirm(`取消订单：\n订单号：${no}`);
      if (con == true) {
        deleteReserve(no);
      }
    },
    settleAccounts() {
      let con = confirm(`结账：\n订单号：${this.reserveNo}`);
      if (con == true) {
        settleAccounts(this.reserveNo);
        $("#order").modal("hide");
      }
    },
    accMul(arg1, arg2) {
      var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
      try {
        m += s1.split(".")[1].length;
      } catch (e) {
        console.log("error");
      }
      try {
        m += s2.split(".")[1].length;
      } catch (e) {
        console.log("error");
      }
      return (
        (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
        Math.pow(10, m)
      );
    },
    accAdd(arg1, arg2) {
      var r1, r2, m;
      try {
        r1 = arg1.toString().split(".")[1].length;
      } catch (e) {
        r1 = 0;
      }
      try {
        r2 = arg2.toString().split(".")[1].length;
      } catch (e) {
        r2 = 0;
      }
      m = Math.pow(10, Math.max(r1, r2));
      return (arg1 * m + arg2 * m) / m;
    }
  },
  created() {
    getReserve();
    bus.$on(bus.reserveList, data => {
      this.reserveList = data;
    });
    bus.$on(bus.orderingList, data => {
      this.orderingList = data;
    });
    bus.$on(bus.pageBody1, data => {
      this.pageBody1 = data;
    });
  },
  computed: {
    totalPrice: function() {
      let totalPrice = 0;
      if (this.orderingList.length != 0) {
        for (let i = 0; i < this.orderingList.length; i++) {
          let tp = this.accMul(
            this.orderingList[i].count,
            this.orderingList[i].menu.price
          );
          totalPrice = this.accAdd(totalPrice, tp);
        }
        return totalPrice.toFixed(2);
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
  beforeDestroy() {
    bus.$off(bus.reserveList);
    bus.$off(bus.orderingList);
    bus.$off(bus.pageBody1);
  }
};
</script>
