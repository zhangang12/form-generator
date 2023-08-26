<template>
    <a-layout-header class="center-header">
        <a-button shape="circle" type="link" size="small" @click="run">
            <template #icon><IconContainer name="play-circle-outlined" /></template>
            {{ $t('base.run') }}
        </a-button>
        <a-divider type="vertical" />
            <a-button type="link" size="small" @click="showJson">
                <template #icon><IconContainer name="eye-outlined" /></template>
                {{ $t('base.view.json') }}
            </a-button>
        <a-divider type="vertical" />
            <a-button type="link" size="small" @click="download">
                <template #icon><IconContainer name="cloud-download-outlined" /></template>
                {{ $t('base.export.vue.file') }}
            </a-button>
        <a-divider type="vertical" />
            <a-button size="small" type="link" @click="copy">
                <template #icon><IconContainer name="copy-outlined" /></template>
                {{ $t('base.copy.code') }}
            </a-button>
        <a-divider type="vertical" />
            <a-button size="small" type="link" @click="empty">
                <template #icon><IconContainer name="delete-outlined" /></template>
                {{ $t('base.empty') }}
            </a-button>
        <select-lang class="select-lang-trigger" />
    </a-layout-header>
</template>
<script>
import SelectLang from '@/components/SelectLang/index.vue'
import IconContainer from '@/components/iconContainer'
import { Modal } from 'ant-design-vue'
export default {
    emits: ['cleanComponent','showJsonDrawer'],
    components: {
        IconContainer,
        SelectLang
    },
    setup(props, context){

        const run = () => {}

        const showJson = () => {
            context.emit('showJsonDrawer')
        }

        const download = () => {}

        const copy = () => {}

        const empty = () => {
            Modal.confirm({
                content: '确定请空所有组件',
                cancelText: '取消',
                okText: '确定',
                onOk(){
                    context.emit('cleanComponent')
                }
            })
        }

        return {
            run,
            showJson,
            download,
            copy,
            empty
        }
    }
}
</script>