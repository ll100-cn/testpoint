import { DATETIME_LONG_FORMAT, DATE_FORMAT } from '@/constants'
import dayjs from 'dayjs'

export function date(time: string | null, pattern: string = DATE_FORMAT) {
  if (time == null) {
    return null
  }

  return dayjs(time).format(pattern)
}

export function datetime(time: Date | null, pattern: string = DATETIME_LONG_FORMAT) {
  if (time == null) {
    return null
  }

  return dayjs(time).format(pattern)
}