<template>
  <section class="content main">
    <h2>Recent Client Updates</h2>
    <div class="recent-updates">
      <table border="1" class="updates_tbl">
        <thead>
          <tr>
            <th></th>
            <th>Contact <img src="~/assets/sort.png" class="tbl-sort" @click="sort('customer_name')"></th>
            <th>Event Code <img src="~/assets/sort.png" class="tbl-sort" @click="sort('event_code')"></th>
            <th>Event Name <img src="~/assets/sort.png" class="tbl-sort" @click="sort('event_name')"></th>
            <th>Event Date <img src="~/assets/sort.png" class="tbl-sort" @click="sort('event_name')"></th>
            <th>Last Updated <img src="~/assets/sort.png" class="tbl-sort" @click="sort('last_updated')"></th>
            <th>Client Status <img src="~/assets/sort.png" class="tbl-sort" @click="sort('last_updated')"></th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr class="sub" v-for="event in sortedEvents" v-bind:key="event.event_code">
            <td></td>
            <td>Michelle Jordan</td>
            <td>100001</td>
            <td>HCP Virtual Program</td>
            <td>2018-11-07 01:00</td>
            <td>2018-10-31</td>
            <td>Client update</td>
            <td>
              <a href="/create">
                <button>Edit</button>
              </a>
              <button class="clone">Clone</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="filter-container" style="margin-bottom: 25px">
      <input type="text" style="width: 200px;" class="filter-item search-input" placeholder="Search" v-model="search" />
      <!-- <img src="~/assets/search.png" class="search-icon">-->
      <a href="/create">
        <button class="add"><img src="~/assets/add-event.png"> Add</button>
      </a>
    </div>

    <table border="1">
      <thead>
        <tr>
          <th>Contact <img src="~/assets/sort.png" class="tbl-sort" @click="sort('customer_name')"></th>
          <th>Event Code <img src="~/assets/sort.png" class="tbl-sort" @click="sort('event_code')"></th>
          <th>Event Name <img src="~/assets/sort.png" class="tbl-sort" @click="sort('event_name')"></th>
          <th>Event Date <img src="~/assets/sort.png" class="tbl-sort" @click="sort('event_name')"></th>
          <th>Last Updated <img src="~/assets/sort.png" class="tbl-sort" @click="sort('last_updated')"></th>
          <th>Client Status <img src="~/assets/sort.png" class="tbl-sort" @click="sort('last_updated')"></th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr class="sub" v-for="event in sortedEvents" v-bind:key="event.event_code">
          <td>
            <a href="#openModal">{{event.customer_name}}</a>
            <div id="openModal" class="modalDialog">
              <div>
                <a href="#close" title="Close" class="close">X</a>
                <h2>Details</h2>
                <ul v-for="details in event.customer_details" v-bind:key="details">
                  <li>
                    <strong>Phone Number:</strong> {{details.phone}}</li>
                  <li>
                    <strong>Email Address:</strong> {{details.email}}</li>
                </ul>
              </div>
            </div>
          </td>
          <td>{{event.event_code}}</td>
          <td>{{event.event_name}}</td>
          <td>{{event.event_date}}</td>
          <td>{{event.last_updated}}</td>
          <td>{{event.client_status}}</td>
          <td>
            <a href="/create">
              <button>Edit</button>
            </a>
            <button class="clone">Clone</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="prevPage">&laquo; Previous</button>
    <button @click="nextPage">Next &raquo;</button>

  </section>
</template>

<script>
import _ from 'lodash';

