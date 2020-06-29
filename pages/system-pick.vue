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
                    <i class="material-icons mb-3">event</i>
                    <span>Events</span>
                  </div>
                </router-link>
              </div>
              <div class="col-4" v-if="visibleParts.includes('products')">
                <router-link to="/products/product">
                  <div class="tile">
                    <i class="material-icons mb-3">card_giftcard</i>
                    <span>Products</span>
                  </div>
                </router-link>
              </div>
              <div class="col-4" v-if="visibleParts.includes('people')">
                <router-link to="/people/people">
                  <div class="tile">
                    <i class="material-icons mb-3">supervisor_account</i>
                    <span>People</span>
                  </div>
                </router-link>
              </div>
              <div class="col-4"><a href="https://intempio-support-prod.herokuapp.com/qa-events">
                <div class="tile"><i class="material-icons mb-3">check</i><span>QA</span></div></a>
              </div>
			  <div class="col-4"><a href="https://intempio-support-prod.herokuapp.com/view-email">
                <div class="tile"><i class="material-icons mb-3">inbox</i><span>Emails</span></div></a>
              </div>
              <div class="col-4" v-if="visibleParts.includes('t_events')">
                <router-link to="/tentative-events">
                  <div class="tile">
                    <i class="material-icons mb-3">event_note</i>
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
      localStorage.removeItem('eventSearch');
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

  i {
    font-size: 80px;
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
