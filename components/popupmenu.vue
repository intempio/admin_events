<template>
  <div class="menu-wrap">
    <template>
      <Push noOverlay width="200">
        <div v-for="(item) in clients" v-bind:key="item.client_name" class="popup-menu-item">
          <a @click="onClick(item.client_id, item.client_name)" :id="item.client_name" href="#">
            <span>{{item.client_name}}</span>
          </a>
        </div>
      </Push>
    </template>
  </div>
</template>

<script>
import { Push } from 'vue-burger-menu'
import axios from 'axios'

export default {
  name: 'popupmenu',
  props: { setClient: Function },
  data: function() {
    return {
      clients: []
    }
  },
  methods: {
    fetchClients: function() {
      const url = 'https://intempio-api-v3.herokuapp.com/api/v3/clients/'

      axios.get(url).then(response => {
        this.clients = response.data
      })
    },

    onClick: function(client_id, client_name) {
      this.setClient(client_id, client_name)
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