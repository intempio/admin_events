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
              <font-awesome-icon icon="edit"/>Edit
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
        <b-select placeholder="Person">
          <option>Shylla Punzalan</option>
          <option>Jeff Ceniza</option>
          <option>Jove Aso</option>
          <option>Michelle Jordan</option>
          <option>Jaclyn Stephens</option>
          <option>Edward Colegado</option>
        </b-select>
        <b-select placeholder="Role">
          <option>Lead Operations</option>
          <option>Lead Producer</option>
          <option>CSR</option>
          <option>Primary Contact</option>
          <option>Producer</option>
        </b-select>
        <button class="add_btn">+ Add</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'people',
  template: '#people-assinged',
  props: { peopleAssigned: Array },
  data: function() {
    return { show: true }
  },
  methods: {},
  computed: {}
}
</script>