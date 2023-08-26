<script>
import { reactive, toRefs, ref, defineComponent } from 'vue'
import { compile } from 'vue/dist/vue.esm-bundler.js'
export default defineComponent({
    template: '<div>22222</div>',
    setup(props, ctx){

        const submitForm = () => {
            console.log('吕')
        }

        const close = () => {
            data.visible = false
        }

        const data = reactive({
            visible: true,
            time: new Date().getTime()
        })

        return {
            ...toRefs(data),
            close,
            submitForm
        }
    }
})
</script>
