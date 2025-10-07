// Bootstrap 5 工具类 - 替代 jQuery 操作
import { Modal, Toast, Tooltip, Dropdown } from "bootstrap";

/**
 * Bootstrap 5 模态框工具类
 */
export class ModalUtils {
  /**
   * 显示模态框
   * @param {string} modalId - 模态框ID（不包含#）
   */
  static show(modalId) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = Modal.getOrCreateInstance(modalElement);
      modal.show();
    } else {
      console.error(`Modal with id "${modalId}" not found`);
    }
  }

  /**
   * 隐藏模态框
   * @param {string} modalId - 模态框ID（不包含#）
   */
  static hide(modalId) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    } else {
      console.error(`Modal with id "${modalId}" not found`);
    }
  }

  /**
   * 切换模态框显示状态
   * @param {string} modalId - 模态框ID（不包含#）
   */
  static toggle(modalId) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = Modal.getOrCreateInstance(modalElement);
      modal.toggle();
    } else {
      console.error(`Modal with id "${modalId}" not found`);
    }
  }

  /**
   * 销毁模态框实例
   * @param {string} modalId - 模态框ID（不包含#）
   */
  static dispose(modalId) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = Modal.getInstance(modalElement);
      if (modal) {
        modal.dispose();
      }
    }
  }
}

/**
 * Bootstrap 5 Toast 工具类
 */
export class ToastUtils {
  /**
   * 显示成功消息
   * @param {string} message - 消息内容
   * @param {number} delay - 延迟时间（毫秒）
   */
  static success(message, delay = 5000) {
    this.show(message, "success", delay);
  }

  /**
   * 显示错误消息
   * @param {string} message - 消息内容
   * @param {number} delay - 延迟时间（毫秒）
   */
  static error(message, delay = 5000) {
    this.show(message, "danger", delay);
  }

  /**
   * 显示警告消息
   * @param {string} message - 消息内容
   * @param {number} delay - 延迟时间（毫秒）
   */
  static warning(message, delay = 5000) {
    this.show(message, "warning", delay);
  }

  /**
   * 显示信息消息
   * @param {string} message - 消息内容
   * @param {number} delay - 延迟时间（毫秒）
   */
  static info(message, delay = 5000) {
    this.show(message, "info", delay);
  }

  /**
   * 显示Toast消息
   * @param {string} message - 消息内容
   * @param {string} type - 消息类型 (success, danger, warning, info)
   * @param {number} delay - 延迟时间（毫秒）
   */
  static show(message, type = "info", delay = 5000) {
    const toastContainer = this.getOrCreateContainer();

    const toastEl = document.createElement("div");
    toastEl.className = `toast align-items-center text-white bg-${type} border-0`;
    toastEl.setAttribute("role", "alert");
    toastEl.setAttribute("aria-live", "assertive");
    toastEl.setAttribute("aria-atomic", "true");
    toastEl.setAttribute("data-bs-delay", delay);

    const iconMap = {
      success: "bi-check-circle",
      danger: "bi-exclamation-circle",
      warning: "bi-exclamation-triangle",
      info: "bi-info-circle"
    };

    toastEl.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">
          <i class="bi ${iconMap[type]} me-2"></i>${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    `;

    toastContainer.appendChild(toastEl);

    const toast = new Toast(toastEl);
    toast.show();

    // 自动移除DOM元素
    toastEl.addEventListener("hidden.bs.toast", () => {
      toastEl.remove();
    });
  }

  /**
   * 获取或创建Toast容器
   */
  static getOrCreateContainer() {
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container position-fixed top-0 end-0 p-3";
      container.style.zIndex = "9999";
      document.body.appendChild(container);
    }
    return container;
  }
}

/**
 * Bootstrap 5 Tooltip 工具类
 */
export class TooltipUtils {
  /**
   * 初始化所有tooltip
   * @param {string} selector - 选择器，默认为 [data-bs-toggle="tooltip"]
   */
  static initAll(selector = '[data-bs-toggle="tooltip"]') {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll(selector)
    );
    tooltipTriggerList.map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl));
  }

  /**
   * 初始化单个tooltip
   * @param {string|Element} element - 元素或选择器
   */
  static init(element) {
    const el =
      typeof element === "string" ? document.querySelector(element) : element;
    if (el) {
      return new Tooltip(el);
    }
  }

  /**
   * 销毁tooltip
   * @param {string|Element} element - 元素或选择器
   */
  static dispose(element) {
    const el =
      typeof element === "string" ? document.querySelector(element) : element;
    if (el) {
      const tooltip = Tooltip.getInstance(el);
      if (tooltip) {
        tooltip.dispose();
      }
    }
  }
}

/**
 * Bootstrap 5 Dropdown 工具类
 */
export class DropdownUtils {
  /**
   * 显示下拉菜单
   * @param {string|Element} element - 触发元素或选择器
   */
  static show(element) {
    const el =
      typeof element === "string" ? document.querySelector(element) : element;
    if (el) {
      const dropdown = Dropdown.getOrCreateInstance(el);
      dropdown.show();
    }
  }

  /**
   * 隐藏下拉菜单
   * @param {string|Element} element - 触发元素或选择器
   */
  static hide(element) {
    const el =
      typeof element === "string" ? document.querySelector(element) : element;
    if (el) {
      const dropdown = Dropdown.getInstance(el);
      if (dropdown) {
        dropdown.hide();
      }
    }
  }

  /**
   * 切换下拉菜单
   * @param {string|Element} element - 触发元素或选择器
   */
  static toggle(element) {
    const el =
      typeof element === "string" ? document.querySelector(element) : element;
    if (el) {
      const dropdown = Dropdown.getOrCreateInstance(el);
      dropdown.toggle();
    }
  }
}

/**
 * 通用DOM操作工具类
 */
export class DOMUtils {
  /**
   * 添加类名
   * @param {string|Element} element - 元素或选择器
   * @param {string} className - 类名
   */
  static addClass(element, className) {
    const el =
      typeof element === "string" ? document.querySelector(element) : element;
    if (el) {
      el.classList.add(className);
    }
  }

  /**
   * 移除类名
   * @param {string|Element} element - 元素或选择器
   * @param {string} className - 类名
   */
  static removeClass(element, className) {
    const el =
      typeof element === "string" ? document.querySelector(element) : element;
    if (el) {
      el.classList.remove(className);
    }
  }

  /**
   * 切换类名
   * @param {string|Element} element - 元素或选择器
   * @param {string} className - 类名
   */
  static toggleClass(element, className) {
    const el =
      typeof element === "string" ? document.querySelector(element) : element;
    if (el) {
      el.classList.toggle(className);
    }
  }

  /**
   * 设置样式
   * @param {string|Element} element - 元素或选择器
   * @param {Object} styles - 样式对象
   */
  static setStyles(element, styles) {
    const el =
      typeof element === "string" ? document.querySelector(element) : element;
    if (el) {
      Object.assign(el.style, styles);
    }
  }

  /**
   * 获取元素
   * @param {string} selector - 选择器
   * @returns {Element|null}
   */
  static $(selector) {
    return document.querySelector(selector);
  }

  /**
   * 获取所有匹配元素
   * @param {string} selector - 选择器
   * @returns {NodeList}
   */
  static $$(selector) {
    return document.querySelectorAll(selector);
  }
}

// 全局导出，方便替换jQuery的$函数
export const $ = DOMUtils.$;

// 默认导出所有工具类
export default {
  Modal: ModalUtils,
  Toast: ToastUtils,
  Tooltip: TooltipUtils,
  Dropdown: DropdownUtils,
  DOM: DOMUtils,
  $: DOMUtils.$
};
