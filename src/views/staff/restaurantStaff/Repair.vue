<template>
  <div>
    <!-- 导航栏 -->
    <restaurantStaffNavbar />

    <!-- 主体内容 -->
    <div class="container" style="padding-top: 100px; padding-bottom: 120px;">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="card-farm p-4">
            <!-- 页面标题 -->
            <div class="text-center mb-4">
              <h2 class="farm-title mb-2">
                <i class="bi bi-tools me-2"></i>{{ repair.repairType }}
              </h2>
              <p class="text-muted">报告设备故障或物品损坏情况</p>
            </div>

            <!-- 报修报损表单 -->
            <form @submit.prevent="submitRepair">
              <div class="mb-4">
                <label class="form-label-farm">
                  <i class="bi bi-tags me-1"></i>选择类型：
                </label>
                <select
                  class="form-select form-control-farm"
                  v-model="repair.repairType"
                >
                  <option
                    v-for="(rt, index) in repairType"
                    :key="index"
                    :value="rt"
                  >
                    {{ rt }}
                  </option>
                </select>
              </div>

              <div class="mb-4">
                <label class="form-label-farm">
                  <i class="bi bi-card-text me-1"></i
                  >{{ repair.repairType }}内容：
                </label>
                <textarea
                  class="form-control form-control-farm"
                  rows="4"
                  v-model="repair.content"
                  @keyup="contentWrite"
                  :placeholder="'请输入' + repair.repairType + '的具体内容'"
                ></textarea>
                <div class="form-text text-danger" v-if="repair1Message">
                  {{ repair1Message }}
                </div>
              </div>

              <div class="mb-4">
                <label class="form-label-farm">
                  <i class="bi bi-question-circle me-1"></i
                  >{{ repair.repairType }}原因：
                </label>
                <textarea
                  class="form-control form-control-farm"
                  rows="6"
                  v-model="repair.cause"
                  @keyup="causeWrite"
                  :placeholder="'请输入' + repair.repairType + '的可能原因'"
                ></textarea>
                <div class="form-text text-danger" v-if="repair2Message">
                  {{ repair2Message }}
                </div>
              </div>

              <div class="d-grid">
                <button type="submit" class="btn btn-farm-primary btn-lg">
                  <i class="bi bi-check-circle me-2"></i>提交{{
                    repair.repairType
                  }}
                </button>
              </div>
            </form>
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
import { submitRepair } from "@/api/restaurantStaff.js";
import restaurantStaffNavbar from "@/components/Header/RestaurantStaffNavbar.vue";
import footerNavbar from "@/components/FooterNavbar.vue";

export default {
  name: "Repair",
  components: {
    restaurantStaffNavbar,
    footerNavbar
  },
  data() {
    return {
      repairType: ["报修", "报损"],
      repair: {
        repairType: "报修",
        content: null,
        cause: null
      },
      repair1Message: null,
      repair2Message: null
    };
  },
  methods: {
    submitRepair() {
      // 重置错误信息
      this.repair1Message = null;
      this.repair2Message = null;

      // 验证输入
      if (!this.repair.content) {
        this.repair1Message = "请输入" + this.repair.repairType + "内容！";
        return;
      }

      if (!this.repair.cause) {
        this.repair2Message = "请输入" + this.repair.repairType + "原因！";
        return;
      }

      // 内容长度检查
      if (this.repair.content.length < 5) {
        this.repair1Message = this.repair.repairType + "内容不能少于5个字符！";
        return;
      }

      if (this.repair.cause.length < 10) {
        this.repair2Message = this.repair.repairType + "原因不能少于10个字符！";
        return;
      }

      submitRepair(this.repair);
    },
    contentWrite() {
      this.repair1Message = null;
    },
    causeWrite() {
      this.repair2Message = null;
    }
  },
  created() {
    bus.$on(bus.repair, data => {
      this.repair = data;
    });
  },
  beforeDestroy() {
    bus.$off(bus.repair);
  }
};
</script>

<style scoped>
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

.btn-farm-primary {
  background: linear-gradient(
    135deg,
    var(--farm-green),
    var(--farm-green-dark)
  );
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
}

.btn-farm-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(76, 175, 80, 0.4);
  background: linear-gradient(135deg, var(--farm-green-dark), #2e7d32);
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
