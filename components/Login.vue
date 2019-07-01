<template>
  <div class="c-container">
    <div class="c-flex-center-center flex-column">
      <h1 class="mb-3">New Admin System</h1>
      <div v-if="mode === 'signup'">
        <h5 class="mb-3">Please sign in to continue</h5>
      </div>
      <!--<b-button type="is-primary" outlined inverted @click="logIn" v-if="mode === 'signup'">-->
        <!--SIGN IN-->
      <!--</b-button>-->
      <button class="temporary-button" @click="logIn" v-if="mode === 'signup'">
        SIGN IN
      </button>
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

<style scoped lang="scss">
  @import "../css/variables";

  .c-container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    clip-path: polygon(100% 0, 100% 43%, 0 97%, 0 50%);
    background-color: $color_primary;
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

  .temporary-button {
    outline: 1px solid white;
    font-size: 18px;
    padding: 10px 24px;
  }

  .temporary-button:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
</style>
