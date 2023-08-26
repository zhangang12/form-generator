<template>
    <a-select
        v-model:value="activeItem.__config__.tagIcon"
        :placeholder="$t('base.choose') + $t('base.component.type')"
        :style="{width: '100%'}"
        @change="change"
    >
        <a-select-opt-group v-for="group in selectList" :key="group.label" :label="group.label">
            <a-select-option
                v-for="item in group.options.list"
                :key="item.__config__.label"
                :value="item.__config__.tagIcon"
            >
            <div class="tag-list" style="display:flex;align-items: center;">
                <ItemIcon :name="item.__config__.tagIcon" />
                <span> {{ $t(item.__config__.label) }}</span>
            </div>
            </a-select-option>
        </a-select-opt-group>
    </a-select>
</template>
<script>
import { InputComponents, SelectComponents } from '@/core/config'
import { markRaw, getCurrentInstance } from 'vue'
export default {
    props: ['activeItem'],
    emits: ['itemChange'],
    setup(props, ctx){
        const { proxy } = getCurrentInstance()
        const selectList = markRaw([
            {
                label: proxy.$t('base.input_components'),
                options: {
                    list: InputComponents
                }
            },
            {
                label: proxy.$t('base.optional_components'),
                options: {
                    list: SelectComponents
                }
            }
        ])

        const change = (tagIcon) => {
            let list = [
                ...InputComponents,
                ...SelectComponents
            ]
            let item = list.find(t => t.__config__.tagIcon == tagIcon)
            ctx.emit('itemChange', { item })
        }

        return {
            selectList,
            change
        }
    }
}
</script>