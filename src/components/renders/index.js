import { resolveComponent, h, withModifiers } from 'vue'
import renderActionIcon from './actionIcon'
import renderComponent from './components'

const render = (options) => {
    
    const { props, ctx, item, index } = options
    if(!item.__config__.tag){
        return renderComponent({
            ...options, render
        })
    }

    return h(resolveComponent('a-col'),
        {
            span: item.__config__.span,
            class: {
                'drawing-item': true,
                'active-from-item': props.activeItem.formId == item.formId,
                'unfocus-bordered': (props.formRule.unFocusedComponentBorder && props.activeItem.formId != item.formId)
            },
            onClick: withModifiers((e) => {
                if(props.activeItem.formId != item.formId){
                    ctx.emit('selectComponent', {item})
                }
            }, ['stop', 'prevent'])
        }, 
        {
            default: ()=> {
                return [
                    h(resolveComponent('a-form-item'), 
                        {
                            label: item.__config__.showLabel ? item.__config__.label : '',
                            required: item.__config__.required
                        },
                        [
                            renderComponent(options)
                        ]
                    ),
                    renderActionIcon(options, { action: 'copy' }),
                    renderActionIcon(options, { action: 'delete' })
                ]
            }
        }
    )
}

export default render