<template>
  <div
    class="farm-form-item"
    :class="[
      {
        'has-error': validateStatus === 'error',
        'has-success': validateStatus === 'success',
        'has-warning': validateStatus === 'warning',
        'is-required': required,
        'is-inline': inline
      },
      size ? `farm-form-item--${size}` : '',
      labelPosition ? `farm-form-item--label-${labelPosition}` : ''
    ]"
  >
    <!-- 标签部分 -->
    <label
      v-if="label || $slots.label"
      class="farm-form-label"
      :for="labelFor"
      :style="labelStyle"
    >
      <slot name="label">{{ label }}</slot>
      <span v-if="required" class="required-mark">*</span>
    </label>

    <!-- 内容部分 -->
    <div class="farm-form-content" :style="contentStyle">
      <slot></slot>

      <!-- 错误信息 -->
      <div
        v-if="validateStatus === 'error' && errorMessage"
        class="farm-form-error"
      >
        <i class="bi bi-exclamation-circle"></i>
        {{ errorMessage }}
      </div>

      <!-- 帮助文本 -->
      <div v-if="helpText" class="farm-form-help">
        {{ helpText }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FarmFormItem",
  props: {
    // 标签文本
    label: {
      type: String,
      default: ""
    },
    // 标签for属性
    labelFor: {
      type: String,
      default: ""
    },
    // 标签宽度
    labelWidth: {
      type: [String, Number],
      default: ""
    },
    // 标签位置：left, right, top
    labelPosition: {
      type: String,
      default: "top",
      validator: value => ["left", "right", "top"].includes(value)
    },
    // 是否必填
    required: {
      type: Boolean,
      default: false
    },
    // 验证状态：success, warning, error
    validateStatus: {
      type: String,
      default: "",
      validator: value => ["", "success", "warning", "error"].includes(value)
    },
    // 错误信息
    errorMessage: {
      type: String,
      default: ""
    },
    // 帮助文本
    helpText: {
      type: String,
      default: ""
    },
    // 表单项尺寸：small, medium, large
    size: {
      type: String,
      default: "medium",
      validator: value => ["small", "medium", "large"].includes(value)
    },
    // 是否内联显示
    inline: {
      type: Boolean,
      default: false
    },
    // 内容区域样式
    contentStyle: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    labelStyle() {
      const style = {};
      if (this.labelWidth) {
        style.width =
          typeof this.labelWidth === "number"
            ? `${this.labelWidth}px`
            : this.labelWidth;
      }
      return style;
    }
  },
  mounted() {
    // 添加入场动画
    this.$nextTick(() => {
      this.$el.style.animation = "fadeInUp 0.3s ease-out";
    });
  },
  methods: {
    // 验证方法
    validate() {
      // 触发验证逻辑
      this.$emit("validate");
    },

    // 清除验证
    clearValidate() {
      this.$emit("clear-validate");
    }
  }
};
</script>

<style lang="scss" scoped>
/* 表单项基础样式 */
.farm-form-item {
  margin-bottom: 1.5rem;
  position: relative;
}

/* 标签样式 */
.farm-form-label {
  display: block;
  font-weight: 600;
  color: var(--farm-text-primary);
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.4;

  .required-mark {
    color: var(--farm-danger);
    margin-left: 0.25rem;
  }
}

/* 内容容器 */
.farm-form-content {
  position: relative;
}

/* 错误信息 */
.farm-form-error {
  color: var(--farm-danger);
  font-size: 0.75rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

/* 帮助文本 */
.farm-form-help {
  color: var(--farm-text-secondary);
  font-size: 0.75rem;
  margin-top: 0.25rem;
  line-height: 1.4;
}

/* 验证状态样式 */
.farm-form-item.has-error {
  .farm-form-label {
    color: var(--farm-danger);
  }
}

/* 标签位置 - 左侧 */
.farm-form-item--label-left {
  display: flex;
  align-items: flex-start;
  gap: 1rem;

  .farm-form-label {
    flex-shrink: 0;
    margin-bottom: 0;
    padding-top: 0.5rem;
  }

  .farm-form-content {
    flex: 1;
  }
}

/* 标签位置 - 右侧 */
.farm-form-item--label-right {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  flex-direction: row-reverse;

  .farm-form-label {
    flex-shrink: 0;
    margin-bottom: 0;
    padding-top: 0.5rem;
    text-align: right;
  }

  .farm-form-content {
    flex: 1;
  }
}

/* 表单项尺寸 */
.farm-form-item--small {
  margin-bottom: 1rem;

  .farm-form-label {
    font-size: 0.75rem;
    margin-bottom: 0.25rem;
  }
}

.farm-form-item--large {
  margin-bottom: 2rem;

  .farm-form-label {
    font-size: 1rem;
    margin-bottom: 0.75rem;
  }
}

/* 内联表单项 */
.farm-form-item.is-inline {
  display: inline-block;
  margin-right: 1rem;
  margin-bottom: 1rem;
  vertical-align: top;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .farm-form-item--label-left,
  .farm-form-item--label-right {
    flex-direction: column;
    gap: 0.5rem;
  }

  .farm-form-item--label-right .farm-form-label {
    text-align: left;
  }

  .farm-form--inline .farm-form-item {
    display: block;
    margin-right: 0;
    margin-bottom: 1rem;
  }
}

/* 动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
