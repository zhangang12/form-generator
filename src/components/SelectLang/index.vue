
<template>
    <a-dropdown
        placement="bottomRight"
    >
        <a-space>
            <Icon name="global-outlined" />
            {{currentLang}}
        </a-space>
        <template #overlay>
            <a-menu class="menu ant-pro-header-menu">
                <a-menu-item @click="changeLang('zh-CN')">
                    <span role="img" aria-label="简体中文">{{languageIcons['zh-CN']}}</span>{{' '}}简体中文
                </a-menu-item>
                <a-menu-item @click="changeLang('en-US')">
                    <span role="img" aria-label="English">{{languageIcons['en-US']}}</span>{{' '}}English
                </a-menu-item>
            </a-menu>
        </template>
    </a-dropdown>
</template>
<script>
import { defineComponent, reactive, toRefs, onMounted, getCurrentInstance } from 'vue'
import Icon from '@/components/IconSelector/indexEx'
export default defineComponent({
    components: {
        Icon
    },
    setup(props, context){

        let $i18n = null

        let languageLabels = {
            'zh-CN': '简体中文',
            'en-US': 'English'
        }

        let languageIcons = {
            'zh-CN': '🇨🇳',
            'en-US': '🇺🇸'
        }

        let ilang = 'zh-CN'

        const changeLang = lang => {
            data.currentLang = languageLabels[lang]
            $i18n.locale = lang
        }
        
        const data = reactive({
            currentLang: languageLabels[ilang],
            languageLabels,
            languageIcons
        })

        onMounted(() => {
            const { proxy } = getCurrentInstance()
            $i18n = proxy.$i18n
        })

        return {
            changeLang,
            ...toRefs(data)
        }
    }
})
</script>