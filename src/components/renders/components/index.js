
import { resolveComponent } from 'vue'
import aInput from './aInput'
import aTextarea from './aTextarea'
import aInputPassword from './aInputPassword'
import aInputNumber from './aInputNumber'
import aInputSearch from './aInputSearch'
import aAutoComplete from './aAutoComplete'
import aMentions from './aMentions'
import aSelect from './aSelect'
import aCascader from './aCascader'
import aTreeSelect from './aSelectTree'
import aTransfer from './aTransfer'
import aRadioGroup from './aRadioGroup'
import aCheckboxGroup from './aCheckboxGroup'
import aSwitch from './aSwitch'
import aSlider from './aSlider'
import aRate from './aRate'
import aUpload from './aUpload'
import aTimePicker from './aTimePicker'
import aDatePicker from './aDatePicker'
import aMonthPicker from './aMonthPicker'
import aWeekPicker from './aWeekPicker'
import aRangePicker from './aRangePicker'
import aButton from './aButton'

import aContainer from './aContainer'

export default (options) => {
    
    const { tag } = options.item.__config__
    const resolveTag = tag ? resolveComponent(tag): undefined

    switch(tag){
        case 'a-input':
            return aInput.apply(resolveTag, [options])
        case 'a-textarea':
            return aTextarea.apply(resolveTag, [options])
        case 'a-input-password':
            return aInputPassword.apply(resolveTag, [options])
        case 'a-input-number':
            return aInputNumber.apply(resolveTag, [options])
        case 'a-input-search':
            return aInputSearch.apply(resolveTag, [options])
        case 'a-auto-complete':
            return aAutoComplete.apply(resolveTag, [options])
        case 'a-mentions':
            return aMentions.apply(resolveTag, [options])
        case 'a-select':
            return aSelect.apply(resolveTag, [options])
        case 'a-cascader':
            return aCascader.apply(resolveTag, [options])
        case 'a-tree-select':
            return aTreeSelect.apply(resolveTag, [options])
        case 'a-transfer':
            return aTransfer.apply(resolveTag, [options])
        case 'a-radio-group':
            return aRadioGroup.apply(resolveTag, [options])
        case 'a-checkbox-group':
            return aCheckboxGroup.apply(resolveTag, [options])
        case 'a-switch':
            return aSwitch.apply(resolveTag, [options])
        case 'a-slider':
            return aSlider.apply(resolveTag, [options])
        case 'a-rate':
            return aRate.apply(resolveTag, [options])
        case 'a-upload':
            return aUpload.apply(resolveTag, [options])
        case 'a-time-picker':
            return aTimePicker.apply(resolveTag, [options])
        case 'a-date-picker':
            return aDatePicker.apply(resolveTag, [options])
        case 'a-month-picker':
            return aMonthPicker.apply(resolveComponent('a-date-picker'), [options])
        case 'a-week-picker':
            return aWeekPicker.apply(resolveComponent('a-date-picker'), [options])
        case 'a-range-picker':
            return aRangePicker.apply(resolveTag, [options])
        case 'a-button':
            return aButton.apply(resolveTag, [options])
        default:
            return aContainer.apply(resolveTag, [options])
        
    }
}