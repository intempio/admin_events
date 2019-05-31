<template>
  <loginComponent mode="signup"></loginComponent>
</template>

<script>
  import loginComponent from '../components/Login';

  export default {
    name: 'login',
    components: {loginComponent},
    mounted: function () {
    }
  }
</script>
