import axios from "@/util/MyAxios";
import bus from "@/util/Bus";

// 获得所有订单
export function getReserve() {
  axios.get("restaurantStaff/getReserve").then(response => {
    setTimeout(() => {
      bus.$emit(bus.reserveList, response.data.reserveList);
      bus.$emit(bus.pageBody1, response.data.pageBody1);
    }, 200);
  });
}

// 订单分页
export function doPage(pageBody1) {
  axios.post("/restaurantStaff/doPage", pageBody1).then(response => {
    setTimeout(() => {
      bus.$emit(bus.reserveList, response.data.reserveList);
      bus.$emit(bus.pageBody1, response.data.pageBody1);
    }, 200);
  });
}

// 删除订单
export function deleteReserve(no) {
  axios.get(`/restaurantStaff/deleteReserve/${no}`).then(response => {
    setTimeout(() => {
      if (response.data.message != "") {
        alert(response.data.message);
      }
    }, 200);
    getReserve();
  });
}

// 获得订单信息
export function getOrdering(no) {
  axios.get(`/restaurantStaff/getOrdering/${no}`).then(response => {
    setTimeout(() => {
      bus.$emit(bus.orderingList, response.data.orderingList);
    }, 200);
  });
}

// 结账
export function settleAccounts(no) {
  axios.get(`/restaurantStaff/settleAccounts/${no}`).then(response => {
    setTimeout(() => {
      if (response.data.message != "") {
        alert(response.data.message);
      }
    }, 200);
    getReserve();
  });
}

// 提交报修报损信息
export function submitRepair(repair) {
  axios.post("/restaurantStaff/submitRepair", repair).then(response => {
    setTimeout(() => {
      if (response.data.message != "") {
        alert(response.data.message);
      }
      bus.$emit(bus.repair, response.data.repair);
    }, 200);
  });
}

// 修改密码
export function changePassword(userBodyChangePassword) {
  axios
    .post("restaurantStaff/changePassword", userBodyChangePassword)
    .then(response => {
      setTimeout(() => {
        alert(response.data.message);
      }, 200);
    });
}

// 获得所有未完成报修报损信息
export function getRepair() {
  axios.get("/restaurantStaff/getRepair").then(response => {
    setTimeout(() => {
      bus.$emit(bus.repairList, response.data.repairList);
      bus.$emit(bus.pageBody1, response.data.pageBody1);
    }, 200);
  });
}

// 报修报损分页
export function doPage1(pageBody1) {
  axios.post("/restaurantStaff/doPage1", pageBody1).then(response => {
    setTimeout(() => {
      bus.$emit(bus.repairList, response.data.repairList);
      bus.$emit(bus.pageBody1, response.data.pageBody1);
    }, 200);
  });
}

// 删除报修报损信息
export function deleteRepair(repair) {
  axios.post("/restaurantStaff/deleteRepair", repair).then(response => {
    setTimeout(() => {
      if (response.data.message != "") {
        alert(response.data.message);
      }
    }, 200);
    getRepair();
  });
}

// 完成报修报损
export function completeRepair(repair) {
  axios.post("/restaurantStaff/completeRepair", repair).then(response => {
    setTimeout(() => {
      if (response.data.message != "") {
        alert(response.data.message);
      }
    }, 200);
    getRepair();
  });
}
