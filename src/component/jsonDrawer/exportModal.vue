<template>
    <a-modal v-model:visible="visible"
        :title="$t('base.export.file')"
        @ok="handelConfirm"
        @cancel="close"
    >
        <a-form
            ref="elForm"
            :model="formData"
            :rules="rules"
            size="medium"
            label-width="100px"
        >
            <a-form-item :label="$t('base.filename')" name="fileName">
                <a-input v-model:value="formData.fileName" :placeholder="$t('base.enter')" allow-clear />
            </a-form-item>
        </a-form>
    </a-modal>
</template>
<script>
import { reactive, toRefs, getCurrentInstance } from 'vue'
export default {
    emits: ['confirm'],
    setup(props, ctx){
        const { proxy } = getCurrentInstance()
        const data = reactive({
            visible: false,
            formData: {
                fileName: undefined
            },
            rules: {
                fileName: [{
                    required: true,
                    message: `${proxy.$t('base.enter')}${proxy.$t('base.filename')}`,
                    trigger: 'blur'
                }]
            }
        })

        const onOpen = (suffix = 'json') => {
            data.visible = true
            data.formData.fileName = `${+new Date()}.${suffix}`
        }

        const handelConfirm = () => {
            proxy.$refs.elForm.validate().then(valid => {
                if (!valid) return
                ctx.emit('confirm', data.formData.fileName)
                close()
            })
        }

        const close = () => {
            data.visible = false
        }

        return {
            onOpen,
            handelConfirm,
            close,
            ...toRefs(data)
        }
    }
}
</script>