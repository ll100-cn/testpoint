import relativeTime from 'dayjs/plugin/relativeTime'
import zhCN from 'dayjs/locale/zh-cn'
import dayjs from 'dayjs'

dayjs.extend(relativeTime).locale(zhCN)

export default dayjs
