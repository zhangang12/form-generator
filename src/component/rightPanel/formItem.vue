<template>
    <a-form layout="vertical" size="small" label-width="90px">
        <template v-if="activeItem">
            <a-form-item v-if="activeItem.__config__.changeTag" :label="$t('base.component.type')">
                <item-select :activeItem="activeItem" @itemChange="onItemChange" />
            </a-form-item>
            <a-form-item v-if="activeItem.__vModel__!==undefined" :label="$t('base.field.name')">
                <a-input v-model:value="activeItem.__vModel__" :placeholder="`${$t('base.enter')}${$t('base.field.name')} (v-model)`" />
            </a-form-item>
            <a-form-item v-if="activeItem.componentName!==undefined" :label="$t('base.component.name')">
                {{ activeItem.componentName }}
            </a-form-item>
            <a-form-item v-if="activeItem.__config__.label!==undefined && activeItem.__config__.layoutTree !==true " :label="$t('base.title')">
                <a-input v-model:value="activeItem.__config__.label" :placeholder="`${$t('base.enter')}${$t('base.title')}`" />
            </a-form-item>

            <!---以上必需项-->

            <a-form-item v-if="activeItem.__config__.tag === 'a-transfer'" :label="$t('base.top.title')">
                <a-input-group>
                    <a-row :gutter="8">
                    <a-col :span="12">
                        <a-input v-model:value="activeItem.titles[0]" :placeholder="$t('base.source.title')" />
                    </a-col>
                    <a-col :span="12">
                        <a-input v-model:value="activeItem.titles[1]" :placeholder="$t('base.target.title')" />
                    </a-col>
                    </a-row>
                </a-input-group>
            </a-form-item>
            <a-form-item v-if="activeItem.placeholder!==undefined && activeItem.__config__.tag!=='a-range-picker'" :label="$t('base.placeholder')">
                <a-input v-model:value="activeItem.placeholder" :placeholder="`${$t('base.enter')}${$t('base.placeholder')}`" />
            </a-form-item>
            <a-form-item v-if="activeItem.__config__['start-placeholder']!==undefined" :label="$t('base.start.placeholder')">
                <a-input v-model:value="activeItem.__config__['start-placeholder']" :placeholder="`${$t('base.enter')}${$t('base.placeholder')}`" />
            </a-form-item>
            <a-form-item v-if="activeItem.__config__['end-placeholder']!==undefined" :label="$t('base.end.placeholder')">
                <a-input v-model:value="activeItem.__config__['end-placeholder']" :placeholder="`${$t('base.enter')}${$t('base.placeholder')}`" />
            </a-form-item>
            <a-form-item v-if="activeItem.__config__.span!==undefined" :label="$t('base.form.grid')">
                <a-slider v-model:value="activeItem.__config__.span" :max="24" :min="1" :marks="{12:''}" />
            </a-form-item>
            <a-form-item v-if="activeItem.__config__.layout==='rowFormItem' && activeItem.gutter!==undefined" :label="$t('base.grid.space')">
                <a-input-number v-model:value="activeItem.gutter" :min="0" :placeholder="$t('base.grid.space')" />
            </a-form-item>
            <a-form-item
                v-if="activeItem.__config__.layout==='rowFormItem' && activeItem.type!==undefined"
                :label="$t('base.layout.model')"
            >
                <a-radio-group v-model:value="activeItem.type" button-style="solid">
                    <a-radio-button value="default">
                        default
                    </a-radio-button>
                    <a-radio-button value="flex">
                        flex
                    </a-radio-button>
                </a-radio-group>
            </a-form-item>
            <a-form-item
                v-if="activeItem.justify!==undefined&&activeItem.type==='flex'"
                :label="$t('base.horizontal.arrangement')"
                >
                <a-select
                    v-model:value="activeItem.justify"
                    :placeholder="`${$t('base.choose')}${$t('base.horizontal.arrangement')}`"
                    :style="{width: '100%'}"
                >
                    <a-select-option
                        v-for="(item, index) in justifyOptions"
                        :key="index"
                        :value="item.value"
                        >
                        {{ item.label }}
                    </a-select-option>
                </a-select>
            </a-form-item>

            <a-form-item
                v-if="activeItem.align!==undefined&&activeItem.type==='flex'"
                :label="$t('base.vertical.arrangement')"
                >
                <a-radio-group v-model:value="activeItem.align" button-style="solid">
                    <a-radio-button value="top">
                    top
                    </a-radio-button>
                    <a-radio-button value="middle">
                    middle
                    </a-radio-button>
                    <a-radio-button value="bottom">
                    bottom
                    </a-radio-button>
                </a-radio-group>
            </a-form-item>

            <a-form-item
                v-if="activeItem.style&&activeItem.style.width!==undefined"
                :label="$t('base.component.width')"
                >
                <a-input
                    v-model:value="activeItem.style.width"
                    :placeholder="`${$t('base.enter')}${$t('base.component.width')}`"
                    allow-clear
                />
            </a-form-item>

            <a-form-item v-if="activeItem.__vModel__!==undefined" :label="$t('base.default.value')">
                <a-input
                    :value="defaultValue"
                    :placeholder="`${$t('base.enter')}${$t('base.default.value')}`"
                    @input="onDefaultValueInput"
                />
            </a-form-item>

            <a-form-item v-if="activeItem['prefix']!==undefined" :label="$t('base.prefix')">
                <a-input v-model:value="activeItem['prefix']" :placeholder="$t('base.prefix')" />
            </a-form-item>
            <a-form-item v-if="activeItem['suffix']!==undefined" :label="$t('base.suffix')">
                <a-input v-model:value="activeItem['suffix']" :placeholder="$t('base.suffix')" />
            </a-form-item>

            <a-form-item :label="$t('base.icon.before')" v-if="activeItem.__slot__&&activeItem.__slot__.addonBefore!==undefined">
                <a-space size="large"></a-space>
                <Icon v-if="activeItem.__slot__.addonBefore" :name="activeItem.__slot__.addonBefore" style="margin-right:24px" />
                <a-button type="dashed" style="margin-right:24px" @click="showIconSelectModal('addonBefore')">
                    {{ $t('base.icon.choose') }}
                </a-button>
                <a-button type="dashed" v-if="activeItem.__slot__.addonBefore" @click="toCleanIcon('addonBefore')">
                    {{ $t('base.empty') }}
                </a-button>
            </a-form-item>
            <a-form-item :label="$t('base.icon.after')" v-if="activeItem.__slot__&&activeItem.__slot__.addonAfter!==undefined">
                <a-space size="large"></a-space>
                <Icon v-if="activeItem.__slot__.addonAfter" :name="activeItem.__slot__.addonAfter" style="margin-right:24px" />
                <a-button type="dashed" style="margin-right:24px" @click="showIconSelectModal('addonAfter')">
                    {{ $t('base.icon.choose') }}
                </a-button>
                <a-button type="dashed" v-if="activeItem.__slot__.addonAfter" @click="toCleanIcon('addonAfter')">
                    {{ $t('base.empty') }}
                </a-button>
            </a-form-item>

            <a-form-item
                v-if="activeItem.icon!==undefined && activeItem.__config__.tag === 'a-button'"
                :label="$t('base.button.icon')"
                >
                <a-space size="large">
                    <Icon v-if="activeItem.icon" :name="activeItem.icon" />
                    <a-button type="dashed" @click="showIconSelectModal(undefined)">
                    {{ $t('base.icon.choose') }}
                    </a-button>
                    <a-button
                    v-if="activeItem.icon && activeItem.icon !== ''"
                    type="dashed"
                    @click="() => activeItem.icon = ''"
                    >
                    {{ $t('base.empty') }}
                    </a-button>
                </a-space>
            </a-form-item>

            <a-form-item v-if="activeItem.autoSize !== undefined" :label="$t('base.min.row')">
                <a-input-number v-model:value="activeItem.autoSize.minRows" :min="1" placeholder="$t('base.min.row')" />
            </a-form-item>
            <a-form-item v-if="activeItem.autoSize !== undefined" :label="$t('base.max.row')">
                <a-input-number v-model:value="activeItem.autoSize.maxRows" :min="1" :placeholder="$t('base.max.row')" />
            </a-form-item>
            <a-form-item v-if="isShowMin" :label="$t('base.min')">
                <a-input-number v-model:value="activeItem.min" :placeholder="$t('base.min')" />
            </a-form-item>
            <a-form-item v-if="isShowMax" :label="$t('base.max')">
                <a-input-number v-model:value="activeItem.max" :placeholder="$t('base.max')" />
            </a-form-item>
            <a-form-item v-if="activeItem.count !== undefined" :label="$t('base.total')">
                <a-input-number v-model:value="activeItem.count" :placeholder="$t('base.total')" />
            </a-form-item>

            <a-form-item v-if="activeItem.height!==undefined" :label="$t('base.component.height')">
                <a-input-number
                    v-model:value="activeItem.height"
                    :placeholder="$t('base.component.height')"
                />
            </a-form-item>
            <a-form-item v-if="isShowStep" :label="$t('base.step')">
                <a-input-number v-model:value="activeItem.step" :placeholder="$t('base.step')" />
            </a-form-item>
            <a-form-item v-if="activeItem.maxLength !== undefined" :label="$t('base.most.enter')">
                <a-input v-model:value="activeItem.maxLength" :placeholder="$t('base.maxlength')">
                </a-input>
            </a-form-item>

            <a-form-item v-if="activeItem['checked-children'] !== undefined" :label="$t('base.checked')">
                <a-input v-model:value="activeItem['checked-children']" />
            </a-form-item>
            <a-form-item v-if="activeItem['un-checked-children'] !== undefined" :label="$t('base.unchecked')">
                <a-input v-model:value="activeItem['un-checked-children']" />
            </a-form-item>
            <a-form-item v-if="activeItem.name !== undefined" :label="$t('base.file.field.name')">
                <a-input v-model:value="activeItem.name" :placeholder="$t('base.file.field.name')" />
            </a-form-item>
            <a-form-item v-if="activeItem.accept !== undefined" :label="$t('base.file.type')">
                <a-select
                    v-model:value="activeItem.accept"
                    :placeholder="$t('base.choose')"
                    :style="{ width: '100%' }"
                    allow-clear
                >
                    <a-select-option value="image/*">
                    {{ $t('base.image') }}
                    </a-select-option>
                    <a-select-option value="video/*">
                    {{ $t('base.video') }}
                    </a-select-option>
                    <a-select-option value="audio/*">
                    {{ $t('base.audio') }}
                    </a-select-option>
                    <a-select-option value=".xls,.xlsx">
                    excel
                    </a-select-option>
                    <a-select-option value=".doc,.docx">
                    word
                    </a-select-option>
                    <a-select-option value=".pdf">
                    pdf
                    </a-select-option>
                    <a-select-option value=".txt">
                    txt
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item v-if="activeItem.__config__.fileSize !== undefined" :label="$t('base.file.size')">
                <a-input v-model:value.number="activeItem.__config__.fileSize" :placeholder="$t('base.enter')">
                    <a-select slot="append" v-model:value="activeItem.__config__.sizeUnit" :style="{ width: '66px' }">
                    <a-select-option value="KB">
                        KB
                    </a-select-option>
                    <a-select-option value="MB">
                        MB
                    </a-select-option>
                    <a-select-option value="GB">
                        GB
                    </a-select-option>
                    </a-select>
                </a-input>
            </a-form-item>
            <a-form-item v-if="activeItem.action !== undefined" :label="$t('base.upload.url')">
                <a-input v-model:value="activeItem.action" :placeholder="$t('base.enter')" allow-clear />
            </a-form-item>
            <a-form-item v-if="activeItem['list-type'] !== undefined" :label="$t('base.list.type')">
                <a-radio-group v-model:value="activeItem['list-type']" button-style="solid">
                    <a-radio-button value="text">
                    text
                    </a-radio-button>
                    <a-radio-button value="picture">
                    picture
                    </a-radio-button>
                    <a-radio-button value="picture-card">
                    picture-card
                    </a-radio-button>
                </a-radio-group>
            </a-form-item>
            <a-form-item
                v-if="activeItem.type !== undefined && activeItem.__config__.tag === 'a-button'"
                :label="$t('base.button.type')"
                >
                <a-select v-model:value="activeItem.type" :style="{ width: '100%' }">
                    <a-select-option value="default">
                    default
                    </a-select-option>
                    <a-select-option value="primary">
                    primary
                    </a-select-option>
                    <a-select-option value="dashed">
                    dashed
                    </a-select-option>
                    <a-select-option value="danger">
                    danger
                    </a-select-option>
                    <a-select-option value="link">
                    link
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item
                v-if="activeItem.__config__.tag === 'a-button'"
                :label="$t('base.button.shape')"
                >
                <a-select v-model:value="activeItem.shape" :style="{ width: '100%' }" allow-clear>
                    <a-select-option value="circle">
                    circle
                    </a-select-option>
                    <a-select-option value="round">
                    round
                    </a-select-option>
                </a-select>
            </a-form-item>
             <a-form-item v-if="activeItem.__config__.tag === 'a-button'" :label="$t('base.button.block')">
                <a-switch v-model:checked="activeItem.block" />
            </a-form-item>

            <a-form-item
                v-if="activeItem.__config__.buttonText !== undefined"
                v-show="'picture-card' !== activeItem['list-type']"
                :label="$t('base.button.text')"
                >
                <a-input v-model:value="activeItem.__config__.buttonText" :placeholder="$t('base.enter')" />
            </a-form-item>

            <a-form-item
                v-if="activeItem.__config__.tag === 'a-button'"
                :label="$t('base.button.text')"
                >
                <a-input v-model:value="activeItem.__slot__.default" :placeholder="$t('base.enter')" />
            </a-form-item>

            <a-form-item v-if="activeItem.__config__.tag === 'a-cascader'" :label="$t('base.separator')">
                <a-input v-model:value="activeItem.separator" :placeholder="$t('base.separator')" />
            </a-form-item>
            <a-form-item v-if="activeItem['show-time']!==undefined" :label="$t('base.time.choose')">
                <a-switch v-model:checked="activeItem['show-time']" />
            </a-form-item>
            <a-form-item v-if="activeItem['show-today'] !== undefined" :label="$t('base.show.today')">
                <a-switch v-model:checked="activeItem['show-today']" />
            </a-form-item>
            <a-form-item v-if="activeItem['use12-hours'] !== undefined" :label="$t('base.use12.hours')">
                <a-switch v-model:checked="activeItem['use12-hours']" />
            </a-form-item>
            <a-form-item v-if="activeItem.format !== undefined" :label="$t('base.time.format')">
                <a-input
                    :value="activeItem.format"
                    :placeholder="$t('base.enter')"
                    @change="onSetTimeValue"
                />
            </a-form-item>
            <a-form-item v-if="activeItem['enter-button'] !== undefined" :label="$t('base.button.style')">
                <a-switch v-model:checked="activeItem['enter-button']" />
            </a-form-item>


            <a-form-item
                v-if="activeItem.__config__.tag === 'a-auto-complete'"
                :label="$t('base.datasource')"
            >
                <template v-for="(tag) in activeItem['data-source']">
                    <a-tooltip v-if="tag.length > 20" :title="tag">
                    <a-tag :closable="true" @close="() => handleAutoDataSourceClose(tag)">
                        {{ `${tag.slice(0, 20)}...` }}
                    </a-tag>
                    </a-tooltip>
                    <a-tag v-else :closable="true" @close="() => handleAutoDataSourceClose(tag)">
                    {{ tag.label }}
                    </a-tag>
                </template>
                <a-input
                    v-if="inputAutoDataSourceVisible"
                    ref="inputAutoDataSource"
                    type="text"
                    size="small"
                    :style="{ width: '78px' }"
                    v-model:value="inputAutoDataSourceValue"
                    @blur="handleInputAutoDataSourceConfirm"
                    @keyup.enter="handleInputAutoDataSourceConfirm"
                />
                <a-tag v-else style="background: #fff; borderStyle: dashed;" @click="showAutoDataSourceInput">
                    <Icon name="plus" />
                </a-tag>
            </a-form-item>

            <a-form-item
                v-if="activeItem.buttonStyle !== undefined && activeItem.__config__.optionType === 'button'"
                :label="$t('base.button.style')"
                >
                <a-radio-group v-model:value="activeItem.buttonStyle" button-style="solid">
                    <a-radio-button value="outline">
                    {{ $t('base.button.style.outline') }}
                    </a-radio-button>
                    <a-radio-button value="solid">
                    {{ $t('base.button.style.solid') }}
                    </a-radio-button>
                </a-radio-group>
            </a-form-item>
            <a-form-item v-if="activeItem.__config__.tag === 'a-auto-complete'" :label="$t('base.filter.option')">
                <a-switch v-model:checked="activeItem['filter-option']" />
            </a-form-item>

            <!-- <a-form-item v-if="activeItem.backfill !== undefined">
                <template #label>
                    <a-tooltip>
                    <template #title>
                        {{ $t('base.backfill.tip') }}
                    </template>
                    {{ $t('base.backfill') }}
                    <Icon name="question-circle" />
                    </a-tooltip>
                </template>
                <a-switch v-model:checked="activeItem.backfill" />
            </a-form-item> -->

            <a-form-item v-if="activeItem['default-open'] !== undefined" :label="$t('base.default.open')">
                <a-switch v-model:checked="activeItem['default-open']" />
            </a-form-item>

            <a-form-item v-if="activeItem.placement !== undefined" :label="$t('base.placement')">
                <a-radio-group v-model:value="activeItem.placement" button-style="solid">
                    <a-radio-button value="top">
                    top
                    </a-radio-button>
                    <a-radio-button value="bottom">
                    bottom
                    </a-radio-button>
                </a-radio-group>
            </a-form-item>

            <a-form-item
                v-if="activeItem.prefix!==undefined && activeItem.__config__.tag === 'a-mentions'"
                :label="$t('base.trigger.keyword')"
                >
                <a-input v-model:value="activeItem.prefix" :placeholder="$t('base.enter')" />
            </a-form-item>

            <a-form-item v-if="activeItem.split!==undefined" :label="$t('base.separator')">
                <a-input v-model:value="activeItem.split" :placeholder="$t('base.separator')" />
            </a-form-item>

            <template
                v-if="['a-checkbox-group', 'a-radio-group', 'a-select', 'a-mentions'].indexOf(activeItem.__config__.tag) > -1"
                >
                <a-divider>{{ $t('base.option') }}</a-divider>
                <Draggable
                    v-model="activeItem.__slot__.options"
                    :animation="340"
                    group="selectItem"
                    handle=".option-drag"
                >
                    <template #item="{ element, index }">
                        <div class="select-item">
                            <div class="option-drag select-line-icon" @click="activeItem.__slot__.options.splice(index, 1)">
                                <Icon name="pic-left" />
                            </div>
                            <a-input v-model:value="element.label" :placeholder="$t('base.option.name')" />
                            <a-input v-model:value="element.value" :placeholder="$t('base.option.value')" />
                            <div class="close-btn select-line-icon" @click="activeItem.__slot__.options.splice(index, 1)">
                                <Icon name="minus-circle" />
                            </div>
                        </div>
                        
                    </template>
                </Draggable>
                <div style="margin-left: 20px;">
                    <a-button
                    style="padding-bottom: 0"
                    type="link"
                    @click="addOptionItem"
                    >
                        <template #icon>
                            <Icon name="plus-circle" />
                        </template>
                        {{ $t('base.add.option') }}
                    </a-button>
                </div>
                <a-divider />
            </template>

            <!-- 穿梭框数据源 -->

            <!-- 穿梭框数据源 -->
            <template v-if="['a-cascader', 'a-tree-select'].includes(activeItem.__config__.tag)">
                <a-divider>{{ $t('base.option') }}</a-divider>
                <a-form-item v-if="activeItem.__config__.dataType" :label="$t('base.data.type')">
                    <a-radio-group v-model:value="activeItem.__config__.dataType" size="small" button-style="solid">
                    <a-radio-button value="dynamic">
                        {{ $t('base.data.dynamic') }}
                    </a-radio-button>
                    <a-radio-button value="static">
                        {{ $t('base.data.static') }}
                    </a-radio-button>
                    </a-radio-group>
                </a-form-item>
                <template v-if="activeItem.__config__.dataType === 'dynamic'">
                    <a-form-item :label="$t('base.url')">
                        <a-input
                            v-model:value="activeItem.__config__.url"
                            :title="activeItem.__config__.url"
                            :placeholder="$t('base.enter')"
                            allow-clear
                            @blur="fetchData(activeItem)"
                        >
                            <!-- <template #addonBefore>
                                <a-select
                                v-model:value="activeItem.__config__.method"
                                :style="{width: '85px'}"
                                @change="$emit('fetch-data', activeData)"
                                >
                                    <a-select-option value="get">
                                        get
                                    </a-select-option>
                                    <a-select-option value="post">
                                        post
                                    </a-select-option>
                                    <a-select-option value="put">
                                        put
                                    </a-select-option>
                                    <a-select-option value="delete">
                                        delete
                                    </a-select-option>
                                </a-select>
                            </template> -->
                        </a-input>
                    </a-form-item>
                    <a-form-item :label="$t('base.data.path')">
                        <a-input
                            v-model:value="activeItem.__config__.dataPath"
                            :placeholder="$t('base.enter')"
                            @blur="fetchData(activeItem)"
                        />
                    </a-form-item>

                    <template v-if="activeItem.props && activeItem.props.props">
                        <a-form-item :label="$t('base.prop.label')">
                            <a-input v-model:value="activeItem.props.props.label" :placeholder="$t('base.enter')" />
                        </a-form-item>
                        <a-form-item l:label="$t('base.prop.value')">
                            <a-input v-model:value="activeItem.props.props.value" :placeholder="$t('base.enter')" />
                        </a-form-item>
                        <a-form-item :label="$t('base.prop.children')">
                            <a-input v-model:value="activeItem.props.props.children" :placeholder="$t('base.enter')" />
                        </a-form-item>
                    </template>
                </template>
                <!-- 级联选择静态树 -->
                <!-- {{activeData.options}} -->
                <a-tree
                    draggable
                    :tree-data="activeItem.__config__.tag === 'a-cascader' ? activeItem.options : activeItem['tree-data']"
                    :field-names="{children: 'children', title: 'label', key: 'id'}"
                >
                    <template #title="data">
                        <a-dropdown :trigger="['contextmenu']">
                            <span>{{ data.label }}</span>
                            <template #overlay>
                            <a-menu>
                                <a-menu-item key="1" @click="appendTreeItem(data.dataRef)">
                                <Icon name="plus" style="color: #1890ff;" />
                                {{ $t('base.add') }}
                                </a-menu-item>
                                <a-menu-item key="2" @click="removeTreeItem(data.dataRef.id)">
                                <Icon name="delete" style="color: #eb2f96;"/>
                                {{ $t('base.remove') }}
                                </a-menu-item>
                            </a-menu>
                            </template>
                        </a-dropdown>
                    </template>
                </a-tree>
                 <div v-if="activeItem.__config__.dataType === 'static'" style="margin-left: 20px">
                     <a-button
                        style="padding-bottom: 0"
                        type="link"
                        @click="addTreeItem(activeItem.__config__.tag === 'a-cascader' ? 'options' : 'tree-data')"
                        >
                        <template #icon>
                            <Icon name="plus-circle" />
                        </template>
                        {{ $t('base.add.parent') }}
                    </a-button>
                 </div>
                <a-divider></a-divider>
            </template>

            <a-form-item v-if="activeItem.__config__.showLabel !== undefined" :label="$t('base.show.label')">
                <a-switch v-model:checked="activeItem.__config__.showLabel" />
            </a-form-item>
            <a-form-item
                v-if="activeItem.size !== undefined"
                :label="$t('base.component.size')"
                >
                <a-radio-group v-model:value="activeItem.size" button-style="solid">
                    <a-radio-button v-if="activeItem.__config__.tag !== 'a-switch'" value="large">
                    {{ $t('base.component.size.large') }}
                    </a-radio-button>
                    <a-radio-button value="default">
                    {{ $t('base.component.size.default') }}
                    </a-radio-button>
                    <a-radio-button value="small">
                    {{ $t('base.component.size.small') }}
                    </a-radio-button>
                </a-radio-group>
            </a-form-item>
            <a-form-item v-if="activeItem['show-word-limit'] !== undefined" :label="$t('base.word.limit')">
                <a-switch v-model:checked="activeItem['show-word-limit']" />
            </a-form-item>
            <a-form-item v-if="activeItem.__config__.tag === 'a-cascader'" :label="$t('base.expand.trigger')">
                <a-radio-group v-model:value="activeItem['expand-trigger']" button-style="solid">
                    <a-radio-button value="click">
                    click
                    </a-radio-button>
                    <a-radio-button value="hover">
                    hover
                    </a-radio-button>
                </a-radio-group>
            </a-form-item>
            <a-form-item v-if="activeItem.__config__.tag === 'a-cascader'" :label="$t('base.change.on.select')">
                <a-switch v-model:checked="activeItem['change-on-select']" />
            </a-form-item>
            <a-form-item v-if="activeItem.allowClear !== undefined" :label="$t('base.allow.clear')">
                <a-switch v-model:checked="activeItem.allowClear" />
            </a-form-item>
            <a-form-item v-if="activeItem.__config__.tag === 'a-upload'" :label="$t('base.file.multiple')">
                <a-switch v-model:checked="activeItem.multiple" />
            </a-form-item>
            <a-form-item v-if="activeItem['input-read-only'] !== undefined" :label="$t('base.read.only')">
                <a-switch v-model:checked="activeItem['input-read-only']" />
            </a-form-item>
            <a-form-item v-if="activeItem.disabled !== undefined" :label="$t('base.disabled')">
                <a-switch v-model:checked="activeItem.disabled" />
            </a-form-item>
            <a-form-item v-if="activeItem.showSearch !== undefined" :label="$t('base.show.search')">
                <a-switch v-model:checked="activeItem.showSearch" />
            </a-form-item>
            <a-form-item v-if="activeItem.__config__.tag === 'a-select'" :label="$t('base.mode')">
                <a-radio-group v-model:value="activeItem.mode" button-style="solid">
                    <a-radio-button value="default">
                    {{ $t('base.default') }}
                    </a-radio-button>
                    <a-radio-button value="multiple">
                    {{ $t('base.multiple') }}
                    </a-radio-button>
                </a-radio-group>
            </a-form-item>
            <a-form-item v-if="activeItem.__config__.required !== undefined" :label="$t('base.required')">
                <a-switch v-model:checked="activeItem.__config__.required" />
            </a-form-item>
            <a-form-item
                v-if="activeItem.__config__.tag === 'a-tree-select'"
                :label="$t('base.dropdown.matc.select.width')"
                >
                <a-switch v-model:checked="activeItem['dropdown-matc-select-width']" />
            </a-form-item>
            <a-form-item
                v-if="activeItem.__config__.tag === 'a-tree-select'"
                :label="$t('base.tree.default.expand.all')"
                >
                <a-switch v-model:checked="activeItem['tree-default-expand-all']" />
            </a-form-item>
            <a-form-item
                v-if="activeItem.__config__.tag === 'a-tree-select' && !activeItem['tree-checkable']"
                :label="$t('base.multiple')"
                >
                <a-switch v-model:checked="activeItem.multiple" />
            </a-form-item>
            <a-form-item v-if="activeItem.__config__.tag === 'a-tree-select'" :label="$t('base.tree.checkable')">
                <a-switch v-model:checked="activeItem['tree-checkable']" />
            </a-form-item>
            <a-form-item
                v-if="activeItem.__config__.tag === 'a-tree-select' && activeItem['tree-checkable']"
                :label="$t('base.tree.check.strictly')"
                >
                <a-switch v-model:checked="activeItem['tree-check-strictly']" />
            </a-form-item>
            <a-form-item
                v-if="activeItem.__config__.tag === 'a-tree-select' && !activeItem['tree-check-strictly']"
                :label="$t('base.label.in.value')"
                >
                <a-switch v-model:checked="activeItem['label-in-value']" />
            </a-form-item>

            <template v-if="activeItem.__config__.layoutTree">
                <a-divider>{{ $t('base.layout.tree') }}</a-divider>
                <a-tree
                    :tree-data="[activeItem]"
                    :field-names="{children: 'children', title: 'componentName', key: 'id'}"
                >
                    <template #title="{dataRef}">
                        <a-dropdown :trigger="['contextmenu']">
                            <span>
                                <itemIcon :name="dataRef.__config__?dataRef.__config__.tagIcon:dataRef.tagIcon" />
                            {{ dataRef.componentName || dataRef.__config__.componentName
                                || `${dataRef.__config__.label} : ${dataRef.__vModel__}` }}
                            </span>
                        </a-dropdown>
                    </template>
                </a-tree>
            </template>


            <!--正则-->
            <template v-if="Array.isArray(activeItem.__config__.regList)">
                <a-divider>{{ $t('base.reg.list') }}</a-divider>
                <div
                    v-for="(item, index) in activeItem.__config__.regList"
                    :key="index"
                    class="reg-item"
                >
                    <span class="close-btn" @click="activeItem.__config__.regList.splice(index, 1)">
                        <Icon :style="{ fontSize: '16px', color: '#ff4d4f' }" name="close-circle" />
                    </span>
                    <a-form-item :label="$t('base.pattern')">
                        <a-auto-complete
                            v-model:value="item.pattern"
                            :options="patternSource"
                            :placeholder="$t('base.enter.pattern')"
                            :filter-option="filterOption"
                            allow-clear
                        />
                    </a-form-item>
                    <a-form-item :label="$t('base.error.message')" style="margin-bottom:0">
                        <a-input v-model:value="item.message" :placeholder="$t('base.enter')" />
                    </a-form-item>
                </div>
                <a-button type="link" @click="addReg">
                    <template #icon>
                        <Icon name="plus-circle" />
                    </template>
                    {{ $t('base.add.reg') }}
                </a-button>
            </template>
            <!-- <a-form-item :label="$t('base.component.type')">
                <item-select :activeItem="activeItem" @itemChange="onItemChange" />
            </a-form-item>
            <a-form-item :label="$t('base.field.name')" v-if="activeItem.__vModel__!==undefined">
                <a-input v-model:value="activeItem.__vModel__" :placeholder="`${$t('base.enter')}${$t('base.field.name')} (v-model)`"></a-input>
            </a-form-item>
            <a-form-item :label="$t('base.title')">
                <a-input v-model:value="activeItem.__config__.label" :placeholder="`${$t('base.enter')}${$t('base.field.name')} (v-model)`"></a-input>
            </a-form-item>
            <component 
                :is="activeItem.__config__.tagIcon" 
                :activeItem="activeItem" 
                @updateVisible="onUpdateVisible"
            /> -->
        </template>
    </a-form>
    <icon-select 
        :visible="visible" 
        :selectedIcon="selectedIcon" 
        @select="onSelect"
        @updateVisible="onUpdateVisible"
    />
    <tree-node-modal :activeItem="activeItem" ref="treeNodeModal"></tree-node-modal>
</template>
<script>
import utils from './formItemHelper'
import iconSelect from './iconSelect'
import itemSelect from './itemSelect'
import Draggable from 'vuedraggable'
import treeNodeModal from './treeNodeModal'
export default {
    components: {
        iconSelect,
        itemSelect,
        Draggable,
        treeNodeModal
    },
    emits: ['fetchData'],
    props: ['activeItem'],
    setup(props, ctx){
        return utils(props, ctx)
    }
}
</script>