// 显示所有员工
<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="col-lg-12">
          <div class="col-lg-8 m-auto">
            <br />
            <br />
            <br />
            <br />
            <br />
            <form action="">
              <div class="form-group text-left">
                <div class="row">
                  <div class="col-lg-10">
                    <label for="" class="font-weight-bold">员工信息</label>
                    <input
                      type="button"
                      class="btn btn-primary"
                      style="float:right"
                      value="添加员工"
                      @click="addStaff"
                    />
                  </div>
                </div>
              </div>
              <table class="table table-borderless">
                <thead>
                  <tr>
                    <th>工号</th>
                    <th>姓名</th>
                    <th>职务</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(staff, index) in staffList1" :key="index">
                    <td>{{ staff.username }}</td>
                    <td>{{ staff.name }}</td>
                    <td>
                      {{
                        staff.position == null ? "未分配" : staff.position.name
                      }}
                    </td>
                    <td>
                      <input
                        type="button"
                        :value="staff.position == null ? '任职' : '调任'"
                        class="btn btn-primary"
                        data-toggle="modal"
                        data-target="#position"
                        @click="chooseStaff(staff)"
                      />{{ &nbsp; }}
                      <input
                        type="button"
                        value="解雇"
                        class="btn  btn-light"
                        @click="deleteStaff(staff.name, staff.username)"
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
      id="position"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">任职</h5>
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
                      选择职位
                      <select class="form-control" v-model="position">
                        <option
                          v-for="(position, index) in positionList"
                          :key="index"
                          :value="position"
                        >
                          {{ position.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="col-lg-12" style="text-align:right">
              <input
                type="button"
                value="任职"
                class="btn btn-primary"
                @click="takeOffice"
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
import { getStaff, deleteStaff, takeOffice } from "@/api/restaurantManager";
import $ from "jquery";

export default {
  name: "StaffShow",
  data: () => ({
    staffList: [],
    staffList1: [],
    pageBody1: {
      page: null,
      pages: null,
      pageList: []
    },
    positionList: [],
    staff: null,
    position: null
  }),
  methods: {
    deleteStaff(name, username) {
      let con = confirm(`是否解雇员工：${name}\n工号：${username}`);
      if (con == true) {
        deleteStaff(username);
      } else {
        alert("已取消！");
      }
    },
    addStaff() {
      this.$router.push("staffAdd2");
    },
    takeOffice() {
      if (
        this.staff.position != null &&
        this.staff.position.name == this.position.name
      ) {
        alert("已是此职位！");
      } else {
        takeOffice(this.staff, this.position.id);
        $("#position").modal("hide");
        this.position = null;
      }
    },
    chooseStaff(staff) {
      this.staff = staff;
    },
    doPage(page) {
      this.staffList1 = [];
      if (this.pageBody1.pages <= 5) {
        if (this.pageBody1.pages == page) {
          for (let i = (page - 1) * 5; i < this.staffList.length; i++) {
            this.staffList1.push(this.staffList[i]);
          }
        } else {
          for (let i = (page - 1) * 5; i < page * 5; i++) {
            this.staffList1.push(this.staffList[i]);
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
            for (let i = (page - 1) * 5; i < this.staffList.length; i++) {
              this.staffList1.push(this.staffList[i]);
            }
          } else {
            for (let i = (page - 1) * 5; i < page * 5; i++) {
              this.staffList1.push(this.staffList[i]);
            }
          }
        } else if (page <= 2) {
          for (let i = 0; i < 5; i++) {
            this.pageBody1.pageList.push(i + 1);
          }
          for (let i = (page - 1) * 5; i < page * 5; i++) {
            this.staffList1.push(this.staffList[i]);
          }
        } else {
          for (let i = page - 2; i <= page + 2; i++) {
            this.pageBody1.pageList.push(i);
          }
          for (let i = (page - 1) * 5; i < page * 5; i++) {
            this.staffList1.push(this.staffList[i]);
          }
        }
      }
      this.pageBody1.page = page;
    }
  },
  created() {
    getStaff();
    bus.$on(bus.staffList, data => {
      this.staffList = data;
    });
    bus.$on(bus.staffList1, data => {
      this.staffList1 = data;
    });
    bus.$on(bus.pageBody1, data => {
      this.pageBody1 = data;
    });
    bus.$on(bus.positionList, data => {
      this.positionList = data;
    });
  },
  beforeDestroy() {
    bus.$off(bus.staffList);
    bus.$off(bus.staffList1);
    bus.$off(bus.pageBody1);
    bus.$off(bus.positionList);
  }
};
</script>
