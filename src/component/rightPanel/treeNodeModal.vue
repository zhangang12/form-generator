<template>
  <a-modal
	:title="$t('base.add.option')"
	v-model:visible="visible"
	@ok="handelConfirm"
	onText="确定"
	@cancel="close"
	cancelText="取消"
  >
	<a-form
	  ref="elForm"
	  :model="formData"
	  :rules="rules"
	  layout="vertical"
	>
	  <a-form-item :label="$t('base.option.name')" name="label">
		<a-input v-model:value="formData.label" :placeholder="$t('base.enter') + $t('base.option.name')" allow-clear />
	  </a-form-item>
	  <a-form-item :label="$t('base.option.value')" name="value">
		<a-input
		  v-model:value="formData.value"
		  :placeholder="$t('base.enter') + $t('base.option.value')"
		  allow-clear
		>
			<template #addonAfter>
				<a-select v-model:value="dataType">
					<a-select-option v-for="(item, index) in dataTypeOptions" :key="index" :value="item.value" :disabled="item.disabled">
						{{ item.label }}
					</a-select-option>
				</a-select>
			</template>
		</a-input>
	  </a-form-item>
	</a-form>
  </a-modal>
</template>
<script>
import { reactive, toRefs, toRaw, getCurrentInstance } from 'vue'
export default {
	props: ['activeItem'],
	setup(props, ctx){

		const { proxy } = getCurrentInstance()

		let promiser = {
			resolve: null,
			reject: null
		}

		const randomKey = () => {
			let str = Math.random().toString(36).substring(2)
			return str.substring(0, 8)
		}

		const data = reactive({
			visible: false,
			formData: {
				id: '',
				label:'',
				value: '',
				children: []
			},
			rules: {
				label: [
				{
					required: true,
					message: proxy.$t('base.enter') + proxy.$t('base.option.name'),
					trigger: 'blur'
				}
				],
				value: [
				{
					required: true,
					message: proxy.$t('base.enter') + proxy.$t('base.option.value'),
					trigger: 'blur'
				}
				]
			},
			dataTypeOptions: [
				{
					label: proxy.$t('base.string'),
					value: 'string'
				},
				{
					label: proxy.$t('base.number'),
					value: 'number'
				}
			],
			dataType: 'string'
		})

		const handelConfirm = () => {
			proxy.$refs.elForm.validate().then(valid => {
				if (!valid) return
				let rawItem = { ...valid }
				rawItem.id = randomKey()
				if(data.dataType == 'number'){
					rawItem.value = Number(valid.value)
				}
				promiser.resolve(rawItem)
				close()
			})
		}
		const close = () => {
			data.visible = false
			proxy.$refs.elForm.resetFields()
			promiser.reject()
		}
		const open = () => {
			data.visible = true
			return new Promise((resolve, reject) => {
				promiser.resolve = resolve
				promiser.reject = reject
			})
		}

		return {
			open,close,
			handelConfirm,
			...toRefs(data)
		}
	}
}
</script>