<template>
  <section class="content main">
    <h2>Recent Updates: Sunovion</h2>

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
      <a href="/create">
        <button class="add_btn">
          <font-awesome-icon class="icon" icon="calendar-plus"/>Add
        </button>
      </a>
    </div>

    <events-list :events="events"></events-list>
  </section>
</template>

<script>
import EventsList from '../components/EventsList.vue'
import axios from 'axios'

export default {
  name: 'App',
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
  components: {
    EventsList
  },
  mounted: function() {
    axios
      //.get('https://intempio-api-v3.herokuapp.com/api/v3/list-event-admin')
      .get('http://localhost:3001/view')
      .then(response => {
        this.events = response.data['records']
        this.recentEvents = response.data['records'].filter((event, index) => {
          if (
            event.client_status == 'update' ||
            event.client_status == 'urgent' ||
            event.client_status == 'request'
          )
            return true
        })
      })
  }
}
</script>