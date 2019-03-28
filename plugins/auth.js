import Vue from 'vue'
import authService from '../auth/authService'

const AuthPlugin = {
  install(Vue) {
    Vue.prototype.$auth = authService

    Vue.mixin({
      created() {
        if (this.handleLoginEvent) {
          authService.addListener('loginEvent', this.handleLoginEvent)
        }
      },

      destroyed() {
        if (this.handleLoginEvent) {
          authService.removeListener('loginEvent', this.handleLoginEvent)
        }
      }
    })
  }
}

Vue.use(AuthPlugin)

Vue.config.productionTip = false
