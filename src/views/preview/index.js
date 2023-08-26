
// import { reactive, toRefs } from 'vue'
import { compile, reactive, toRefs } from 'vue/dist/vue.esm-bundler.js'

export default function(){
    return {
        template: '<div>aaaaaa</div>',
        setup(props, ctx){

            const submitForm = () => {
                console.log('吕')
            }
    
            const close = () => {
                data.visible = false
            }
    
            const data = reactive({
                visible: true,
                time: new Date().getTime(),
                name: 'lls'
            })
    
            return {
                ...toRefs(data),
                close,
                submitForm
            }
        }
    }
}