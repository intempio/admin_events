<template>
  <section>
    <div class="head">
      <div class="header-admin">
        <img src="~/assets/operation.png" class="mobile_btn">
        <span>Operations Admin</span>
      </div>
      <div v-if="!isAuthenticated">
        <a @click="login" class="login-style">Login</a>
      </div>
      <div v-if="isAuthenticated">
        <a @click="logout" class="login-style">Logout</a>
      </div>

      <div class="header-projects">{{currentclient}}</div>
    </div>
    <div class="menu-wrap">
      <template>
        <Push noOverlay width="200">
          <div v-for="(item) in clients" v-bind:key="item.client_name" class="popup-menu-item">
            <router-link :id="item.client_name" :to="'/clients/' + item.client_id">
              <span>{{item.client_name}}</span>
            </router-link>
          </div>
        </Push>
      </template>
    </div>
  </section>
</template>

<script>
import { Push } from 'vue-burger-menu'
import axios from 'axios'

export default {
  name: 'clientheader',
  props: { clientid: String },
  data: function() {
    return {
      clients: [],
      currentclient: '',
      isAuthenticated: false
    }
  },
  async created() {
    try {
      await this.$auth.renewTokens()
    } catch (e) {
      console.log(e)
    }
  },
  watch: {
    clientid: function() {
      this.currentclientname()
    }
  },
  methods: {
    login() {
      this.$auth.login()
    },
    logout() {
      this.$auth.logOut()
    },
    handleLoginEvent(data) {
      this.isAuthenticated = data.loggedIn
      this.profile = data.profile
    },

    fetchClients: async function() {
      const accessToken = await this.$auth.getAccessToken()

      const url = process.env.VUE_APP_API + '/api/v3/clients/'

      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then(response => {
          this.clients = response.data
          this.currentclientname()
        })
    },
    currentclientname: function() {
      //debugger
      let filteredclient
      if (this.clientid == undefined || this.clients == []) {
        this.currentclient = ''
      } else {
        filteredclient = this.clients.filter(
          client => client.client_id === this.clientid
        )
        //console.log(this.clientid)
        //console.log(this.clients)
        //console.log(filteredclient)
        if (filteredclient[0] === undefined) return
        //debugger
        this.currentclient = filteredclient[0].client_name
      }
    }
  },
  components: {
    Push
  },
  mounted: function() {
    this.fetchClients()
  }
}
</script>