import { createApp } from 'vue'
import { createRouter, createWebHashHistory, useRouter, useRoute } from 'vue-router'
import routes from '@/router'
import App from './App.vue'
import i18n from '@/locales'
import Antdv from 'ant-design-vue'
import '@/styles/index.scss'
import 'ant-design-vue/dist/antd.css'

import ItemIcon from '@/component/itemIcon'
import Icon from '@/component/icon'

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

window.vm = createApp(App)
vm.config.globalProperties.$router = useRouter()
vm.config.globalProperties.$route = useRoute()
vm.use(router).use(Antdv).use(i18n)
.component('ItemIcon', ItemIcon)
.component('Icon', Icon)
.mount('#app')
