<template>
  <div :class="prefixCls">
    <a-tabs v-model:activeKey="currentTab" @change="handleTabChange">
      <a-tab-pane v-for="v in icons" :key="v.key">
        <template #tab>
            <span :style="{ fontSize: '10px' }">
              {{ $t(v.title) }}
            </span>
        </template>
        <ul>
          <li
            v-for="(icon, key) in v.icons"
            :key="`${v.key}-${key}`"
            :class="{ 'active': selectedIcon == icon }"
            @click="handleSelectedIcon(icon)"
          >
            <InnerIcons :name="icon" :style="{ fontSize: '24px' }" />
          </li>
        </ul>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import InnerIcons from '@/components/IconSelector/indexEx'
import icons from './icons'
import { reactive, toRefs, computed } from 'vue'
export default {
  emits: ['ok'],
  name: 'IconSelect',
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-icon-selector'
    },
    value: {
      type: String
    },
    activeItem: {
        type: Object
    }
  },
  components: {
    InnerIcons
  },
  setup(props, context){

      const data = reactive({
          currentTab: 'directional',
          selectedIcon: props.value
      })

      const handleTabChange = () => {

      }

      const handleSelectedIcon = (icon) => {
          context.emit('ok', icon)
      }

      return {
          handleTabChange,
          icons,
          handleSelectedIcon,
          ...toRefs(data)
      }

  }
  // data() {
  //   return {
  //     selectedIcon: this.value || '',
  //     currentTab: 'directional',
  //     icons
  //   }
  // },
  // watch: {
  //   value(val) {
  //     this.selectedIcon = val
  //     this.autoSwitchTab()
  //   }
  // },
  // created() {
  //   if (this.value) {
  //     this.autoSwitchTab()
  //   }
  // },
  // methods: {
  //   handleSelectedIcon(icon) {
  //     this.selectedIcon = icon
  //     this.$emit('change', icon)
  //   },
  //   handleTabChange(activeKey) {
  //     this.currentTab = activeKey
  //   },
  //   autoSwitchTab() {
  //     // eslint-disable-next-line no-shadow
  //     const { icons } = this
  //     // eslint-disable-next-line no-return-assign
  //     icons.some(item => item.icons.some(icon => icon === this.value) && (this.currentTab = item.key))
  //   }
  // }
}
</script>

<style lang="scss" scoped>

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
</style>
