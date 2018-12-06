<template>
  <section class="content main">
    <div class="filter-container" style="margin-bottom: 25px">
      <input type="text" style="width: 200px;" class="filter-item search-input" placeholder="Search" v-model="search" />
      <button class="search"><img src="~/assets/search.png"></button>
      <a href="/create">
        <button class="add"><img src="~/assets/add-event.png"> Add</button>
      </a>
    </div>

    <table border="1">
      <thead>
        <tr>
          <th v-for="column in columns" v-bind:key="column">{{ column }} <img src="~/assets/sort.png" class="tbl-sort"></th>
          <th class="sub head">Status
            <tr class="sub-head">
              <th>Ops</th>
              <th>Prod</th>
              <th>Client</th>
              <th>QA</th>
            </tr>
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr class="sub" v-for="event in orderedEvents" v-bind:key="event.event_code">
          <td>{{event.customer_name}}</td>
          <td>{{event.event_code}}</td>
          <td>{{event.event_name}}</td>
          <td>{{event.last_updated}}</td>
          <td>
            <tr class="sub-head" v-for="stat in event.status" v-bind:key="stat">
              <td>{{stat.ops}}</td>
              <td>{{stat.prod}}</td>
              <td>{{stat.client}}</td>
              <td>{{stat.qa}}</td>
            </tr>
          </td>
          <td>
            <button>Edit</button>
            <button class="clone">Clone</button>
          </td>
        </tr>
      </tbody>
    </table>

  </section>
</template>

<script>
import _ from 'lodash';

export default {
  data() {
    return {
      sortKey: '',
      reverse: false,
      search: '',
      columns: ['Customer Name', 'Event Code', 'Event Name', 'Last Updated'],
      events: [
        {
          customer_name: 'Sunovion',
          event_code: 100001,
          event_name: 'HCP Virtual Program',
          last_updated: '2018-10-31',
          status: [
            {
              ops: 'Content OK',
              prod: 'Accepted',
              client: 'Client update',
              qa: 'Week QA OK',
            },
          ],
        },
        {
          customer_name: 'Biogen',
          event_code: 100002,
          event_name: 'Webcast',
          last_updated: '2018-09-29',
          status: [
            {
              ops: 'Landing page OK',
              prod: 'Sent',
              client: 'Cancelled',
              qa: 'Report QA OK',
            },
          ],
        },
        {
          customer_name: 'Sunovion',
          event_code: 100003,
          event_name: 'Virtual Program',
          last_updated: '2018-08-25',
          status: [
            {
              ops: 'Day of Event OK',
              prod: 'Denied',
              client: 'Scheduled',
              qa: 'Week QA Issues',
            },
          ],
        },
        {
          customer_name: 'Biogen',
          event_code: 100005,
          event_name: 'Webcast',
          last_updated: '2018-09-29',
          status: [
            {
              ops: 'Landing page OK',
              prod: 'Sent',
              client: 'Cancelled',
              qa: 'Report QA OK',
            },
          ],
        },
        {
          customer_name: 'Sunovion',
          event_code: 100004,
          event_name: 'Virtual Program',
          last_updated: '2018-08-25',
          status: [
            {
              ops: 'Day of Event OK',
              prod: 'Denied',
              client: 'Scheduled',
              qa: 'Week QA Issues',
            },
          ],
        },
      ],
    };
  },
  methods: {
    columnSort: function(events) {
      return _.orderBy(this.events, 'event_code');
    },
  },
  computed: {
    orderedEvents: function() {
      let events = this.events;
      events = this.columnSort(events);

      return events;
      // return _.orderBy(this.events, 'customer_name');
    },
  },
  /* methods: {
    sortBy: function(sortKey) {
      this.reverse = this.sortKey == sortKey ? !this.reverse : false;

      this.sortKey = sortKey;
    },
  },*/
};
</script>
