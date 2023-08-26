
export default function($t){
    return [
        {
          label: $t('base.number'),
          value: '/^[0-9]*$/'
        },
        {
          label: $t('base.letter'),
          value: '/^[A-Za-z]+$/'
        },
        {
          label: $t('base.letter.number'),
          value: '^[A-Za-z0-9]+$'
        },
        {
          label: $t('base.letter.number.underliner'),
          value: '/^\\w+$/'
        },
        {
          label: $t('base.chinese.characters'),
          value: '/^[\u4e00-\u9fa5],{0,}$ /'
        },
        {
          label: $t('base.mail'),
          value: '/^([a-zA-Z0-9]+[_|\\_|\\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\\_|\\.]?)*[a-zA-Z0-9]+\\.[a-zA-Z]{2,3}$/'
        },
        {
          label: 'URL',
          value: '/^http://([\\w-]+\\.)+[\\w-]+(/[\\w-./?%&=]*)?$ ；^[a-zA-z]+://(w+(-w+)*)(.(w+(-w+)*))*(?S*)?$/'
        }
      ]
}