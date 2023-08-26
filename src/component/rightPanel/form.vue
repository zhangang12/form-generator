<template>
    <a-form layout="vertical">
        <a-form-item :label="$t('base.form.name')">
            <a-input
                v-model:value="formRule.formRef"
                :placeholder="`${$t('base.enter')}${$t('base.form.name')}(ref)`"
            />
        </a-form-item>
        <a-form-item :label="$t('base.form.model')">
            <a-input v-model:value="formRule.formModel" :placeholder="$t('base.enter')" />
        </a-form-item>
        <a-form-item :label="$t('base.form.rules')">
            <a-input v-model:value="formRule.formRules" :placeholder="$t('base.enter')" />
        </a-form-item>
        <a-form-item :label="$t('base.form.layout')">
            <a-radio-group v-model:value="formRule.layout" button-style="solid">
                <a-radio-button value="horizontal">
                    {{ $t('base.form.layout.horizontal') }}
                </a-radio-button>
                <a-radio-button value="vertical">
                    {{ $t('base.form.layout.vertical') }}
                </a-radio-button>
                <a-radio-button value="inline">
                    <a-tooltip>
                        <template #title>
                            {{ $t('base.form.layout.inline.tip') }}
                        </template>
                        {{ $t('base.form.layout.inline') }}
                        <Icon name="info-circle" />
                    </a-tooltip>
                </a-radio-button>
            </a-radio-group>
        </a-form-item>
        <template v-if="formRule.layout === 'horizontal'">
            <a-form-item v-if="formRule.layout === 'horizontal'" :label="$t('base.form.label.span')">
                <a-input v-model:value="formRule.labelCol.span" />
            </a-form-item>
            <a-form-item v-if="formRule.layout === 'horizontal'" :label="$t('base.form.label.offset')">
                <a-input v-model:value="formRule.labelCol.offset" />
            </a-form-item>
            <a-form-item v-if="formRule.layout === 'horizontal'" :label="$t('base.form.wrapper.span')">
                <a-input v-model:value="formRule.wrapperCol.span" />
            </a-form-item>
            <a-form-item v-if="formRule.layout === 'horizontal'" :label="$t('base.form.wrapper.offset')">
                <a-input v-model:value="formRule.wrapperCol.offset" />
            </a-form-item>
        </template>
        <a-form-item :label="$t('base.label.align')">
            <a-radio-group v-model:value="formRule.labelAlign" button-style="solid">
                <a-radio-button value="left">
                    {{ $t('base.label.align.left') }}
                </a-radio-button>
                <a-radio-button value="right">
                    {{ $t('base.label.align.right') }}
                </a-radio-button>
            </a-radio-group>
        </a-form-item>
        <!-- <a-form-item :label="$t('base.grid.space')">
            <a-input-number v-model:value="formRule.gutter" :min="0" />
        </a-form-item> -->
        <a-form-item :label="$t('base.form.disabled')">
            <a-switch v-model:checked="formRule.disabled" />
        </a-form-item>
        <a-form-item :label="$t('base.form.button')">
            <a-switch v-model:checked="formRule.formBtns" />
        </a-form-item>
        <a-form-item :label="$t('base.un.focused.component.border')">
            <a-switch v-model:checked="formRule.unFocusedComponentBorder" />
        </a-form-item>
    </a-form>
</template>
<script>
export default {
    props: ['formRule'],
    setup(props, ctx){

    }
}
</script>