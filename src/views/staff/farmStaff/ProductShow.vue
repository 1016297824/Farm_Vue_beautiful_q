// 显示所有产品
<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="col-lg-12">
          <div class="col-lg-8 m-auto">
            <br />
            <br />
            <br />
            <form action="">
              <div class="form-group text-left">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="row">
                      <div class="col-lg-2">
                        <label for="" class="font-weight-bold">选择类型</label>
                      </div>
                      <div class="col-lg-3">
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
                      </div>
                      <div class="col-lg-7">
                        <input
                          type="button"
                          class="btn btn-primary"
                          style="float:right"
                          value="添加农产品"
                          data-toggle="modal"
                          data-target="#product"
                          @click="addProduct"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <br />
              <table class="table table-borderless">
                <thead>
                  <tr>
                    <th style="text-align: center;" class="text-truncate">
                      农产品名
                    </th>
                    <th style="text-align: center;" class="text-truncate">
                      库存
                    </th>
                    <th style="text-align: center;" class="text-truncate">
                      安全库存
                    </th>
                    <th style="text-align: center;" class="text-truncate"></th>
                    <th style="text-align: center;" class="text-truncate"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(product, index) in productList" :key="index">
                    <td style="text-align: center;" class="text-truncate">
                      {{ product.name }}
                    </td>
                    <td style="text-align: center;" class="text-truncate">
                      {{ product.amount }}{{ product.unit }}
                    </td>
                    <td style="text-align: center;" class="text-truncate">
                      {{ product.safeAmount }}{{ product.unit }}
                    </td>
                    <td
                      style="text-align: center;color:red"
                      class="text-truncate"
                    >
                      {{ product.amount >= product.safeAmount ? null : "缺货" }}
                    </td>
                    <td>
                      <!-- <input
                        type="button"
                        value="修改"
                        class="btn btn-primary"
                        data-toggle="modal"
                        data-target="#product"
                        @click="modifyProduct(product)"
                      /> -->
                      <input
                        type="button"
                        value="生产"
                        class="btn btn-primary"
                        data-toggle="modal"
                        data-target="#produce"
                        @click="produce(product)"
                      />
                      {{ &nbsp; }}
                      <input
                        type="button"
                        value="异常消耗"
                        class="btn btn-primary"
                        data-toggle="modal"
                        data-target="#consumption"
                        @click="abnormalConsumption(product)"
                      />{{ &nbsp; }}
                      <input
                        type="button"
                        value="删除"
                        class="btn btn-light"
                        @click="deleteProduct(product)"
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
            <h5 class="modal-title" id="exampleModalLongTitle">添加农产品</h5>
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
              <div class="panel-body">
                <div class="form-group text-left">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="input-group input-group-lg">
                        <div class="input-group-prepend">
                          <span
                            class="input-group-text"
                            id="inputGroup-sizing-lg"
                          >
                            农产品类型
                          </span>
                        </div>
                        <select
                          class="form-control"
                          v-model="product.productType"
                          :disabled="modelType == '修改' ? true : false"
                        >
                          <option
                            v-for="(productType, index) in productTypeList"
                            :key="index"
                            :value="productType"
                          >
                            {{ productType }}
                          </option>
                        </select>
                      </div>
                      <p style="color: red;">
                        {{ typeMessage }}
                      </p>
                      <br />
                      <div class="input-group input-group-lg">
                        <div class="input-group-prepend">
                          <span
                            class="input-group-text"
                            id="inputGroup-sizing-lg"
                          >
                            农产品名
                          </span>
                        </div>
                        <input
                          v-model="product.name"
                          :disabled="modelType == '修改' ? true : false"
                          type="text"
                          class="form-control"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-lg"
                          @keyup="nameWrite"
                        />
                      </div>
                      <p style="color: red;">
                        {{ nameMessage }}
                      </p>
                      <br />
                      <div class="input-group input-group-lg">
                        <div class="input-group-prepend">
                          <span
                            class="input-group-text"
                            id="inputGroup-sizing-lg"
                          >
                            库存
                          </span>
                        </div>
                        <input
                          v-model="product.amount"
                          :disabled="modelType == '修改' ? true : false"
                          type="text"
                          class="form-control"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-lg"
                          @keyup="amountWrite"
                        />
                        <div class="input-group-prepend">
                          <span
                            class="input-group-text"
                            id="inputGroup-sizing-lg"
                          >
                            安全库存
                          </span>
                        </div>
                        <input
                          v-model="product.safeAmount"
                          type="text"
                          class="form-control"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-lg"
                          @keyup="amountWrite"
                        />
                      </div>
                      <p style="color: red;">
                        {{ amountMessage }}
                      </p>
                      <br />
                      <div class="input-group input-group-lg">
                        <div class="input-group-prepend">
                          <span
                            class="input-group-text"
                            id="inputGroup-sizing-lg"
                          >
                            单位
                          </span>
                        </div>
                        <input
                          v-model="product.unit"
                          type="text"
                          class="form-control"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-lg"
                          @keyup="unitWrite"
                        />
                        <div class="input-group-prepend">
                          <span
                            class="input-group-text"
                            id="inputGroup-sizing-lg"
                          >
                            原料单位
                          </span>
                        </div>
                        <input
                          v-model="product.baseUnit"
                          type="text"
                          class="form-control"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-lg"
                          @keyup="unitWrite"
                        />
                      </div>
                      <p style="color: red;">
                        {{ unitMessage }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="col-lg-12" style="text-align:center">
              <input
                type="button"
                :value="modelType"
                class="btn btn-primary"
                @click="doModel"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- model -->
    <div
      class="modal fade"
      id="consumption"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">农产品消耗</h5>
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
              <div class="panel-body">
                <div class="form-group text-left">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="input-group input-group-lg">
                        <div class="input-group-prepend">
                          <span
                            class="input-group-text"
                            id="inputGroup-sizing-lg"
                          >
                            农产品类型
                          </span>
                        </div>
                        <select
                          class="form-control"
                          v-model="product.productType"
                          @change="changeProductType"
                          disabled
                        >
                          <option
                            v-for="(productType, index) in productTypeList"
                            :key="index"
                            :value="productType"
                          >
                            {{ productType }}
                          </option>
                        </select>
                      </div>
                      <p style="color: red;">
                        {{ typeMessage }}
                      </p>
                      <br />
                      <div class="input-group input-group-lg">
                        <div class="input-group-prepend">
                          <span
                            class="input-group-text"
                            id="inputGroup-sizing-lg"
                          >
                            农产品名
                          </span>
                        </div>
                        <input
                          v-model="product.name"
                          disabled
                          type="text"
                          class="form-control"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-lg"
                          @keyup="nameWrite"
                        />
                      </div>
                      <p style="color: red;">
                        {{ nameMessage }}
                      </p>
                      <br />
                      <div class="input-group input-group-lg">
                        <div class="input-group-prepend">
                          <span
                            class="input-group-text"
                            id="inputGroup-sizing-lg"
                          >
                            异常消耗数量
                          </span>
                        </div>
                        <input
                          v-model="product.amount"
                          type="text"
                          class="form-control"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-lg"
                          @keyup="amountWrite1"
                        />
                      </div>
                      <p style="color: red;">
                        {{ amountMessage1 }}
                      </p>
                      <br />
                      <div class="input-group input-group-lg">
                        <div class="input-group-prepend">
                          <span
                            class="input-group-text"
                            id="inputGroup-sizing-lg"
                          >
                            单位
                          </span>
                        </div>
                        <input
                          v-model="product.unit"
                          disabled
                          type="text"
                          class="form-control"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-lg"
                          @keyup="unitWrite"
                        />
                      </div>
                      <p style="color: red;">
                        {{ unitMessage }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="col-lg-12" style="text-align:center">
              <input
                type="button"
                value="提交"
                class="btn btn-primary"
                @click="doModel1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- model -->
    <div
      class="modal fade"
      id="produce"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">农产品生产</h5>
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
              <div class="panel-body">
                <div class="form-group text-left">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="input-group input-group-lg">
                        <div class="input-group-prepend">
                          <span
                            class="input-group-text"
                            id="inputGroup-sizing-lg"
                          >
                            农产品类型
                          </span>
                        </div>
                        <select
                          class="form-control"
                          v-model="product.productType"
                          @change="changeProductType"
                          disabled
                        >
                          <option
                            v-for="(productType, index) in productTypeList"
                            :key="index"
                            :value="productType"
                          >
                            {{ productType }}
                          </option>
                        </select>
                      </div>
                      <p style="color: red;">
                        {{ typeMessage }}
                      </p>
                      <br />
                      <div class="input-group input-group-lg">
                        <div class="input-group-prepend">
                          <span
                            class="input-group-text"
                            id="inputGroup-sizing-lg"
                          >
                            农产品名
                          </span>
                        </div>
                        <input
                          v-model="product.name"
                          disabled
                          type="text"
                          class="form-control"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-lg"
                          @keyup="nameWrite"
                        />
                      </div>
                      <p style="color: red;">
                        {{ nameMessage }}
                      </p>
                      <br />
                      <div class="input-group input-group-lg">
                        <div class="input-group-prepend">
                          <span
                            class="input-group-text"
                            id="inputGroup-sizing-lg"
                          >
                            生产数量
                          </span>
                        </div>
                        <input
                          v-model="product.amount"
                          type="text"
                          class="form-control"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-lg"
                          @keyup="amountWrite2"
                        />
                      </div>
                      <p style="color: red;">
                        {{ amountMessage2 }}
                      </p>
                      <br />
                      <div class="input-group input-group-lg">
                        <div class="input-group-prepend">
                          <span
                            class="input-group-text"
                            id="inputGroup-sizing-lg"
                          >
                            单位
                          </span>
                        </div>
                        <input
                          v-model="product.unit"
                          disabled
                          type="text"
                          class="form-control"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-lg"
                          @keyup="unitWrite"
                        />
                      </div>
                      <p style="color: red;">
                        {{ unitMessage }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="col-lg-12" style="text-align:center">
              <input
                type="button"
                value="提交"
                class="btn btn-primary"
                @click="doModel2"
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
  initProduct,
  doPage,
  addProduct,
  deleteProduct,
  modifyProduct,
  abnormalConsumption,
  produce
} from "@/api/farmStaff.js";
import $ from "jquery";

export default {
  name: "ProductShow",
  data: () => ({
    productType: "家禽",
    productTypeList: ["家禽", "鱼类", "果蔬"],
    productList: [],
    pageBody1: {
      page: null,
      pages: null,
      pageList: []
    },
    modelType: null,
    product: {
      id: null,
      productType: null,
      name: null,
      amount: null,
      safeAmount: null,
      unit: null,
      baseUnit: null
    },
    typeMessage: null,
    nameMessage: null,
    amountMessage: null,
    amountMessage1: null,
    amountMessage2: null,
    unitMessage: null,
    nowAmount: null
  }),
  methods: {
    changeProductType() {
      this.typeMessage = null;
      initProduct(this.productType);
    },
    doPage(page) {
      this.pageBody1.page = page;
      doPage(this.pageBody1, this.productType);
    },
    addProduct() {
      this.modelType = "添加";
      this.product.id = null;
      this.product.productType = null;
      this.product.name = null;
      this.product.amount = null;
      this.product.safeAmount = null;
      this.product.unit = null;
      this.product.baseUnit = null;
      this.typeMessage = null;
      this.nameMessage = null;
      this.amountMessage = null;
      this.amountMessage1 = null;
      this.amountMessage2 = null;
      this.unitMessage = null;
    },
    modifyProduct(product) {
      this.typeMessage = null;
      this.nameMessage = null;
      this.amountMessage = null;
      this.amountMessage1 = null;
      this.amountMessage2 = null;
      this.unitMessage = null;
      this.product = JSON.parse(JSON.stringify(product));
      this.modelType = "修改";
    },
    doModel() {
      if (
        (this.product.productType == null) |
        (this.product.name == null) |
        (this.product.amount == null) |
        (this.product.safeAmount == null) |
        (this.product.unit == null) |
        (this.product.baseUnit == null)
      ) {
        if (this.product.productType == null) {
          this.typeMessage = "请选择农产品类型！";
        }
        if (this.product.name == null) {
          this.nameMessage = "请输入农产品名！";
        }
        if (this.product.amount == null || this.product.safeAmount == null) {
          this.amountMessage = "请输入库存或安全库存！";
        }
        if (this.product.unit == null || this.product.baseUnit == null) {
          this.unitMessage = "请输入单位！";
        }
      } else {
        let cn = /^[\u4E00-\u9FA5]+$/;
        let re = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/;
        if (this.product.productType == "家禽") {
          re = /^(0|\+?[1-9][0-9]*)$/;
        }
        if (
          !re.test(this.product.amount) ||
          !re.test(this.product.safeAmount)
        ) {
          if (this.product.productType == "家禽") {
            this.amountMessage = "请输入正整数！";
          } else {
            this.amountMessage = "请输入正数（最高小数点后两位）！";
          }
        } else if (
          !cn.test(this.product.unit) ||
          !cn.test(this.product.baseUnit)
        ) {
          this.unitMessage = "请输入中文！";
        } else if (!cn.test(this.product.name)) {
          this.nameMessage = "请输入中文！";
        } else {
          if (this.modelType == "添加") {
            addProduct(this.product);
            $("#product").modal("hide");
            this.productType = this.product.productType;
          } else if (this.modelType == "修改") {
            modifyProduct(this.product);
            $("#product").modal("hide");
            this.productType = this.product.productType;
          }
        }
      }
    },
    nameWrite() {
      this.nameMessage = null;
    },
    amountWrite() {
      this.amountMessage = null;
    },
    amountWrite1() {
      this.amountMessage1 = null;
    },
    amountWrite2() {
      this.amountMessage2 = null;
    },
    unitWrite() {
      this.unitMessage = null;
    },
    deleteProduct(product) {
      let con = confirm(`是否删除：${product.name}`);
      if (con == true) {
        deleteProduct(product);
      }
    },
    abnormalConsumption(product) {
      this.nowAmount = product.amount;
      this.typeMessage = null;
      this.nameMessage = null;
      this.amountMessage = null;
      this.amountMessage1 = null;
      this.amountMessage2 = null;
      this.unitMessage = null;
      this.product = JSON.parse(JSON.stringify(product));
      this.product.amount = null;
    },
    doModel1() {
      if (this.product.amount == null) {
        this.amountMessage1 = "请输入消耗数量！";
      } else {
        let re = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/;
        if (this.product.productType == "家禽") {
          re = /^(0|\+?[1-9][0-9]*)$/;
        }
        if (
          !re.test(this.product.amount) ||
          !re.test(this.product.safeAmount)
        ) {
          if (this.product.productType == "家禽") {
            this.amountMessage1 = "请输入正整数！";
          } else {
            this.amountMessage1 = "请输入正数（最高小数点后两位）！";
          }
        } else if (this.product.amount > this.nowAmount) {
          this.amountMessage1 = "库存不足！";
        } else {
          abnormalConsumption(this.product);
          $("#consumption").modal("hide");
          this.productType = this.product.productType;
        }
      }
    },
    produce(product) {
      this.typeMessage = null;
      this.nameMessage = null;
      this.amountMessage = null;
      this.amountMessage1 = null;
      this.amountMessage2 = null;
      this.unitMessage = null;
      this.product = JSON.parse(JSON.stringify(product));
      this.product.amount = null;
    },
    doModel2() {
      if (this.product.amount == null) {
        this.amountMessage2 = "请输入生产数量！";
      } else {
        let re = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/;
        if (this.product.productType == "家禽") {
          re = /^(0|\+?[1-9][0-9]*)$/;
        }
        if (!re.test(this.product.amount)) {
          if (this.product.productType == "家禽") {
            this.amountMessage2 = "请输入正整数！";
          } else {
            this.amountMessage2 = "请输入正数（最高小数点后两位）！";
          }
        } else {
          produce(this.product);
          $("#produce").modal("hide");
          this.productType = this.product.productType;
        }
      }
    }
  },
  created() {
    initProduct(this.productType);
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
