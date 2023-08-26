<template>
    <a-config-provider :locale="locale">
        <component :is="comp" />
    </a-config-provider>
</template>
<script>
import createComponent from './createComponent'
import { reactive, toRefs, computed, nextTick, watch } from 'vue'
import { useStore } from 'vuex'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
export default {
    setup(props, ctx){
        const data = reactive({
            comp: {},
            locale: zhCN
        })
        const store = useStore()
        const waitReload = computed(() => {
            return store.state.waitReload
        })

        watch(
            () => store.state.waitReload,
            (val) => {
                if(!val){
                    nextTick(() => {
                        store.commit('reload', true)
                    })
                }
            }
        )
        const renderComp = (options) => {
            if(options.data.type !== 'webpackOk'){
                data.comp = createComponent(options.data)
            }
        }
        window.addEventListener('message', renderComp, false)
        return {
            waitReload,
            ...toRefs(data)
        }

    }
}
</script>