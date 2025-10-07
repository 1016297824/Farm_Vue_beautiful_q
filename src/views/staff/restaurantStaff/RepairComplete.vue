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
              <label for="" class="font-weight-bold">报修报损</label>
            </div>
            <hr />
            <br />
            <table class="table table-borderless">
              <thead>
                <tr>
                  <th style="text-align: center;" class="text-truncate">
                    编号
                  </th>
                  <th style="text-align: center;" class="text-truncate">
                    日期
                  </th>
                  <th style="text-align: center;" class="text-truncate">
                    类型
                  </th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(repair, index) in repairList" :key="index">
                  <td style="text-align: center;" class="text-truncate">
                    {{ repair.id }}
                  </td>
                  <td style="text-align: center;" class="text-truncate">
                    {{ repair.insertTime | formatDate }}
                  </td>
                  <td style="text-align: center;" class="text-truncate">
                    {{ repair.repairType }}
                  </td>
                  <td style="text-align: center;" class="text-truncate">
                    <a
                      href="#"
                      data-toggle="modal"
                      data-target="#repair"
                      @click="checkRepair(repair)"
                    >
                      查看
                    </a>
                  </td>
                  <td>
                    <input
                      type="button"
                      value="取消"
                      class="btn btn-light"
                      @click="deleteRepair(repair)"
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
      id="repair"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              详细信息
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
                <div class="form-group">
                  <label for="comment">
                    {{ repair.repairType + "内容：" }}
                  </label>
                  <textarea
                    readonly
                    class="form-control"
                    rows="3"
                    id="comment"
                    v-model="repair.content"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="comment">
                    {{ repair.repairType + "原因：" }}
                  </label>
                  <textarea
                    readonly
                    class="form-control"
                    rows="7"
                    id="comment"
                    v-model="repair.cause"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="col-lg-5" align="left">
              <div class="input-group input-group-sm">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-sm">
                    单价
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  v-model="repair.price"
                  @keyup="writePrice"
                />
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-sm">
                    元
                  </span>
                </div>
              </div>
              <p style="color: red;">
                {{ priceMessage }}
              </p>
            </div>
            <div class="col-lg-5" align="center"></div>
            <div class="col-lg-2" align="right">
              <button
                type="button"
                class="btn btn-primary btn-sm"
                @click="completeRepair"
              >
                完成
              </button>
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
import $ from "jquery";
import bus from "@/util/Bus";
import { formatDate } from "@/assets/js/date";
import {
  getRepair,
  doPage1,
  deleteRepair,
  completeRepair
} from "@/api/restaurantStaff.js";

export default {
  name: "SettleAccounts",
  data: () => ({
    repairList: null,
    pageBody1: {
      page: null,
      pages: null,
      pageList: []
    },
    repair: {
      id: null,
      insertTime: null,
      repairType: null,
      content: null,
      cause: null,
      state: null,
      price: null
    },
    priceMessage: null
  }),
  methods: {
    writePrice() {
      this.priceMessage = null;
    },
    doPage(page) {
      this.pageBody1.page = page;
      doPage1(this.pageBody1);
    },
    deleteRepair(repair) {
      let con = confirm(`是否取消：\n编号：${repair.id}`);
      if (con == true) {
        deleteRepair(repair);
      }
    },
    checkRepair(repair) {
      this.priceMessage = null;
      this.repair = JSON.parse(JSON.stringify(repair));
    },
    completeRepair() {
      let result = true;
      let re = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/;
      if (!re.test(this.repair.price)) {
        this.priceMessage = "请输入正数（小数点后最多两位）！";
        result = false;
      }
      if (this.repair.price == 0) {
        this.priceMessage = "输入数字不能为0！";
        result = false;
      }
      if (result == true) {
        let con = confirm(
          `完成：\n编号：${this.repair.id}\n花费：${this.repair.price}`
        );
        if (con == true) {
          completeRepair(this.repair);
          $("#repair").modal("hide");
        }
      }
    }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    }
  },
  created() {
    getRepair();
    bus.$on(bus.repairList, data => {
      this.repairList = data;
    });
    bus.$on(bus.pageBody1, data => {
      this.pageBody1 = data;
    });
  },
  beforeDestroy() {
    bus.$off(bus.repairList);
    bus.$off(bus.pageBody1);
  }
};
</script>
