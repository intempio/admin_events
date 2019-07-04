<template>
  <section>
    <div style="height: 100vh;">
      <div style="height: 30%;" class="d-flex justify-content-center align-items-end mb-5">
        <h1>PICK A SYSTEM:</h1>
      </div>
      <div style="height: 40%;">
        <div class="row">
          <div class="col-8 p-0 offset-2 d-flex">
            <div class="col-4">
              <router-link to="/admin/clients/cf72db35-82f9-4053-a7a0-96cecc516664">
                <div class="circle">
                  <span>Events</span>
                </div>
              </router-link>
            </div>
            <div class="col-4">
              <router-link to="/products/product">
                <div class="circle">
                  <span>Products</span>
                </div>
              </router-link>
            </div>
            <div class="col-4">
              <div class="circle disabled">
                <span>People</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'systems',
    data() {
      return {
        client_id: 'cf72db35-82f9-4053-a7a0-96cecc516664',
        client_name: 'Biogen'
      }
    },
    mounted: function () {

    },
    methods: {
      goToLoginPage() {
        this.$router.push('/login');
      }
    }
  }
</script>
<style lang="scss">
  @import "../css/variables";

  .background-primary {
    background-color: $color_primary;
  }

  .circle {
    background-color: $color_primary;
    border-radius: 50%;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding-bottom: 100%;
    cursor: pointer;

    span {
      position: absolute;
      top: 43%;
      left: 22%;
      color: white;
      font-size: 26px;
      font-weight: bold;
    }

    &.disabled {
      background-color: #7f828b;
      cursor: initial;
    }
  }

  h1 {
    font-size: 32px;
    font-weight: bold;
  }
</style>
