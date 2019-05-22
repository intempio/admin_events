<template>
  <section>
    <Spinner v-if="isLoading"></Spinner>
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
            <router-link :id="item.client_name" :to="'/admin/clients/' + item.client_id">
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
import {restService} from '../plugins/axios';
import {utilsService} from '../services/utils-service';
import Spinner from '../components/Spinner'
export default {
  name: 'clientheader',
  props: { clientid: String },
  data: function() {
    return {
      isLoading: false,
      clients: [],
      currentclient: '',
      isAuthenticated: false
    }
  },
  async created() {
    utilsService.loading.subscribe(val => this.isLoading = val);
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

    fetchClients: function() {
      const url = '/api/v3/clients/'

      restService.get(url)
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
    Push,
    Spinner
  },
  mounted: function() {
    this.fetchClients()
  }
}
</script>
