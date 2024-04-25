import { PhoneNumber, PhoneNumberUtil } from 'google-libphonenumber'

export const validationUtil = {
  required: (value: string, message: string = '必須入力です') => {
    return !!value || message
  },
  numeric: (value: string, message: string = '数値を指定してください') => {
    return !isNaN(+value) || message
  },
  min: (value: number, max: number, message: string = '以上にしてください') => {
    return value >= max || `${max}${message}`
  },
  max: (value: number, max: number, message: string = '以内にしてください') => {
    return value <= max || `${max}${message}`
  },
  url: (value: string, message: string = '正しいURLを入力してください') => {
    try {
      // eslint-disable-next-line no-new
      new URL(value)
    } catch (_) {
      return message
    }
    return true
  },
  maxLength: (value: string, message: string = '文字以内にしてください', max: number) => {
    return value.length <= max || `${max}${message}`
  },
  email: (value: string, message: string = '正しいメールアドレスを入力してください') => {
    const result = String(value)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
    return !!result || message
  },
  phone: (value: string, message: string = '正しい電話番号を入力してください') => {
    if (!value) {
      return true
    }

    try {
      const util = PhoneNumberUtil.getInstance()
      const region = 'JP'
      const number: PhoneNumber = util.parseAndKeepRawInput(value, region)
      if (!util.isValidNumberForRegion(number, region)) {
        return message
      }
      return true
    } catch {
      return message
    }
  },
}
