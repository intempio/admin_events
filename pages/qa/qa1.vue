<template>
  <section>
    <div class="main">
      <clientheader
        :clientid="clientid ? clientid : ''"
        :sidebarOff="true"
        change-system="true"
      ></clientheader>
      <div class="container-fluid">
        <div class="row mt-1 mb-3">
          <div class="col-xl-10 col-lg-12 m-auto">
            <div
              class="go-back-button cursor-pointer"
              @click="goHome()"
            >
              <i class="material-icons mr-2">chevron_left</i>
              <h6>Home</h6>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row mt-1 mb-3">
          <div class="col-xl-10 col-lg-12 m-auto">
            <div class="header-event">
              <h3>Before Start QA</h3>
              <table
                id="event_details"
                v-for="event_data in edata"
                v-bind:key="event_data"
              >
                <tr>
                  <td><strong>Event Code:</strong> {{ event_data["event_code"] }}</td>
                  <td><strong>Event Name:</strong> {{ event_data["event_name"] }}</td>
                </tr>
              </table>
            </div>
            <table
              border="1"
              id="event_tags"
              v-for="event_data in edata"
              v-bind:key="event_data"
            >
              <tr>
                <th>Tag Name</th>
                <th>Value</th>
                <th>Actions</th>
              </tr>
              <tr>
                <td>Event Date Time</td>
                <td>{{ event_data["event_start"] }}</td>
                <td>Does date and time match the event request form from the Account Management folder, client email or calendar invite for this event?</td>
              </tr>
              <tr>
                <td>Meeting Link</td>
                <td>{{ event_data["cal_all Meeting Link"] }}</td>
                <td>
                  - Check url and make sure it matches the one in client calendar
                </td>
              </tr>
              <tr>
                <td>Link Username/Password</td>
                <td>{{ event_data["cal_all Meeting Username"] }} / {{ event_data["cal_all Meeting Password"] }}</td>
                <td>- Meeting USERNAME is Intempio or (client)? <br />
                  - Check this link for reference:
                  <a href="https://docs.google.com/spreadsheets/u/6/d/1k62mDH1pnn1PZTntgiNARZksbHzeTX7e5cO09tMQ1ZM/edit?ts=5a845fe2#gid=0">https://docs.google.com/spreadsheets/d/1k62mDH1pnn1PZTntgiNARZksbHzeTX7e5cO09tMQ1ZM/edit?ts=5a845fe2#gid=0</a>
                </td>
              </tr>
              <tr>
                <td>Producer Call Time</td>
                <td>{{ event_data["producer_offset_minutes"] }}</td>
                <td>Is Producer Call time correct? <br />
                  0 - Rehearsal/DryRun, Demo &amp; Techcheck <br />
                  60 - Remote <br />
                  120 - Onsite</td>
              </tr>
              <tr>
                <td>Presenter Name</td>
                <td>{{ event_data["cal_all Presenter 1 Name"] }}</td>
                <td>
                  - Confirm Event Presenter. <br />
                  - Is presenter name existing?<br />
                  - Calendar with Speaker?<br />
                  - Calendar with Patient Speaker?<br />
                </td>
              </tr>
              <tr>
                <td>Client Contact</td>
                <td>{{ event_data["Client Contact"] }}</td>
                <td>
                  Is Client contact correct? <br />
                  Reference: <a href="https://docs.google.com/document/d/1UH8Yxr-tXpCkAaY9_Rq7Tk4uj35iWSyMwCwjA3viIH4/edit#">https://docs.google.com/document/d/1UH8Yxr-tXpCkAaY9_Rq7Tk4uj35iWSyMwCwjA3viIH4/edit#</a> <br />
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row mt-1 mb-3">
          <div class="col-xl-10 col-lg-12 m-auto">
            <div class="done">
              <button @click="done">Done</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import clientheader from '../../components/Header.vue'
  import {restService} from '../../plugins/axios';
  import {tableService} from '../../services/table-service';
  import orderBy from 'lodash.orderby';

export default {
components: {clientheader},
  data() {
    return {
      edata: [],
      event_id:"",
      activity:""
    };
  },
  head: {
    title: "QA 1"
  },
  created: function() {
    this.onLoadData();
  },
  methods: {
    onLoadData() {
        this.clientid = this.$route.query.clientID;
        this.eventID = this.$route.query.eventID;
        let page_url = window.location.href;

        let url ='/api/v3/qa-report/?clientID=' +this.clientid + "&eventID=" + this.eventID;
        let response = restService.get(url)
        .then(response => {
          this.edata = response.data;
        })
        .catch(error => {
          this.$toast.error(`Error: ${error}`)
        });

    },
    done: function() {
      this.eventID = this.$route.query.eventID;
      let data = {
          event_id: this.eventID,
          activity: "QA-1"
        };
      let url = '/api/v3/qa-activity/';
      restService.post(url, data).then(() => {
        this.event_id = '';
        this.activity = '';
        window.location.href = process.env.QA_APP;
      })
      .catch(error => {
        this.$toast.error(`Error: ${error}`)
      });
    },
    goHome(){
      this.$router.push('/system-pick');
    }
  },
};
</script>
<style lang="scss" scoped>
  @import "../../css/people-products";
</style>
