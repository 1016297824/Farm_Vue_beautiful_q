<template>
  <div>
    <!-- Alert Dialog Modal -->
    <div
      class="modal fade"
      id="alertDialog"
      tabindex="-1"
      aria-labelledby="alertDialogLabel"
      aria-hidden="true"
      ref="alertDialog"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header" :class="headerClass">
            <h5 class="modal-title" id="alertDialogLabel">
              <i :class="iconClass"></i>
              {{ title }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              v-if="closable"
            ></button>
          </div>
          <div class="modal-body">
            <p class="mb-0">{{ message }}</p>
          </div>
          <div class="modal-footer" v-if="showFooter">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              v-if="showCancelButton"
            >
              {{ cancelButtonText }}
            </button>
            <button
              type="button"
              class="btn"
              :class="confirmButtonClass"
              @click="handleConfirm"
              data-bs-dismiss="modal"
            >
              {{ confirmButtonText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "@/util/Bus";
import { Modal } from "bootstrap";

export default {
  name: "AlertDialog",
  data() {
    return {
      title: "提示",
      message: "",
      type: "info", // info, success, warning, error
      closable: true,
      showFooter: true,
      showCancelButton: false,
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      onConfirm: null,
      modalInstance: null
    };
  },
  computed: {
    headerClass() {
      const classes = {
        info: "bg-primary text-white",
        success: "bg-success text-white",
        warning: "bg-warning text-dark",
        error: "bg-danger text-white"
      };
      return classes[this.type] || classes.info;
    },
    iconClass() {
      const icons = {
        info: "bi bi-info-circle me-2",
        success: "bi bi-check-circle me-2",
        warning: "bi bi-exclamation-triangle me-2",
        error: "bi bi-exclamation-circle me-2"
      };
      return icons[this.type] || icons.info;
    },
    confirmButtonClass() {
      const classes = {
        info: "btn-primary",
        success: "btn-success",
        warning: "btn-warning",
        error: "btn-danger"
      };
      return classes[this.type] || classes.info;
    }
  },
  methods: {
    show(options = {}) {
      // 更新配置
      this.title = options.title || this.title;
      this.message = options.message || this.message;
      this.type = options.type || this.type;
      this.closable =
        options.closable !== undefined ? options.closable : this.closable;
      this.showFooter =
        options.showFooter !== undefined ? options.showFooter : this.showFooter;
      this.showCancelButton = options.showCancelButton || this.showCancelButton;
      this.confirmButtonText =
        options.confirmButtonText || this.confirmButtonText;
      this.cancelButtonText = options.cancelButtonText || this.cancelButtonText;
      this.onConfirm = options.onConfirm || null;

      // 显示模态框
      this.$nextTick(() => {
        if (!this.modalInstance) {
          this.modalInstance = new Modal(this.$refs.alertDialog);
        }
        this.modalInstance.show();
      });
    },
    hide() {
      if (this.modalInstance) {
        this.modalInstance.hide();
      }
    },
    handleConfirm() {
      if (this.onConfirm && typeof this.onConfirm === "function") {
        this.onConfirm();
      }
    }
  },
  created() {
    // 监听全局错误消息
    bus.$on(bus.error, data => {
      this.show({
        title: "错误",
        message: data,
        type: "error"
      });
    });

    // 监听自定义alert事件
    bus.$on("alert", data => {
      this.show(data);
    });
  },
  mounted() {
    // 初始化模态框实例
    this.$nextTick(() => {
      if (this.$refs.alertDialog) {
        this.modalInstance = new Modal(this.$refs.alertDialog);
      }
    });
  },
  beforeDestroy() {
    bus.$off(bus.error);
    bus.$off("alert");
    if (this.modalInstance) {
      this.modalInstance.dispose();
    }
  }
};
</script>

<style scoped>
.modal-content {
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.modal-header {
  border-top-left-radius: calc(0.5rem - 1px);
  border-top-right-radius: calc(0.5rem - 1px);
}

.btn-close {
  filter: brightness(0) invert(1);
}

.btn-close:hover {
  opacity: 0.75;
}
</style>
