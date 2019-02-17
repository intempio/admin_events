<template>
  <section class="content main">
    <h2>Recent Updates:</h2>

    <events-list :events="recentEvents"></events-list>

    <div class="filter-container" style="margin-bottom: 25px">
      <div class="search-input-field-name cleartext-wrap">
        <input type="text" class="filter-item search-input" placeholder="Search" v-model="search">
        <span
          class="cleartext-close"
          v-show="this.search != ''"
          @click="search = '', onSearch()"
        >&#215;</span>
        <button @click="onSearch()" class="search-icon">
          <font-awesome-icon icon="search"/>
        </button>
      </div>

      <addeventmodal ref="add_event_modal" :client-id="clientId"></addeventmodal>

      <button class="add_btn" @click="AddEventModal">
        <font-awesome-icon class="icon" icon="calendar-plus"/>Add
      </button>
    </div>

    <events-list :events="events" :fetchEvents="fetchEvents"></events-list>
  </section>
</template>

<script>
import EventsList from '../components/EventsList.vue'
import addeventmodal from '../components/addeventpopup.vue'

import axios from 'axios'

export default {
  name: 'ClientMain',
  props: { clientId: String },
  data() {
    return {
      currentSort: 'event_code',
      currentSortDir: 'asc',
      pageSize: 9,
      currentPage: 1,
      search: '',
      events: [],
      recentEvents: []
    }
  },
  watch: {
    clientId: function() {
      this.fetchEvents()
    }
  },
  methods: {
    fetchEvents: function() {
      const url =
        'https://intempio-api-v3.herokuapp.com/api/v3/events/?clientID=' +
        this.clientId +
        '&fromDate=2019-01-01 10:20 AM&toDate=2019-12-31 10:30 PM&searchStr=' +
        this.search

      axios.get(url).then(response => {
        this.events = response.data['records']
        if (this.events === null) {
          this.events = []
          if (this.search === '') {
            this.recentEvents = []
          }
          return
        }
        if (this.search === '') {
          this.recentEvents = response.data['records'].filter(
            (event, index) => {
              if (
                event.client_status == 'update' ||
                event.client_status == 'urgent' ||
                event.client_status == 'request'
              )
                return true
            }
          )
        }
      })
    },

    AddEventModal: function(addeventmodal) {
      this.$refs.add_event_modal.open()
    },

    onSearch: function() {
      this.fetchEvents()
    }
  },
  components: {
    EventsList,
    addeventmodal
  },
  mounted: function() {
    this.fetchEvents()
  }
}
</script>