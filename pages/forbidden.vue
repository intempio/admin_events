<template>
  <section class="h-100vh">
    <div class="h-100 d-flex align-items-center">
      <div class="d-flex justify-content-center align-items-center h-25 w-100 text-white">
        <div class="row w-75">
          <div class="col-3 d-flex mt-2 justify-content-end">
            <i class="material-icons" :style="{'color': 'white', 'fontSize': '100px' }">clear</i>
          </div>
          <div class="col-9 d-flex flex-column">
            <h1>403</h1>
            <h5>Forbidden!</h5>
            <p>
              You have no permissions to access this page, please contact administrator.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'forbidden'
  }
</script>
<style scoped lang="scss">
  @import "../css/variables";

  .h-100vh {
    height: 100vh;
  }

  .h-25 {
    background-color: $color_primary;
  }

</style>
