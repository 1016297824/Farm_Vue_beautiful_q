<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="col-lg-2"></div>
        <div class="col-lg-8 m-auto">
          <br />
          <br />
          <br />
          <br />
          <br />
          <form>
            <div class="form-group text-left">
              <label for="" class="font-weight-bold">产品销售</label>
              <input
                type="button"
                value="添加"
                class="btn btn-primary"
                style="float:right"
                data-toggle="modal"
                data-target="#product"
                @click="initProduct"
              />
            </div>
            <hr />
            <br />
            <table class="table table-borderless">
              <thead>
                <tr>
                  <th style="text-align: center;" class="text-truncate">
                    产品名
                  </th>
                  <th style="text-align: center;" class="text-truncate">
                    数量
                  </th>
                  <th style="text-align: center;" class="text-truncate">
                    单价
                  </th>
                  <th style="text-align: center;" class="text-truncate"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(sale, index) in saleList" :key="index">
                  <td class="text-truncate text-center">
                    {{ sale.product.name }}
                  </td>
                  <td
                    class="text-truncate text-center"
                    style="text-align: center;"
                  >
                    {{ sale.amount + sale.product.unit }}
                  </td>
                  <td class="text-truncate text-center">
                    {{ sale.price + "元" }}
                  </td>
                  <td class="text-truncate text-center">
                    <input
                      type="button"
                      value="删除"
                      class="btn btn-light"
                      @click="deleteSale(index)"
                    />
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td
                    class="text-center font-weight-bold"
                    v-show="saleList.length != 0"
                  >
                    合计
                  </td>
                  <td
                    v-show="saleList.length != 0"
                    class="text-center font-weight-bold"
                  >
                    {{ totalPrice + "元" }}
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
                  :disabled="saleList.length == 0"
                  @click="addSaleList"
                />
              </div>
            </div>
          </form>
        </div>
        <div class="col-lg-2"></div>
      </div>
    </div>

    <!-- model -->
    <div
      class="modal fade"
      id="product"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">产品列表</h5>
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
            <select
              class="form-control"
              v-model="productType"
              @change="changeProductType"
            >
              <option
                v-for="(productType, index) in productTypeList"
                :key="index"
                :value="productType"
              >
                {{ productType }}
              </option>
            </select>
            <br />
            <div class="panel panel-default">
              <div class="panel-body" id="pageProduct">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th style="text-align: center;" class="text-truncate">
                        选项
                      </th>
                      <th style="text-align: center;" class="text-truncate">
                        产品名
                      </th>
                      <th style="text-align: center;" class="text-truncate">
                        库存
                      </th>
                      <th style="text-align: center;" class="text-truncate">
                        安全库存
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(product, index) in productList" :key="index">
                      <td style="text-align: center;" class="text-truncate">
                        <a href="#" @click="choosedProduct(product)">
                          <span class="iconfont icon-xuanzhongduigou"></span>
                        </a>
                      </td>
                      <td style="text-align: center;" class="text-truncate">
                        {{ product.name }}
                      </td>
                      <td style="text-align: center;" class="text-truncate">
                        {{ product.amount + product.unit }}
                      </td>
                      <td style="text-align: center;" class="text-truncate">
                        {{ product.safeAmount + product.unit }}
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
            <div class="col-lg-12" style="text-align:center">
              <div class="input-group input-group-sm">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-sm">
                    产品名
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  disabled
                  v-model="product.name"
                />
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-sm">
                    数量
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  v-model="sale.amount"
                  @keyup="writeAmount"
                />
              </div>
              <p style="color: red;">
                {{ amountMessage }}
              </p>
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
                  v-model="sale.price"
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
              <button
                type="button"
                class="btn btn-primary btn-sm"
                @click="addSale"
              >
                确认
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
import { initProduct, doPage, addSaleList } from "@/api/farmStaff.js";

