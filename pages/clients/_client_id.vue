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
            <span
              class="cleartext-close"
              v-show="this.search"
              @click="search = '', dateFrom='', dateTo='', onSearch()"
            >&#215;</span>

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
      let date = new Date()
      date.setDate(date.getDate())
      let curdatestr = date.toISOString().split('T')[0]

      date.setDate(date.getDate() + 30)
      let dateTostr = date.toISOString().split('T')[0]

      let url =
        'https://intempio-api-v3.herokuapp.com/api/v3/events/?clientID=' +
        this.$route.params.client_id
      if (this.search) {
        url += '&searchStr=' + this.search
        if (this.dateFrom) {
          url += '&fromDate=' + this.dateFrom + ' 09:00 AM'
        } else {
          url += '&fromDate=' + curdatestr + ' 09:00 AM'
        }
        if (this.dateTo) {
          url += '&toDate=' + this.dateTo + ' 10:00 PM'
        } else {
          url += '&toDate=' + dateTostr + ' 10:00 PM'
        }
      }

      axios.get(url).then(response => {
        this.events = response.data['records']
        if (this.events === null) {
          this.events = []
          return
        }
      })
    },

    fetchRecentEvents: function() {
      let url =
        'https://intempio-api-v3.herokuapp.com/api/v3/events/?clientID=' +
        this.$route.params.client_id

      axios.get(url).then(response => {
        const events = response.data['records']
        if (events === null) {
          this.recentEvents = []
          return
        }

        this.recentEvents = response.data['records'].filter((event, index) => {
          if (
            event.client_status == 'update' ||
            event.client_status == 'urgent' ||
            event.client_status == 'request'
          )
            return true
        })
      })
    },

    AddEventModal: function(addeventmodal) {
      this.$refs.add_event_modal.open()
    },

    onSearch: function() {
      let url = `/clients/${this.$route.params.client_id}`

      if (this.search) {
        url += `?search=${this.search}`
      }
      if (this.dateFrom) {
        url += `&fromDate=${this.dateFrom}`
      }
      if (this.dateTo) {
        url += `&toDate=${this.dateTo}`
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