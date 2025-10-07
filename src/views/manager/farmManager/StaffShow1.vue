// 显示所有员工
<template>
  <div>
    <!-- 导航栏 -->
    <farmManagerNavbar />

    <!-- 主体内容 -->
    <div class="container" style="padding-top: 100px; padding-bottom: 120px;">
      <div class="row justify-content-center">
        <div class="col-lg-11">
          <div class="card-farm p-4">
            <!-- 页面标题 -->
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h2 class="farm-title mb-0">
                <i class="bi bi-people me-2"></i>员工管理
              </h2>
              <button
                type="button"
                class="btn btn-farm-primary"
                @click="addStaff"
              >
                <i class="bi bi-person-plus me-2"></i>添加员工
              </button>
            </div>

            <!-- 员工表格 -->
            <div class="table-responsive">
              <table class="table table-farm">
                <thead>
                  <tr>
                    <th><i class="bi bi-hash me-1"></i>工号</th>
                    <th><i class="bi bi-person me-1"></i>姓名</th>
                    <th><i class="bi bi-briefcase me-1"></i>职务</th>
                    <th class="text-center">
                      <i class="bi bi-gear me-1"></i>操作
                    </th>
                  </tr>
                </thead>
                <tbody v-if="staffList1 && staffList1.length > 0">
                  <tr v-for="(staff, index) in staffList1" :key="index">
                    <td class="fw-medium">{{ staff.username }}</td>
                    <td>{{ staff.name }}</td>
                    <td>
                      <span
                        v-if="staff.position == null"
                        class="badge bg-secondary"
                      >
                        未分配
                      </span>
                      <span v-else class="badge bg-farm-primary">
                        {{ staff.position.name }}
                      </span>
                    </td>
                    <td class="text-center">
                      <button
                        type="button"
                        class="btn btn-farm-secondary btn-sm me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#positionModal"
                        @click="chooseStaff(staff)"
                        :title="
                          staff.position == null ? '分配职位' : '调整职位'
                        "
                      >
                        <i class="bi bi-briefcase me-1"></i>
                        {{ staff.position == null ? "任职" : "调任" }}
                      </button>
                      <button
                        type="button"
                        class="btn btn-outline-danger btn-sm"
                        @click="deleteStaff(staff.name, staff.username)"
                        title="解雇员工"
                      >
                        <i class="bi bi-person-dash me-1"></i>解雇
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- 空状态 -->
            <div
              v-if="staffList1 && staffList1.length === 0"
              class="text-center py-5"
            >
              <i class="bi bi-people display-1 text-muted mb-3"></i>
              <h5 class="text-muted mb-3">暂无员工信息</h5>
              <p class="text-muted">点击"添加员工"按钮开始管理员工</p>
              <button class="btn btn-farm-primary mt-3" @click="addStaff">
                <i class="bi bi-person-plus me-2"></i>立即添加
              </button>
            </div>

            <!-- 分页导航 -->
            <nav
              v-if="pageBody1.pages > 1"
              aria-label="员工列表分页"
              class="mt-4"
            >
              <ul class="pagination justify-content-center">
                <li
                  class="page-item"
                  :class="{ disabled: pageBody1.page === 1 }"
                >
                  <a
                    class="page-link"
                    href="#"
                    @click.prevent="doPage(1)"
                    aria-label="首页"
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li
                  v-for="(page, index) in pageBody1.pageList"
                  :key="index"
                  class="page-item"
                  :class="{ active: pageBody1.page === page }"
                >
                  <a class="page-link" href="#" @click.prevent="doPage(page)">
                    {{ page }}
                  </a>
                </li>
                <li
                  class="page-item"
                  :class="{ disabled: pageBody1.page === pageBody1.pages }"
                >
                  <a
                    class="page-link"
                    href="#"
                    @click.prevent="doPage(pageBody1.pages)"
                    aria-label="末页"
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- 职位分配模态框 -->
    <div
      class="modal fade"
      id="positionModal"
      tabindex="-1"
      aria-labelledby="positionModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-farm-primary text-white">
            <h5 class="modal-title" id="positionModalLabel">
              <i class="bi bi-briefcase me-2"></i>职位分配
            </h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="关闭"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <p class="text-muted mb-3">
                为员工 <strong>{{ staff?.name }}</strong> 分配职位：
              </p>
              <label class="form-label-farm">
                <i class="bi bi-briefcase me-1"></i>选择职位
              </label>
              <select class="form-select form-control-farm" v-model="position">
                <option value="">请选择职位</option>
                <option
                  v-for="(pos, index) in positionList"
                  :key="index"
                  :value="pos"
                >
                  {{ pos.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              <i class="bi bi-x-lg me-1"></i>取消
            </button>
            <button
              type="button"
              class="btn btn-farm-primary"
              @click="takeOffice"
              :disabled="!position"
            >
              <i class="bi bi-check-lg me-1"></i>确定分配
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 页脚 -->
    <footerNavbar />
  </div>
</template>

<script>
import bus from "@/util/Bus";
import { getStaff, deleteStaff, takeOffice } from "@/api/farmManager";
import farmManagerNavbar from "@/components/Header/FarmManagerNavbar.vue";
import footerNavbar from "@/components/FooterNavbar.vue";

export default {
  name: "StaffShow1",
  components: {
    farmManagerNavbar,
    footerNavbar
  },
  data() {
    return {
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
    };
  },
  mounted() {
    // 页面加载动画效果
    this.animatePageEntry();
    // 加载员工数据
    getStaff();
  },
  created() {
    bus.$on(bus.staffList, data => {
      this.staffList = data || [];
    });
    bus.$on(bus.staffList1, data => {
      this.staffList1 = data || [];
    });
    bus.$on(bus.pageBody1, data => {
      this.pageBody1 = data || { page: null, pages: null, pageList: [] };
    });
    bus.$on(bus.positionList, data => {
      this.positionList = data || [];
    });
  },
  beforeDestroy() {
    bus.$off(bus.staffList);
    bus.$off(bus.staffList1);
    bus.$off(bus.pageBody1);
    bus.$off(bus.positionList);
  },
  methods: {
    async deleteStaff(name, username) {
      try {
        const confirmed = confirm(
          `确定要解雇员工吗？\n姓名：${name}\n工号：${username}`
        );
        if (confirmed) {
          await deleteStaff(username);
          this.$farmMessage.success(`员工 ${name} 已成功解雇`);
          // 重新加载数据
          getStaff();
        }
      } catch (error) {
        console.error("解雇员工失败:", error);
        this.$farmMessage.error("解雇失败，请稍后重试");
      }
    },

    async addStaff() {
      try {
        await this.animatePageExit();
        this.$router.push("staffAdd1");
      } catch (error) {
        console.error("页面跳转失败:", error);
        this.$router.push("staffAdd1");
      }
    },

    async takeOffice() {
      try {
        if (!this.position) {
          this.$farmMessage.warning("请选择职位");
          return;
        }

        if (
          this.staff.position != null &&
          this.staff.position.name == this.position.name
        ) {
          this.$farmMessage.warning("该员工已是此职位！");
          return;
        }

        await takeOffice(this.staff, this.position.id);

        // 关闭模态框
        const modal = document.getElementById("positionModal");
        const bsModal = bootstrap.Modal.getInstance(modal);
        if (bsModal) {
          bsModal.hide();
        }

        this.$farmMessage.success(
          `已为 ${this.staff.name} 分配职位：${this.position.name}`
        );

        // 重置选择
        this.position = null;
        this.staff = null;

        // 重新加载数据
        getStaff();
      } catch (error) {
        console.error("职位分配失败:", error);
        this.$farmMessage.error("分配失败，请稍后重试");
      }
    },

    chooseStaff(staff) {
      this.staff = staff;
      this.position = null; // 重置职位选择
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
    },

    animatePageEntry() {
      const container = document.querySelector(".container");
      if (container) {
        container.style.opacity = "0";
        container.style.transform = "translateY(20px)";
        container.style.transition = "all 0.6s ease";

        setTimeout(() => {
          container.style.opacity = "1";
          container.style.transform = "translateY(0)";
        }, 100);
      }
    },

    async animatePageExit() {
      const container = document.querySelector(".container");
      if (container) {
        container.style.opacity = "0";
        container.style.transform = "translateX(20px)";
        container.style.transition = "all 0.3s ease";

        return new Promise(resolve => {
          setTimeout(resolve, 300);
        });
      }
    }
  }
};
</script>
