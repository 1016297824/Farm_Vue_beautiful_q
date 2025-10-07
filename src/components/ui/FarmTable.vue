// 农场主题表格组件 - 替代 Element UI Table
<template>
  <div class="farm-table-wrapper">
    <!-- 表格头部操作区 -->
    <div class="farm-table-header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="farm-table-loading">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">加载中...</span>
      </div>
      <p class="mt-2 mb-0 text-muted">正在加载数据...</p>
    </div>

    <!-- 表格主体 -->
    <div v-else class="farm-table-container">
      <div class="table-responsive">
        <table class="table table-farm">
          <!-- 表头 -->
          <thead>
            <tr>
              <th
                v-for="column in columns"
                :key="column.prop"
                :style="{ width: column.width }"
                @click="handleSort(column)"
                :class="{
                  sortable: column.sortable,
                  'text-center': column.align === 'center',
                  'text-end': column.align === 'right'
                }"
              >
                {{ column.label }}
                <i
                  v-if="column.sortable"
                  class="bi ms-1"
                  :class="getSortIcon(column.prop)"
                ></i>
              </th>
              <th v-if="$slots.actions" class="text-center">操作</th>
            </tr>
          </thead>

          <!-- 表身 -->
          <tbody>
            <tr
              v-for="(row, index) in sortedData"
              :key="getRowKey(row, index)"
              @click="handleRowClick(row, index)"
              :class="{
                'table-row-selected': selectedRows.includes(row),
                'table-row-clickable': !!$listeners['row-click']
              }"
            >
              <td
                v-for="column in columns"
                :key="column.prop"
                :class="{
                  'text-center': column.align === 'center',
                  'text-end': column.align === 'right'
                }"
              >
                <!-- 自定义渲染 -->
                <slot
                  v-if="column.slot"
                  :name="column.slot"
                  :row="row"
                  :index="index"
                  :value="row[column.prop]"
                ></slot>
                <!-- 默认渲染 -->
                <span v-else>
                  {{ formatValue(row[column.prop], column) }}
                </span>
              </td>

              <!-- 操作列 -->
              <td v-if="$slots.actions" class="text-center">
                <slot name="actions" :row="row" :index="index"></slot>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 空数据提示 -->
      <div v-if="!sortedData.length" class="farm-table-empty">
        <div class="text-center py-5">
          <i class="bi bi-inbox display-1 text-muted mb-3"></i>
          <h5 class="text-muted">{{ emptyText }}</h5>
        </div>
      </div>
    </div>

    <!-- 分页器 -->
    <div class="farm-table-footer" v-if="pagination && sortedData.length">
      <nav aria-label="表格分页">
        <ul class="pagination pagination-farm justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" @click="changePage(currentPage - 1)">
              <i class="bi bi-chevron-left"></i>
            </a>
          </li>

          <li
            v-for="page in visiblePages"
            :key="page"
            class="page-item"
            :class="{ active: page === currentPage }"
          >
            <a class="page-link" @click="changePage(page)">{{ page }}</a>
          </li>

          <li
            class="page-item"
            :class="{ disabled: currentPage === totalPages }"
          >
            <a class="page-link" @click="changePage(currentPage + 1)">
              <i class="bi bi-chevron-right"></i>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "FarmTable",
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    stripe: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    },
    hover: {
      type: Boolean,
      default: true
    },
    pagination: {
      type: Boolean,
      default: false
    },
    pageSize: {
      type: Number,
      default: 10
    },
    emptyText: {
      type: String,
      default: "暂无数据"
    },
    rowKey: {
      type: [String, Function],
      default: "id"
    }
  },
  data() {
    return {
      currentPage: 1,
      selectedRows: [],
      sortColumn: "",
      sortOrder: ""
    };
  },
  computed: {
    sortedData() {
      let result = [...this.data];

      // 排序
      if (this.sortColumn && this.sortOrder) {
        result.sort((a, b) => {
          const aVal = a[this.sortColumn];
          const bVal = b[this.sortColumn];

          if (this.sortOrder === "asc") {
            return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
          } else {
            return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
          }
        });
      }

      // 分页
      if (this.pagination) {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        result = result.slice(start, end);
      }

      return result;
    },
    totalPages() {
      if (!this.pagination) return 1;
      return Math.ceil(this.data.length / this.pageSize);
    },
    visiblePages() {
      const total = this.totalPages;
      const current = this.currentPage;
      const delta = 2;

      let start = Math.max(1, current - delta);
      let end = Math.min(total, current + delta);

      if (end - start < 4 && total > 5) {
        if (start === 1) {
          end = Math.min(total, 5);
        } else if (end === total) {
          start = Math.max(1, total - 4);
        }
      }

      const pages = [];
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      return pages;
    }
  },
  methods: {
    handleSort(column) {
      if (!column.sortable) return;

      if (this.sortColumn === column.prop) {
        // 切换排序方向
        if (this.sortOrder === "asc") {
          this.sortOrder = "desc";
        } else if (this.sortOrder === "desc") {
          this.sortOrder = "";
          this.sortColumn = "";
        } else {
          this.sortOrder = "asc";
        }
      } else {
        this.sortColumn = column.prop;
        this.sortOrder = "asc";
      }

      this.$emit("sort-change", {
        column: column.prop,
        order: this.sortOrder
      });
    },
    getSortIcon(prop) {
      if (this.sortColumn !== prop) {
        return "bi-arrow-down-up";
      }
      return this.sortOrder === "asc" ? "bi-arrow-up" : "bi-arrow-down";
    },
    handleRowClick(row, index) {
      this.$emit("row-click", row, index);
    },
    getRowKey(row, index) {
      if (typeof this.rowKey === "function") {
        return this.rowKey(row, index);
      }
      return row[this.rowKey] || index;
    },
    formatValue(value, column) {
      if (column.formatter && typeof column.formatter === "function") {
        return column.formatter(value);
      }

      if (value === null || value === undefined) {
        return "--";
      }

      return value;
    },
    changePage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
      this.$emit("page-change", page);
    }
  }
};
</script>

