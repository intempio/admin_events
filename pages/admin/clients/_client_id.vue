<template>
  <section>
    <clientheader :clientid="this.$route.params.client_id" change-system="true"></clientheader>

    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-10 col-lg-12 m-auto">
          <div class="go-back-button cursor-pointer" @click="goHome()">
            <i class="material-icons mr-2">chevron_left</i>
            <h6>Home</h6>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-10 col-lg-12 m-auto">
          <section class="main-content content" id="page-wrap">
            <div id="wrap">
              <div class="filter-container" style="margin-bottom: 25px">
                <div class="row w-100 ml-0">
                  <div class="col-4 px-0">
                    <b-form-input
                      type="text"
                      class="filter-item search-input input"
                      placeholder="Search"
                      v-model="search"
                    ></b-form-input>
                  </div>
                  <div class="col-4 pr-0">
                    <div class="date-time-picker-wrap">
                      <VueCtkDateTimePicker
                        id="CtkDateTimePicker"
                        v-model="dateRange"
                        :no-button-now=true
                        :range="true"
                        :auto-close="true"
                        color="#0097e1"
                        :only-date=true
                        formatted="YYYY-MM-DD"
                        format="YYYY-MM-DD"
                      ></VueCtkDateTimePicker>
                    </div>
                  </div>
                  <div class="col-2 pr-0">
                    <button @click="onClear()"
                            class="search-icon cstm"
                            v-if="dateRange || search">
                      <i class="material-icons">clear</i>
                    </button>
                  </div>
                  <div class="col-2 pr-0 d-flex justify-content-end" v-if="permissions.includes('CREATE')">
                    <addeventmodal ref="add_event_modal" :client-id="this.$route.params.client_id"></addeventmodal>
                    <button class="add_btn cstm icon-btn" @click="AddEventModal">
                      <i class="material-icons">date_range</i>
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
              <events-list :events="events"
                           table-name="eventsList">
              </events-list>

              <h2 class="mt-5">Recent Updates:</h2>
              <events-list :events="recentEvents"
                           table-name="recentEvents">
              </events-list>
            </div>
          </section>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
  import Vue from 'vue'
  import EventsList from '../../../components/EventsList.vue'
  import addeventmodal from '../../../components/addeventpopup.vue'
  import clientheader from '../../../components/Header.vue'
  import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
  import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'
  import {restService} from '../../../plugins/axios';
  import {authService} from '../../../services/auth-service';
  import debounce from 'lodash.debounce';

  Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);

  export default {
    data() {
      return {
        currentSort: 'event_code',
        currentSortDir: 'asc',
        pageSize: 9,
        currentPage: 1,
        search: '',
        dateRange: '',
        events: [],
        recentEvents: [],
        permissions: [],
      }
    },
    created() {
      this.permissions = authService.getUserPermissions().admin;
      this.fetchEvents();
      this.fetchRecentEvents();
    },
    mounted: function () {
      this.search = this.$route.query.search || localStorage.getItem('eventSearch') || '';
    },
    methods: {
      fetchEvents: function () {
        let url = '/api/v3/events/?clientID=' + this.$route.params.client_id;
        if (this.search) {
          url += '&searchStr=' + this.search
        }

        if (this.dateRange) {
          url += '&fromDate=' + this.dateRange.start + '&toDate=' + this.dateRange.end;
        }

        restService
          .get(url)
          .then(response => {
            this.events = response.data['records'];
          })
          .catch(error => {
            this.$toast.error(`Error: ${error}`)
          })
      },
      fetchRecentEvents: function () {
        let url = '/api/v3/events/?clientID=' + this.$route.params.client_id + '&recentUpdates=true';
        restService.get(url).then(response => {
          if (response.data['records'].length) {
            this.recentEvents = response.data['records'];
          }
        }).catch(error => {
          this.$toast.error(`Error: ${error}`)
        });
      },
      AddEventModal: function (addeventmodal) {
        this.$refs.add_event_modal.open()
      },
      onSearch: function () {
        let date = new Date();
        date.setDate(date.getDate());
        let curdatestr = date.toISOString().split('T')[0];

        date.setDate(date.getDate() + 30);
        let dateTostr = date.toISOString().split('T')[0];

        let url = `/admin/clients/${this.$route.params.client_id}`;
        let params = [];
        let str = '';

        if (this.search) {
          params.push(`search=${this.search}`)
        }
        if (this.dateFrom) {
          params.push(`fromDate=${this.dateFrom}`)
        } else {
          params.push(`fromDate=` + curdatestr)
        }
        if (this.dateTo) {
          params.push(`toDate=${this.dateTo}`)
        } else {
          params.push(`toDate=` + dateTostr)
        }

        str = params.join('&');

        if (str !== '') {
          url += '?' + str
        }

        this.$router.push(url);
        this.fetchEvents();
        this.saveSearch();
      },
      onClear() {
        this.search = null;
        this.dateRange = null;
        this.fetchEvents();
        this.fetchRecentEvents();
        this.clearSearch();
      },
      goHome() {
        this.$router.push('/system-pick');
      },
      saveSearch() {
        if (this.search) {
          localStorage.setItem('eventSearch', this.search);
        }
      },
      clearSearch() {
        console.log('clearSearch')
        localStorage.removeItem('eventSearch');
      }
    },
    watch: {
      'search': debounce(function (newVal) {
        this.onSearch();
      }, 500),
      'dateRange': debounce(function (newVal) {
        if (newVal && newVal.start && newVal.end) {
          this.onSearch();
        }
      }, 500),
    },
    components: {
      EventsList,
      addeventmodal,
      clientheader
    }
  }
</script>
