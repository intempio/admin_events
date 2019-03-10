<template>
  <section>
    <div class="head">
      <div class="header-admin">
        <img src="~/assets/operation.png" class="mobile_btn">
        <span>Operations Admin</span>
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
      currentclient: ''
    }
  },
  watch: {
    clientid: function() {
      this.currentclientname()
    }
  },
  methods: {
    fetchClients: function() {
      const url = process.env.VUE_APP_API + '/api/v3/clients/'

      axios.get(url).then(response => {
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
        console.log(this.clientid)
        console.log(this.clients)
        console.log(filteredclient)
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