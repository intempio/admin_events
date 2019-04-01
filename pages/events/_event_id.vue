<template>
  <section>
    <clientheader :clientid="clientid"></clientheader>
    <section class="main-content content main" id="page-wrap">
      <div class="form-row first-row">
        <p class="event_code">
          <strong>Event Code:</strong>
          {{event.event_code}}
        </p>
        <label>
          <strong>Project:</strong>
        </label>
        <!--
      <b-select placeholder="Project">
        <option v-for="project in projects" v-bind:key="project.project_id">{{project.project_name}}</option>
      </b-select>
        -->
        <label>
          <strong>Event Name:</strong>
        </label>
        <input
          v-model="event.event_name"
          type="text"
          name="event_name"
          placeholder="Event Name"
          class="input"
          @input="onChange('event_name')"
        >
      </div>
      <div class="form-row second-row">
        <statusupdatemodal
          ref="status_update_modal"
          :saveCallback="onChange"
          fieldName="client_status"
        ></statusupdatemodal>
        <div class="client-status-history-wrap">
          <div class="client-status-wrap">
            <label class="field-headers">Client Status:</label>
            <b-select v-model="event.client_status" placeholder="Client Status">
              <option value="cancelled">Cancelled</option>
              <option value="in process">In Process</option>
              <option value="last minute cancelled">Last Minute Cancelled</option>
              <option value="potential">Potential</option>
              <option value="request">Request</option>
              <option value="rescheduled">Rescheduled</option>
              <option value="scheduled">Scheduled</option>
              <option value="update">Update</option>
              <option value="urgent">Urgent</option>
            </b-select>
          </div>
          <div class="history-wrap hist-left-margin">
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
        </div>
        <div class="client-status-history-wrap">
          <div class="client-status-wrap">
            <label class="field-headers">Operation Status:</label>
            <b-select v-model="event.operations_status" placeholder="Operations Status">
              <option value="none">None</option>
              <option value="content - ok">Content - OK</option>
              <option value="ac room - ok">AC Room - OK</option>
              <option value="email - ok">Email - OK</option>
              <option value="landing page - ok">Landing Page - OK</option>
              <option value="last min">Last min</option>
              <option value="urgent 48">Urgent 48</option>
              <option value="rescheduled">Rescheduled</option>
              <option value="pending event info">Pending Event Info</option>
            </b-select>
          </div>
          <div class="history-wrap hist-left-margin">
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
        </div>
        <div class="client-status-history-wrap">
          <div class="client-status-wrap">
            <label class="field-headers">QA Status:</label>
            <b-select
              v-model="event.qa_status"
              placeholder="QA Status"
              @input="onChange('qa_status')"
            >
              <option value="none">None</option>
              <option value="qa issues">QA Issues</option>
              <option value="report qa - ok">Report QA - OK</option>
              <option value="week qa - ok">Week QA - OK</option>
              <option value="3rd day qa - ok">3rd day QA - OK</option>
              <option value="2 day qa - ok">2 Day QA - OK</option>
              <option value="sod qa - ok">SOD QA - OK</option>
            </b-select>
          </div>
          <div class="history-wrap hist-left-margin">
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
        </div>
        <div class="client-status-history-wrap">
          <div class="client-status-wrap">
            <label class="field-headers">Production Status:</label>
            <b-select
              v-model="event.production_status"
              placeholder="Production Status"
              @input="onChange('production_status')"
            >
              <option value="none">None</option>
              <option value="accepted">Accepted</option>
              <option value="denied">Denied</option>
              <option value="question">Question</option>
              <option value="sent">Sent</option>
              <option value="ac room - ok">AC Room - OK</option>
              <option value="client content - ok">Client Content - OK</option>
              <option value="event report - ok">Event Report - OK</option>
              <option value="helpdesk - ok">Helpdesk - OK</option>
              <option value="landing page - ok">Landing Page - OK</option>
              <option value="production ready - ok">Production Ready - OK</option>
            </b-select>
          </div>
          <div class="history-wrap hist-left-margin">
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
                <tr
                  v-for="prod in event.production_status_hist"
                  v-bind:key="prod.production_status"
                >
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
      </div>
      <div class="form-row third-row">
        <div class="pickers-wrap">
          <div class="inputs-wrap">
            <label class="field-headers">Event Start:</label>
            <div class="date-time-picker-wrap">
              <vue-ctk-date-time-picker
                class="ctk-date-time-picker"
                v-model="event.event_start"
                label
                without-header
                :minute-interval="15"
                formatted="MMMM Do YYYY, h:mm:ss"
                time-format="'H:mm:ss"
              ></vue-ctk-date-time-picker>
            </div>
          </div>
          <div class="inputs-wrap">
            <label class="field-headers-1">Time zone:</label>
            <b-select v-model="event.time_zone" class="time-zones" placeholder="Time zone">
              <option value="EST" selected>EST</option>
              <option value="GMT">GMT</option>
              <option value="CEST">CEST</option>
            </b-select>
          </div>
          <div class="inputs-wrap">
            <label class="field-headers-1 item2">Duration( minutes):</label>
            <input
              v-model="event.duration_minutes"
              type="text"
              name="duration"
              placeholder="Duration"
              class="input"
              @input="onChangeTimeout('duration_minutes')"
            >
          </div>
          <div class="inputs-wrap">
            <label class="field-headers-1 item3">Producer offset:</label>
            <b-select
              v-model="event.producer_offset_minutes"
              placeholder="Producer offset"
              @input="onChange('producer_offset_minutes')"
            >
              <option value="0">0</option>
              <option value="60" selected>60</option>
              <option value="120">120</option>
            </b-select>
          </div>
          <div class="inputs-wrap">
            <label class="field-headers-1 item4">Producer count:</label>
            <input
              v-model="event.producer_count"
              type="text"
              name="prod_count"
              placeholder="Producer count"
              class="input"
              @input="onChangeTimeout('producer_count')"
            >
          </div>
        </div>
      </div>
      <div class="form-row fourth-row">
        <div class="internal-notes-wrap">
          <label class="field-headers-2 item5">Internal notes:</label>
          <textarea
            v-model="event.internal_notes"
            placeholder="Internal notes"
            class="input"
            @input="onChangeTimeout('internal_notes')"
          >event.internal_notes</textarea>
          <div class="history-wrap">
            <modal
              :production-status-hist="event.production_status_hist"
              ref="production_status_history"
            >
              <h2 slot="header" class="colored">Internal notes history</h2>
              <tr slot="table-header">
                <th class="history-th-1">Updated</th>
                <th class="history-th-2">Production status</th>
                <th class="history-th-3">Updated by ID</th>
                <th></th>
              </tr>
              <tbody slot="table-body">
                <tr
                  v-for="prod in event.production_status_hist"
                  v-bind:key="prod.production_status"
                >
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
          <label class="field-headers-2 item6">Producer notes:</label>
          <textarea
            v-model="event.producer_notes"
            placeholder="Producer notes"
            class="input"
            @input="onChangeTimeout('producer_notes_hist')"
          >event.producer_notes_hist</textarea>
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
                  <td>{{prodevent.producer_notes}}</td>
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
            <label class="field-headers-2">External notes:</label>
            <textarea
              v-model="event.external_notes"
              placeholder="External notes"
              class="input"
              @input="onChangeTimeout('external_notes')"
            >event.external_notes</textarea>
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
                  <tr
                    v-for="exnote in event.external_notes_hist"
                    v-bind:key="exnote.external_notes"
                  >
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
        <people :event-id="event.event_id"></people>
        <eventtag :event-id="event.event_id" tag-type="checklist" title="Checklist"></eventtag>
      </div>
      <div class="form-row sixth-row">
        <eventtag :event-id="event.event_id" tag-type="product" title="Product"></eventtag>
        <eventtag :event-id="event.event_id" tag-type="client" title="Client"></eventtag>
      </div>
    </section>
  </section>
