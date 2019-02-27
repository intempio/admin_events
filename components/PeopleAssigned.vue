<template id="people-assinged">
  <div class="assignee width">
    <h2 class="colored">People Assigned</h2>
    <table class="assignee-list">
      <thead>
        <tr>
          <td class="tbl-sort" @click="sort('person')">Person
            <font-awesome-icon icon="caret-down" size="lg"/>
          </td>
          <td class="tbl-sort" @click="sort('person_role')">Role
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
        <b-select v-model="selectedPersonId" placeholder="Person">
          <option
            :value="person.person_id"
            v-for="person in persons"
            v-bind:key="person.person_id"
          >{{person.first_name}} {{person.last_name}}</option>
        </b-select>
        <b-select v-model="selectedRole" placeholder="Role">
          <option v-for="role in roles" v-bind:key="role" :value="role">{{role}}</option>
        </b-select>
        <button class="add_btn" @click="add()">+ Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import roles from '../roles.json'
import axios from 'axios'
export default {
  name: 'people',
  template: '#people-assinged',
  props: { eventId: String },
  data: function() {
    return {
      persons: [],
      peopleAssigned: [],
      roles: roles,
      show: true,
      selectedPerson: '',
      selectedRole: '',
      selectedPersonId: '',
      currentSort: 'first_name',
      currentSortDir: 'asc',
      pageSize: 3,
      currentPage: 1,
      personsDict: []
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
    fetchPersons: function() {
      axios
        .get('https://intempio-api-v3.herokuapp.com/api/v3/persons/')
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

    fetchPeopleAssigned: function(personsDict) {
      const url =
        'https://intempio-api-v3.herokuapp.com/api/v3/eventpersons/?eventID=' +
        this.eventId

      axios.get(url).then(response => {
        this.peopleAssigned = response.data
      })
    },

    add: function(field_name) {
      const url = 'https://intempio-api-v3.herokuapp.com/api/v3/eventpersons/'
      var data = {
        event_id: this.eventId,
        person_id: this.selectedPersonId,
        person_role: this.selectedRole
      }

      axios
        .post(url, data, {
          headers: {
            'Content-Type': 'application/json'
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

    remove: function(index, person_id) {
      const url = 'https://intempio-api-v3.herokuapp.com/api/v3/eventpersons/'
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
              'Content-Type': 'application/json'
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