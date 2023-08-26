
<script>
import * as components from '@ant-design/icons-vue'
import { resolveComponent, h } from 'vue'
export default {
    components,
    props: ['name'],
    setup(props){

        let formatName = name => {
            if(name){
                if(!/(O|o)utline$/.test(name)){
                    return `${name}-outlined`
                }
                return name
            }
        }

        let name = formatName(props.name)

        return () => {
            if(name){
                return h(resolveComponent(name))
            }
            return h('i', 'unknow')
        }
    }
}
</script>