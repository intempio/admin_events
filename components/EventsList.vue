<template>
  <div class="events-list">
    <table border="1">
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
          <td>
            <a href="#openModal">{{ event.customer_name }}</a>
            <div id="openModal" class="modalDialog">
              <div>
                <a href="#close" title="Close" class="close">X</a>
                <h2>Details</h2>
                <ul v-for="details in event.customer_details" v-bind:key="details">
                  <li>
                    <strong>Customer Name:</strong>
                    {{ details.customer_name }}
                  </li>
                  <li>
                    <strong>Phone Number:</strong>
                    {{ details.phone }}
                  </li>
                  <li>
                    <strong>Email Address:</strong>
                    {{ details.email }}
                  </li>
                </ul>
              </div>
            </div>
          </td>
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
    <button @click="prevPage">&laquo;</button>
    <button @click="nextPage">&raquo;</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'EventsList',
  data() {
    return {
      currentSort: 'event_code',
      currentSortDir: 'asc',
      pageSize: 9,
      currentPage: 1,
      search: '',
      events: []
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
      .then(response => (this.events = [...response.data, ...response.data]))
  }
}
</script>