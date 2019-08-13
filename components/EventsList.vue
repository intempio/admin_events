<template>
  <div class="events-list">
    <table border="1" class="w-100">
      <thead>
      <tr>
        <th class="tbl-sort" @click="sort('contact')">
          <div class="d-flex align-items-center flex-nowrap">
            <span class="mr-2">Contact</span>
            <font-awesome-icon icon="sort" size="lg" v-if="currentSort !== 'contact'"/>
            <font-awesome-icon icon="caret-down" size="lg"
                               v-if="currentSort === 'contact' && currentSortDir === 'asc'"/>
            <font-awesome-icon icon="caret-up" size="lg"
                               v-if="currentSort === 'contact' && currentSortDir === 'desc'"/>
          </div>
        </th>
        <th class="tbl-sort" @click="sort('event_code')">
          <div class="d-flex align-items-center flex-nowrap">
            <span class="mr-2">Event Code</span>
            <font-awesome-icon icon="sort" size="lg" v-if="currentSort !== 'event_code'"/>
            <font-awesome-icon icon="caret-down" size="lg"
                               v-if="currentSort === 'event_code' && currentSortDir === 'asc'"/>
            <font-awesome-icon icon="caret-up" size="lg"
                               v-if="currentSort === 'event_code' && currentSortDir === 'desc'"/>
          </div>
        </th>
        <th class="tbl-sort" @click="sort('event_name')">
          <div class="d-flex align-items-center flex-nowrap">
            <span class="mr-2">Event Name</span>
            <font-awesome-icon icon="sort" size="lg" v-if="currentSort !== 'event_name'"/>
            <font-awesome-icon icon="caret-down" size="lg"
                               v-if="currentSort === 'event_name' && currentSortDir === 'asc'"/>
            <font-awesome-icon icon="caret-up" size="lg"
                               v-if="currentSort === 'event_name' && currentSortDir === 'desc'"/>
          </div>
        </th>
        <th class="tbl-sort" @click="sort('event_start')">
          <div class="d-flex align-items-center flex-nowrap">
            <span class="mr-2">Event Date</span>
            <font-awesome-icon icon="sort" size="lg" v-if="currentSort !== 'event_start'"/>
            <font-awesome-icon icon="caret-down" size="lg"
                               v-if="currentSort === 'event_start' && currentSortDir === 'asc'"/>
            <font-awesome-icon icon="caret-up" size="lg"
                               v-if="currentSort === 'event_start' && currentSortDir === 'desc'"/>
          </div>
        </th>
        <th class="tbl-sort" @click="sort('updated')">
          <div class="d-flex align-items-center flex-nowrap">
            <span class="mr-2">Last Updated</span>
            <font-awesome-icon icon="sort" size="lg" v-if="currentSort !== 'updated'"/>
            <font-awesome-icon icon="caret-down" size="lg"
                               v-if="currentSort === 'updated' && currentSortDir === 'asc'"/>
            <font-awesome-icon icon="caret-up" size="lg"
                               v-if="currentSort === 'updated' && currentSortDir === 'desc'"/>
          </div>
        </th>
        <th class="tbl-sort" @click="sort('client_status')">
          <div class="d-flex align-items-center flex-nowrap">
            <span class="mr-2">Client Status</span>
            <font-awesome-icon icon="sort" size="lg" v-if="currentSort !== 'client_status'"/>
            <font-awesome-icon icon="caret-down" size="lg"
                               v-if="currentSort === 'client_status' && currentSortDir === 'asc'"/>
            <font-awesome-icon icon="caret-up" size="lg"
                               v-if="currentSort === 'client_status' && currentSortDir === 'desc'"/>
          </div>
        </th>
        <th style="min-width: 170px;">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr class="sub" v-for="event in eventList" v-bind:key="event.event_id">
        <td>
          {{ event.contact }}
        </td>
        <td>{{ event.event_code }}</td>
        <td>{{ event.event_name }}</td>
        <td>{{ event.event_start }}</td>
        <td>{{ event.updated }}</td>
        <td>{{ event.client_status }}</td>
        <td>
          <router-link :to="'/admin/events/' + event.event_id">
            <button class="cstm" v-if="permissions.includes('EDIT')">Edit</button>
            <button class="cstm" v-else>See details</button>
          </router-link>
          <button @click="clone(event.event_id)" class="clone cstm" v-if="permissions.includes('EDIT')">Clone</button>
        </td>
      </tr>
      <tr v-if="!eventList.length">
        <td colspan="7">
          <span class="p-3">No results. Try changing search queries.</span>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="pagination-wrap mt-1">
      <button class="cstm" @click="prevPage">&laquo;</button>
      <b-form-input
        type="text"
        :value="getPages()"
        name="url"
        readonly
        style="width: 50px;"
        class="input input-items mx-1"
      ></b-form-input>
      <b-select v-model="pageSize" placeholder="Items" style="width: 100px">
        <option :value="item.value"
                v-for="item in paginationOptions"
                :key="item.value">{{item.label}}
        </option>
      </b-select>
      <button @click="nextPage" class="mx-1 cstm">&raquo;</button>
    </div>
  </div>
</template>

<script>
  import {restService} from '../plugins/axios';
  import {authService} from '../services/auth-service';
  import {tableService} from '../services/table-service';

  export default {
    name: 'EventsList',
    props: {events: Array, fetchEvents: Function, tableName: String},
    data() {
      return {
        eventList: [],
        currentSort: 'event_code',
        currentSortDir: 'asc',
        pageSize: 10,
        currentPage: 1,
        paginationOptions: [],
        search: '',
        allPages: 1,
        permissions: []
      }
    },
    created() {
      this.permissions = authService.getUserPermissions().admin;
      this.paginationOptions = [
        {label: '10', value: 10},
        {label: '25', value: 25},
        {label: '50', value: 50},
      ];
      this.pageSize = tableService.getTableSettings(this.tableName);
    },
    methods: {
      sort: function (s) {
        if (s === this.currentSort) {
          this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
        }
        this.currentSort = s;
        this.sortedEvents();
      },
      getPages() {
        return `${this.currentPage}/${this.allPages}`
      },
      nextPage: function () {
        if (this.currentPage * this.pageSize < this.events.length) {
          this.currentPage++;
          this.sortedEvents();
        }
      },
      prevPage: function () {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.sortedEvents();
        }
      },
      clone: async function (event_id) {
        const url = '/api/v3/events/'
        var data = {
          event_id: event_id,
          clone: 'True'
        };

        restService
          .post(url, data)
          .then(response => {
            this.$router.push(`/admin/events/${response.data.event_id}`)
          })
          .catch(error => {
            this.$toast.error(`Error: ${error}`);
          })
      },
      sortedEvents() {
        let data = JSON.parse(JSON.stringify(this.events));
        this.eventList = data
          .sort((a, b) => {
            let modifier = 1;
            if (this.currentSortDir === 'desc') modifier = -1;
            if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
            if (a[this.currentSort] > b[this.currentSort]) return modifier;
            return 0;
          })
          .filter((event, index) => {
            let start = (this.currentPage - 1) * this.pageSize;
            let end = this.currentPage * this.pageSize;
            if (index >= start && index < end) return true
          });
        this.allPages = Math.ceil(this.events.length / this.pageSize);
      }
    },
    watch: {
      events: function (val) {
        if (val) {
          this.sortedEvents();
        }
      },
      pageSize: function () {
        this.sortedEvents();
        tableService.saveTableSettings(this.tableName, this.pageSize);
      }
    }
  }
</script>
