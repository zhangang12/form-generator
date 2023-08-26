
import { compile } from 'vue/dist/vue.esm-bundler.js'
import format from './format'
export default (options) => {
    const { ref, reactive, toRefs, onMounted, getCurrentInstance, onBeforeMount  } = require('vue')
    let main = eval(`(${format(options.js)})`)
    main.template = options.html
    return main
    return {
        template: options.html,
        setup(props, ctx){
            const data = reactive({
                visible: true,
                formData: {
                    field100:''
                },
                rules: {
                    field100: [{
                      required: true,
                      message: '请输入',
                      trigger: 'blur'
                    }],
                  },
            })

            const submitForm = () => {
                console.log('submitForm')
            }
            const resetForm = () => {
                console.log('submitForm')
            }

            return {
                data,
                submitForm,
                resetForm
            }
        }
    }
}