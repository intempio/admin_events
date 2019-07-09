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
          <strong>Contact:</strong>
          sunovion@test.com
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
      <!--
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
              <option value="new">New</option>
              <option value="in process">In Process</option>
              <option value="update">Update</option>
              <option value="cancelled">Cancelled</option>
              <option value="rescheduled">Rescheduled</option>
              <option value="urgent">Urgent</option>
              <option value="report sent">Report Sent</option>
              <option value="new - incomplete">New - Incomplete</option>
              <option value="invisible">Invisible</option>
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
      </div>
      -->
      <div class="form-row third-row">
        <div class="pickers-wrap">
          <div class="inputs-wrap">
            <label class="field-headers">Event Start:</label>
            <VueCtkDateTimePicker
              id="CtkDateTimePicker"
              :no-header=true
              :no-button-now=true
              v-model="event.event_start"
              format="YYYY-MM-DD HH:mm"
              formatted="YYYY-MM-DD HH:mm"
              color="#0097e1"
              minute-interval="15"
              label
              @validate="onChange('event_start')"/>
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
            <!--
            <label class="field-headers-1 item4">Client status:</label>
            <input
              v-model="event.producer_count"
              type="text"
              name="prod_count"
              placeholder="Request"
              class="input"
              @input="onChangeTimeout('producer_count')"
            >
            -->
            <label class="field-headers">Client Status:</label>
            <b-field>
              <b-input v-model="event.client_status" placeholder="Client Status" disabled></b-input>
            </b-field>
            <!--
            <b-field>
              <b-select v-model="event.client_status" placeholder="client status">
                <option value="request" disabled>Request</option>
              </b-select>
            </b-field>
            -->
          </div>
        </div>
      </div>

      <div class="form-row second-row">
        <div class="inputs-wrap">
          <label class="field-headers-1">Participants #:</label>
          <b-input placeholder="Participants #" type="number" min="1" max="20"></b-input>
        </div>

        <div class="inputs-wrap">
          <label class="field-headers-1">Presenters #:</label>
          <b-input placeholder="Presenters #" type="number" min="1" max="20"></b-input>
        </div>
      </div>

      <div class="form-row fourth-row">
        <div class="external-notes-wrap">
          <label class="field-headers-2">Notes:</label>
          <textarea
            v-model="event.external_notes"
            placeholder="Notes"
            class="input"
            @input="onChangeTimeoutLong('external_notes')"
          >event.external_notes</textarea>
        </div>
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
  import {restService} from '../../../plugins/axios';

  Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker)

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
      'event.client_status': function (val, oldVal) {
        if (oldVal !== undefined) {
          this.$refs.status_update_modal.open()
        }
      },

      'event.operations_status': function (val, oldVal) {
        if (oldVal !== undefined) {
          this.onChange('operations_status')
        }
      },
      'event.qa_status': function (val, oldVal) {
        if (oldVal !== undefined) {
          this.onChange('qa_status')
        }
      },
      'event.production_status': function (val, oldVal) {
        if (oldVal !== undefined) {
          this.onChange('production_status')
        }
      },
      'event.time_zone': function (val, oldVal) {
        if (oldVal !== undefined) {
          this.onChange('time_zone')
        }
      },
      'event.producer_offset_minutes': function (val, oldVal) {
        if (oldVal !== undefined) {
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
        if (!this.event[field_name]) return
        const url = '/api/v3/events/'
        var data = {
          event_id: this.event.event_id
        }

        data[field_name] = this.event[field_name]
        restService.put(url, data).then(() => {
          // this.$toast.open({
          //   message: `Saved successfully`,
          //   position: 'is-bottom',
          //   type: 'is-success'
          // })
        }).catch(err => {
          this.$toast.error(`Error: ${error}`)
        })
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
      }
      /*
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
      } */
    },
    components: {
      modal,
      people,
      statusupdatemodal,
      eventtag,
      clientheader
    },
    mounted: function () {
      //this.fetchEvent()
    }
  }
</script>
