<template>
  <section>
    <clientheader></clientheader>

    <section class="main-content" id="page-wrap">
      <div id="wrap"></div>
    </section>
  </section>
</template>

<script>
import clientheader from '../components/Header.vue'
export default {
  name: 'index',
  data() {
    return {
      client_id: 'cf72db35-82f9-4053-a7a0-96cecc516664',
      client_name: 'Biogen'
    }
  },
  components: {
    clientheader
  },

  mounted: function() {
    this.$router.push({
      path: '/admin/clients/cf72db35-82f9-4053-a7a0-96cecc516664'
    })
  }
}
</script>