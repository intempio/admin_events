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
        <tr v-for="item in peopleAssigned" v-bind:key="item.person">
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
              <font-awesome-icon icon="times-circle"/>Remove
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="wrap-pagination-add">
      <div class="pagination-wrap">
        <button>&laquo;</button>
        <button>&raquo;</button>
      </div>
      <div class="add-new-record">
        <b-select v-model="selectedPerson" placeholder="Person">
          <option
            value="person.person_id"
            v-for="person in persons"
            v-bind:key="person.person_id"
          >{{person.first_name}} {{person.last_name}}</option>
        </b-select>
        <b-select v-model="selectedRole" placeholder="Role">
          <option v-for="role in roles" v-bind:key="role" value="role">{{role}}</option>
        </b-select>
        <button class="add_btn" @click="add">+ Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import roles from '../roles.json'
export default {
  name: 'people',
  template: '#people-assinged',
  props: { peopleAssigned: Array, persons: Array, eventId: String },
  data: function() {
    return {
      roles: roles,
      show: true,
      selectedPerson: ''
    }
  },
  methods: {
    add: function(field_name) {
      const url = 'https://intempio-api-v3.herokuapp.com/api/v3/events/'
      var data = {
        event_id: this.eventId
        /* people_assigned: [
          personId: this.persons.person_id,

        ]*/
      }

      console.log(roles)
      data[peopleAssigned] = this.peopleAssigned
      alert(event_id)
      alert(data)
      console.log(roles)
      /* axios.put(url, data, {
        headers: {
          'Content-Type': 'application/json'
        } 
      
      }),*/
    }
  },
  computed: {}
}
</script>