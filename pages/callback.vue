<template>
  <div>
    <p>Loading...</p>
  </div>
</template>

<script>
  import {utilsService} from '../services/utils-service';

  export default {
    methods: {
      handleLoginEvent(data) {
        utilsService.setToken(data.token);
        this.$router.push(data.state ? data.state.target || '/' : '/')
      }
    },
    created() {
      this.$auth.handleAuthentication()
    }
  }
</script>
