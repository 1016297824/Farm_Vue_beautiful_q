<template>
  <div>
    <!-- 导航栏 -->
    <restaurantManagerNavbar />

    <!-- 主体内容 -->
    <div class="container" style="padding-top: 100px; padding-bottom: 120px;">
      <div class="row justify-content-center">
        <div class="col-lg-11">
          <div class="card-farm p-4">
            <!-- 页面标题和日期选择 -->
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h2 class="farm-title mb-0">
                <i class="bi bi-clock-history me-2"></i>餐厅考勤管理
              </h2>
              <div class="d-flex align-items-center">
                <label class="form-label-farm me-3 mb-0">
                  <i class="bi bi-calendar-date me-1"></i>选择日期：
                </label>
                <input
                  type="date"
                  class="form-control form-control-farm"
                  style="width: auto;"
                  v-model="formattedDate"
                  @change="chooseDate"
                />
              </div>
            </div>

            <!-- 考勤表格 -->
            <div class="table-responsive">
              <table class="table table-farm">
                <thead>
                  <tr>
                    <th class="text-center">
                      <i class="bi bi-hash me-1"></i>工号
                    </th>
                    <th class="text-center">
                      <i class="bi bi-person me-1"></i>姓名
                    </th>
                    <th class="text-center">
                      <i class="bi bi-briefcase me-1"></i>职位
                    </th>
                    <th class="text-center">
                      <i class="bi bi-clock me-1"></i>工作时长
                    </th>
                    <th class="text-center">
                      <i class="bi bi-activity me-1"></i>状态
                    </th>
                  </tr>
                </thead>
                <tbody v-if="attendanceList1 && attendanceList1.length > 0">
                  <tr v-for="(attendance, index) in attendanceList1" :key="index">
                    <td class="text-center fw-medium">
                      {{ attendance.staff.username }}
                    </td>
                    <td class="text-center">
                      {{ attendance.staff.name }}
                    </td>
                    <td class="text-center">
                      <span 
                        v-if="attendance.staff.position"
                        class="badge bg-farm-primary"
                      >
                        {{ attendance.staff.position.name }}
                      </span>
                      <span v-else class="badge bg-secondary">未分配</span>
                    </td>
                    <td class="text-center">
                      <div class="d-flex align-items-center justify-content-center">
                        <select
                          class="form-select form-control-farm me-2"
                          style="width: auto; min-width: 80px;"
                          v-model="attendance.workingHours"
                          @change="changeWorkingHours(attendance)"
                        >
                          <option
                            v-for="(hours, index) in workingHoursList"
                            :key="index"
                            :value="hours"
                          >
                            {{ hours }}
                          </option>
                        </select>
                        <span class="text-muted">小时</span>
                      </div>
                    </td>
                    <td class="text-center">
                      <span 
                        :class="getAttendanceStatusClass(attendance.workingHours)"
                        class="badge"
                      >
                        {{ getAttendanceStatusText(attendance.workingHours) }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- 空状态 -->
            <div v-if="attendanceList1 && attendanceList1.length === 0" class="text-center py-5">
              <i class="bi bi-clock-history display-1 text-muted mb-3"></i>
              <h5 class="text-muted mb-3">暂无考勤数据</h5>
              <p class="text-muted">请选择其他日期或检查员工数据</p>
            </div>

            <!-- 操作按钮 -->
            <div class="d-flex justify-content-between align-items-center mt-4" v-if="attendanceList1 && attendanceList1.length > 0">
              <div class="text-muted">
                <i class="bi bi-info-circle me-1"></i>
                共 {{ attendanceList.length }} 名餐厅员工的考勤记录
              </div>
              <button
                type="button"
                class="btn btn-farm-primary"
                @click="updateAttendance"
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting">
                  <i class="bi bi-arrow-clockwise me-2 spin"></i>提交中...
                </span>
                <span v-else>
                  <i class="bi bi-check-lg me-2"></i>提交考勤
                </span>
              </button>
            </div>

            <!-- 分页导航 -->
            <nav v-if="pageBody1.pages > 1" aria-label="考勤列表分页" class="mt-4">
              <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: pageBody1.page === 1 }">
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
                <li class="page-item" :class="{ disabled: pageBody1.page === pageBody1.pages }">
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

    <!-- 页脚 -->
    <footerNavbar />
  </div>
