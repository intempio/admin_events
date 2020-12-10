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
                <td>Room Type</td>
                <td>{{ event_data["cal_producer Room Type"] }}</td>
                <td>- Meeting Room: 0-99 <br />
                  - Seminar Room: 100-1000
                </td>
              </tr>
              <tr>
                <td>Meeting Link Owner</td>
                <td>{{ event_data["cal_producer Meeting Link Owner"] }}</td>
                <td>1. Is meeting link owned by Client or Intempio? <br />
                  2. Is meeting link from Adobe Connect or Zoom?</td>
              </tr>
              <tr>
                <td>Recording</td>
                <td>{{ event_data["_cr Recording"] }}</td>
                <td>
                  Does the event need to be recorded?</td>
              </tr>
              <tr>
                <td>Audio License</td>
                <td>{{ event_data["cal_producer Audio License"] }}</td>
                <td>
                  1. Is audio owned by Client or Intempio? <br />
                  2. Is audio from Adobe Connect or Zoom? </td>
              </tr>
              <tr>
                <td>Audio Name</td>
                <td>{{ event_data["cal_producer Audio Name"] }}</td>
                <td>
                  Adobe Connect <br />
                  1. Is the audio profile used simultaneously on other events? <br />
                  2. Is the TC, Host, Participant code correct per the AC Host Code Map <br />
                  3. Does the audio information match data from the runsheet, Internal Calendar Invite and/or Client Invite (if any)? <br />
                  4. Is the audio configured correctly? <br />
                  Zoom - Does the Audio Information match the data inside zoom meeting? </td>
              </tr>
              <tr>
                <td>Audio Type</td>
                <td>{{ event_data["cal_producer Audio Type"] }}</td>
                <td>
                  For correct Audio type, refer to this link: t.ly/rx070</td>
              </tr>
              <tr>
                <td>Event Document</td>
                <td>{{ event_data["cal_all Event Documents"] }}</td>
                <td>
                  1. Is the Link directing to the correct Event Document Folder? <br />
                  (Event name should be the same as the event document name) <br />
                  2. Is the event document sharing settings set to "anyone with the link ... can edit"? <br />
                  3. Does the event document have a runsheet in it?
                </td>
              </tr>
              <tr>
                <td>Breakouts</td>
                <td>{{ event_data["Breakouts"] }}</td>
                <td>- Is there breakouts? <br />
                  Refer to Internal or Producer notes in Cribs
                </td>
              </tr>
              <tr>
                <td>Internal Notes</td>
                <td>{{ event_data["internal_notes"] }}</td>
                <td>Do Internal notes have any update on the event? <br />
                  Are tags accurate per updates on the internal notes?
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
    title: "QA 2"
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
          console.log(this.edata);
        })
        .catch(error => {
          this.$toast.error(`Error: ${error}`)
        });

    },
    done: function() {
      this.eventID = this.$route.query.eventID;
      let data = {
          event_id: this.eventID,
          activity: "QA-2"
      };
      let url = '/api/v3/qa-activity/';
     restService.post(url, data)
		  .then(() => {
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
