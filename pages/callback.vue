<template>
  <loginComponent mode="loading"></loginComponent>
</template>

<script>
  import loginComponent from '../components/Login';

  export default {
    name: 'callback',
    components: {loginComponent},
    mounted() {
      this.$auth.handleAuthentication().then(() => {
        this.$router.push('/system-pick');
      });
    }
  }
</script>
