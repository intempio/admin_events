<template>
  <div class="c-container">
    <div class="c-flex-center-center flex-column">
      <h1 class="mb-3">New Admin System</h1>
      <div v-if="mode === 'signup'">
        <h5 class="mb-3">Please sign in to continue</h5>
      </div>
      <b-button type="is-primary" outlined inverted @click="logIn" v-if="mode === 'signup'">
        SIGN IN
      </b-button>
      <h3 v-if="mode !== 'signup'">Loading...</h3>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login-component',
    props: ['mode'],
    methods: {
      logIn() {
        this.$auth.login();
      }
    }
  }
</script>

<style scoped>
  .c-container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    clip-path: polygon(100% 0, 100% 43%, 0 97%, 0 50%);
    background-color: #0097e1;
    font-size: 18px;
  }

  .c-container > div {
    margin-bottom: 22px;
  }

  h1, h3, h5 {
    text-transform: lowercase;
    color: aliceblue;
  }

  h1 {
    font-size: 32px;
  }
</style>
