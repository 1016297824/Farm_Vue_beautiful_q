// 饲料肥料
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
                          v-model="fertilizerType"
                          @change="fertilizerTypeChange"
                        >
                          <option
                            v-for="(fertilizerType,
                            index) in fertilizerTypeList"
                            :key="index"
                            :value="fertilizerType"
                          >
                            {{ fertilizerType }}
                          </option>
                        </select>
                      </div>
                      <div class="col-lg-7">
                        <input
                          type="button"
                          class="btn btn-primary"
                          style="float:right"
                          value="新建采购信息"
                          data-toggle="modal"
                          data-target="#addFertilizer"
                          @click="addFertilizer"
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
                      {{ fertilizerType + "名称" }}
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
                  <tr
                    v-for="(fertilizer, index) in fertilizerList"
                    :key="index"
                  >
                    <td style="text-align: center;" class="text-truncate">
                      {{ fertilizer.name }}
                    </td>
                    <td style="text-align: center;" class="text-truncate">
                      {{ fertilizer.amount + fertilizer.unit }}
                    </td>
                    <td style="text-align: center;" class="text-truncate">
                      {{ fertilizer.safeAmount + fertilizer.unit }}
                    </td>
                    <td
                      style="text-align: center;color:red"
                      class="text-truncate"
                    >
                      {{
                        fertilizer.amount > fertilizer.safeAmount
                          ? null
                          : "缺货"
                      }}
                    </td>
                    <td>
                      <input
                        type="button"
                        value="采购"
                        class="btn btn-primary"
                        data-toggle="modal"
                        data-target="#purchase"
                        @click="addPurchase(fertilizer)"
                      />
                      {{ &nbsp; }}
                      <input
                        type="button"
                        value="异常消耗"
                        class="btn btn-primary"
                        data-toggle="modal"
                        data-target="#consumption"
                        @click="abnormalConsumptionFertilizer(fertilizer)"
                      />{{ &nbsp; }}
                      <input
                        type="button"
                        value="使用"
                        class="btn btn-primary"
                        data-toggle="modal"
                        data-target="#farmUse"
                        @click="farmUse(fertilizer)"
                      />{{ &nbsp; }}
                      <input
                        type="button"
                        value="删除"
                        class="btn btn-light"
                        @click="deleteFertilizer(fertilizer)"
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
                      @click="doPage1(1)"
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
                    <a class="page-link" href="#" @click="doPage1(page)">
                      {{ page }}
                    </a>
                  </li>
                  <li class="page-item">
                    <a
                      class="page-link"
                      href="#"
                      aria-label="Next"
                      @click="doPage1(pageBody1.pages)"
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
      id="purchase"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              {{ fertilizerType + "采购" }}
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
                            类型
                          </span>
                        </div>
                        <select
                          class="form-control"
                          v-model="fertilizer.fertilizerType"
                          disabled
                        >
                          <option
                            v-for="(fertilizerType,
                            index) in fertilizerTypeList"
                            :key="index"
                            :value="fertilizerType"
                          >
                            {{ fertilizerType }}
                          </option>
                        </select>
                      </div>
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
                          v-model="fertilizer.name"
                          disabled
                          type="text"
                          class="form-control"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-lg"
                        />
                      </div>
                      <br />
                      <div class="input-group input-group-lg">
                        <div class="input-group-prepend">
                          <span
                            class="input-group-text"
                            id="inputGroup-sizing-lg"
                          >
                            采购数量
                          </span>
                        </div>
                        <input
                          v-model="purchase.amount"
                          type="text"
                          class="form-control"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-lg"
                          @keyup="amountWrite()"
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
                          v-model="fertilizer.unit"
                          disabled
                          type="text"
                          class="form-control"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-lg"
                        />
                      </div>
                      <br />
                      <div class="input-group input-group-lg">
                        <div class="input-group-prepend">
                          <span
                            class="input-group-text"
                            id="inputGroup-sizing-lg"
                          >
                            单价
                          </span>
                        </div>
                        <input
                          v-model="purchase.price"
                          type="text"
                          class="form-control"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-lg"
                          @keyup="priceWrite"
                        />
                        <div class="input-group-prepend">
                          <span
                            class="input-group-text"
                            id="inputGroup-sizing-lg"
                          >
                            元
                          </span>
                        </div>
                      </div>
                      <p style="color: red;">
                        {{ priceMessage }}
                      </p>
                      <br />
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
                @click="purchaseModel"
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
            <h5 class="modal-title" id="exampleModalLongTitle">
              {{ fertilizerType + "消耗" }}
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
                            类型
                          </span>
                        </div>
                        <select
                          class="form-control"
                          v-model="fertilizer.fertilizerType"
                          disabled
                        >
                          <option
                            v-for="(fertilizerType,
                            index) in fertilizerTypeList"
                            :key="index"
                            :value="fertilizerType"
                          >
                            {{ fertilizerType }}
                          </option>
                        </select>
                      </div>
                      <br />
                      <div class="input-group input-group-lg">
                        <div class="input-group-prepend">
                          <span
                            class="input-group-text"
                            id="inputGroup-sizing-lg"
                          >
                            {{ fertilizerType + "名" }}
                          </span>
                        </div>
                        <input
                          v-model="fertilizer.name"
                          disabled
                          type="text"
                          class="form-control"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-lg"
                        />
                      </div>
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
                          v-model="fertilizer.amount"
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
                          v-model="fertilizer.unit"
                          disabled
                          type="text"
                          class="form-control"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-lg"
                        />
                      </div>
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
                @click="consumptionModel"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- model -->
    <div
      class="modal fade"
      id="farmUse"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              {{ fertilizerType + "使用" }}
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
                            类型
                          </span>
                        </div>
                        <select
                          class="form-control"
                          v-model="fertilizer.fertilizerType"
                          disabled
                        >
                          <option
                            v-for="(fertilizerType,
                            index) in fertilizerTypeList"
                            :key="index"
                            :value="fertilizerType"
                          >
                            {{ fertilizerType }}
                          </option>
                        </select>
                      </div>
                      <br />
                      <div class="input-group input-group-lg">
                        <div class="input-group-prepend">
                          <span
                            class="input-group-text"
                            id="inputGroup-sizing-lg"
                          >
                            {{ fertilizerType + "名" }}
                          </span>
                        </div>
                        <input
                          v-model="fertilizer.name"
                          disabled
                          type="text"
                          class="form-control"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-lg"
                        />
                      </div>
                      <br />
                      <div class="input-group input-group-lg">
                        <div class="input-group-prepend">
                          <span
                            class="input-group-text"
                            id="inputGroup-sizing-lg"
                          >
                            使用数量
                          </span>
                        </div>
                        <input
                          v-model="fertilizer.amount"
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
                          v-model="fertilizer.unit"
                          disabled
                          type="text"
                          class="form-control"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-lg"
                        />
                      </div>
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
                @click="farmUseModel"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- model -->
    <div
      class="modal fade"
      id="addFertilizer"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              新建采购信息
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
                            类型
                          </span>
                        </div>
                        <select
                          class="form-control"
                          v-model="fertilizer.fertilizerType"
                          @change="changeFertilizerType"
                        >
                          <option
                            v-for="(fertilizerType,
                            index) in fertilizerTypeList"
                            :key="index"
                            :value="fertilizerType"
                          >
                            {{ fertilizerType }}
                          </option>
                        </select>
                      </div>
                      <p style="color: red;">
                        {{ fertilizerTypeMessage }}
                      </p>
                      <br />
                      <div class="input-group input-group-lg">
                        <div class="input-group-prepend">
                          <span
                            class="input-group-text"
                            id="inputGroup-sizing-lg"
                          >
                            {{ fertilizerType + "名" }}
                          </span>
                        </div>
                        <input
                          type="text"
                          class="form-control"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-lg"
                          v-model="fertilizer.name"
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
                          v-model="fertilizer.amount"
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
                            安全库存
                          </span>
                        </div>
                        <input
                          v-model="fertilizer.safeAmount"
                          type="text"
                          class="form-control"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-lg"
                          @keyup="safeAmountWrite"
                        />
                      </div>
                      <p style="color: red;">
                        {{ safeAmountMessage }}
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
                          v-model="fertilizer.unit"
                          type="text"
                          class="form-control"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-lg"
                          @keyup="unitWtite"
                        />
                      </div>
                      <p style="color: red;">
                        {{ unitMessge }}
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
                @click="addFertilizerModel"
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
import $ from "jquery";
import bus from "@/util/Bus";
import {
  initFertilizer,
  doPage1,
  addPurchase1,
  abnormalConsumptionFertilizer,
  farmUse,
  addFertilizer,
  deleteFertilizer
} from "@/api/farmStaff.js";