</template>

<script>
import bus from "@/util/Bus";
import {
  initAttendance,
  updateAttendance,
  chooseDate
} from "@/api/restaurantManager.js";
import restaurantManagerNavbar from '@/components/Header/RestaurantManagerNavbar.vue';
import footerNavbar from '@/components/FooterNavbar.vue';

export default {
  name: "Attendance2",
  components: {
    restaurantManagerNavbar,
    footerNavbar
  },
  data() {
    return {
      choosedDate: new Date(),
      attendanceList: [],
      attendanceList1: [],
      pageBody1: {
        page: null,
        pages: null,
        pageList: []
      },
      workingHoursList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      isSubmitting: false
    }
  },
  computed: {
    formattedDate: {
      get() {
        if (!this.choosedDate) return ""
        const date = new Date(this.choosedDate)
        return date.toISOString().split("T")[0]
      },
      set(value) {
        this.choosedDate = new Date(value)
      }
    }
  },
  mounted() {
    this.animatePageEntry()
    initAttendance()
  },
  created() {
    bus.$on(bus.attendanceList, data => {
      this.attendanceList = data || []
    })
    bus.$on(bus.attendanceList1, data => {
      this.attendanceList1 = data || []
    })
    bus.$on(bus.pageBody1, data => {
      this.pageBody1 = data || { page: null, pages: null, pageList: [] }
    })
  },
  beforeDestroy() {
    bus.$off(bus.attendanceList)
    bus.$off(bus.attendanceList1)
    bus.$off(bus.pageBody1)
  },
  methods: {
    async updateAttendance() {
      try {
        const confirmed = confirm(`确定要提交当前餐厅考勤信息吗？\n日期：${this.formatDate(this.choosedDate)}\n总计：${this.attendanceList.length} 名员工`)
        if (confirmed) {
          this.isSubmitting = true
          await updateAttendance(this.attendanceList, this.choosedDate)
          this.showToast('餐厅考勤信息提交成功', 'success')
        }
      } catch (error) {
        console.error('提交考勤失败:', error)
        this.showToast('提交失败，请稍后重试', 'danger')
      } finally {
        this.isSubmitting = false
      }
    },

    changeWorkingHours(attendance) {
      for (let i = 0; i < this.attendanceList.length; i++) {
        if (this.attendanceList[i].id == attendance.id) {
          this.attendanceList[i].workingHours = attendance.workingHours
          break
        }
      }
      this.showToast(`已更新 ${attendance.staff.name} 的工作时长为 ${attendance.workingHours} 小时`, 'info')
    },

    chooseDate() {
      chooseDate(this.choosedDate)
      this.showToast(`已切换到 ${this.formatDate(this.choosedDate)} 的考勤数据`, 'info')
    },

    doPage(page) {
      this.attendanceList1 = []
      if (this.pageBody1.pages <= 5) {
        if (this.pageBody1.pages == page) {
          for (let i = (page - 1) * 5; i < this.attendanceList.length; i++) {
            this.attendanceList1.push(this.attendanceList[i])
          }
        } else {
          for (let i = (page - 1) * 5; i < page * 5; i++) {
            this.attendanceList1.push(this.attendanceList[i])
          }
        }
      } else {
        this.pageBody1.pageList = []
        if (page > this.pageBody1.pages - 2) {
          for (
            let i = this.pageBody1.pages - 5;
            i < this.pageBody1.pages;
            i++
          ) {
            this.pageBody1.pageList.push(i + 1)
          }
          if (this.pageBody1.pages == page) {
            for (let i = (page - 1) * 5; i < this.attendanceList.length; i++) {
              this.attendanceList1.push(this.attendanceList[i])
            }
          } else {
            for (let i = (page - 1) * 5; i < page * 5; i++) {
              this.attendanceList1.push(this.attendanceList[i])
            }
          }
        } else if (page <= 2) {
          for (let i = 0; i < 5; i++) {
            this.pageBody1.pageList.push(i + 1)
          }
          for (let i = (page - 1) * 5; i < page * 5; i++) {
            this.attendanceList1.push(this.attendanceList[i])
          }
        } else {
          for (let i = page - 2; i <= page + 2; i++) {
            this.pageBody1.pageList.push(i)
          }
          for (let i = (page - 1) * 5; i < page * 5; i++) {
            this.attendanceList1.push(this.attendanceList[i])
          }
        }
      }
      this.pageBody1.page = page
    },

    getAttendanceStatusClass(workingHours) {
      if (workingHours >= 8) {
        return 'bg-success'
      } else if (workingHours >= 4) {
        return 'bg-warning'
      } else if (workingHours > 0) {
        return 'bg-info'
      } else {
        return 'bg-danger'
      }
    },

    getAttendanceStatusText(workingHours) {
      if (workingHours >= 8) {
        return '正常'
      } else if (workingHours >= 4) {
        return '半天'
      } else if (workingHours > 0) {
        return '短时'
      } else {
        return '缺勤'
      }
    },

    formatDate(date) {
      if (!date) return ''
      const d = new Date(date)
      return `${d.getFullYear()}年${(d.getMonth() + 1).toString().padStart(2, '0')}月${d.getDate().toString().padStart(2, '0')}日`
    },

    animatePageEntry() {
      const container = document.querySelector('.container')
      if (container) {
        container.style.opacity = '0'
        container.style.transform = 'translateY(20px)'
        container.style.transition = 'all 0.6s ease'

        setTimeout(() => {
          container.style.opacity = '1'
          container.style.transform = 'translateY(0)'
        }, 100)
      }
    },

    showToast(message, type = 'info') {
      const toastContainer = document.querySelector('.toast-container') || this.createToastContainer()
      
      const toast = document.createElement('div')
      toast.className = 'toast align-items-center text-white border-0'
      toast.classList.add(`bg-${type}`)
      toast.setAttribute('role', 'alert')
      toast.setAttribute('aria-live', 'assertive')
      toast.setAttribute('aria-atomic', 'true')
      
      toast.innerHTML = `
        <div class="d-flex">
          <div class="toast-body">
            <i class="bi bi-${this.getToastIcon(type)} me-2"></i>${message}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      `
      
      toastContainer.appendChild(toast)
      
      const bsToast = new bootstrap.Toast(toast, {
        autohide: true,
        delay: 3000
      })
      
      bsToast.show()
      
      toast.addEventListener('hidden.bs.toast', () => {
        toastContainer.removeChild(toast)
      })
    },

    createToastContainer() {
      const container = document.createElement('div')
      container.className = 'toast-container position-fixed top-0 end-0 p-3'
      container.style.zIndex = '9999'
      document.body.appendChild(container)
      return container
    },

    getToastIcon(type) {
      switch (type) {
        case 'success':
          return 'check-circle-fill'
        case 'danger':
          return 'exclamation-triangle-fill'
        case 'warning':
          return 'exclamation-triangle-fill'
        case 'info':
          return 'info-circle-fill'
        default:
          return 'info-circle-fill'
      }
    }
  }
}
</script>

<style scoped>
.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.form-control-farm {
  border: 2px solid var(--farm-primary-light);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.form-control-farm:focus {
  border-color: var(--farm-primary);
  box-shadow: 0 0 0 0.2rem rgba(76, 175, 80, 0.25);
}

.table-farm tbody tr:hover {
  background-color: rgba(76, 175, 80, 0.1);
  transform: translateY(-1px);
  transition: all 0.2s ease;
}
</style>
