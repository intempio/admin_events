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
        <option v-for="project in projects" v-bind:key="project.project_id">{{project.project_name}}</option>
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
        <modal :client-status-hist="event.client_status_hist" ref="client_status_history">
          <h2 slot="header" class="colored">Client status history</h2>
          <tr slot="table-header">
            <th class="history-th-1">Person</th>
            <th class="history-th-2">Status</th>
            <th class="history-th-3">Last updated</th>
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
        <button class="history" @click="ClientStatusHistory">
          <font-awesome-icon class="icon" icon="history"/>History
        </button>
      </div>
      <b-select
        v-model="event.operations_status"
        placeholder="Operations Status"
        @input="onChange('operations_status')"
      >
        <option value="none">None</option>
        <option value="ok">Content OK</option>
        <option value="landing">Landing page OK</option>
        <option value="ac">AC Room OK</option>
        <option value="email">Email OK</option>
        <option value="2dayqa">2 day QA OK</option>
        <option value="dayofvent">Day of Event OK</option>
      </b-select>
      <div class="history-wrap">
        <modal
          :operations_status_hist="event.operations_status_hist"
          ref="operations_status_history"
        >
          <h2 slot="header" class="colored">Operations status history</h2>
          <tr slot="table-header">
            <th class="history-th-1">ID</th>
            <th class="history-th-2">Operations status</th>
            <th class="history-th-3">Updated</th>
            <th></th>
          </tr>
          <tbody slot="table-body">
            <tr v-for="id in event.operations_status_hist" v-bind:key="id.updated_by_id">
              <td>{{id.updated_by_id}}</td>
              <td>{{id.operations_status}}</td>
              <td>{{id.updated}}</td>
            </tr>
          </tbody>
        </modal>
        <button class="history" @click="OpenOperationsStatusHistory">
          <font-awesome-icon class="icon" icon="history"/>History
        </button>
      </div>
      <b-select v-model="event.qa_status" placeholder="QA Status">
        <option value="none">None</option>
        <option value="week">Week QA OK</option>
        <option value="weekissues">Week QA Issues</option>
        <option value="report">Report QA OK</option>
      </b-select>
      <div class="history-wrap">
        <modal :qa-status-hist="event.qa_status_hist" ref="qa_status_history">
          <h2 slot="header" class="colored">QA status history</h2>
          <tr slot="table-header">
            <th class="history-th-1">Updated</th>
            <th class="history-th-2">QA status</th>
            <th class="history-th-3">Last updated</th>
            <th></th>
          </tr>
          <tbody slot="table-body">
            <tr v-for="qa in event.qa_status_hist" v-bind:key="qa.qa_status">
              <td>{{qa.updated}}</td>
              <td>{{qa.qa_status}}</td>
              <td>{{qa.updated}}</td>
            </tr>
          </tbody>
        </modal>
        <button class="history" @click="QaStatusHistory">
          <font-awesome-icon class="icon" icon="history"/>History
        </button>
      </div>
      <b-select v-model="event.production_status" placeholder="Production Status">
        <option value="none">None</option>
        <option value="sent">Sent</option>
        <option value="question">Question</option>
        <option value="accepted">Accepted</option>
        <option value="denied">Denied</option>
        <option>Run Sheet OK</option>
        <option>Production Ready</option>
      </b-select>
      <div class="history-wrap">
        <modal
          :production-status-hist="event.production_status_hist"
          ref="production_status_history"
        >
          <h2 slot="header" class="colored">QA status history</h2>
          <tr slot="table-header">
            <th class="history-th-1">Updated</th>
            <th class="history-th-2">Production status</th>
            <th class="history-th-3">Updated by ID</th>
            <th></th>
          </tr>
          <tbody slot="table-body">
            <tr v-for="prod in event.production_status_hist" v-bind:key="prod.production_status">
              <td>{{prod.updated}}</td>
              <td>{{prod.production_status}}</td>
              <td>{{prod.updated_by_id}}</td>
            </tr>
          </tbody>
        </modal>
        <button class="history" @click="ProductionStatusHistory">
          <font-awesome-icon class="icon" icon="history"/>History
        </button>
      </div>
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
            formatted="MMMM Do YYYY, h:mm:ss a"
          ></vue-ctk-date-time-picker>
        </div>
        <!-- <div class="time-zones-wrap"> -->
        <b-select class="time-zones" placeholder="Time zone">
          <option selected>EST</option>
          <option>GMT</option>
          <option>CEST</option>
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
        <div class="history-wrap">
          <modal
            :production-status-hist="event.production_status_hist"
            ref="production_status_history"
          >
            <h2 slot="header" class="colored">QA status history</h2>
            <tr slot="table-header">
              <th class="history-th-1">Updated</th>
              <th class="history-th-2">Production status</th>
              <th class="history-th-3">Updated by ID</th>
              <th></th>
            </tr>
            <tbody slot="table-body">
              <tr v-for="prod in event.production_status_hist" v-bind:key="prod.production_status">
                <td>{{prod.updated}}</td>
                <td>{{prod.production_status}}</td>
                <td>{{prod.updated_by_id}}</td>
              </tr>
            </tbody>
          </modal>
          <button class="history" @click="ProductionStatusHistory">
            <font-awesome-icon class="icon" icon="history"/>History
          </button>
        </div>
      </div>
      <div class="producer-notes-wrap">
        <textarea v-model="event.producer_notes" placeholder="Producer notes" class="input">event.producer_notes</textarea>
        <div class="history-wrap">
          <modal :producer_notes_hist="event.producer_notes_hist" ref="producer_notes_history">
            <h2 slot="header" class="colored">Producer notes history</h2>
            <tr slot="table-header">
              <th class="history-th-1">Updated</th>
              <th class="history-th-2">Producer status</th>
              <th class="history-th-3">Updated by ID</th>
              <th></th>
            </tr>
            <tbody slot="table-body">
              <tr
                v-for="prodevent in event.producer_notes_hist"
                v-bind:key="prodevent.producer_status"
              >
                <td>{{prodevent.updated}}</td>
                <td>{{prodevent.production_status}}</td>
                <td>{{prodevent.updated_by_id}}</td>
              </tr>
            </tbody>
          </modal>
          <button class="history" @click="ProducerNotesHistory">
            <font-awesome-icon class="icon" icon="history"/>History
          </button>
        </div>
      </div>
      <div class="external-notes-wrap">
        <div v-show="!isHidden" class="additionals">
          <textarea v-model="event.external_notes" placeholder="External notes" class="input">event.external_notes</textarea>
          <div class="history-wrap">
            <modal :external-notes-hist="event.external_notes_hist" ref="external_notes_history">
              <h2 slot="header" class="colored">External Notes history</h2>
              <tr slot="table-header">
                <th class="history-th-1">Updated</th>
                <th class="history-th-2">External Notes</th>
                <th class="history-th-3">Updated by ID</th>
                <th></th>
              </tr>
              <tbody slot="table-body">
                <tr v-for="exnote in event.external_notes_hist" v-bind:key="exnote.external_notes">
                  <td>{{exnote.updated}}</td>
                  <td>{{exnote.external_notes}}</td>
                  <td>{{exnote.updated_by_id}}</td>
                </tr>
              </tbody>
            </modal>
            <button class="history" @click="ExternalNotesHistory">
              <font-awesome-icon class="icon" icon="history"/>History
            </button>
          </div>
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
      <people :people-assigned="event.people_assigned"></people>
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
import people from '../components/PeopleAssigned.vue'

