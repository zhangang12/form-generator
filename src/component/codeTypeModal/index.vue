
<template>
    <a-modal
        v-model:visible="visible"
        :title="$t('base.choose.build.type')"
        width="500px"
    >
        <a-row :gutter="15">
            <a-form
                ref="elForm"
                :model="formData"
                :rules="rules"
                size="medium"
                label-width="100px"
            >
                <a-col :span="24">
                    <a-form-item :label="$t('base.build.type')" name="type">
                        <a-radio-group v-model:value="formData.type">
                            <a-radio-button
                            v-for="(item, index) in typeOptions"
                                :key="index"
                                :value="item.value"
                                :disabled="item.disabled"
                            >
                            {{ item.label }}
                            </a-radio-button>
                        </a-radio-group>
                    </a-form-item>
                    <a-form-item v-if="showFileName" :label="$t('base.filename')" prop="fileName">
                        <a-input v-model:value="formData.fileName" :placeholder="$t('base.enter')" allow-clear />
                    </a-form-item>
                </a-col>
            </a-form>
        </a-row>
        <template #footer>
            <a-button @click="close">
            {{ $t('base.cancel') }}
            </a-button>
            <a-button type="primary" @click="handelConfirm">
            {{ $t('base.ok') }}
            </a-button>
        </template>
    </a-modal>
</template>
<script>
import { reactive, toRefs, getCurrentInstance } from 'vue'
export default {
    emits: ['confirm'],
    setup(props, ctx){

        const { proxy } = getCurrentInstance()

        const data = reactive({
            elForm: null,
            visible: false,
            showFileName: false,
            typeOptions: [{
                label: proxy.$t('base.page'),
                value: 'file'
            }, {
                label: proxy.$t('base.modal'),
                value: 'modal'
            }],
            formData: {
                fileName: undefined,
                type: 'file'
            },
            rules: {
                fileName: [{
                    required: true,
                    message: `${proxy.$t('base.enter')}${proxy.$t('base.filename')}`,
                    trigger: 'blur'
                }],
                type: [{
                    required: true,
                    message: proxy.$t('base.choose.build.type'),
                    trigger: 'change'
                }]
            }
        })
        const onOpen = (showFileName) => {
            data.showFileName = showFileName
            data.visible = true
            if (showFileName) {
                data.formData.fileName = `${+new Date()}.vue`
            }
        }
        const close = () => { data.visible = false }
        const handelConfirm = () => {
            data.elForm.validate().then(valid =>{
                if (!valid) return
                ctx.emit('confirm', data.formData)
                close()
            })
        }

        return {
            close,
            handelConfirm,
            onOpen,
            ...toRefs(data)
        }
    }
}
</script>