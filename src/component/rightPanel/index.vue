<template>
    <a-tabs v-model:activeKey="currentTab" class="right-header">
        <a-tab-pane key="field" :tab="$t('base.component.properties')" />
        <a-tab-pane key="form" :tab="$t('base.form.properties')" />
    </a-tabs>

    <a-tooltip>
        <template #title>
        {{ $t('base.component.doc') }}
        </template>
        <a class="document-link" target="_blank" :href="documentLink" :title="$t('base.component.doc')">
            <Icon name="link-outlined" />
        </a>
    </a-tooltip>

    <div class="right-main">
        <form-item 
            v-if="currentTab == 'field'"
            :activeItem="activeItem"
            @replaceComponent="replaceComponent"
        ></form-item>
        <form-ref :formRule="formRule" v-else-if="currentTab == 'form'"></form-ref>
    </div>

    <a-modal
        v-model:visible="selectIconModal"
        :footer="null"
        width="40%"
        :title="$t('base.icon.component')"
    >
        <iconSelector @ok="iconSelectHandle" />
    </a-modal>
</template>
<script>
import formRef from './form'
import formItem from './formItem'
import iconSelector from '../iconSelector/index.js'
import { reactive, toRefs, provide, nextTick } from 'vue'
export default {
    props: ['formRule','activeItem'],
    emits: ['replaceComponent'],
    components: {
        formRef,
        formItem,
        iconSelector
    },
    setup(props, ctx){
        let addIconPosition = null
        const data = reactive({
            selectIconModal: false,
            currentTab: 'field',
            documentLink: 'https://3x.antdv.com/docs/vue/introduce/',
        })

        const showIconSelectModal = (position) => {
            addIconPosition = position
            data.selectIconModal = true
        }

        const iconSelectHandle = (icon) => {
            if(props.activeItem.__slot__[addIconPosition] !==undefined){
                props.activeItem.__slot__[addIconPosition] = ''
                nextTick(() => {
                    props.activeItem.__slot__[addIconPosition] = icon
                })
            }else{
                
                props.activeItem['icon'] = ''
                nextTick(() => {
                    props.activeItem['icon'] = icon
                })
            }
            data.selectIconModal = false
        }

        const replaceComponent = (options) => ctx.emit('replaceComponent', options) 
        provide('showIconSelectModal', showIconSelectModal)

        return {
            replaceComponent,
            iconSelectHandle,
            ...toRefs(data)
        }
    }
}
</script>
<style lang="scss">
@import './style.scss';
</style>