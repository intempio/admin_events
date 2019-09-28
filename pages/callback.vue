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
        const redirectUrl = localStorage.getItem('requestedUrl');
        if (redirectUrl) {
          this.$router.push(redirectUrl);
          localStorage.removeItem('requestedUrl');
        } else {
          this.$router.push('/system-pick');
        }
      });
    }
  }
</script>
