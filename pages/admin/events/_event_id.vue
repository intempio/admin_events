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
          @input="onChangeTimeout('event_name')"
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
              <option
                :value="status"
                v-for="status in client_statuses"
                v-bind:key="status"
              >{{status}}
              </option>
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
              <font-awesome-icon class="icon" icon="history"/>
              History
            </button>
          </div>
        </div>
        <div class="client-status-history-wrap">
          <div class="client-status-wrap">
            <label class="field-headers">Operation Status:</label>
            <b-select v-model="event.operations_status" placeholder="Operations Status">
              <option
                :value="status"
                v-for="status in operation_statuses"
                v-bind:key="status"
              >{{status}}
              </option>
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
              <tr v-for="(id, i) in event.operations_status_hist" :key="i">
                <td>{{id.updated_by_id}}</td>
                <td>{{id.operations_status}}</td>
                <td>{{id.updated}}</td>
              </tr>
              </tbody>
            </modal>
            <button class="history" @click="OpenOperationsStatusHistory">
              <font-awesome-icon class="icon" icon="history"/>
              History
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
              <option :value="status" v-for="status in qa_statuses" v-bind:key="status">{{status}}</option>
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
              <font-awesome-icon class="icon" icon="history"/>
              History
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
              <option
                :value="status"
                v-for="status in production_statuses"
                v-bind:key="status"
              >{{status}}
              </option>
            </b-select>
          </div>
          <div class="history-wrap hist-left-margin">
            <modal
              :production-status-hist="event.production_status_hist"
              ref="production_status_history"
            >
              <h2 slot="header" class="colored">Production status history</h2>
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
              <font-awesome-icon class="icon" icon="history"/>
              History
            </button>
          </div>
        </div>
      </div>
      <div class="form-row third-row">
        <div class="pickers-wrap">
          <div class="inputs-wrap">
            <label class="field-headers">Event Start:</label>
            <VueCtkDateTimePicker
              id="CtkDateTimePicker"
              v-model="event.event_start"
              format="YYYY-MM-DD HH:mm"
              formatted="YYYY-MM-DD HH:mm"
              :no-header=true
              :no-button-now=true
              color="#0097e1"
              minute-interval="15"
              label
              @validate="onChange('event_start')"
            ></VueCtkDateTimePicker>
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
            @input="onChangeTimeoutLong('internal_notes')"
          >event.internal_notes</textarea>
          <div class="history-wrap">
            <modal :internal-notes-hist="event.internal_notes_hist" ref="internal_notes_history">
              <h2 slot="header" class="colored">Internal notes history</h2>
              <tr slot="table-header">
                <th class="history-th-1">Updated</th>
                <th class="history-th-2">Internal notes</th>
                <th class="history-th-3">Updated by ID</th>
                <th></th>
              </tr>
              <tbody slot="table-body">
              <tr
                v-for="intnote in event.internal_notes_hist"
                v-bind:key="intnote.internal_notes"
              >
                <td>{{intnote.updated}}</td>
                <td class="history-td-tb-2">{{intnote.internal_notes}}</td>
                <td>{{intnote.updated_by_id}}</td>
              </tr>
              </tbody>
            </modal>
            <button class="history" @click="InternalNotesHistory">
              <font-awesome-icon class="icon" icon="history"/>
              History
            </button>
          </div>
        </div>
        <div class="producer-notes-wrap">
          <label class="field-headers-2 item6">Producer notes:</label>
          <textarea
            v-model="event.producer_notes"
            placeholder="Producer notes"
            class="input"
            @input="onChangeTimeoutLong('producer_notes')"
          >event.producer_notes_hist</textarea>
          <div class="history-wrap">
            <modal :producer_notes_hist="event.producer_notes_hist" ref="producer_notes_history">
              <h2 slot="header" class="colored">Producer notes history</h2>
              <tr slot="table-header">
                <th class="history-th-1">Updated</th>
                <th class="history-th-2">Producer notes</th>
                <th class="history-th-3">Updated by ID</th>
                <th></th>
              </tr>
              <tbody slot="table-body">
              <tr
                v-for="prodevent in event.producer_notes_hist"
                v-bind:key="prodevent.producer_status"
              >
                <td>{{prodevent.updated}}</td>
                <td class="history-td-tb-2">{{prodevent.producer_notes}}</td>
                <td>{{prodevent.updated_by_id}}</td>
              </tr>
              </tbody>
            </modal>
            <button class="history" @click="ProducerNotesHistory">
              <font-awesome-icon class="icon" icon="history"/>
              History
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
              @input="onChangeTimeoutLong('external_notes')"
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
                  <td class="history-td-tb-2">{{exnote.external_notes}}</td>
                  <td>{{exnote.updated_by_id}}</td>
                </tr>
                </tbody>
              </modal>
              <button class="history" @click="ExternalNotesHistory">
                <font-awesome-icon class="icon" icon="history"/>
                History
              </button>
            </div>
          </div>
          <button
            @click="isHidden = !isHidden"
            class="add_btn"
            id="showNotesBtn"
            v-show="isHidden"
          >+ External Notes
          </button>
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
  import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'
  import modal from '../../../components/History.vue'
  import people from '../../../components/PeopleAssigned.vue'
  import statusupdatemodal from '../../../components/StatusUpdateModal.vue'
  import eventtag from '../../../components/Eventtag.vue'
  import clientheader from '../../../components/Header.vue'
  import {CLIENT_STATUSES} from '../../../components/constants.js'
  import {OPERATION_STATUSES} from '../../../components/constants.js'
  import {QA_STATUSES} from '../../../components/constants.js'
  import {PRODUCTION_STATUSES} from '../../../components/constants.js'
  import {restService} from '../../../plugins/axios';

  Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker)

  export default {
    data() {
      let client_statuses = CLIENT_STATUSES
      if (process.env.CLIENT_STATUSES) {
        client_statuses = process.env.CLIENT_STATUSES.split(',').map(item =>
          item.trim()
        )
      }

      let operation_statuses = OPERATION_STATUSES
      if (process.env.OPERATION_STATUSES) {
        operation_statuses = process.env.OPERATION_STATUSES.split(',').map(item =>
          item.trim()
        )
      }

      let qa_statuses = QA_STATUSES
      if (process.env.QA_STATUSES) {
        qa_statuses = process.env.QA_STATUSES.split(',').map(item => item.trim())
      }

      let production_statuses = PRODUCTION_STATUSES
      if (process.env.PRODUCTION_STATUSES) {
        production_statuses = process.env.PRODUCTION_STATUSES.split(',').map(
          item => item.trim()
        )
      }

      return {
        value: null,
        isHidden: true,
        event: {},
        projects: [],
        clientid: null,
        isDataPatched: false,
        client_statuses,
        operation_statuses,
        qa_statuses,
        production_statuses
      }
    },
    watch: {
      'event.client_status': function (val, oldVal) {
        if (this.isDataPatched) {
          this.$refs.status_update_modal.open()
        }
      },
      'event.operations_status': function () {
        if (this.isDataPatched) {
          this.onChange('operations_status')
        }
      },
      'event.qa_status': function () {
        if (this.isDataPatched) {
          this.onChange('qa_status')
        }
      },
      'event.production_status': function () {
        if (this.isDataPatched) {
          this.onChange('production_status')
        }
      },
      'event.time_zone': function () {
        if (this.isDataPatched) {
          this.onChange('time_zone')
        }
      },
      'event.producer_offset_minutes': function () {
        if (this.isDataPatched) {
          this.onChange('producer_offset_minutes')
        }
      }
    },
    methods: {
      ClientStatusHistory: function (event) {
        this.fetchEvent()
        this.$refs.client_status_history.open()
      },
      OpenOperationsStatusHistory: function (id) {
        this.fetchEvent()
        this.$refs.operations_status_history.open()
      },
      QaStatusHistory: function (qa) {
        this.fetchEvent()
        this.$refs.qa_status_history.open()
      },
      ProductionStatusHistory: function (prod) {
        this.fetchEvent()
        this.$refs.production_status_history.open()
      },
      InternalNotesHistory: function (intnote) {
        this.fetchEvent()
        this.$refs.internal_notes_history.open()
      },
      ExternalNotesHistory: function (exnote) {
        this.fetchEvent()
        this.$refs.external_notes_history.open()
      },
      ProducerNotesHistory: function (prodnote) {
        this.fetchEvent()
        this.$refs.producer_notes_history.open()
      },
      onChange: function (field_name) {
        if (!this.event[field_name]) return;
        const url = process.env.VUE_APP_API + '/api/v3/events/';
        var data = {
          event_id: this.event.event_id
        };

        data[field_name] = this.event[field_name]
        restService.put(url, data)
          .then(() => {
            this.$toast.open({
              message: `Updated successfully`,
              position: 'is-bottom',
              type: 'is-success'
            })
          })
          .catch(error => {
            this.$toast.open({
              message: `Error saving: ${error}`,
              position: 'is-bottom',
              type: 'is-danger'
            });
          });
      },

      onChangeTimeout: function (field_name) {
        if (this.timeout) {
          clearTimeout(this.timeout)
        }

        this.timeout = setTimeout(() => this.onChange(field_name), 1500)
      },

      onChangeTimeoutLong: function (field_name) {
        if (this.timeout) {
          clearTimeout(this.timeout)
        }
        this.timeout = setTimeout(() => this.onChange(field_name), 5000)
      },

      fetchEvent: function () {
        const url = '/api/v3/events/' + this.$route.params.event_id;
        restService.get(url)
          .then(response => {
            this.event = response.data['event_records'][0]
            this.projects = response.data['project_list']
            this.clientid = this.event.client_id
            setTimeout(() => {
              this.isDataPatched = true;
            });
          })
          .catch(err => {
            this.$toast.open({
              message: `Error fetching event: ${err}`,
              position: 'is-bottom',
              type: 'is-danger'
            });
            console.log(err);
          });
      }
    },
    components: {
      modal,
      people,
      statusupdatemodal,
      eventtag,
      clientheader
    },
    mounted: function () {
      this.fetchEvent()
    }
  }
</script>
