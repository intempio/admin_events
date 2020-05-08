<template>
  <div class="events-list">
    <table border="1" class="w-100">
      <thead>
      <tr>
        <th :class="{'tbl-sort': sorting}"
            v-for="(header, i) in columns"
            :key="i"
            @click="sort(header.key)">
          <div class="d-flex align-items-center flex-nowrap">
            <span class="mr-2">{{header.label}}</span>
            <div v-if="sorting">
              <i class="material-icons" v-if="currentSort !== header.key">unfold_more</i>
              <i class="material-icons" v-if="currentSort === header.key && currentSortDir === 'asc'">expand_more</i>
              <i class="material-icons"
                 v-if="currentSort === header.key && currentSortDir === 'desc'">expand_less</i>
            </div>
          </div>
        </th>
        <th style="min-width: 170px;">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr class="sub" v-for="(event, i) in eventList" :key="i">
        <td>
          {{ event.contact }}
        </td>
        <td>{{ event.event_code }}</td>
        <td>{{ event.event_name }}</td>
        <td class="text-nowrap">{{ event.event_start }}</td>
        <td class="text-nowrap">{{ event.updated }}</td>
        <td>{{ event.client_status }}</td>
        <td>
          <router-link :to="'/admin/events/' + event.event_id">
            <button class="cstm" v-if="permissions.includes('EDIT')">Edit</button>
            <button class="cstm" v-else>See details</button>
          </router-link>
          <button @click="clone(event.event_id)"
                  class="clone cstm"
                  style="padding: 5px 10px;"
                  v-if="permissions.includes('EDIT')">Clone
          </button>
        </td>
      </tr>
      <tr v-if="!eventList.length">
        <td colspan="7">
          <span class="p-3">No results. Try changing search queries.</span>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="pagination-wrap mt-1" v-if="pagination">
      <button class="cstm" @click="prevPage">&laquo;</button>
      <b-form-input
        type="text"
        :value="getPages()"
        name="url"
        readonly
        style="width: 68px;"
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
  import orderBy from 'lodash.orderby';

  export default {
    name: 'EventsList',
    props: {
      events: Array,
      fetchEvents: Function,
      tableName: String,
      pagination: Boolean,
      sorting: Boolean
    },
    data() {
      return {
        columns: [],
        eventList: [],
        currentSort: 'event_start',
        currentSortDir: 'desc',
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
      this.columns = [
        {label: 'Contact', key: 'contact'},
        {label: 'Event Code', key: 'event_code'},
        {label: 'Event Name', key: 'event_name'},
        {label: 'Event Date', key: 'event_start'},
        {label: 'Last Updated', key: 'updated'},
        {label: 'Client Status', key: 'client_status'}
      ]
    },
    methods: {
      sort: function (s) {
        if (!this.sorting) {
          return;
        }
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
        const url = '/api/v3/events/';
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
        if (this.sorting) {
          this.eventList = orderBy(data, [this.currentSort], [this.currentSortDir])
            .filter((event, index) => {
              let start = (this.currentPage - 1) * this.pageSize;
              let end = this.currentPage * this.pageSize;
              if (index >= start && index < end) return true
            });
        } else {
          this.eventList = data.reverse();
        }
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
