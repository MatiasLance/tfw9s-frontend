// This plugin will be imported only when color pickers are needed
const ChromePicker = () => import('vue-color/components/chrome/Chrome.vue')
const PhotoshopPicker = () => import('vue-color/components/photoshop/Photoshop.vue')

export default {
  install(Vue) {
    Vue.component('ChromePicker', ChromePicker)
    Vue.component('PhotoshopPicker', PhotoshopPicker)
  }
}