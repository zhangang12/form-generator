import { createApp } from 'vue'
import store from './store'
import axios from 'axios'
import Antdv from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import App from './App.vue'
import '@/styles/index.scss'
import Icon from '@/component/icon'
import 'ant-design-vue/dist/antd.css'

window.vm = createApp(App)
vm.config.globalProperties.$axios = axios
vm.use(Antdv).use(store)
.component('a-icon', Icon)
.mount('#previewApp')
