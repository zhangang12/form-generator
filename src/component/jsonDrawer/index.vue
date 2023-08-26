<template>
    <a-drawer
        :visible="jsonDrawerVisible"
        width="45%"
        :body-style="{ padding: '0px' }"
        :closable="false"
    >
        <a-spin tip="Loading..." :spinning="loading">
            <div id="editorJson" class="json-editor"></div>
            <div
            :style="{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                borderTop: '1px solid #e8e8e8',
                padding: '5px 10px',
                textAlign: 'right',
                left: 0,
                background: '#fff',
                borderRadius: '0 0 4px 4px',
            }"
            >
                <a-button type="dashed" style="marginRight: 8px" @click="refresh">
                    <template #icon>
                        <Icon name="reload" />
                    </template>
                    {{ $t('base.refresh') }}
                </a-button>
                <a-button type="primary" class="copy-json-btn" style="marginRight: 8px">
                    <template #icon>
                        <Icon name="copy" />
                    </template>
                    {{ $t('base.copy.json.code') }}
                </a-button>
                <a-button
                    type="primary"
                    style="marginRight: 8px"
                    @click="openExportModal"
                >
                    <template #icon>
                        <Icon name="cloud-download" />
                    </template>
                    {{ $t('base.export.json.file') }}
                </a-button>
                <a-button @click="onClose">
                    <template #icon>
                        <Icon name="close" />
                    </template>
                    {{ $t('base.close') }}
                </a-button>
            </div>
        </a-spin>
    </a-drawer>
    <export-modal ref="exportModal" @confirm="exportModalConform" />
</template>
<script>
import { reactive, toRefs, onMounted, nextTick, getCurrentInstance } from 'vue'
import ClipboardJS from 'clipboard'
import { saveAs } from 'file-saver'
import exportModal from './exportModal'
export default {
    emits: ['updateConf'],
    components: {
        exportModal
    },
    setup(props, ctx){
        let editor
        const { proxy } = getCurrentInstance()
        const data = reactive({
            jsonDrawerVisible: false,
            loading: true
        })

        onMounted(() => {
            const clipboard = new ClipboardJS('.copy-json-btn', {
                text: trigger => {
                    let editor = getEditor()
                    proxy.$notification.success({
                        message: proxy.$t('base.successfully'),
                        description: proxy.$t('base.code.copy.successfully')
                    })
                    return editor.getValue()
                }
            })
            clipboard.on('error', e => {
                proxy.$message.error(proxy.$t('base.code.copy.failed'))
            })
        })

        const getEditor = () => {
            if(editor){
                return editor
            }
            editor = window.monaco.editor.create(
                document.getElementById('editorJson'),{
                    theme: 'vs-dark',
                    language: 'json',
                    automaticLayout: true
                }
            )
            return editor
        }

        const setEditorValue = (codeStr) => {
            let btfCode = beautifier.js(codeStr)
            let editor = getEditor()
            editor.setValue(btfCode)
        }

        const onClose = () => {
            data.jsonDrawerVisible = false
        }

        const open = (config, fromRule) => {
            data.jsonDrawerVisible = true
            nextTick(() => {
                setEditorValue(JSON.stringify({fields:config, ...fromRule}))
                data.loading = false
            })
        }

        const refresh = () => {
            let editor = getEditor()
            let { fields, ...other } = JSON.parse(editor.getValue())
            ctx.emit('updateConf', { fields, formRule: other })
        }

        const openExportModal = () => {
            proxy.$refs.exportModal.onOpen()
        }

        const exportJsonFile = (fileName) => {
            if (!fileName) fileName = `${+new Date()}.json`
            const codeStr = getEditor().getValue()
            const blob = new Blob([codeStr], { type: 'text/plain;charset=utf-8' })
            saveAs(blob, fileName)
        }

        const exportModalConform = (fileName) => {
            exportJsonFile(fileName)
        }

        return {
            open,
            refresh,
            onClose,
            exportModalConform,
            openExportModal,
            ...toRefs(data)
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/styles/mixin.scss';

@include action-bar;

.json-editor{
  height: 100vh;
}
</style>