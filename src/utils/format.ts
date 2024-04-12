import { Autolinker, type Match } from 'autolinker'
import dayjs from '~/lib/day'

export const formatUtil = {
  toMileage: (value: number | string | null, fixed: number = 1) => {
    if (!value) {
      return '-'
    }

    return `${parseFloat((+value / 10000).toString()).toFixed(fixed)}万km`
  },

  toArea: (prefecture: string, locality: string) => {
    if (!prefecture && !locality) {
      return '-'
    }

    return (prefecture || '') + (locality || '')
  },

  toLocaleVehicleInspection: (value: string | null, unknownVehicleInspection: boolean) => {
    if (value) {
      return dayjs(value).format('YYYY年M月')
    }

    return unknownVehicleInspection ? 'あり' : '-'
  },

  toFormatVehicleInspection: (value: string | null) => {
    if (!value) {
      return value
    }

    return dayjs(value).format('YYYY-MM-DD')
  },

  toFirstDate: (year?: number, month?: number) => {
    if (!year || !month) {
      return ''
    }

    return dayjs()
      .year(year)
      .month(month - 1)
      .date(1)
      .hour(9)
      .minute(0)
      .second(0)
      .toISOString()
  },

  toLocaleDateString: (value: string | null) => {
    if (!value) {
      return value
    }

    return dayjs.utc(value).local().format('YYYY年MM月DD日')
  },

  toLink: (value: string) => {
    return Autolinker.link(value)
  },

  getUrls: (value: string): string[] => {
    const matches = Autolinker.parse(value, {
      urls: true,
    })

    // eslint-disable-next-line require-jsdoc
    const getUrls = (matche: Match) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return typeof (matche as any).getUrl === 'function'
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (matche as any).getUrl()
        : ''
    }

    return matches.map((v) => getUrls(v)).filter((v) => v !== '')
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toOffset: (page: any, limit: number) => {
    return +page! ? (+page! - 1) * limit : 0
  },

  /**
   * 和暦からISO8601形式で日付を取得する
   *
   * @params wareki 和暦
   */
  toIso8601: (wareki: string) => {
    let vehicleInspection = dayjs('')
    if (wareki) {
      vehicleInspection = dayjs(wareki.replace('年', '-').replace('月', ''))
    }
    return vehicleInspection.isValid() ? vehicleInspection.format('YYYY-MM-01') : ''
  },
  toTenThousand: (value: number | string | null, fixed: number = 1) => {
    if (!value && typeof value !== 'number') {
      return ''
    }

    return parseFloat((+value / 10000).toString()).toFixed(fixed)
  },
}
