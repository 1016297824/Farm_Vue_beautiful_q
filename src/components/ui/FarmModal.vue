// 农场主题模态框组件 - 替代 Element UI Dialog
<template>
  <div v-if="visible" class="farm-modal-overlay" @click="handleOverlayClick">
    <div class="farm-modal" :class="modalClasses" @click.stop>
      <!-- 模态框头部 -->
      <div class="farm-modal-header" v-if="title || $slots.header">
        <slot name="header">
          <h4 class="farm-modal-title">
            <i v-if="icon" :class="icon" class="me-2"></i>
            {{ title }}
          </h4>
        </slot>
        <button
          v-if="closable"
          type="button"
          class="farm-modal-close"
          @click="handleClose"
        >
          <i class="bi bi-x-lg"></i>
        </button>
      </div>

      <!-- 模态框内容 -->
      <div class="farm-modal-body">
        <slot></slot>
      </div>

      <!-- 模态框底部 -->
      <div class="farm-modal-footer" v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FarmModal",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "md", // sm, md, lg, xl
      validator: value => ["sm", "md", "lg", "xl"].includes(value)
    },
    closable: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    destroyOnClose: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    modalClasses() {
      return [`farm-modal--${this.size}`];
    }
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          document.body.style.overflow = "hidden";
        });
      } else {
        document.body.style.overflow = "";
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit("update:visible", false);
      this.$emit("close");
    },
    handleOverlayClick() {
      if (this.maskClosable) {
        this.handleClose();
      }
    }
  },
  beforeDestroy() {
    document.body.style.overflow = "";
  }
};
</script>

<style scoped>
/* 模态框遮罩层 */
.farm-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
  animation: fadeIn 0.3s ease;
}

/* 模态框主体 */
.farm-modal {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.2);
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s ease;
  border: 1px solid var(--farm-green-200);
}

/* 模态框尺寸 */
.farm-modal--sm {
  width: 100%;
  max-width: 400px;
}

.farm-modal--md {
  width: 100%;
  max-width: 600px;
}

.farm-modal--lg {
  width: 100%;
  max-width: 800px;
}

.farm-modal--xl {
  width: 100%;
  max-width: 1200px;
}

/* 模态框头部 */
.farm-modal-header {
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid var(--farm-green-100);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--farm-green-50);
}

.farm-modal-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--farm-green-700);
  display: flex;
  align-items: center;
}

.farm-modal-close {
  background: none;
  border: none;
  color: var(--farm-green-600);
  font-size: 1.2rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
}

.farm-modal-close:hover {
  background: var(--farm-green-100);
  color: var(--farm-green-700);
}

/* 模态框内容 */
.farm-modal-body {
  padding: 1.5rem;
  flex: 1;
  overflow-y: auto;
}

/* 模态框底部 */
.farm-modal-footer {
  padding: 1rem 1.5rem 1.5rem;
  border-top: 1px solid var(--farm-green-100);
  background: var(--farm-green-25);
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .farm-modal-overlay {
    padding: 0.5rem;
  }

  .farm-modal {
    max-height: 95vh;
    border-radius: 0.75rem;
  }

  .farm-modal-header {
    padding: 1rem 1rem 0.75rem;
  }

  .farm-modal-title {
    font-size: 1.125rem;
  }

  .farm-modal-body {
    padding: 1rem;
  }

  .farm-modal-footer {
    padding: 0.75rem 1rem 1rem;
    flex-direction: column;
  }

  .farm-modal--sm,
  .farm-modal--md,
  .farm-modal--lg,
  .farm-modal--xl {
    max-width: none;
    width: 100%;
  }
}

/* 滚动条样式 */
.farm-modal-body::-webkit-scrollbar {
  width: 6px;
}

.farm-modal-body::-webkit-scrollbar-track {
  background: var(--farm-green-50);
  border-radius: 3px;
}

.farm-modal-body::-webkit-scrollbar-thumb {
  background: var(--farm-green-300);
  border-radius: 3px;
}

.farm-modal-body::-webkit-scrollbar-thumb:hover {
  background: var(--farm-green-400);
}
</style>
