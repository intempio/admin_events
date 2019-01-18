<template id="people-assinged">
  <div class="assignee width">
    <h2 class="colored">People Assigned</h2>
    <table class="assignee-list">
      <thead>
        <tr>
          <td>Person
            <font-awesome-icon icon="caret-down" size="lg"/>
          </td>
          <td>Role
            <font-awesome-icon icon="caret-down" size="lg"/>
          </td>
          <td>Action</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in peopleAssigned" v-bind:key="item.person">
          <td>{{item.person}}</td>
          <td>{{item.role}}</td>
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
            <a>
              <font-awesome-icon icon="times-circle" @click="remove"/>Remove
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
        <b-select v-model="selectedPerson" placeholder="Person">
          <option
            v-for="person in persons"
            v-bind:key="person.person_id"
          >{{person.first_name}} {{person.last_name}}</option>
        </b-select>
        <b-select v-model="selectedRole" placeholder="Role">
          <option v-for="role in roles" v-bind:key="role" :value="role">{{role}}</option>
        </b-select>
        <button class="add_btn" @click="add">+ Add</button>
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
  props: { peopleAssigned: Array, persons: Array, eventId: String },
  data: function() {
    return {
      roles: roles,
      show: true,
      selectedPerson: '',
      selectedRole: '',
      pageSize: 3,
      currentPage: 1
    }
  },
  methods: {
    add: function(field_name) {
      // const url = 'https://intempio-api-v3.herokuapp.com/api/v3/events/'
      const url = 'http://localhost:3001/peopleassigned'
      var data = {
        event_id: this.eventId,
        people_assigned: [
          {
            person: this.selectedPerson,
            role: this.selectedRole
          }
        ]
      }

      axios
        .post(url, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          this.peopleAssigned.push({
            person: this.selectedPerson,
            role: this.selectedRole
          })
        })
        .catch(function(error) {
          console.log(error)
        })
        .then(function() {
          // always executed
        })
    },
    remove: function(index) {
      this.peopleAssigned.splice(index, 1)
    },
    nextPage: function() {
      if (this.currentPage * this.pageSize < this.peopleAssigned.length)
        this.currentPage++
    },
    prevPage: function() {
      if (this.currentPage > 1) this.currentPage--
    }
  },
  computed: {}
}
</script>