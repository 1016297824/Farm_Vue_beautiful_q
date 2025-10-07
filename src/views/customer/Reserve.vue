// 顾客预定 - 绿色主题
<template>
  <div class="container py-8">
    <!-- 主体 -->
    <div class="row">
      <div class="col-lg-12">
        <div class="col-lg-8 m-auto">
          <div class="farm-card p-6 transform transition-all duration-500 hover:shadow-xl">
            <!-- 标题栏 -->
            <div class="flex items-center justify-between mb-6">
              <h2 class="farm-title text-xl md:text-2xl font-bold">
                <i class="fas fa-calendar-alt mr-2 text-green-600"></i>我的订单
              </h2>
              <button
                type="button"
                class="farm-btn farm-btn-primary flex items-center shadow-lg hover:shadow-xl transform transition-all duration-300"
                @click="addReserve"
              >
                <i class="fas fa-plus mr-2"></i>添加订单
              </button>
            </div>
            
            <!-- 表格 -->
            <div class="overflow-x-auto">
              <table class="farm-table w-full">
                <thead>
                  <tr class="bg-green-50">
                    <th class="py-3 px-4 text-left text-green-700 font-medium rounded-tl-lg">
                      订单号
                    </th>
                    <th class="py-3 px-4 text-left text-green-700 font-medium">
                      桌位
                    </th>
                    <th class="py-3 px-4 text-left text-green-700 font-medium">
                      开始时间
                    </th>
                    <th class="py-3 px-4 text-left text-green-700 font-medium">
                      结束时间
                    </th>
                    <th class="py-3 px-4 text-left text-green-700 font-medium rounded-tr-lg">
                      下单时间
                    </th>
                  </tr>
                </thead>
                <tbody v-if="reserveList && reserveList.length > 0">
                  <tr v-for="(reserve, index) in reserveList" :key="index" class="border-b border-gray-100 hover:bg-green-50/50 transition-colors duration-200">
                    <td class="py-3 px-4 text-gray-700 font-medium">
                      {{ reserve.no }}
                    </td>
                    <td class="py-3 px-4 text-gray-600">
                      {{ reserve.diningTable.id }}
                    </td>
                    <td class="py-3 px-4 text-gray-600">
                      {{ reserve.startTime | formatDate }}
                    </td>
                    <td class="py-3 px-4 text-gray-600">
                      {{ reserve.endTime | formatDate }}
                    </td>
                    <td class="py-3 px-4 text-gray-500 text-sm">
                      {{ reserve.insertTime | formatDate }}
                    </td>
                  </tr>
                </tbody>
                <tbody v-else-if="reserveList !== null">
                  <tr>
                    <td colspan="5" class="py-12 text-center">
                      <div class="flex flex-col items-center text-gray-500">
                        <i class="fas fa-calendar-check text-4xl mb-4 text-green-400"></i>
                        <p class="text-lg">暂无订单记录</p>
                        <p class="mt-2 text-sm">点击"添加订单"按钮开始您的预订</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- 加载状态 -->
            <div v-if="reserveList === null" class="py-12 text-center">
              <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
              <p class="mt-4 text-gray-500">加载订单中...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "@/util/Bus";
import { formatDate } from "@/assets/js/date";
import { getReserve, deleteReserve } from "@/api/customer";

export default {
  name: "Reserve",
  data: () => ({
    reserveList: null
  }),
  methods: {
    addReserve: function() {
      // 添加页面切换动画
      document.querySelector('.container').style.opacity = '0';
      document.querySelector('.container').style.transform = 'translateX(20px)';
      document.querySelector('.container').style.transition = 'all 0.3s ease';
      
      setTimeout(() => {
        this.$router.push("reserveAdd");
      }, 300);
    },
    deleteReserve(no) {
      let con = confirm(`取消订单：\n订单号：${no}`);
      if (con == true) {
        deleteReserve(no);
      }
    }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh : mm");
    }
  },
  created() {
    bus.$on(bus.reserveList, data => {
      // 添加数据加载动画
      this.reserveList = null;
      setTimeout(() => {
        this.reserveList = data;
      }, 500);
    });
  },
  mounted() {
    // 页面加载动画效果
    document.querySelector('.container').style.opacity = '0';
    document.querySelector('.container').style.transform = 'translateY(20px)';
    document.querySelector('.container').style.transition = 'all 0.6s ease';
    
    setTimeout(() => {
      document.querySelector('.container').style.opacity = '1';
      document.querySelector('.container').style.transform = 'translateY(0)';
      
      // 加载订单数据
      getReserve();
    }, 300);
  },
  beforeDestroy() {
    bus.$off(bus.reserveList);
  }
};
</script>

<style scoped>
/* 表格样式 */
.farm-table {
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .container {
    padding-top: 2rem !important;
    padding-bottom: 2rem !important;
  }
  
  .col-lg-8 {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }
  
  .farm-card {
    padding: 1.5rem !important;
  }
  
  .farm-title {
    font-size: 1.5rem !important;
  }
  
  .overflow-x-auto {
    -webkit-overflow-scrolling: touch;
  }
}

@media (max-width: 576px) {
  .flex.items-center.justify-between {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .farm-btn {
    width: 100%;
  }
  
  th, td {
    padding: 0.75rem 1rem !important;
  }
}
</style>
