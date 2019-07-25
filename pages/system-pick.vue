<template>
  <section>
    <div class="main">
      <clientheader :clientid="clientid ? clientid : ''"
                    :sidebarOff="true"
                    :changeSystem="false">
      </clientheader>
    </div>
    <div class="container-fluid" style="max-width: 1200px; height: 100vh">
      <div style="height: 36%;" class="d-flex justify-content-center align-items-end mb-5">
        <h1>PICK A SYSTEM:</h1>
      </div>
      <div style="height: 40%;">
        <div class="row">
          <div class="col-8 p-0 offset-2 d-flex justify-content-center">
            <div class="col-4" v-if="visibleParts.includes('admin')">
              <router-link to="/admin/clients/cf72db35-82f9-4053-a7a0-96cecc516664">
                <div class="circle">
                  <span>Events</span>
                </div>
              </router-link>
            </div>
            <div class="col-4" v-if="visibleParts.includes('products')">
              <router-link to="/products/product">
                <div class="circle">
                  <span>Products</span>
                </div>
              </router-link>
            </div>
            <div class="col-4" v-if="visibleParts.includes('people')">
              <router-link to="/people/people">
                <div class="circle">
                  <span>People</span>
                </div>
              </router-link>
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
  import union from 'lodash.union'
  import {PERMS} from '../const/permissions';
  import clientheader from '../components/Header.vue'

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
      this.setPermissions();
    },
    methods: {
      goToLoginPage() {
        this.$router.push('/login');
      },
      setPermissions() {
        this.roles = JSON.parse(localStorage.getItem('user_roles'));
        this.visibleParts = this.roles.reduce((p, c) => union(p, PERMS[c]), []);
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
