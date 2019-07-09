<template>
  <section>
    <clientheader :clientid="this.$route.params.client_id"></clientheader>
    <section class="main-content content main" id="page-wrap">
      <div id="wrap">
        <div class="filter-container right-align" style="margin-bottom: 25px">
          <addeventmodal ref="add_event_modal" :client-id="this.$route.params.client_id"></addeventmodal>

          <button class="add_btn" @click="AddEventModal">
            <font-awesome-icon class="icon" icon="calendar-plus"/>
            Add
          </button>
        </div>

        <events-list-client :events="events" :fetchEvents="fetchEvents"></events-list-client>
      </div>
    </section>
  </section>
</template>

<script>
  import Vue from 'vue'
  import EventsListClient from '../../../components/EventsListClient.vue'
  import addeventmodal from '../../../components/addeventpopup.vue'
  import clientheader from '../../../components/Header.vue'
  import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
  import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'
  import {restService} from '../../../plugins/axios';

  Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker)

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
      fetchEvents: function () {
        let url =
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

        restService
          .get(url)
          .then(response => {
            if (response.data['records'].length) {
              this.events = response.data['records'];
            }
          })
          .catch(error => {
            this.$toast.error(`Error: ${error}`)
          })
      },

      fetchRecentEvents: function () {
        let url =
          '/api/v3/events/?clientID=' +
          this.$route.params.client_id +
          '&recentUpdates=true'

        restService
          .get(url)
          .then(response => {
            const events = response.data['records']
            if (events.length) {
              this.recentEvents = []
            }
          })
          .catch(error => {
            this.$toast.error(`Error: ${error}`)
          })
      },

      AddEventModal: function (addeventmodal) {
        this.$refs.add_event_modal.open()
      },

      onSearch: function () {
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
      EventsListClient,
      addeventmodal,
      clientheader
    },
    mounted: function () {
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
