
<script>
import * as components from '@ant-design/icons-vue'
import { computed, h } from 'vue'
export default {
    components,
    props: {
        name: {
            type: String,
            default: 'home-outlined'
        }
    },
    setup(props){
        const n = computed(() => {
            if(!/(O|o)utlined$/.test(props.name)){
                return `${props.name}-outlined`
            }
            return props.name
        })
        return () => {
            return h('i', 'unknow')
        }
    }
}
</script>