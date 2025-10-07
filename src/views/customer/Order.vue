// 点餐界面
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
              <label for="" class="font-weight-bold">已有订单</label>
              <a href="/customer/reserveAdd" style="float:right">
                没有订单，去添加
              </a>
            </div>
            <hr />
            <br />
            <div
              class="row"
              v-for="(reserveList, index) in reserveLists"
              :key="index"
            >
              <div
                class="col-lg-4 text-center"
                v-for="(reserve, index) in reserveList"
                :key="index"
              >
                <img
                  style="cursor:pointer"
                  :alt="'订单号：' + reserve.no"
                  :title="'订单号：' + reserve.no"
                  src="@/assets/imgs/diningtable.jpg"
                  class="img-fluid"
                  @click="orderAdd(reserve.no)"
                />
                {{ reserve.diningTable.id + "号桌" }}
              </div>
            </div>
          </form>
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
import { getReserve } from "@/api/customer";

export default {
  name: "Order",
  data: () => ({
    reserveLists: null
  }),
  methods: {
    addReserve: function() {
      this.$router.push("reserveAdd");
    },
    orderAdd(no) {
      this.$router.push({
        path: "orderAdd",
        query: {
          no: no
        }
      });
    }
  },
  created() {
    bus.$on(bus.reserveLists, data => {
      this.reserveLists = data;
    });
  },
  mounted() {
    getReserve();
  },
  beforeDestroy() {
    bus.$off(bus.reserveLists);
  }
};
</script>
