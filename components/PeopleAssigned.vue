<template id="people-assinged">
  <div class="assignee width">
    <h2 class="colored">People Assigned</h2>
    <table class="assignee-list">
      <thead>
        <tr>
          <td class="tbl-sort" @click="sort('person')">
            Person
            <font-awesome-icon icon="caret-down" size="lg"/>
          </td>
          <td class="tbl-sort" @click="sort('person_role')">
            Role
            <font-awesome-icon icon="caret-down" size="lg"/>
          </td>
          <td>Action</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in sortedPeopleAssigned" v-bind:key="item.person_id">
          <td>{{item.person}}</td>
          <td>{{item.person_role}}</td>
          <!--<div id="openModal" class="modalDialog">
                  <div>
                    <a href="#close" title="Close" class="close">X</a>
                    <h2>Details</h2>
                    <p>
                      <strong>Phone Number:</strong> 124334656456
                    </p>
                    <p>
                      <strong>Email Address:</strong> test@test.com
                    </p>
                  </div>
          </div>-->
          <td>
            <a @click="remove(index, item.person_id)">
              <font-awesome-icon icon="times-circle"/>Remove
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="wrap-pagination-add">
      <div class="pagination-wrap">
        <button @click="prevPage">&laquo;</button>
        <button @click="nextPage">&raquo;</button>
      </div>
      <div class="add-new-record">
        <b-select v-model="selectedPersonId" placeholder="Person" class="eventtag-select">
          <option
            :value="person.person_id"
            v-for="person in persons"
            v-bind:key="person.person_id"
          >{{person.first_name}} {{person.last_name}}</option>
        </b-select>
        <!--
        <b-select v-model="selectedRole" placeholder="Role" class="input-items">
          <option v-for="role in people_assigned_roles" v-bind:key="role" :value="role">{{role}}</option>
        </b-select>
        -->
        <div class="mselect-wrapper">
          <model-select
            :options="people_assigned_roles"
            v-model="selectedRole"
            placeholder="Role"
            class="css-select"
          ></model-select>
        </div>

        <button class="add_btn" @click="add()">+ Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { PEOPLE_ASSIGNED_ROLES } from '../components/constants.js'
import { ModelSelect } from 'vue-search-select'

export default {
  name: 'people',
  template: '#people-assinged',
  props: { eventId: String },
  data: function() {
    let people_assigned_roles = PEOPLE_ASSIGNED_ROLES.map(item => ({
      value: item,
      text: item
    }))

    if (process.env.PEOPLE_ASSIGNED_ROLES) {
      people_assigned_roles = process.env.PEOPLE_ASSIGNED_ROLES.split(',').map(
        item => ({
          value: item.trim(),
          text: item.trim()
        })
      )
    }

    return {
      persons: [],
      peopleAssigned: [],
      show: true,
      selectedPerson: '',
      selectedRole: '',
      selectedPersonId: '',
      currentSort: 'first_name',
      currentSortDir: 'asc',
      pageSize: 10,
      currentPage: 1,
      personsDict: [],
      people_assigned_roles,
      options2: [
        { value: '1', text: 'aa' },
        { value: '2', text: 'ab' },
        { value: '3', text: 'bc' },
        { value: '4', text: 'cd' },
        { value: '5', text: 'de' }
      ],
      item2: ''
    }
  },
  watch: {
    eventId: function(val) {
      if (val !== undefined) {
        this.fetchPeopleAssigned()
        this.fetchPersons()
      }
    }
  },
  methods: {
    fetchPersons: async function() {
      const accessToken = await this.$auth.getAccessToken()

      const url = process.env.VUE_APP_API + '/api/v3/persons/'

      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then(response => {
          this.persons = response.data
          this.personsDict = this.persons.reduce(
            (obj, person) => ({
              [person.person_id]: person,
              ...obj
            }),
            {}
          )
          this.fetchPeopleAssigned()
        })
        .catch(function(error) {
          console.log(error)
        })
        .then(function() {
          // always executed even with catched errors
        })
    },

    fetchPeopleAssigned: async function(personsDict) {
      const accessToken = await this.$auth.getAccessToken()

      const url =
        process.env.VUE_APP_API +
        '/api/v3/eventpersons/?eventID=' +
        this.eventId

      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then(response => {
          this.peopleAssigned = response.data
        })
    },

    add: async function(field_name) {
      const accessToken = await this.$auth.getAccessToken()

      const url = process.env.VUE_APP_API + '/api/v3/eventpersons/'
      var data = {
        event_id: this.eventId,
        person_id: this.selectedPersonId,
        person_role: this.selectedRole
      }

      axios
        .post(url, data, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then(response => {
          this.fetchPeopleAssigned()
        })
        .catch(function(error) {
          console.log(error)
        })
        .then(function() {
          // always executed
        })
    },

    remove: async function(index, person_id) {
      const accessToken = await this.$auth.getAccessToken()

      const url = process.env.VUE_APP_API + '/api/v3/eventpersons/'
      var data = {
        event_id: this.eventId,
        person_id: person_id
      }
      axios
        .delete(
          url,
          { data },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`
            }
          }
        )
        .then(response => {
          this.peopleAssigned.splice(index, 1)
        })
        .catch(function(error) {
          console.log(error)
        })
        .then(function() {
          // always executed
        })
    },

    sort: function(s) {
      //if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = s
    },

    nextPage: function() {
      if (this.currentPage * this.pageSize < this.peopleAssigned.length)
        this.currentPage++
    },
    prevPage: function() {
      if (this.currentPage > 1) this.currentPage--
    }
  },

  components: {
    ModelSelect
  },
  computed: {
    sortedPeopleAssigned: function() {
      const peopleassigned =
        this.peopleAssigned == null ? [] : this.peopleAssigned

      return peopleassigned
        .sort((a, b) => {
          let modifier = 1
          if (this.currentSortDir === 'desc') modifier = -1
          if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier
          if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier
          return 0
        })
        .filter((event, index) => {
          let start = (this.currentPage - 1) * this.pageSize
          let end = this.currentPage * this.pageSize
          if (index >= start && index < end) return true
        })
    }
  }
}
</script>
