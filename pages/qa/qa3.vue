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
                <td>Number of Producers Required</td>
                <td>{{ event_data["Number of Producers Required"] }}</td>
                <td>Rich Collaboration = 2 producers <br/>
                    All other event type = 1 producer
                </td>
              </tr>
              <tr>
                <td>Number of Producers Assigned</td>
                <td>
                {{ event_data["Number of Producers Assigned"] }}
                </td>
                <td>Do the number of assigned producers Match the number for producers required?</td>
              </tr>
              <tr>
                <td>Client Contact</td>
                <td>{{ event_data["Client Contact"] }}</td>
                <td>Do the client contact in CRIBS match the client contact as listed in the event request form?</td>
              </tr>
              <tr>
                <td>Sales Manager </td>
                <td>{{ event_data["Sales Manager"] }}</td>
                <td>Only Leave blank if Rick Ostrander is not involved in the Project.</td>
              </tr>
              <tr>
                <td>Account Manager</td>
                <td>{{ event_data["Account Manager"] }}</td>
                <td>If blank, go to the event's Management Folder. The Account Manager is the Intempio Person who creates the event request form. <br/>
                  This is also the person assigned to the Asana Card for this project.</td>
              </tr>
              <tr>
                <td>Meeting Platform</td>
                <td>{{ event_data["Meeting Platform"] }}</td>
                <td>Do the Meeting Platform in Cribs Match the Patform listed in the event request form?</td>
              </tr>
              <tr>
                <td>Room Type</td>
                <td>{{ event_data["cal_producer Room Type"] }}</td>
                <td>Refer to the event request form on the Room Type for this event.</td>
              </tr>
              <tr>
                <td>Series</td>
                <td>{{ event_data["Series"] }}</td>
                <td>Is this event part of a Series? <br/>
                    If Yes, does the series name coincide with other events on the same series as this event?
                </td>
              </tr>
              <tr>
                <td>Participant Count</td>
                <td>{{ event_data["Participant Count"] }}</td>
                <td>Is the Participant count the same as what is listed on the event request form?
                </td>
              </tr>
              <tr>
                <td>Helpdesk</td>
                <td>{{ event_data["Helpdesk"] }}</td>
                <td>Refer to the event request form on what type of Helpdesk Support will this event have</td>
              </tr>
              <tr>
                <td>Project Name</td>
                <td>{{ event_data["Project Name"] }}</td>
                <td>Refer to the Event Request form for the Project Name. </td>
              </tr>
              <tr>
                <td>Event Package</td>
                <td>{{ event_data["Event Package"] }}</td>
                <td>Refer to the event request form on the Event Package. <br/>
                    If not specified in the event request form, this information can also be located in the Project's quote <br/>
                    Note! If event has breakouts: Event Package is Rich Collaboration</td>
              </tr>
              <tr>
                <td>TO/PO</td>
                <td>{{ event_data["TO/PO"] }}</td>
                <td>Is the PO # Matching the PO# from PO document inside the Project Folder?</td>
              </tr>
              <tr>
                <td>Cost Center Number</td>
                <td>{{ event_data["Cost Center Number"] }}</td>
                <td>Refer to the Quote for the Cost Center Number of One Health Support projects <br/>
In most cases, the account manager will include the cost center number in Project Folder's Name. Go to the Project Management Tab in CRIBS and click on the link. This will direct you to the Project Folder.</td>
              </tr>
              <tr>
                <td>Product Category</td>
                <td>{{ event_data["Product Category"] }}</td>
                <td>A Product Category is found in the PO (e.g. Novartis Pharmaceuticals USA, Sunovion Pharmaceuticals Inc., Novartis NBS Conexts). <br/>
                    If PO is not available, ask help from Ops and Finance. <br/>
                    If information is not yet available, key in "TBA"</td>
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
    title: "QA 3"
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
          activity: "QA-3"
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
