<template>
  <section>
    <div class="main">
      <clientheader :clientid="clientid ? clientid : ''"
                    :sidebarOff="true"
                    :changeSystem="false">
      </clientheader>
    </div>
    <div class="container-fluid" style="max-width: 1200px; height: 100vh">
      <div style="height: 26%;" class="d-flex justify-content-center align-items-end mb-5">
        <h1>PICK A SYSTEM:</h1>
      </div>
      <div style="height: 40%;">
        <div class="row">
          <div class="col-8 p-0 offset-2">
            <div class="row d-flex justify-content-center">
              <div class="col-4" v-if="visibleParts.includes('admin')">
                <router-link to="/admin/clients/cf72db35-82f9-4053-a7a0-96cecc516664">
                  <div class="tile">
                    <font-awesome-icon class="fa-5x mb-3" icon="calendar-week"/>
                    <span>Events</span>
                  </div>
                </router-link>
              </div>
              <div class="col-4" v-if="visibleParts.includes('products')">
                <router-link to="/products/product">
                  <div class="tile">
                    <font-awesome-icon class="fa-5x mb-3" icon="box-open"/>
                    <span>Products</span>
                  </div>
                </router-link>
              </div>
              <div class="col-4" v-if="visibleParts.includes('people')">
                <router-link to="/people/people">
                  <div class="tile">
                    <font-awesome-icon class="fa-5x mb-3" icon="user-friends"/>
                    <span>People</span>
                  </div>
                </router-link>
              </div>
              <div class="col-4" v-if="visibleParts.includes('t_events')">
                <router-link to="/tentative-events">
                  <div class="tile">
                    <font-awesome-icon class="fa-5x mb-3" icon="calendar-day"/>
                    <span>T-events</span>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="row fixed-bottom" style="height: 50px; background-color: lightgray">
          <div class="col-4 mx-auto mt-3">
            <h6 class="text-center">system version: {{appVersion}}</h6>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import * as packageJson from '../package.json';
  import clientheader from '../components/Header.vue'
  import {authService} from '../services/auth-service'

  export default {
    name: 'systems',
    components: {clientheader},
    roles: [],
    data() {
      return {
        clientid: '',
        client_id: 'cf72db35-82f9-4053-a7a0-96cecc516664',
        client_name: 'Biogen',
        appVersion: '',
        visibleParts: [],
        roles: []
      }
    },
    mounted: function () {
      this.appVersion = packageJson.version;
    },
    created() {
      this.visibleParts = Object.keys(authService.getUserPermissions());
    },
    methods: {
      goToLoginPage() {
        this.$router.push('/login');
      },
    }
  }
</script>
<style lang="scss" scoped>
  @import "../css/variables";

  .background-primary {
    background-color: $color_primary;
  }

  a:hover {
    text-decoration: none;
  }

  .tile {
    border: 1px solid $color_primary;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 40px;
    margin-bottom: 24px;

    &:hover:not(.disabled) {
      background-color: lighten($color_primary, 50%);
    }

    &.disabled {
      background-color: #7f828b;
      cursor: initial;
    }
  }

  h1 {
    font-size: 32px;
    color: $color_primary;
  }

  span {
    font-weight: bold;
    font-size: 20px;
  }
</style>
