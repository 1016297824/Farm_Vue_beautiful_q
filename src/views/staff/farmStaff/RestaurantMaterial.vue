// 餐厅物资
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
                        <label for="" class="font-weight-bold">餐厅物资</label>
                      </div>
                      <div class="col-lg-3"></div>
                      <div class="col-lg-7">
                        <input
                          type="button"
                          class="btn btn-primary"
                          style="float:right"
                          value="新建采购信息"
                          data-toggle="modal"
                          data-target="#addRestaurantMaterial"
                          @click="addRestaurantMaterial"
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
                      物资名
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
                    v-for="(restaurantMaterial,
                    index) in restaurantMaterialList"
                    :key="index"
                  >
                    <td style="text-align: center;" class="text-truncate">
                      {{ restaurantMaterial.name }}
                    </td>
                    <td style="text-align: center;" class="text-truncate">
                      {{ restaurantMaterial.amount + restaurantMaterial.unit }}
                    </td>
                    <td style="text-align: center;" class="text-truncate">
                      {{
                        restaurantMaterial.safeAmount + restaurantMaterial.unit
                      }}
                    </td>
                    <td
                      style="text-align: center;color:red"
                      class="text-truncate"
                    >
                      {{
                        restaurantMaterial.amount >
                        restaurantMaterial.safeAmount
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
                        data-target="#addRestaurantMaterialPurchase"
                        @click="
                          addRestaurantMaterialPurchase(restaurantMaterial)
                        "
                      />
                      {{ &nbsp; }}
                      <input
                        type="button"
                        value="异常消耗"
                        class="btn btn-primary"
                        data-toggle="modal"
                        data-target="#consumptionRestaurantMaterial"
                        @click="
                          abnormalConsumptionRestaurantMaterial(
                            restaurantMaterial
                          )
                        "
                      />{{ &nbsp; }}
                      <input
                        type="button"
                        value="使用"
                        class="btn btn-primary"
                        data-toggle="modal"
                        data-target="#UseRestaurantMaterial"
                        @click="UseRestaurantMaterial(restaurantMaterial)"
                      />{{ &nbsp; }}
                      <input
                        type="button"
                        value="删除"
                        class="btn btn-light"
                        @click="deleteRestaurantMaterial(restaurantMaterial)"
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
                      @click="doPage2(1)"
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
                    <a class="page-link" href="#" @click="doPage2(page)">
                      {{ page }}
                    </a>
                  </li>
                  <li class="page-item">
                    <a
                      class="page-link"
                      href="#"
                      aria-label="Next"
                      @click="doPage2(pageBody1.pages)"
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
      id="addRestaurantMaterialPurchase"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              物资采购
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
                            物资名
                          </span>
                        </div>
                        <input
                          v-model="restaurantMaterial.name"
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
                          v-model="restaurantMaterial.unit"
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
                @click="addRestaurantMaterialPurchaseModel"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- model -->
    <div
      class="modal fade"
      id="consumptionRestaurantMaterial"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              物资消耗
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
                            物资名
                          </span>
                        </div>
                        <input
                          v-model="restaurantMaterial.name"
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
                          v-model="restaurantMaterial.amount"
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
                          v-model="restaurantMaterial.unit"
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
                @click="consumptionRestaurantMaterialModel"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- model -->
    <div
      class="modal fade"
      id="UseRestaurantMaterial"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              物资使用
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
                            物资名
                          </span>
                        </div>
                        <input
                          v-model="restaurantMaterial.name"
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
                          v-model="restaurantMaterial.amount"
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
                          v-model="restaurantMaterial.unit"
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
                @click="UseRestaurantMaterialModel"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- model -->
    <div
      class="modal fade"
      id="addRestaurantMaterial"
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
                            物资名
                          </span>
                        </div>
                        <input
                          type="text"
                          class="form-control"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-lg"
                          v-model="restaurantMaterial.name"
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
                          v-model="restaurantMaterial.amount"
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
                          v-model="restaurantMaterial.safeAmount"
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
                          v-model="restaurantMaterial.unit"
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
                @click="addRestaurantMaterialModel"
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
  addRestaurantMaterial,
  initRestaurantMaterial,
  doPage2,
  addRestaurantMaterialPurchase,
  deleteRestaurantMaterial,
  consumptionRestaurantMaterial,
  useRestaurantMaterial
} from "@/api/farmStaff.js";

export default {
  name: "RestaurantMaterial",
  data: () => ({
    restaurantMaterial: {
      id: null,
      name: null,
      amount: null,
      safeAmount: null,
      unit: null
    },
    restaurantMaterialList: [],
    pageBody1: {
      page: null,
      pages: null,
      pageList: []
    },
    purchase: {
      amount: null,
      price: null,
      restaurantMaterial: null
    },
    nowAmount: null,
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
    doPage2(page) {
      this.pageBody1.page = page;
      doPage2(this.pageBody1);
    },
    addRestaurantMaterial() {
      this.restaurantMaterial.id = null;
      this.restaurantMaterial.name = null;
      this.restaurantMaterial.amount = null;
      this.restaurantMaterial.safeAmount = null;
      this.restaurantMaterial.unit = null;
      this.nameMessage = null;
      this.amountMessage = null;
      this.safeAmountMessage = null;
      this.unitMessge = null;
    },
    addRestaurantMaterialModel() {
      if (
        this.restaurantMaterial.name == null ||
        this.restaurantMaterial.amount == null ||
        this.restaurantMaterial.safeAmount == null ||
        this.restaurantMaterial.unit == null
      ) {
        if (this.restaurantMaterial.name == null) {
          this.nameMessage = "请输入名称！";
        }
        if (this.restaurantMaterial.amount == null) {
          this.amountMessage = "请输入库存！";
        }
        if (this.restaurantMaterial.safeAmount == null) {
          this.safeAmountMessage = "请输入安全库存！";
        }
        if (this.restaurantMaterial.unit == null) {
          this.unitMessge = "请输入单位！";
        }
      } else {
        let cn = /^[\u4E00-\u9FA5]+$/;
        let re = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/;
        if (
          !cn.test(this.restaurantMaterial.name) ||
          !cn.test(this.restaurantMaterial.unit) ||
          !re.test(this.restaurantMaterial.amount) ||
          !re.test(this.restaurantMaterial.safeAmount)
        ) {
          if (!cn.test(this.restaurantMaterial.name)) {
            console.log(this.restaurantMaterial.name);

            this.nameMessage = "请输入中文！";
          }
          if (!cn.test(this.restaurantMaterial.unit)) {
            this.unitMessge = "请输入中文！";
          }
          if (!re.test(this.restaurantMaterial.amount)) {
            this.amountMessage = "请输入正数（最高小数点后两位）！";
          }
          if (!re.test(this.restaurantMaterial.safeAmount)) {
            this.safeAmountMessage = "请输入正数（最高小数点后两位）！";
          }
        } else {
          addRestaurantMaterial(this.restaurantMaterial);
          $("#addRestaurantMaterial").modal("hide");
        }
      }
    },
    addRestaurantMaterialPurchase(restaurantMaterial) {
      this.amountMessage = null;
      this.priceMessage = null;
      this.restaurantMaterial = JSON.parse(JSON.stringify(restaurantMaterial));
      this.purchase.price = null;
      this.purchase.amount = null;
    },
    addRestaurantMaterialPurchaseModel() {
      if ((this.purchase.amount == null) | (this.purchase.price == null)) {
        if (this.purchase.amount == null) {
          this.amountMessage = "请输入采购数量！";
        }
        if (this.purchase.price == null) {
          this.priceMessage = "请输入采购单价！";
        }
      } else {
        let p = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/;
        if (!p.test(this.purchase.amount) | !p.test(this.purchase.price)) {
          if (!p.test(this.purchase.amount)) {
            this.amountMessage = "请输入正数（最高小数点后两位）！";
          }
          if (!p.test(this.purchase.price)) {
            this.priceMessage = "请输入正数（最高小数点后两位）！";
          }
        } else {
          this.purchase.restaurantMaterial = this.restaurantMaterial;
          addRestaurantMaterialPurchase(this.purchase);
          $("#addRestaurantMaterialPurchase").modal("hide");
        }
      }
    },
    deleteRestaurantMaterial(restaurantMaterial) {
      let con = confirm(`是否删除：${restaurantMaterial.name}？`);
      if (con == true) {
        deleteRestaurantMaterial(restaurantMaterial);
      }
    },
    abnormalConsumptionRestaurantMaterial(restaurantMaterial) {
      this.nowAmount = restaurantMaterial.amount;
      this.amountMessage = null;
      this.restaurantMaterial = JSON.parse(JSON.stringify(restaurantMaterial));
      this.restaurantMaterial.amount = null;
    },
    consumptionRestaurantMaterialModel() {
      if (this.restaurantMaterial.amount == null) {
        this.amountMessage = "请输入消耗数量！";
      } else {
        let p = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/;
        if (!p.test(this.restaurantMaterial.amount)) {
          this.amountMessage = "请输入正数（最高小数点后两位）！";
        } else if (this.restaurantMaterial.amount > this.nowAmount) {
          console.log(this.restaurantMaterial.amount + "/" + this.nowAmount);

          this.amountMessage = "库存不足";
        } else {
          consumptionRestaurantMaterial(this.restaurantMaterial);
          $("#consumptionRestaurantMaterial").modal("hide");
        }
      }
    },
    UseRestaurantMaterial(restaurantMaterial) {
      this.nowAmount = restaurantMaterial.amount;
      this.amountMessage = null;
      this.restaurantMaterial = JSON.parse(JSON.stringify(restaurantMaterial));
      this.restaurantMaterial.amount = null;
    },
    UseRestaurantMaterialModel() {
      if (this.restaurantMaterial.amount == null) {
        this.amountMessage = "请输入消耗数量！";
      } else {
        let p = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/;
        if (!p.test(this.restaurantMaterial.amount)) {
          this.amountMessage = "请输入正数（最高小数点后两位）！";
        } else if (this.restaurantMaterial.amount > this.nowAmount) {
          this.amountMessage = "库存不足";
        } else {
          useRestaurantMaterial(this.restaurantMaterial);
          $("#UseRestaurantMaterial").modal("hide");
        }
      }
    }
  },
  created() {
    initRestaurantMaterial();
    bus.$on(bus.restaurantMaterialList, data => {
      this.restaurantMaterialList = data;
    });
    bus.$on(bus.pageBody1, data => {
      this.pageBody1 = data;
    });
  },
  beforeDestroy() {
    bus.$off(bus.restaurantMaterialList);
    bus.$off(bus.pageBody1);
  }
};
</script>
