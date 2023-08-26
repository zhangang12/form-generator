import { createI18n } from 'vue-i18n'
import zhCn from './lang/zh-CN'
import enUs from './lang/en-US'

export const defaultLang = 'zh-CN'
const messages = {
  'zh-CN': {
    ...zhCn
  },
  'en-US': {
    ...enUs
  }
}

const i18n = new createI18n({
  legacy: false,
  globalInjection: true,
  locale: defaultLang,
  messages
})

export default i18n