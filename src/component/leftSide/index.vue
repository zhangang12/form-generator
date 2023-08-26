
<template>
    <div class="left-main">
        <div v-for="(item, index) in originComponents" :key="index">
            <a-divider orientation="left">
                <Icon name="ControlOutlined" />
                {{ $t(item.title)}}
            </a-divider>
            <draggable
                class="components-draggable"
                v-model="item.list"
                draggable=".components-item"
                :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
                :clone="clone"
                @end="end"
                :sort="false"
                item-key="id"
            >
                <template #item="{element}">
                    <div :id="element.id" class="components-item" @click="add({item: element})">
                        <div class="components-body">
                            <ItemIcon :name="element.__config__.tagIcon" />
                            {{ $t(element.__config__.label) }}
                        </div>
                    </div>
                </template>
            </draggable>
        </div>
    </div>
</template>
<script>
import {
    InputComponents, SelectComponents,
    LayoutComponents, BankComponents
} from '@/core/config'
import Draggable from 'vuedraggable'
import { defineComponent, inject, markRaw } from 'vue'
export default defineComponent({
    emits: ['addComponent'],
    components: { Draggable },
    setup(props, ctx){

        const preAction = inject('preAction')
        const clone = (options) => {
            preAction.set(() => options)
        }
        const add = (options = {}) => {
            preAction.set(() => options.item)
            ctx.emit('addComponent')
        }
        const end = () => {
            preAction.set(null)
        }


        const originComponents = markRaw([
            {
                title: 'base.input_components',
                list: InputComponents
            },
            {
                title: 'base.optional_components',
                list: SelectComponents
            },
            {
                title: 'base.layout_components',
                list: LayoutComponents
            },
            {
                title: '网银组件',
                list: BankComponents
            }
        ])

        return {
            clone, add, end, originComponents
        }
    }
})
</script>