</template>

<script>
import Vue from 'vue'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.min.css'
import axios from 'axios'
import modal from '../../components/History.vue'
import people from '../../components/PeopleAssigned.vue'
import statusupdatemodal from '../../components/StatusUpdateModal.vue'
import eventtag from '../../components/Eventtag.vue'
import clientheader from '../../components/Header.vue'

Vue.component('vue-ctk-date-time-picker', VueCtkDateTimePicker)

export default {
  data() {
    return {
      value: null,
      isHidden: true,
      event: {},
      projects: [],
      clientid: null
    }
  },
  watch: {
    'event.client_status': function(val, oldVal) {
      if (oldVal !== undefined) {
        this.$refs.status_update_modal.open()
      }
    },
    'event.event_start': function(val, oldVal) {
      if (oldVal !== undefined) {
        this.onChange('event_start')
      }
    },
    'event.operations_status': function(val, oldVal) {
      if (oldVal !== undefined) {
        this.onChange('operations_status')
      }
    },
    'event.qa_status': function(val, oldVal) {
      if (oldVal !== undefined) {
        this.onChange('qa_status')
      }
    },
    'event.production_status': function(val, oldVal) {
      if (oldVal !== undefined) {
        this.onChange('production_status')
      }
    },
    'event.time_zone': function(val, oldVal) {
      if (oldVal !== undefined) {
        this.onChange('time_zone')
      }
    },
    'event.producer_offset_minutes': function(val, oldVal) {
      if (oldVal !== undefined) {
        this.onChange('producer_offset_minutes')
      }
    }
  },
  methods: {
    ClientStatusHistory: function(event) {
      this.fetchEvent()
      this.$refs.client_status_history.open()
    },
    OpenOperationsStatusHistory: function(id) {
      this.fetchEvent()
      this.$refs.operations_status_history.open()
    },
    QaStatusHistory: function(qa) {
      this.fetchEvent()
      this.$refs.qa_status_history.open()
    },
    ProductionStatusHistory: function(prod) {
      this.fetchEvent()
      this.$refs.production_status_history.open()
    },
    ExternalNotesHistory: function(exnote) {
      this.fetchEvent()
      this.$refs.external_notes_history.open()
    },
    ProducerNotesHistory: function(prodnote) {
      this.fetchEvent()
      this.$refs.producer_notes_history.open()
    },
    onChange: async function(field_name) {
      const accessToken = await this.$auth.getAccessToken()

      if (!this.event[field_name]) return
      const url = process.env.VUE_APP_API + '/api/v3/events/'
      var data = {
        event_id: this.event.event_id
      }

      data[field_name] = this.event[field_name]
      axios.put(url, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      })
    },

    onChangeTimeout: function(field_name) {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }

      this.timeout = setTimeout(() => this.onChange(field_name), 1500)
    },

    fetchEvent: async function() {
      const accessToken = await this.$auth.getAccessToken()

      const url =
        process.env.VUE_APP_API +
        '/api/v3/events/' +
        this.$route.params.event_id
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then(response => {
          this.event = response.data['event_records'][0]
          this.projects = response.data['project_list']
          this.clientid = this.event.client_id
        })
    }
  },
  components: {
    modal,
    people,
    statusupdatemodal,
    eventtag,
    clientheader
  },
  mounted: function() {
    this.fetchEvent()
  }
}
</script>
