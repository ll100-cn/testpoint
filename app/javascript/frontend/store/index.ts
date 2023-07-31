import { Account } from '@/models'
import { createStore } from 'vuex'
import session from './session'
import cookie from './cookie'

export default createStore({
  modules: {
    session,
    cookie
  }
})
