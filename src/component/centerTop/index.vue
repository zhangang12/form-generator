<template>
    <a-layout-header class="center-header">
        <a-button shape="circle" type="link" size="small" @click="run">
            <template #icon><Icon name="play-circle" /></template>
            {{ $t('base.run') }}
        </a-button>
        <a-divider type="vertical" />
            <a-button type="link" size="small" @click="showJson">
                <template #icon><Icon name="eye" /></template>
                {{ $t('base.view.json') }}
            </a-button>
        <a-divider type="vertical" />
            <a-button type="link" size="small" @click="download">
                <template #icon><Icon name="cloud-download" /></template>
                {{ $t('base.export.vue.file') }}
            </a-button>
        <a-divider type="vertical" />
            <a-button size="small" type="link" @click="copy">
                <template #icon><Icon name="copy" /></template>
                {{ $t('base.copy.code') }}
            </a-button>
        <a-divider type="vertical" />
            <a-button size="small" type="link" @click="empty">
                <template #icon><Icon name="delete-outlined" /></template>
                {{ $t('base.empty') }}
            </a-button>
        <select-lang class="select-lang-trigger" />
    </a-layout-header>
</template>
<script>
import { getCurrentInstance } from 'vue'
import SelectLang from '@/component/selectLang/index.vue'
import { Modal } from 'ant-design-vue'
export default {
    emits: ['cleanComponent','showJsonDrawer','showCodeTypeModal'],
    components: { SelectLang },
    setup(props, ctx){

        const { proxy } = getCurrentInstance()

        const run = () => {
            ctx.emit('showCodeTypeModal', 'run')
        }

        const showJson = () => {
            ctx.emit('showJsonDrawer')
        }

        const download = () => {
            ctx.emit('showCodeTypeModal','download', true)
        }

        const copy = () => {
            ctx.emit('showCodeTypeModal','copy')
        }

        const empty = () => {
            Modal.confirm({
                content: '确定请空所有组件',
                cancelText: '取消',
                okText: '确定',
                onOk(){
                    ctx.emit('cleanComponent')
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