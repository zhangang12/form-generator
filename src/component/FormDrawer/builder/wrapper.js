
export function modalWrapper(codeStr){
    return `<div id="modal"><a-modal v-model:visible="data.visible" get-container="#modal" @cancel="close" title="Form Titile">
        ${codeStr}
        <template #footer>
        <div>
            <a-button @click="close">${(this.$t('base.close'))}</a-button>
            <a-button type="primary" @click="handelConfirm">${(this.$t('base.ok'))}</a-button>
        </div>
        </template>
    </a-modal></div>`
}

// span不为24的用a-col包裹
export function colWrapper(schema, codeStr){
    return `<a-col :span="${schema.__config__.span}">${codeStr}</a-col>`
    // if(this.someSpanIsNot24 || schema.__config__.span !== 24){
    //     return `<a-col :span="${schema.__config__.span}">${codeStr}</a-col>`
    // }
    // return codeStr
}