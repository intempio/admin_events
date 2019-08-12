<template>
  <div class="main">

    <clientheader :clientid="clientid" change-system="true"></clientheader>

    <div class="container-fluid mt-5" style="padding-top: 30px">
      <div class="row">
        <div class="col-xl-10 col-lg-12 m-auto">
          <b-card border-variant="primary">
            <div class="row align-items-center">
              <div class="col-2">
                <span class="font-weight-bold">Event Code:</span>
                {{event.event_code}}
              </div>
              <div class="col-4">
                <span class="font-weight-bold">Project:</span>
                {{event.project_id}}
              </div>
              <div class="col-6">
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
                      class="input input-hidden w-100"
                      :disabled="!permissions.includes('EDIT')"
                      @input="onChange"
                    >
                  </div>
                </div>
              </div>
            </div>
          </b-card>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-xl-10 col-lg-12 m-auto">
          <b-card border-variant="primary"
                  header="Event details"
                  header-text-variant="white"
                  class="custom-card">
            <div class="row" :style="{'margin-bottom': isEventChanged || isEventSaved ? '68px' : ''}">
              <div class="col-4">
                <div class="row">
                  <div class="col-12 d-flex">
                    <div class="col-11 pr-2">
                      <label class="">Client Status:</label>
                      <b-select v-model="event.client_status"
                                placeholder="Client Status"
                                :disabled="!permissions.includes('EDIT')"
                                @input="onChange"
                      >
                        <option
                          :value="status"
                          v-for="status in client_statuses"
                          :key="status"
                        >{{status}}
                        </option>
                      </b-select>
                    </div>
                    <div class="d-flex col-1 p-0 d-flex align-items-end">
                      <button class="history cstm" @click="openHistoryModal('client_status_hist')">
                        <font-awesome-icon class="icon" icon="history"/>
                      </button>
                    </div>
                  </div>

                  <div class="col-12 d-flex">
                    <div class="col-11 pr-2">
                      <label class="">Operation Status:</label>
                      <b-select v-model="event.operations_status"
                                placeholder="Operations Status"
                                :disabled="!permissions.includes('EDIT')"
                                @input="onChange"
                      >
                        <option
                          :value="status"
                          v-for="status in operation_statuses"
                          :key="status"
                        >{{status}}
                        </option>
                      </b-select>
                    </div>
                    <div class="col-1 p-0 d-flex align-items-end">

                      <button class="history cstm" @click="openHistoryModal('operations_status_hist')">
                        <font-awesome-icon class="icon" icon="history"/>
                      </button>
                    </div>
                  </div>

                  <div class="col-12 d-flex">
                    <div class="col-11 pr-2">
                      <label class="">QA Status:</label>
                      <b-select
                        v-model="event.qa_status"
                        :disabled="!permissions.includes('EDIT')"
                        placeholder="QA Status"
                        @input="onChange"
                      >
                        <option :value="status" v-for="status in qa_statuses" :key="status">{{status}}</option>
                      </b-select>
                    </div>
                    <div class="col-1 p-0 d-flex align-items-end">

                      <button class="history cstm" @click="openHistoryModal('qa_status_hist')">
                        <font-awesome-icon class="icon" icon="history"/>
                      </button>
                    </div>
                  </div>

                  <div class="col-12 d-flex">
                    <div class="col-11 pr-2">
                      <label class="">Production Status:</label>
                      <b-select
                        v-model="event.production_status"
                        :disabled="!permissions.includes('EDIT')"
                        placeholder="Production Status"
                        @input="onChange"
                      >
                        <option
                          :value="status"
                          v-for="status in production_statuses"
                          v-bind:key="status"
                        >{{status}}
                        </option>
                      </b-select>
                    </div>
                    <div class="col-1 p-0 d-flex align-items-end">

                      <button class="history cstm" @click="openHistoryModal('production_status_hist')">
                        <font-awesome-icon class="icon" icon="history"/>
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
                      :disabled="!permissions.includes('EDIT')"
                      label
                      @input="onChange"
                    ></VueCtkDateTimePicker>
                  </div>

                  <div class="col-12">
                    <label>Time zone:</label>
                    <b-select v-model="event.time_zone"
                              :disabled="!permissions.includes('EDIT')"
                              placeholder="Time zone"
                              @input="onChange"
                    >
                      <option value="EST" selected>EST</option>
                      <option value="GMT">GMT</option>
                      <option value="CEST">CEST</option>
                    </b-select>
                  </div>

                  <div class="col-12">
                    <label>Producer offset:</label>
                    <b-select
                      v-model="event.producer_offset_minutes"
                      :disabled="!permissions.includes('EDIT')"
                      placeholder="Producer offset"
                      @input="onChange"
                    >
                      <option value="0">0</option>
                      <option value="60" selected>60</option>
                      <option value="120">120</option>
                    </b-select>
                  </div>

                  <div class="col-12">
                    <label>Producer count:</label>
                    <b-form-input
                      v-model="event.producer_count"
                      :disabled="!permissions.includes('EDIT')"
                      type="text"
                      name="prod_count"
                      placeholder="Producer count"
                      class="input"
                      @input="onChange"
                    ></b-form-input>
                  </div>

                  <div class="col-12">
                    <label>Duration (minutes):</label>
                    <b-form-input
                      v-model="event.duration_minutes"
                      :disabled="!permissions.includes('EDIT')"
                      type="text"
                      name="duration"
                      placeholder="Duration"
                      class="input"
                      @input="onChange"
                    ></b-form-input>
                  </div>
                </div>
              </div>

              <div class="col-5 p-0">
                <div class="col-12 p-0 d-flex">
                  <div class="col-10 p-0">
                    <label>Internal notes:</label>
                    <b-form-textarea
                      v-model="event.internal_notes"
                      :disabled="!permissions.includes('EDIT')"
                      placeholder="Internal notes"
                      class="input"
                      rows="2"
                      @input="onChange"
                    >event.internal_notes
                    </b-form-textarea>
                  </div>
                  <div class="col-2 pl-2 d-flex align-items-end">

                    <button class="history cstm" @click="openHistoryModal('internal_notes_hist')">
                      <font-awesome-icon class="icon" icon="history"/>
                    </button>
                  </div>
                </div>

                <div class="col-12 p-0 d-flex">
                  <div class="col-10 p-0">
                    <label>Producer notes:</label>
                    <b-form-textarea
                      v-model="event.producer_notes"
                      :disabled="!permissions.includes('EDIT')"
                      placeholder="Producer notes"
                      class="input"
                      rows="2"
                      @input="onChange"
                    >event.producer_notes_hist
                    </b-form-textarea>
                  </div>
                  <div class="col-2 pl-2 d-flex align-items-end">

                    <button class="history cstm" @click="openHistoryModal('producer_notes_hist')">
                      <font-awesome-icon class="icon" icon="history"/>
                    </button>
                  </div>
                </div>

                <div class="col-12 p-0">
                  <button
                    @click="toggleExternalNotes()"
                    v-if="permissions.includes('EDIT')"
                    class="history secondary cstm"
                    id="showNotesBtn"
                    style="margin-top: 21px"
                  >{{isHidden ? 'Add External Notes' : 'Remove External Notes'}}
                  </button>
                </div>

                <div class="col-12 p-0 d-flex" v-if="!isHidden">
                  <div class="col-10 p-0">
                    <label>External notes:</label>
                    <b-form-textarea
                      v-model="event.external_notes"
                      placeholder="External notes"
                      :disabled="!permissions.includes('EDIT')"
                      class="input"
                      rows="2"
                      @input="onChange"
                    >event.external_notes
                    </b-form-textarea>
                  </div>
                  <div class="col-2 pl-2 d-flex align-items-end">

                    <button class="history cstm" @click="openHistoryModal('external_notes_hist')">
                      <font-awesome-icon class="icon" icon="history"/>
                    </button>
                  </div>
                </div>
                <div class="col-12 p-0" v-if="!isHidden">
                  <b-form-checkbox
                    id="checkbox-1"
                    v-model="event.send_email"
                    :disabled="!permissions.includes('EDIT')"
                    name="checkbox-1"
                  >Send notes to clients?
                  </b-form-checkbox>
                </div>
              </div>
            </div>

            <div class="notification warning" v-if="isEventChanged">
              <div class="d-flex justify-content-end align-items-center mr-3">
                <span class="mr-3">Event details have been changed.</span>
                <b-button outline class="discard-changes mr-2" @click="discardEventChanges()">Discard</b-button>
                <b-button class="save-changes" @click="saveEventDetails()">Save</b-button>
              </div>
            </div>
            <div class="notification success" v-if="!isEventChanged && isEventSaved">
              <div class="d-flex justify-content-end align-items-center h-100">
                <span class="mr-3">Changes saved successfully!</span>
              </div>
            </div>
          </b-card>
        </div>
      </div>

      <modal ref="history_modal"
             :data="event[hModalKey]"
             :table="hModal">
      </modal>

      <div class="row mt-3">
        <div class="col-xl-10 col-lg-12 m-auto">
          <b-tabs>
            <b-tab title="People assigned" active>
              <people :event-id="event.event_id"></people>
            </b-tab>
            <b-tab title="Checklist">
              <eventtag :event-id="event.event_id" tag-type="checklist" title="Checklist"></eventtag>
            </b-tab>
            <b-tab title="Product">
              <eventtag :event-id="event.event_id" tag-type="product" title="Product"></eventtag>
            </b-tab>
            <b-tab title="Client">
              <eventtag :event-id="event.event_id" tag-type="client" title="Client"></eventtag>
            </b-tab>
          </b-tabs>
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
  import {CLIENT_STATUSES} from '../../../const/constants.js'
  import {OPERATION_STATUSES} from '../../../const/constants.js'
  import {QA_STATUSES} from '../../../const/constants.js'
  import {PRODUCTION_STATUSES} from '../../../const/constants.js'
  import {restService} from '../../../plugins/axios';
  import isEqual from 'lodash.isequal';
  import forOwn from 'lodash.forown';
  import {EventObject} from './event';
  import {authService} from '../../../services/auth-service';
  import {HISTORY_MODALS} from '../../../const/history-modals';

  Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);

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
        event: new EventObject,
        eventOld: new EventObject,
        projects: [],
        clientid: null,
        isDataPatched: false,
        client_statuses,
        operation_statuses,
        qa_statuses,
        production_statuses,
        isEventChanged: false,
        isEventSaved: false,
        permissions: [],
        hModal: {},
        hModalKey: '',
        historyModals: HISTORY_MODALS
      }
    },
    created() {
      this.permissions = authService.getUserPermissions().admin;
      this.fetchEvent();
    },
    methods: {
      openHistoryModal(name) {
        this.hModal = this.historyModals[name];
        this.hModalKey = name;
        this.fetchEvent(true);
      },
      onChange: function () {
        this.isEventChanged = !isEqual(this.event, this.eventOld);
      },
      saveEventDetails() {
        const data = {};
        forOwn(this.event, (val, key) => {
          if (typeof val !== 'object') {
            if (this.eventOld[key] !== val || key === 'event_id' || key === 'client_id') {
              data[key] = val;
            }
          }
        });
        const url = process.env.VUE_APP_API + '/api/v3/events/';
        restService.put(url, data)
          .then(() => {
            this.isEventChanged = false;
            this.isEventSaved = true;
            this.fetchEvent();
            setTimeout(() => {
              this.isEventSaved = false;
            }, 3500);
          })
          .catch(error => {
            this.$toast.error(`Error: ${error}`)
          });
      },
      discardEventChanges() {
        this.fetchEvent();
      },
      toggleExternalNotes() {
        this.isHidden = !this.isHidden;
        if (this.isHidden) {
          this.event.external_notes = '';
          this.event.send_email = undefined;
          this.onChange();
        }
      },
      fetchEvent: function (modal) {
        this.isDataPatched = false;
        const url = '/api/v3/events/' + this.$route.params.event_id;
        restService.get(url)
          .then(response => {
            const data = response.data['event_records'][0];
            for (let key in data) {
              if (data.hasOwnProperty(key)) {
                if (!data[key] || data[key] === 'none') {
                  data[key] = '';
                } else if (typeof data[key] !== 'object') {
                  data[key] = data[key].toString();
                }
                this.event[key] = data[key];
                this.eventOld[key] = data[key];
              }
            }
            this.projects = response.data['project_list'];
            this.clientid = this.event.client_id;
            if (modal) {
              this.$refs['history_modal'].open();
            }
            setTimeout(() => {
              this.isDataPatched = true;
              this.isEventChanged = false;
            });
          })
          .catch(err => {
            this.$toast.error(`Error: ${error}`)
          });
      }
    },
    components: {
      modal,
      people,
      statusupdatemodal,
      eventtag,
      clientheader
    }
  }
</script>
<style lang="scss">
  @import "../../../css/variables";

  .input-hidden {
    border: none;
    box-shadow: none;
    padding: 4px 10px;
  }

  .custom-card label {
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

  .notification {
    position: absolute;
    bottom: 1px;
    left: 1px;
    height: 56px;
    width: calc(100% - 2px);
    padding: 10px !important;
    color: white;
  }

  .notification.success {
    background-color: $color_secondary;
    color: white;
  }

  .notification.warning {
    background-color: $color_warning;
  }

  .save-changes {
    background-color: $color_secondary;
    color: white;
  }

  .discard-changes {
    background-color: darken($color_warning, 5%);
    color: white;
  }

  .custom-card {
    .card-header {
      background-color: $color_primary;
    }
  }

</style>