export default {
  name: "Sale",
  data: () => ({
    productType: "家禽",
    productTypeList: ["家禽", "鱼类", "果蔬"],
    saleList: [],
    productList: [],
    product: {
      id: null,
      name: null,
      amount: null,
      safeAmount: null,
      unit: null,
      productType: null,
      baseAmount: null,
      baseUnit: null
    },
    sale: {
      id: null,
      amount: null,
      price: null,
      saleNo: null,
      product: null
    },
    pageBody1: {
      page: null,
      pages: null,
      pageList: []
    },
    nowAmount: null,
    amountMessage: null,
    priceMessage: null
  }),
  methods: {
    writePrice() {
      this.priceMessage = null;
    },
    writeAmount() {
      this.amountMessage = null;
    },
    changeProductType() {
      this.typeMessage = null;
      initProduct(this.productType);
    },
    doPage(page) {
      this.pageBody1.page = page;
      doPage(this.pageBody1, this.productType);
    },
    initProduct() {
      this.product.id = null;
      this.product.name = null;
      this.product.amount = null;
      this.product.safeAmount = null;
      this.product.unit = null;
      this.product.productType = null;
      this.product.baseAmount = null;
      this.product.baseUnit = null;
      this.sale.amount = null;
      this.sale.price = null;
      initProduct(this.productType);
      this.amountMessage = null;
      this.priceMessage = null;
    },
    choosedProduct(product) {
      this.nowAmount = product.amount;
      this.product = JSON.parse(JSON.stringify(product));
    },
    addSale() {
      let result = true;
      if (this.sale.amount == null || this.sale.price == null) {
        if (this.sale.amount == null) {
          this.amountMessage = "请输入数量！";
          result = false;
        }
        if (this.sale.price == null) {
          this.priceMessage = "请输入单价！";
          result = false;
        }
      }
      if (result == true) {
        let re = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/;
        if (!re.test(this.sale.price)) {
          this.priceMessage = "请输入正数（最高小数点后两位）！";
          result = false;
        }
        if (this.productType == "家禽") {
          re = /^(0|\+?[1-9][0-9]*)$/;
        }
        if (!re.test(this.sale.amount)) {
          if (this.productType == "家禽") {
            this.amountMessage = "请输入正整数！";
            result = false;
          } else {
            this.amountMessage = "请输入正数（最高小数点后两位）！";
            result = false;
          }
        }
      }
      if (this.sale.amount > this.nowAmount) {
        this.amountMessage = "库存不足！";
        result = false;
      }
      if (result == true) {
        if (this.product.name == null) {
          alert("请选择产品！");
        } else {
          if (result == true) {
            let result = false;
            for (let i = 0; i < this.saleList.length; i++) {
              if (this.product.name == this.saleList[i].product.name) {
                result = true;
              }
            }
            if (result == true) {
              alert("已添加这个产品！");
            } else {
              this.sale.product = this.product;
              this.saleList.push(JSON.parse(JSON.stringify(this.sale)));
              $("#product").modal("hide");
            }
          }
        }
      }
    },
    deleteSale(index) {
      this.saleList.splice(index, 1);
    },
    addSaleList() {
      let con = confirm("是否提交？");
      if (con == true) {
        addSaleList(this.saleList);
        this.saleList = [];
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
  computed: {
    totalPrice: function() {
      let totalPrice = 0;
      if (this.saleList.length != 0) {
        for (let i = 0; i < this.saleList.length; i++) {
          let tp = this.accMul(this.saleList[i].amount, this.saleList[i].price);
          totalPrice = this.accAdd(totalPrice, tp);
        }

        return totalPrice.toFixed(2);
      } else {
        return null;
      }
    }
  },
  created() {
    bus.$on(bus.productList, data => {
      this.productList = data;
    });
    bus.$on(bus.pageBody1, data => {
      this.pageBody1 = data;
    });
  },
  beforeDestroy() {
    bus.$off(bus.productList);
    bus.$off(bus.pageBody1);
  }
};
</script>
