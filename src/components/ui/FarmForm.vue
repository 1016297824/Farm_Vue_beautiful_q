// 农场主题表单组件 - 替代 Element UI Form
<template>
  <form class="farm-form" @submit.prevent="handleSubmit" :class="formClasses">
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: "FarmForm",
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    rules: {
      type: Object,
      default: () => ({})
    },
    inline: {
      type: Boolean,
      default: false
    },
    labelPosition: {
      type: String,
      default: "top", // top, left, right
      validator: value => ["top", "left", "right"].includes(value)
    },
    labelWidth: {
      type: String,
      default: "100px"
    },
    size: {
      type: String,
      default: "md", // sm, md, lg
      validator: value => ["sm", "md", "lg"].includes(value)
    }
  },
  computed: {
    formClasses() {
      return [
        {
          "farm-form--inline": this.inline,
          [`farm-form--label-${this.labelPosition}`]:
            this.labelPosition !== "top",
          [`farm-form--${this.size}`]: this.size !== "md"
        }
      ];
    }
  },
  data() {
    return {
      fields: []
    };
  },
  methods: {
    handleSubmit() {
      this.validate(valid => {
        if (valid) {
          this.$emit("submit", this.model);
        }
      });
    },

    validate(callback) {
      const promises = this.fields.map(field => field.validate());

      Promise.all(promises).then(results => {
        const valid = results.every(result => result.valid);
        const errors = results
          .filter(result => !result.valid)
          .map(result => result.message);

        if (callback) {
          callback(valid, errors);
        }

        return { valid, errors };
      });
    },

    validateField(prop) {
      const field = this.fields.find(f => f.prop === prop);
      if (field) {
        return field.validate();
      }
    },

    resetFields() {
      this.fields.forEach(field => {
        field.resetField();
      });
    },

    clearValidate(props) {
      if (props) {
        const propsArray = Array.isArray(props) ? props : [props];
        this.fields.forEach(field => {
          if (propsArray.includes(field.prop)) {
            field.clearValidate();
          }
        });
      } else {
        this.fields.forEach(field => {
          field.clearValidate();
        });
      }
    },

    addField(field) {
      this.fields.push(field);
    },

    removeField(field) {
      const index = this.fields.indexOf(field);
      if (index > -1) {
        this.fields.splice(index, 1);
      }
    }
  },
  provide() {
    return {
      farmForm: this
    };
  }
};
</script>

<style scoped>
/* 表单基础样式 */
.farm-form {
  width: 100%;
}

/* 内联表单 */
.farm-form--inline {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 1rem;
}

/* 标签位置 */
.farm-form--label-left {
  --label-position: left;
}

.farm-form--label-right {
  --label-position: right;
}

/* 表单尺寸 */
.farm-form--sm {
  font-size: 0.875rem;
}

.farm-form--lg {
  font-size: 1.125rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .farm-form--inline {
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style>