Vue.component('vue-ctk-date-time-picker', VueCtkDateTimePicker)

export default {
  data() {
    return {
      value: null,
      isHidden: true,
      event: {},
      projects: []
    }
  },
  methods: {
    ClientStatusHistory: function(event) {
      this.$refs.client_status_history.open()
    },
    OpenOperationsStatusHistory: function(id) {
      this.$refs.operations_status_history.open()
    },
    QaStatusHistory: function(qa) {
      this.$refs.qa_status_history.open()
    },
    ProductionStatusHistory: function(prod) {
      this.$refs.production_status_history.open()
    },
    ExternalNotesHistory: function(exnote) {
      this.$refs.external_notes_history.open()
    },
    ProducerNotesHistory: function(prodnote) {
      this.$refs.producer_notes_history.open()
    },
    onChange: function(field_name) {
      console.log(field_name)
      console.log(this.event[field_name])
      const url = 'https://intempio-api-v3.herokuapp.com/api/v3/events/'
      var data = {
        event_id: this.event.event_id
      }

      data[field_name] = this.event[field_name]
      axios.put(url, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  },
  components: {
    modal,
    people
  },
  mounted: function() {
    axios
      .get(
        'https://intempio-api-v3.herokuapp.com/api/v3/events/0f51062b-0701-4a3a-a030-ac7385446e14/cf72db35-82f9-4053-a7a0-96cecc516664'
      )
      .then(response => {
        this.event = response.data['event_records'][0]
        this.projects = response.data['project_list']
      })
  }
}
</script>
