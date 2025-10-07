// 农场主题UI组件库入口文件
import FarmModal from "./FarmModal.vue";
import FarmTable from "./FarmTable.vue";
import FarmForm from "./FarmForm.vue";
import FarmFormItem from "./FarmFormItem.vue";

const components = {
  FarmModal,
  FarmTable,
  FarmForm,
  FarmFormItem
};

const install = function(Vue) {
  // 遍历注册全局组件
  Object.keys(components).forEach(key => {
    const component = components[key];
    if (component && component.name) {
      Vue.component(component.name, component);
    }
  });
};

// 自动安装
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export { FarmModal, FarmTable, FarmForm, FarmFormItem };

export default {
  install,
  ...components
};