<style scoped>
/* 表格包装器 */
.farm-table-wrapper {
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  border: 1px solid var(--farm-green-200);
}

/* 表格头部 */
.farm-table-header {
  padding: 1rem 1.5rem;
  background: var(--farm-green-50);
  border-bottom: 1px solid var(--farm-green-100);
}

/* 表格容器 */
.farm-table-container {
  position: relative;
}

/* 表格样式继承主题 */
.table-farm {
  margin: 0;
}

/* 可排序列样式 */
.sortable {
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease;
}

.sortable:hover {
  background-color: var(--farm-green-75);
}

/* 表格行样式 */
.table-row-clickable {
  cursor: pointer;
}

.table-row-clickable:hover {
  background-color: var(--farm-green-50) !important;
}

.table-row-selected {
  background-color: var(--farm-green-100) !important;
}

/* 加载状态 */
.farm-table-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: var(--farm-green-600);
}

/* 空数据状态 */
.farm-table-empty {
  background: var(--farm-green-25);
}

/* 表格底部 */
.farm-table-footer {
  padding: 1rem 1.5rem;
  background: var(--farm-green-25);
  border-top: 1px solid var(--farm-green-100);
}

/* 农场主题分页器 */
.pagination-farm .page-link {
  color: var(--farm-green-600);
  border-color: var(--farm-green-300);
  padding: 0.5rem 0.75rem;
  transition: all 0.2s ease;
}

.pagination-farm .page-link:hover {
  color: var(--farm-green-700);
  background-color: var(--farm-green-100);
  border-color: var(--farm-green-400);
}

.pagination-farm .page-item.active .page-link {
  background-color: var(--farm-green-500);
  border-color: var(--farm-green-500);
  color: white;
}

.pagination-farm .page-item.disabled .page-link {
  color: var(--farm-green-300);
  background-color: var(--farm-green-75);
  border-color: var(--farm-green-200);
  cursor: not-allowed;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .farm-table-header,
  .farm-table-footer {
    padding: 0.75rem 1rem;
  }

  .table-farm thead th,
  .table-farm tbody td {
    padding: 0.75rem 0.5rem;
    font-size: 0.875rem;
  }

  .pagination-farm {
    font-size: 0.875rem;
  }

  .pagination-farm .page-link {
    padding: 0.375rem 0.5rem;
  }
}

@media (max-width: 576px) {
  .farm-table-wrapper {
    border-radius: 0.75rem;
  }

  .table-farm thead th,
  .table-farm tbody td {
    padding: 0.5rem 0.25rem;
    font-size: 0.8rem;
  }

  .farm-table-header,
  .farm-table-footer {
    padding: 0.5rem 0.75rem;
  }
}
</style>