export default {
  name: "Fertilizer",
  data: () => ({
    fertilizerTypeList: ["饲料", "肥料"],
    fertilizerType: "饲料",
    fertilizerList: [],
    fertilizer: {
      id: null,
      name: null,
      amount: null,
      safeAmount: null,
      unit: null,
      fertilizerType: null
    },
    pageBody1: {
      page: null,
      pages: null,
      pageList: []
    },
    purchase: {
      amount: null,
      price: null,
      fertilizer: null
    },
    nowAmount: null,
    fertilizerTypeMessage: null,
    nameMessage: null,
    amountMessage: null,
    safeAmountMessage: null,
    unitMessge: null,
    priceMessage: null
  }),
  methods: {
    nameWrite() {
      this.nameMessage = null;
    },
    amountWrite() {
      this.amountMessage = null;
    },
    safeAmountWrite() {
      this.safeAmountMessage = null;
    },
    unitWtite() {
      this.unitMessge = null;
    },
    priceWrite() {
      this.priceMessage = null;
    },
    changeFertilizerType() {
      this.fertilizerTypeMessage = null;
    },
    fertilizerTypeChange() {
      initFertilizer(this.fertilizerType);
    },
    doPage1(page) {
      this.pageBody1.page = page;
      doPage1(this.pageBody1, this.fertilizerType);
    },
    addPurchase(fertilizer) {
      this.amountMessage = null;
      this.priceMessage = null;
      this.fertilizer = JSON.parse(JSON.stringify(fertilizer));
      this.purchase.price = null;
      this.purchase.amount = null;
    },
    purchaseModel() {
      if ((this.purchase.amount == null) | (this.purchase.price == null)) {
        if (this.purchase.amount == null) {
          this.amountMessage = "请输入采购数量！";
        }
        if (this.purchase.price == null) {
          this.priceMessage = "请输入采购单价！";
        }
      } else {
        let p = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/;
        // let p1 = /^(0|\+?[1-9][0-9]*)$/;
        if (!p.test(this.purchase.amount) | !p.test(this.purchase.price)) {
          if (!p.test(this.purchase.amount)) {
            this.amountMessage = "请输入正数（最高小数点后两位）！";
          }
          if (!p.test(this.purchase.price)) {
            this.priceMessage = "请输入正数（最高小数点后两位）！";
          }
        } else {
          this.purchase.fertilizer = this.fertilizer;
          addPurchase1(this.purchase);
          $("#purchase").modal("hide");
          this.fertilizerType = this.fertilizer.fertilizerType;
        }
      }
    },
    abnormalConsumptionFertilizer(fertilizer) {
      this.nowAmount = fertilizer.amount;
      this.amountMessage = null;
      this.fertilizer = JSON.parse(JSON.stringify(fertilizer));
      this.fertilizer.amount = null;
    },
    consumptionModel() {
      if (this.fertilizer.amount == null) {
        this.amountMessage = "请输入消耗数量！";
      } else {
        let p = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/;
        if (!p.test(this.fertilizer.amount)) {
          this.amountMessage = "请输入正数（最高小数点后两位）！";
        } else if (this.fertilizer.amount > this.nowAmount) {
          this.amountMessage = "库存不足";
        } else {
          abnormalConsumptionFertilizer(this.fertilizer);
          $("#consumption").modal("hide");
          this.fertilizerType = this.fertilizer.fertilizerType;
        }
      }
    },
    farmUse(fertilizer) {
      this.nowAmount = fertilizer.amount;
      this.amountMessage = null;
      this.fertilizer = JSON.parse(JSON.stringify(fertilizer));
      this.fertilizer.amount = null;
    },
    farmUseModel() {
      if (this.fertilizer.amount == null) {
        this.amountMessage = "请输入消耗数量！";
      } else {
        let p = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/;
        if (!p.test(this.fertilizer.amount)) {
          this.amountMessage = "请输入正数（最高小数点后两位）！";
        } else if (this.fertilizer.amount > this.nowAmount) {
          this.amountMessage = "库存不足";
        } else {
          farmUse(this.fertilizer);
          $("#farmUse").modal("hide");
          this.fertilizerType = this.fertilizer.fertilizerType;
        }
      }
    },
    addFertilizer() {
      this.fertilizer.id = null;
      this.fertilizer.name = null;
      this.fertilizer.amount = null;
      this.fertilizer.safeAmount = null;
      this.fertilizer.unit = null;
      this.fertilizer.fertilizerType = null;
      this.nameMessage = null;
      this.amountMessage = null;
      this.safeAmountMessage = null;
      this.unitMessge = null;
      this.fertilizerTypeMessage = null;
    },
    addFertilizerModel() {
      if (
        this.fertilizer.name == null ||
        this.fertilizer.amount == null ||
        this.fertilizer.safeAmount == null ||
        this.fertilizer.unit == null ||
        this.fertilizer.fertilizerType == null
      ) {
        if (this.fertilizer.name == null) {
          this.nameMessage = "请输入名称！";
        }
        if (this.fertilizer.amount == null) {
          this.amountMessage = "请输入库存！";
        }
        if (this.fertilizer.safeAmount == null) {
          this.safeAmountMessage = "请输入安全库存！";
        }
        if (this.fertilizer.unit == null) {
          this.unitMessge = "请输入单位！";
        }
        if (this.fertilizer.fertilizerType == null) {
          this.fertilizerTypeMessage = "请选择类型！";
        }
      } else {
        let cn = /^[\u4E00-\u9FA5]+$/;
        let re = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/;
        if (
          !cn.test(this.fertilizer.name) ||
          !cn.test(this.fertilizer.unit) ||
          !re.test(this.fertilizer.amount) ||
          !re.test(this.fertilizer.safeAmount)
        ) {
          if (!cn.test(this.fertilizer.name)) {
            console.log(this.fertilizer.name);

            this.nameMessage = "请输入中文！";
          }
          if (!cn.test(this.fertilizer.unit)) {
            this.unitMessge = "请输入中文！";
          }
          if (!re.test(this.fertilizer.amount)) {
            this.amountMessage = "请输入正数（最高小数点后两位）！";
          }
          if (!re.test(this.fertilizer.safeAmount)) {
            this.safeAmountMessage = "请输入正数（最高小数点后两位）！";
          }
        } else {
          addFertilizer(this.fertilizer);
          $("#addFertilizer").modal("hide");
          this.fertilizerType = this.fertilizer.fertilizerType;
        }
      }
    },
    deleteFertilizer(fertilizer) {
      let con = confirm(`是否删除：${fertilizer.name}`);
      if (con == true) {
        deleteFertilizer(fertilizer);
      }
    }
  },
  created() {
    initFertilizer(this.fertilizerType);
    bus.$on(bus.fertilizerList, data => {
      this.fertilizerList = data;
    });
    bus.$on(bus.pageBody1, data => {
      this.pageBody1 = data;
    });
  },
  beforeDestroy() {
    bus.$off(bus.fertilizerList);
    bus.$off(bus.pageBody1);
  }
};
</script>
