
<script>
import * as components from '@ant-design/icons-vue'
import { computed, resolveComponent, h } from 'vue'
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
        // return {n}
        console.log(n,111)
        // return () => {
        //     return h(
        //         resolveComponent(n)
        //     )
        // }
        return () => {
            return h('i', 'unknow')
        }
    }
}
</script>