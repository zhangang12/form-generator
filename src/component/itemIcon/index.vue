<script>
import ItemSvg from './svg'
import { h } from 'vue'
export default {
    props: ['name'],
    setup(props){
        return () => {
            let src = ItemSvg[props.name]
            return h('i', {
                class: {'anticon': true }, style:{  'margin-right': '2px'}}, [
                h('img', {
                    src,
                    style: {
                        width: '12px',
                        height: '12px',
                        display: 'inline-block',
                        verticalAlign: 'initial',
                    }
                })
            ])
        }
    }
}
</script>