<template>
  <div class="c-container">
    <div class="c-flex-center-center flex-column">
      <div>
        <h5 class="mb-3 text-white">Thanks for reaching out!</h5>
      </div>
      <button class="temporary-button cstm" @click="goBack" style="font-size: 15px">
        Submit another form
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    methods: {
      goBack() {
        this.$router.push('/event-form-open');
      }
    }
  }
</script>
