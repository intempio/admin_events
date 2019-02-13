<template>
  <section class="content main">
    <h2>Recent Updates:</h2>

    <events-list :events="recentEvents" :is-recent="true"></events-list>

    <div class="filter-container" style="margin-bottom: 25px">
      <div class="search-input-field-name">
        <input
          type="text"
          style="width: 200px;"
          class="filter-item search-input"
          placeholder="Search"
          v-model="search"
        >
        <button class="search-icon">
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
        this.clientId

      axios.get(url).then(response => {
        this.events = response.data['records']
        if (this.events === null) {
          this.events = []
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