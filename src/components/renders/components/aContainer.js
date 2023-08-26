
import Draggable from 'vuedraggable'
import renderActionIcon from '../actionIcon'
import { resolveComponent, inject, h } from 'vue'

export default function(options){
    const { props, item, ctx, render } = options
    const preAction = inject('preAction')
    let localIndex

    return h(
        resolveComponent('a-col'),
        {
            span: item.__config__.span
        },
        {
            default: () => {
                return h(
                    resolveComponent('a-row'),
                    {
                        class: {
                            'drawing-row-item': true,
                            'active-from-item': props.activeItem.formId == item.formId
                        },
                        onClick: () => {
                            ctx.emit('selectComponent', {item})
                        }
                    },
                    {
                        default: () => {
                            let region = {}
                            if(item.type == 'flex'){
                               region[`ant-row-${item.justify}`] = true
                               region[`ant-row-${item.align}`] = true
                            }

                            return [
                                h('span', { class: 'component-name' }, `row${item.formId}`),
                                h(
                                    Draggable,
                                    { 
                                        class: {
                                            'drag-wrapper': true,
                                            'ant-row': true,
                                            ...region
                                        },
                                        group: 'componentsGroup',
                                        animation: 340,
                                        modelValue: item.children || [],
                                        itemKey: 'formId',
                                        style: {
                                            width: '100%'
                                        },
                                        clone: (options) => {
                                            preAction.set(() => {
                                                let itemIndex = item.children.findIndex(p => p.formId == options.formId)
                                                let [curItem] = item.children.splice(itemIndex, 1)
                                                return curItem
                                            })
                                        },
                                        onAdd: (evt) => {
                                            ctx.emit('addComponent', {
                                                origin: item.children,
                                                index: evt.newIndex, 
                                            })
                                        },
                                        onUpdate: (evt) => {
                                            ctx.emit('sortComponent', {
                                                origin: item.children,
                                                oldIndex: evt.oldIndex,
                                                newIndex: evt.newIndex
                                            })
                                        }
                                    },
                                    {
                                        item: ({element, index}) => {
                                            localIndex = index
                                            return render({
                                                ...options,
                                                origin: item.children,
                                                item: element, index
                                            })
                                        }
                                    }
                                ),
                                renderActionIcon(options, { action: 'copy' }),
                                renderActionIcon(options, { action: 'delete' })
                            ]
                        }
                    }
                )
            }
        }
    )
}
