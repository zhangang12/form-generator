
import { withModifiers, h } from 'vue'

let title
let path

export default (options, { action }) => {
    if(action == 'copy'){
        title = 'copy'
        path = 'M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z'
    }else if(action == "delete"){
        title = '删除'
        path = 'M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z'
    }


    return h("span", {
        title,
        class: `drawing-item-${action}`,
        onClick: withModifiers((e) => {
            if(action == 'copy'){
                options.ctx.emit('copyComponent',  options)
            }else{
                options.ctx.emit('deleteComponent', options)
            }
        }, ['stop', 'prevent'])
    }, h('i', {
            ariaLabel: `图标: ${action}`,
            class: `anticon anticon-${action}`
        }, h('svg', {
                viewBox:"64 64 896 896",
                dataIcon: action,
                width:"1em",
                height:"1em",
                fill:"currentColor",
                ariaHidden:"true",
                focusable:"false"
            }, h('path', {d: path})
            )
        )
    )
}