<template>
  <div class="recent-updates">
    <table border="1" class="updates_tbl scroll">
      <thead>
        <tr>
          <th class="tbl-sort" @click="sort('customer_name')">Contact
            <font-awesome-icon icon="caret-down" size="lg"/>
          </th>
          <th class="tbl-sort" @click="sort('event_code')">Event Code
            <font-awesome-icon icon="caret-down" size="lg"/>
          </th>
          <th class="tbl-sort" @click="sort('event_name')">Event Name
            <font-awesome-icon icon="caret-down" size="lg"/>
          </th>
          <th class="tbl-sort" @click="sort('event_date')">Event Date
            <font-awesome-icon icon="caret-down" size="lg"/>
          </th>
          <th class="tbl-sort" @click="sort('last_updated')">Last Updated
            <font-awesome-icon icon="caret-down" size="lg"/>
          </th>
          <th class="tbl-sort" @click="sort('client_status')">Client Status
            <font-awesome-icon icon="caret-down" size="lg"/>
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr class="sub" v-for="event in sortedEvents" v-bind:key="event.event_code">
          <td>{{ event.customer_name }}</td>
          <td>{{ event.event_code }}</td>
          <td>{{ event.event_name }}</td>
          <td>{{ event.event_date }}</td>
          <td>{{ event.last_updated }}</td>
          <td>{{ event.client_status }}</td>
          <td>
            <a href="/create">
              <button>Edit</button>
            </a>
            <button class="clone">Clone</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="prev-next-btn-wrap">
      <button @click="prevPage">&laquo;</button>
      <button @click="nextPage">&raquo;</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'RecentUpdates',
  data() {
    return {
      currentSort: 'event_code',
      currentSortDir: 'asc',
      search: '',
      events: [],
      pageSize: 3,
      currentPage: 1
    }
  },
  methods: {
    sort: function(s) {
      //if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = s
    },
    nextPage: function() {
      if (this.currentPage * this.pageSize < this.events.length)
        this.currentPage++
    },
    prevPage: function() {
      if (this.currentPage > 1) this.currentPage--
    }
  },
  computed: {
    sortedEvents: function() {
      return this.events
        .sort((a, b) => {
          let modifier = 1
          if (this.currentSortDir === 'desc') modifier = -1
          if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier
          if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier
          return 0
        })
        .filter((row, index) => {
          let start = (this.currentPage - 1) * this.pageSize
          let end = this.currentPage * this.pageSize
          if (index >= start && index < end) return true
        })
    }
  },
  mounted: function() {
    axios
      .get('https://intempio-api-v3.herokuapp.com/api/v3/list-event-admin')
      .then(response => (this.events = response.data))
  }
}
</script>