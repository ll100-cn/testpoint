
export default {
  namespaced: true,

  state () {
    return {
      // account: undefined as Account | null | undefined
    }
  },

  actions: {
    // async account({ state }, ctx): Promise<Account | null> {
    //   return navigator.locks.request("session/account", async (lock) => {
    //     if (state.account !== undefined) {
    //       return state.account
    //     }

    //     // const account = await new AccountGetRequest().setup((req) => {
    //     // }).perform(ctx)

    //     // state.account = account
    //     return state.account
    //   })
    // }
  }
}
