<template>
    <a-config-provider :locale="locale">
        <router-view></router-view>
    </a-config-provider>
</template>
<script>
import { onMounted, reactive, toRefs } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
export default {
    setup(){
        const data = reactive({
            locale: zhCN
        })
        onMounted(() => {
            document.body.ondrop = event => {
                event.preventDefault()
                event.stopPropagation()
            }
        })

        return { ...toRefs(data) }
    }
}
</script>
