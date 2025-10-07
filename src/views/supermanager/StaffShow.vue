<template>
  <div>
    <!-- 导航栏 -->
    <superManagerNavbar />

    <!-- 主体内容 -->
    <div class="container" style="padding-top: 100px; padding-bottom: 120px;">
      <div class="row justify-content-center">
        <div class="col-xl-10">
          <div class="card-farm p-4">
            <!-- 页面标题 -->
            <div class="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 class="farm-title mb-2">
                  <i class="bi bi-people me-2"></i>员工管理
                </h2>
                <p class="text-muted mb-0">管理员工信息和职务分配</p>
              </div>
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
                    <th class="text-center">
                      <i class="bi bi-person-badge me-1"></i>工号
                    </th>
                    <th class="text-center">
                      <i class="bi bi-person me-1"></i>姓名
                    </th>
                    <th class="text-center">
                      <i class="bi bi-briefcase me-1"></i>职务
                    </th>
                    <th class="text-center">
                      <i class="bi bi-gear me-1"></i>操作
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(staff, index) in staffList1" :key="index" class="table-row-hover">
                    <td class="text-center fw-bold text-farm-primary">
                      {{ staff.username }}
                    </td>
                    <td class="text-center">
                      {{ staff.name }}
                    </td>
                    <td class="text-center">
                      <span class="badge" :class="staff.position == null ? 'bg-secondary' : 'bg-success'">
                        {{ staff.position == null ? "未分配" : staff.position.name }}
                      </span>
                    </td>
                    <td class="text-center">
                      <div class="btn-group" role="group">
                        <button
                          type="button"
                          class="btn btn-outline-primary btn-sm me-2"
                          data-bs-toggle="modal"
                          data-bs-target="#positionModal"
                          @click="chooseStaff(staff)"
                        >
                          <i class="bi bi-briefcase me-1"></i>{{ staff.position == null ? '任职' : '调任' }}
                        </button>
                        <button
                          type="button"
                          class="btn btn-outline-danger btn-sm"
                          @click="deleteStaff(staff.name, staff.username)"
                        >
                          <i class="bi bi-trash me-1"></i>解雇
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="staffList1.length === 0">
                    <td colspan="4" class="text-center text-muted py-4">
                      <i class="bi bi-people me-2"></i>暂无员工信息
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- 分页器 -->
            <div class="d-flex justify-content-center" v-if="pageBody1.pageList && pageBody1.pageList.length > 1">
              <nav aria-label="员工分页">
                <ul class="pagination pagination-farm">
                  <li class="page-item" :class="{ disabled: pageBody1.page === 1 }">
                    <button type="button" class="page-link" @click="doPage(1)" :disabled="pageBody1.page === 1">
                      <i class="bi bi-chevron-double-left"></i>
                    </button>
                  </li>
                  <li
                    v-for="(page, index) in pageBody1.pageList"
                    :key="index"
                    class="page-item"
                    :class="{ active: pageBody1.page === page }"
                  >
                    <button type="button" class="page-link" @click="doPage(page)">
                      {{ page }}
                    </button>
                  </li>
                  <li class="page-item" :class="{ disabled: pageBody1.page === pageBody1.pages }">
                    <button type="button" class="page-link" @click="doPage(pageBody1.pages)" :disabled="pageBody1.page === pageBody1.pages">
                      <i class="bi bi-chevron-double-right"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 任职模态框 -->
    <div
      class="modal fade"
      id="positionModal"
      tabindex="-1"
      aria-labelledby="positionModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content modal-farm">
          <div class="modal-header">
            <h5 class="modal-title" id="positionModalLabel">
              <i class="bi bi-briefcase me-2"></i>任职
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="position-selection">
              <div class="mb-3">
                <label class="form-label-farm">
                  <i class="bi bi-list-task me-1"></i>选择职位：
                </label>
                <select class="form-select form-control-farm" v-model="position">
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
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              <i class="bi bi-x-circle me-2"></i>取消
            </button>
            <button type="button" class="btn btn-farm-primary" @click="takeOffice">
              <i class="bi bi-check-circle me-2"></i>确认任职
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
import { getStaff, deleteStaff, takeOffice } from "@/api/supermanager";
import superManagerNavbar from "@/components/Header/SuperManagerNavbar.vue";
import footerNavbar from "@/components/FooterNavbar.vue";

export default {
  name: "StaffShow",
  components: {
    superManagerNavbar,
    footerNavbar
  },
  data() {
    return {
      staffList: [],
      staffList1: [],
      pageBody1: {
        page: 1,
        pages: 1,
        pageList: []
      },
      positionList: [],
      staff: null,
      position: null
    };
  },
  methods: {
    addStaff() {
      this.$router.push("/supermanager/staffAdd");
    },
    deleteStaff(name, username) {
      if (confirm(`确定要解雇员工 ${name}（工号：${username}）吗？`)) {
        deleteStaff(username);
      }
    },
    chooseStaff(staff) {
      this.staff = JSON.parse(JSON.stringify(staff));
    },
    takeOffice() {
      if (this.position) {
        takeOffice(this.staff.username, this.position.id);
        
        // 关闭模态框
        const modal = bootstrap.Modal.getInstance(document.getElementById('positionModal'));
        if (modal) modal.hide();
      } else {
        alert("请选择职位！");
      }
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
      this.staffList = data || [];
      this.doPage(1);
    });
    bus.$on(bus.pageBody1, data => {
      this.pageBody1 = data || { page: 1, pages: 1, pageList: [] };
    });
    bus.$on(bus.positionList, data => {
      this.positionList = data || [];
    });
  },
  beforeDestroy() {
    bus.$off(bus.staffList);
    bus.$off(bus.pageBody1);
    bus.$off(bus.positionList);
  }
};
</script>

<style scoped>
.table-farm thead {
  background: linear-gradient(135deg, var(--farm-green), var(--farm-green-dark));
  color: white;
}

.table-row-hover:hover {
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.05), rgba(129, 199, 132, 0.05));
}

.form-label-farm {
  font-weight: 600;
  color: var(--farm-green-dark);
  margin-bottom: 0.5rem;
}

.form-control-farm {
  border: 2px solid var(--farm-border-light);
  border-radius: 8px;
  padding: 0.75rem;
  transition: border-color 0.3s ease;
}

.form-control-farm:focus {
  border-color: var(--farm-green);
  box-shadow: 0 0 0 0.2rem rgba(76, 175, 80, 0.25);
}

.modal-farm .modal-header {
  background: linear-gradient(135deg, var(--farm-green), var(--farm-green-dark));
  color: white;
}

.btn-farm-primary {
  background: linear-gradient(135deg, var(--farm-green), var(--farm-green-dark));
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
}

.btn-farm-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(76, 175, 80, 0.4);
  background: linear-gradient(135deg, var(--farm-green-dark), #2e7d32);
}

.pagination-farm {
  --bs-pagination-color: var(--farm-green-dark);
  --bs-pagination-border-color: var(--farm-border-light);
  --bs-pagination-hover-color: white;
  --bs-pagination-hover-bg: var(--farm-green);
  --bs-pagination-active-bg: var(--farm-green-dark);
}

@media (max-width: 768px) {
  .card-farm {
    padding: 1.5rem !important;
  }
  
  .farm-title {
    font-size: 1.5rem;
  }
}
</style>