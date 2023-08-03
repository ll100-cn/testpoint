import { AppContext } from '@/types';
import store from '../store'

export default function(ctx: AppContext) {
  ctx.app.use(store)
}
