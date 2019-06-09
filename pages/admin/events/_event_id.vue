<template>
  <div class="main">

    <clientheader :clientid="clientid"></clientheader>

    <div class="container-fluid mt-5" style="padding-top: 30px">
      <div class="row">
        <div class="col-10 m-auto">
          <b-card border-variant="primary">
            <div class="row align-items-center">
              <div class="col-2">
                <span class="font-weight-bold">Event Code:</span>
                {{event.event_code}}
              </div>
              <div class="col-5">
                <span class="font-weight-bold">Project:</span>
                {{event.project_id}}
              </div>
              <div class="col-5">
                <div class="row d-flex align-items-center">
                  <div class="col-12 d-flex align-items-center">
                    <div style="min-width: 100px;">
                      <span class="font-weight-bold">Event Name:</span>
                    </div>
                    <input
                      v-model="event.event_name"
                      type="text"
                      name="event_name"
                      placeholder="Event Name"
                      class="input input-hidden"
                      @input="onChangeTimeout('event_name')"
                    >
                  </div>
                </div>
              </div>
            </div>
          </b-card>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-10 m-auto">
          <b-card border-variant="primary"
                  header="Event details"
                  header-bg-variant="primary"
                  header-text-variant="white">
            <div class="row">
              <div class="col-6">
                <div class="row">
                  <div class="col-12">
                    <statusupdatemodal
                      ref="status_update_modal"
                      :saveCallback="onChange"
                      fieldName="client_status"
                    ></statusupdatemodal>
                    <div class="d-flex">
                      <div class="col-10 pr-0">
                        <label class="">Client Status:</label>
                        <b-select v-model="event.client_status" placeholder="Client Status">
                          <option
                            :value="status"
                            v-for="status in client_statuses"
                            :key="status"
                          >{{status}}
                          </option>
                        </b-select>
                      </div>
                      <div class="d-flex col-2 d-flex align-items-end">
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
                          History
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="col-12 d-flex">
                    <div class="col-10 pr-0">
                      <label class="">Operation Status:</label>
                      <b-select v-model="event.operations_status" placeholder="Operations Status">
                        <option
                          :value="status"
                          v-for="status in operation_statuses"
                          v-bind:key="status"
                        >{{status}}
                        </option>
                      </b-select>
                    </div>
                    <div class="col-2 d-flex align-items-end">
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
                        History
                      </button>
                    </div>
                  </div>

                  <div class="col-12 d-flex">
                    <div class="col-10 pr-0">
                      <label class="">QA Status:</label>
                      <b-select
                        v-model="event.qa_status"
                        placeholder="QA Status"
                        @input="onChange('qa_status')"
                      >
                        <option :value="status" v-for="status in qa_statuses" v-bind:key="status">{{status}}</option>
                      </b-select>
                    </div>
                    <div class="col-2 d-flex align-items-end">
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
                        History
                      </button>
                    </div>
                  </div>

                  <div class="col-12 d-flex">
                    <div class="col-10 pr-0">
                      <label class="">Production Status:</label>
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
                    <div class="col-2 d-flex align-items-end">
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
                        History
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-3">
                <div class="row pr-3">
                  <div class="col-12">
                    <label>Event Start:</label>
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

                  <div class="col-12">
                    <label>Time zone:</label>
                    <b-select v-model="event.time_zone"
                              placeholder="Time zone">
                      <option value="EST" selected>EST</option>
                      <option value="GMT">GMT</option>
                      <option value="CEST">CEST</option>
                    </b-select>
                  </div>

                  <div class="col-12">
                    <label>Duration (minutes):</label>
                    <input
                      v-model="event.duration_minutes"
                      type="text"
                      name="duration"
                      placeholder="Duration"
                      class="input"
                      @input="onChangeTimeout('duration_minutes')"
                    >
                  </div>
                </div>
              </div>

              <div class="col-3">
                <div class="col-12">
                  <label>Producer offset:</label>
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

                <div class="col-12">
                  <label>Producer count:</label>
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

            <div class="row" style="margin-bottom: 68px;">
              <div class="col-12">
                <div class="row">
                  <div class="col-6">
                    <div class="d-flex">
                      <div class="col-10 pr-0">
                        <label>Internal notes:</label>
                        <b-form-textarea
                          v-model="event.internal_notes"
                          placeholder="Internal notes"
                          class="input"
                          rows="2"
                          @input="onChangeTimeoutLong('internal_notes')"
                        >event.internal_notes
                        </b-form-textarea>
                      </div>
                      <div class="col-2 d-flex align-items-end">
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
                          History
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="col-6 d-flex align-items-end">
                    <button
                      @click="isHidden = !isHidden"
                      class="history secondary"
                      id="showNotesBtn"
                    >{{isHidden ? 'Add External Notes' : 'Remove External Notes'}}
                    </button>
                  </div>
                </div>

                <div class="row">
                  <div class="col-6">
                    <div class="d-flex">
                      <div class="col-10 pr-0">
                        <label>Producer notes:</label>
                        <b-form-textarea
                          v-model="event.producer_notes"
                          placeholder="Producer notes"
                          class="input"
                          rows="2"
                          @input="onChangeTimeoutLong('producer_notes')"
                        >event.producer_notes_hist
                        </b-form-textarea>
                      </div>
                      <div class="col-2 d-flex align-items-end">
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
                          History
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="col-6 p-0" v-show="!isHidden">
                    <div class="d-flex">
                      <div class="col-9 pr-0">
                        <label>External notes:</label>
                        <b-form-textarea
                          v-model="event.external_notes"
                          placeholder="External notes"
                          class="input"
                          rows="2"
                          @input="onChangeTimeoutLong('external_notes')"
                        >event.external_notes
                        </b-form-textarea>
                      </div>
                      <div class="col-3 d-flex align-items-end">
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
                          History
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="notification primary">
              <div class="d-flex justify-content-center align-items-center">
                <span class="text-white mr-3">Save changes:</span>
                <b-button type="is-primary" inverted outlined>Save</b-button>
              </div>
            </div>
            <!--<div class="notification secondary">-->
            <!--<span>No changes to save</span>-->
            <!--</div>-->
          </b-card>
        </div>
      </div>

      <div class="row" style="margin-top: 32px;">
        <div class="col-10 m-auto">
          <div class="row">
            <div class="col-6">
              <people :event-id="event.event_id"></people>
            </div>
            <div class="col-6">
              <eventtag :event-id="event.event_id" tag-type="checklist" title="Checklist"></eventtag>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-3 mb-5">
        <div class="col-10 m-auto">
          <div class="row">
            <div class="col-6">
              <eventtag :event-id="event.event_id" tag-type="product" title="Product"></eventtag>
            </div>
            <div class="col-6">
              <eventtag :event-id="event.event_id" tag-type="client" title="Client"></eventtag>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

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
  import isEqual from 'lodash.isequal'

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
        eventOld: {},
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
        if (this.isDataPatched && !isEqual(this.event, this.eventOld)) {
          this.$refs.status_update_modal.open()
        }
      },
      'event.operations_status': function (val, oldVal) {
        if (this.isDataPatched) {
          this.onChange('operations_status')
        }
      },
      'event.qa_status': function (val, oldVal) {
        if (this.isDataPatched) {
          this.onChange('qa_status')
        }
      },
      'event.production_status': function (val, oldVal) {
        if (this.isDataPatched) {
          this.onChange('production_status')
        }
      },
      'event.time_zone': function (val, oldVal) {
        if (this.isDataPatched) {
          this.onChange('time_zone')
        }
      },
      'event.producer_offset_minutes': function (val, oldVal) {
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
        if (isEqual(this.event, this.eventOld)) return;
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
            });
            this.eventOld = JSON.parse(JSON.stringify(this.event));
            if (field_name === 'client_status') {
              this.fetchEvent();
            }
          })
          .catch(error => {
            this.$toast.open({
              message: `Error saving: ${error}`,
              position: 'is-bottom',
              type: 'is-danger'
            });
            this.event = JSON.parse(JSON.stringify(this.eventOld));
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
        this.isDataPatched = false;
        const url = '/api/v3/events/' + this.$route.params.event_id;
        restService.get(url)
          .then(response => {
            this.event = response.data['event_records'][0];
            this.eventOld = JSON.parse(JSON.stringify(response.data['event_records'][0]))
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
<style>
  .input-hidden {
    border: none;
    box-shadow: none;
  }

  label {
    font-size: 13px;
    margin-top: 8px;
    margin-bottom: 0 !important;
  }

  #CtkDateTimePicker input {
    padding-top: 0 !important;
  }

  table {
    width: 100%;
    font-size: 14px;
  }

  tr > td:last-of-type {
    text-align: center;
  }

  .notification.primary {
    position: absolute;
    bottom: 1px;
    left: 1px;
    width: calc(100% - 2px);
    padding: 10px !important;
    background-color: #9cc5f0;
  }
</style>
