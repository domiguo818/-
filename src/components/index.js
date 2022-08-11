import PageTools from "./PageTools";
const components = [PageTools];
export default {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component);
    });
  },
};
