
<template>
    <a-modal
        :visible="visible"
        :footer="null"
        width="40%"
        :title="$t('base.icon.component')"
        @cancel="onCancel"
    >
        <div class="ant-pro-icon-selector">
            <a-tabs v-model:activeKey="currentTab">
                <a-tab-pane v-for="item in iconData" :key="item.key">
                    <template #tab>
                        <span :style="{ fontSize: '10px' }">
                        {{ $t(item.title) }}
                        </span>
                    </template>
                    <ul>
                    <li
                        v-for="(icon, key) in item.icons"
                        :key="`${item.key}-${key}`"
                        :class="{ 'active': selectedIcon == icon }"
                        @click="onSelected(icon)"
                    >
                        <Icon :name="icon" :style="{ fontSize: '24px' }" />
                    </li>
                    </ul>
                </a-tab-pane>
            </a-tabs>
        </div>
    </a-modal>
</template>
<script>
import iconData from './iconData'
import { reactive, toRefs, markRaw, watch } from 'vue'
export default {
    props: ['visible', 'selectedIcon'],
    emits: ['updateVisible'],
    setup(props, ctx){

        const onCancel = () => ctx.emit('updateVisible', false)
        

        const onSelected = icon => {
            ctx.emit('select', icon)
        }

        const data = reactive({
            currentTab: 'directional'
        })

        watch(
            () => props.selectedIcon,
            (val) => {
                let ctb = 'directional'
                if(val){
                    let res = iconData.find(i => {
                        return i.icons.find(s => s == val)
                    })
                    ctb = res.key
                }
                data.currentTab = ctb
            },
            {immediate: true}
        )

        return {
            onCancel,
            onSelected,
            iconData: markRaw(iconData),
            ...toRefs(data)
        }
    }
}
</script>
<style lang="scss" scoped>
.ant-pro-icon-selector{
    ul{
      list-style: none;
      padding: 0;
      overflow-y: scroll;
      height: 250px;
  
      li{
        display: inline-block;
        padding: 12px;
        margin: 3px 0;
        border-radius: 2px;
  
        &:hover, &.active{
          // box-shadow: 0px 0px 5px 2px @primary-color;
          cursor: pointer;
          color: white;
          background-color: #1890FF;
        }
      }
    }
}
</style>