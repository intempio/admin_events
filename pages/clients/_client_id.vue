<template>
  <section>
    <clientheader :clientid="this.$route.params.client_id"></clientheader>
    <section class="main-content content main" id="page-wrap">
      <div id="wrap">
        <h2>Recent Updates:</h2>

        <events-list :events="recentEvents"></events-list>

        <div class="filter-container" style="margin-bottom: 25px">
          <div class="search-input-field-name cleartext-wrap">
            <input
              type="text"
              class="filter-item search-input input"
              placeholder="Search"
              v-model="search"
            >

            <div class="inputs-wrap from">
              <div class="date-time-picker-wrap">
                <vue-ctk-date-time-picker
                  v-model="dateFrom"
                  class="ctk-date-time-picker"
                  label="From"
                  disable-time
                  without-header
                  formatted="DD-MM-YYYY"
                  format="YYYY-MM-DD"
                ></vue-ctk-date-time-picker>
              </div>
            </div>

            <div class="inputs-wrap from">
              <div class="date-time-picker-wrap">
                <vue-ctk-date-time-picker
                  v-model="dateTo"
                  class="ctk-date-time-picker"
                  label="to"
                  without-header
                  disable-time
                  formatted="DD-MM-YYYY"
                  format="YYYY-MM-DD"
                ></vue-ctk-date-time-picker>
              </div>
            </div>

            <button @click="onSearch()" class="search-icon">
              <font-awesome-icon icon="search"/>
            </button>

            <button
              class="search-icon clear"
              v-show="this.search || (this.dateFrom && this.dateTo)"
              @click="search = '', dateFrom='', dateTo='', onSearch()"
            >
              <font-awesome-icon icon="times-circle"/>
            </button>
          </div>

          <addeventmodal ref="add_event_modal" :client-id="this.$route.params.client_id"></addeventmodal>

          <button class="add_btn" @click="AddEventModal">
            <font-awesome-icon class="icon" icon="calendar-plus"/>Add
          </button>
        </div>

        <events-list :events="events" :fetchEvents="fetchEvents"></events-list>
      </div>
    </section>
  </section>
</template>

<script>
import Vue from 'vue'
import EventsList from '../../components/EventsList.vue'
import addeventmodal from '../../components/addeventpopup.vue'
import clientheader from '../../components/Header.vue'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.min.css'
import axios from 'axios'
Vue.component('vue-ctk-date-time-picker', VueCtkDateTimePicker)

export default {
  data() {
    return {
      currentSort: 'event_code',
      currentSortDir: 'asc',
      pageSize: 9,
      currentPage: 1,
      search: '',
      events: [],
      recentEvents: [],
      dateFrom: '',
      dateTo: ''
    }
  },

  methods: {
    fetchEvents: function() {
      const accessToken = this.$auth.getAccessToken()
      console.log(accessToken)
      let url =
        process.env.VUE_APP_API +
        '/api/v3/events/?clientID=' +
        this.$route.params.client_id
      if (this.search) {
        url += '&searchStr=' + this.search
      }

      if (this.dateFrom) {
        url += '&fromDate=' + this.dateFrom
      }

      if (this.dateTo) {
        url += '&toDate=' + this.dateTo
      }

      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then(response => {
          this.events = response.data['records']
          if (this.events === null) {
            this.events = []
            return
          }
        })
    },

    fetchRecentEvents: function() {
      //console.log(process.env.VUE_APP_API)
      let url =
        process.env.VUE_APP_API +
        '/api/v3/events/?clientID=' +
        this.$route.params.client_id +
        '&recentUpdates=true'

      axios.get(url).then(response => {
        const events = response.data['records']
        if (events === null) {
          this.recentEvents = []
          return
        }

        this.recentEvents = response.data['records']
      })
    },

    AddEventModal: function(addeventmodal) {
      this.$refs.add_event_modal.open()
    },

    onSearch: function() {
      let date = new Date()
      date.setDate(date.getDate())
      let curdatestr = date.toISOString().split('T')[0]

      date.setDate(date.getDate() + 30)
      let dateTostr = date.toISOString().split('T')[0]

      let url = `/clients/${this.$route.params.client_id}`
      let params = []
      let str = ''

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

      str = params.join('&')

      if (str !== '') {
        url += '?' + str
      }

      this.$router.push(url)
      this.fetchEvents()
    }
  },
  components: {
    EventsList,
    addeventmodal,
    clientheader
  },
  mounted: function() {
    this.search = this.$route.query.search
    if (this.$route.query.fromDate && this.$route.query.toDate) {
      this.dateFrom = this.$route.query.fromDate
      this.dateTo = this.$route.query.toDate
    }

    this.fetchEvents()
    this.fetchRecentEvents()
  }
}
</script>