export default {
  data() {
    return {
      currentSort: 'event_code',
      currentSortDir: 'asc',
      pageSize: 9,
      currentPage: 1,
      search: '',
      events: [
        {
          customer_name: 'Jacqueline Duhe',
          customer_details: [
            {
              phone: 1234567890,
              email: 'test@test.com',
            },
          ],
          event_code: 100001,
          event_name: 'HCP Virtual Program',
          event_date: '2018-11-07 01:00',
          last_updated: '2018-10-31',
          client_status: 'Client update',
        },
        {
          customer_name: 'Jason Morris',
          customer_details: [
            {
              phone: 1222222890,
              email: 'tes2t@test.com',
            },
          ],
          event_code: 100002,
          event_name: 'Webcast',
          event_date: '2018-11-07 13:00',
          last_updated: '2018-09-29',
          client_status: 'Cancelled',
        },
        {
          customer_name: 'Yael Even-Levy',
          event_code: 100003,
          event_name: 'Virtual Program',
          event_date: '2018-11-07 02:00',
          last_updated: '2018-08-25',
          client_status: 'Scheduled',
        },
        {
          customer_name: 'Bart Jacques',
          event_code: 100005,
          event_name: 'Webcast',
          event_date: '2018-11-07 14:00',
          last_updated: '2018-09-29',
          client_status: 'Cancelled',
        },
        {
          customer_name: 'Brian Giglio',
          event_code: 100004,
          event_name: 'Virtual Program',
          event_date: '2018-11-07 03:00',
          last_updated: '2018-08-25',
          client_status: 'Scheduled',
        },
        {
          customer_name: 'Doug Barnhill',
          event_code: 100006,
          event_name: 'HCP Virtual Program',
          event_date: '2018-11-07 01:00',
          last_updated: '2018-10-31',
          client_status: 'Client update',
        },
        {
          customer_name: 'Michelle Jordan',
          event_code: 100007,
          event_name: 'Webcast',
          event_date: '2018-11-07 13:00',
          last_updated: '2018-09-29',
          client_status: 'Cancelled',
        },
        {
          customer_name: 'Tim Sainz',
          event_code: 100008,
          event_name: 'Virtual Program',
          event_date: '2018-11-07 02:00',
          last_updated: '2018-08-25',
          client_status: 'Scheduled',
        },
        {
          customer_name: 'Renuka Patel',
          event_code: 100009,
          event_name: 'Webcast',
          event_date: '2018-11-07 14:00',
          last_updated: '2018-09-29',
          client_status: 'Cancelled',
        },
        {
          customer_name: 'Jacqueline Duhe',
          event_code: 100014,
          event_name: 'Virtual Program',
          event_date: '2018-11-07 03:00',
          last_updated: '2018-08-25',
          client_status: 'Scheduled',
        },
        {
          customer_name: 'Yael Even-Levy',
          event_code: 100011,
          event_name: 'HCP Virtual Program',
          event_date: '2018-11-07 01:00',
          last_updated: '2018-10-31',
          client_status: 'Client update',
        },
        {
          customer_name: 'Jason Morris',
          event_code: 100012,
          event_name: 'Webcast',
          event_date: '2018-11-07 13:00',
          last_updated: '2018-09-29',
          client_status: 'Cancelled',
        },
        {
          customer_name: 'Joseph Shupp',
          event_code: 100013,
          event_name: 'Virtual Program',
          event_date: '2018-11-07 02:00',
          last_updated: '2018-08-25',
          client_status: 'Scheduled',
        },
        {
          customer_name: 'Michelle Jordan',
          event_code: 100015,
          event_name: 'Webcast',
          event_date: '2018-11-07 14:00',
          last_updated: '2018-09-29',
          client_status: 'Cancelled',
        },
        {
          customer_name: 'Doug Barnhill',
          event_code: 100014,
          event_name: 'Virtual Program',
          event_date: '2018-11-07 03:00',
          last_updated: '2018-08-25',
          client_status: 'Scheduled',
        },
        {
          customer_name: 'Yael Even-Levy',
          event_code: 100021,
          event_name: 'HCP Virtual Program',
          event_date: '2018-11-07 01:00',
          last_updated: '2018-10-31',
          client_status: 'Client update',
        },
        {
          customer_name: 'Wanda Castro-Borrero',
          event_code: 100022,
          event_name: 'Webcast',
          event_date: '2018-11-07 13:00',
          last_updated: '2018-09-29',
          client_status: 'Cancelled',
        },
        {
          customer_name: 'Brian Giglio',
          event_code: 100023,
          event_name: 'Virtual Program',
          event_date: '2018-11-07 02:00',
          last_updated: '2018-08-25',
          client_status: 'Scheduled',
        },
        {
          customer_name: 'Jaclyn Stephens',
          event_code: 100025,
          event_name: 'Webcast',
          event_date: '2018-11-07 14:00',
          last_updated: '2018-09-29',
          client_status: 'Cancelled',
        },
        {
          customer_name: 'Tim Sainz',
          event_code: 100024,
          event_name: 'Virtual Program',
          event_date: '2018-11-07 03:00',
          last_updated: '2018-08-25',
          client_status: 'Scheduled',
        },
      ],
    };
  },
  methods: {
    sort: function(s) {
      //if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
      }
      this.currentSort = s;
    },
    nextPage: function() {
      if (this.currentPage * this.pageSize < this.events.length)
        this.currentPage++;
    },
    prevPage: function() {
      if (this.currentPage > 1) this.currentPage--;
    },
  },
  computed: {
    sortedEvents: function() {
      return this.events
        .sort((a, b) => {
          let modifier = 1;
          if (this.currentSortDir === 'desc') modifier = -1;
          if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
          if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
          return 0;
        })
        .filter((row, index) => {
          let start = (this.currentPage - 1) * this.pageSize;
          let end = this.currentPage * this.pageSize;
          if (index >= start && index < end) return true;
        });
    },
  },
};
</script>
