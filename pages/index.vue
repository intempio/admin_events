<template>
  <section>
    <div class="head">
      <div class="header-admin">
        <img src="~/assets/operation.png" class="mobile_btn">
        <span>Operations Admin</span>
      </div>
      <div class="header-projects">{{client_name}}</div>
    </div>

    <popupmenu :set-client="setClient"></popupmenu>

    <section class="main-content" id="page-wrap">
      <div id="wrap">
        <client-main :client-id="client_id"></client-main>
      </div>
    </section>
  </section>
</template>

<script>
import ClientMain from '../components/ClientMain.vue'
import popupmenu from '../components/popupmenu.vue'
import axios from 'axios'
export default {
  name: 'index',
  data() {
    return {
      client_id: 'cf72db35-82f9-4053-a7a0-96cecc516664',
      client_name: 'Biogen'
    }
  },
  components: {
    ClientMain,
    popupmenu
  },
  methods: {
    setClient: function(client_id, client_name) {
      this.client_id = client_id
      this.client_name = client_name
    }
  }
}
</script>