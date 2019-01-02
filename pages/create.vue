<template>
  <section class="content main">
    <div class="form-row first-row">
      <p class="event_code">
        <strong>Event Code:</strong>
        {{event.event_code}}
      </p>
      <label>
        <strong>Project:</strong>
      </label>
      <b-select placeholder="Project">
        <option>Sunovion</option>
        <option>Biogen</option>
        <option>Novartis</option>
      </b-select>
      <label>
        <strong>Event Name:</strong>
      </label>
      <input
        v-model="event.event_name"
        type="text"
        name="event_name"
        placeholder="Event Name"
        class="input"
      >
    </div>
    <div class="form-row second-row">
      <b-select v-model="event.client_status" placeholder="Client Status">
        <option value="urgent">Urgent</option>
        <option value="request">Request</option>
        <option value="update">Update</option>
        <option value="scheduled">Scheduled</option>
        <option value="cancel">Cancelled</option>
      </b-select>
      <div class="history-wrap">
        <modal :client-status-hist="event.client_status_hist" ref="modal2">
          <h2 slot="header" class="colored">Client status history</h2>
          <tr slot="table-header">
            <th>Person</th>
            <th>Status</th>
            <th>Last updated</th>
            <th></th>
          </tr>
          <tbody slot="table-body">
            <tr v-for="client in event.client_status_hist" v-bind:key="client.user_name">
              <td>{{client.user_name}}</td>
              <td>{{client.client_status}}</td>
              <td>{{client.updated}}</td>
            </tr>
          </tbody>
        </modal>
        <button class="history" @click="openHistory">
          <font-awesome-icon class="icon" icon="history"/>History
        </button>
      </div>
      <!--<button class="history">
        <font-awesome-icon class="icon" icon="history"/>History
      </button>-->
      <b-select v-model="event.operations_status" placeholder="Operations Status">
        <option value="none">None</option>
        <option value="ok">Content OK</option>
        <option value="landing">Landing page OK</option>
        <option value="ac">AC Room OK</option>
        <option value="email">Email OK</option>
        <option value="2dayqa">2 day QA OK</option>
        <option value="dayofvent">Day of Event OK</option>
      </b-select>
      <button class="history">
        <font-awesome-icon class="icon" icon="history"/>History
      </button>
      <b-select v-model="event.qa_status" placeholder="QA Status">
        <option value="none">None</option>
        <option value="week">Week QA OK</option>
        <option value="weekissues">Week QA Issues</option>
        <option value="report">Report QA OK</option>
      </b-select>
      <button class="history">
        <font-awesome-icon class="icon" icon="history"/>History
      </button>
      <b-select v-model="event.production_status" placeholder="Production Status">
        <option value="none">None</option>
        <option value="sent">Sent</option>
        <option value="question">Question</option>
        <option value="accepted">Accepted</option>
        <option value="denied">Denied</option>
        <option>Run Sheet OK</option>
        <option>Production Ready</option>
      </b-select>
      <button class="history">
        <font-awesome-icon class="icon" icon="history"/>History
      </button>
    </div>
    <div class="form-row third-row">
      <div class="pickers-wrap">
        <div class="date-time-picker-wrap">
          <vue-ctk-date-time-picker
            class="ctk-date-time-picker"
            label="Event Start"
            v-model="event.event_start"
            without-header
            :minute-interval="30"
          ></vue-ctk-date-time-picker>
        </div>
        <!-- <div class="time-zones-wrap"> -->
        <b-select class="time-zones" placeholder="Time zone">
          <option>GMT</option>
          <option>GMT+1</option>
          <option>GMT+2</option>
          <option selected>GMT-5</option>
          <option>GMT-6</option>
          <option>GMT-7</option>
          <option>GMT-8</option>
          <option>GMT-9</option>
        </b-select>
        <!--</div>-->
        <!--<div class="duration-offset-count-wrap">-->
        <input
          v-model="event.duration_minutes"
          type="text"
          name="duration"
          placeholder="Duration"
          class="input"
        >
        <input
          v-model="event.producer_offset_minutes"
          type="text"
          name="prod_offset"
          placeholder="Producer offset"
          class="input"
        >
        <input
          v-model="event.producer_count"
          type="text"
          name="prod_count"
          placeholder="Producer count"
          class="input"
        >
        <!--</div>-->
      </div>
    </div>
    <div class="form-row fourth-row">
      <div class="internal-notes-wrap">
        <textarea v-model="event.internal_notes" placeholder="Internal notes" class="input">event.internal_notes</textarea>
        <button class="history">
          <font-awesome-icon class="icon" icon="history"/>History
        </button>
      </div>
      <div class="producer-notes-wrap">
        <textarea v-model="event.producer_notes" placeholder="Producer notes" class="input">event.producer_notes</textarea>
        <button class="history">
          <font-awesome-icon class="icon" icon="history"/>History
        </button>
      </div>
      <div class="external-notes-wrap">
        <div v-show="!isHidden" class="additionals">
          <textarea v-model="event.external_notes" placeholder="External notes" class="input">event.external_notes</textarea>
          <button class="history">
            <font-awesome-icon class="icon" icon="history"/>History
          </button>
        </div>
        <button
          @click="isHidden = !isHidden"
          class="add_btn"
          id="showNotesBtn"
          v-show="isHidden"
        >+ External Notes</button>
      </div>
    </div>
    <div class="form-row fifth-row">
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
            <tr>
              <td>
                <a href="#openModal">Michelle Jordan</a>
              </td>
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
              <td>Primary Contact</td>
              <td>
                <a>
                  <font-awesome-icon icon="edit"/>Edit
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <a href="#openModal">Edward Colegado</a>
              </td>
              <td>Producer</td>
              <td>
                <a>
                  <font-awesome-icon icon="edit"/>Edit
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <a href="#openModal">Shylla Punzalan</a>
              </td>
              <td>Lead Operations</td>
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
      <div class="checklists width">
        <h2 class="colored">Checklists</h2>
        <table class="assignee-list">
          <thead>
            <tr>
              <td>Items
                <font-awesome-icon icon="caret-down" size="lg"/>
              </td>
              <td>Content
                <font-awesome-icon icon="caret-down" size="lg"/>
              </td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Deck 1</td>
              <td>some text</td>
              <td>
                <a>
                  <font-awesome-icon icon="edit"/>Edit
                </a>
              </td>
            </tr>
            <tr>
              <td>Deck 2</td>
              <td>some text 2</td>
              <td>
                <a>
                  <font-awesome-icon icon="edit"/>Edit
                </a>
              </td>
            </tr>
            <tr>
              <td>Speaker 1</td>
              <td>some text 3</td>
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
            <b-select placeholder="Items">
              <option>Name</option>
              <option>Description</option>
              <option>Producer-onsite</option>
              <option>Seminar-room</option>
              <option>Recording</option>
              <option>Audio Number</option>
            </b-select>
            <input type="text" name="url" placeholder="some text 4" class="input input-items">
            <button class="add_btn">+ Add</button>
          </div>
        </div>
      </div>
    </div>
    <div class="form-row sixth-row">
      <div class="product-sec width">
        <h2 class="colored">Products</h2>
        <table class="assignee-list">
          <thead>
            <tr>
              <td>Item name
                <font-awesome-icon icon="caret-down" size="lg"/>
              </td>
              <td>Content
                <font-awesome-icon icon="caret-down" size="lg"/>
              </td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name</td>
              <td>test text</td>
              <td>
                <a>
                  <font-awesome-icon icon="edit"/>Edit
                </a>
              </td>
            </tr>
            <tr>
              <td>Description</td>
              <td>some text here</td>
              <td>
                <a>
                  <font-awesome-icon icon="edit"/>Edit
                </a>
              </td>
            </tr>
            <tr>
              <td>Producer-onsite</td>
              <td>some text here</td>
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
            <input type="text" name="url" placeholder="input some text " class="input input-items">
            <button class="add_btn">+ Add</button>
          </div>
        </div>
      </div>
      <div class="client width">
        <h2 class="colored">Clients</h2>
        <table class="assignee-list">
          <thead>
            <tr>
              <td>Item
                <font-awesome-icon icon="caret-down" size="lg"/>
              </td>
              <td>Description
                <font-awesome-icon icon="caret-down" size="lg"/>
              </td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PO#</td>
              <td>some text</td>
              <td>
                <a>
                  <font-awesome-icon icon="edit"/>Edit
                </a>
              </td>
            </tr>
            <tr>
              <td>Event Identifier</td>
              <td>some text here</td>
              <td>
                <a>
                  <font-awesome-icon icon="edit"/>Edit
                </a>
              </td>
            </tr>
            <tr>
              <td>Brand</td>
              <td>Some text here</td>
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
            <b-select placeholder="Items">
              <option>PO#</option>
              <option>Event Identifier</option>
              <option>Brand</option>
            </b-select>
            <input type="text" name="url" placeholder="input some text " class="input input-items">
            <button class="add_btn">+ Add</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.min.css'
import axios from 'axios'
import modal from '../components/History.vue'

Vue.component('vue-ctk-date-time-picker', VueCtkDateTimePicker)

export default {
  data() {
    return {
      value: null,
      isHidden: true,
      event: []
    }
  },
  methods: {
    openHistory: function(event) {
      this.$refs.modal2.open()
    }
  },
  components: {
    modal
  },
  mounted: function() {
    axios.get('http://localhost:3001/edit').then(response => {
      this.event = response.data['records'][0]
    })
  }
}
</script>
