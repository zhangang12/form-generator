
<script>
import Draggable from 'vuedraggable'
import renders from '@/components/renders'
import { h, resolveComponent, getCurrentInstance, inject } from 'vue'
export default {
    emits: ['addComponent', 'sortComponent','moveComponent', 'selectComponent', 'deleteComponent'],
    props: {
        drawingList: {
            type: Array,
            default(){
                return []
            }
        },
        activeItem: {
            type: Object,
            default(){
                return {}
            }
        },
        formRule: {
            type: Object,
            default(){
                return {}
            }
        }
    },
    setup(props, context){
        const { proxy } = getCurrentInstance()
        const nothing = [{id: '000000'}]
        const preAction = inject('preAction')
        
        return () => {
            
            let formProps = {
                layout: props.formRule.layout,
                gutter: props.formRule.gutter,
                formBtns: props.formRule.formBtns,
                disabled: props.formRule.disabled,
                labelAlign: props.formRule.labelAlign
            }
            if(props.formRule.layout == "horizontal"){
                formProps.labelCol = props.formRule.labelCol,
                formProps.wrapperCol = props.formRule.wrapperCol
            }

            return h(
                resolveComponent('a-form'),
                {
                    colon: true,
                    ...formProps
                },
                {
                    default: () => {

                        if(props.drawingList.length <= 0){
                            return h(Draggable, {
                                class: 'drawing-board',
                                modelValue: nothing,
                                group: 'componentsGroup',
                                onAdd: function(evt){
                                    context.emit('addComponent', {index: 0})
                                },
                                itemKey: 'id'
                            }, {
                                item: () => {
                                    return h(
                                        resolveComponent('a-result'),
                                        {
                                            title: proxy.$t('base.left.drag')
                                        },
                                        {
                                            icon: () => h(resolveComponent('Icon'), { name: 'appstore-outlined'}),
                                            extra: () => {}
                                        }
                                    )
                                }
                            })
                        }

                        return h(Draggable, {
                            class: 'drawing-board ant-row',
                            modelValue: props.drawingList,
                            group: 'componentsGroup',
                            itemKey: 'formId',
                            clone: (options) => {
                                preAction.set(() => {
                                    let itemIndex = props.drawingList.findIndex(p => p.formId == options.formId)
                                    let [item] = props.drawingList.splice(itemIndex, 1)
                                    return item
                                })
                            },
                            onAdd: (evt) => {
                                context.emit('addComponent', {index: evt.newIndex })
                            },
                            onUpdate: (evt) => {
                                context.emit('sortComponent', {
                                    oldIndex: evt.oldIndex,
                                    newIndex: evt.newIndex
                                })
                            },
                            onEnd: () => {
                                preAction.set(null)
                            }
                        }, {
                            item: ({element, index}) => {
                                return renders({
                                    origin: props.drawingList,
                                    props, ctx: context,
                                    item: element, index
                                })
                            }
                        })
                    }
                }
            )
        }
    }
}
</script>