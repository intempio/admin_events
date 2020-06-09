<template>
  <section>
    <div class="main">
	    <clientheader :clientid="clientid ? clientid : ''" :sidebarOff="true" change-system="true"></clientheader>
		<div class="container-fluid">
        <div class="row mt-1 mb-3">
          <div class="col-xl-10 col-lg-12 m-auto">
            <div class="go-back-button cursor-pointer" @click="goHome()">
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
          v-for="event_data in filteredItems"
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
        v-for="event_data in filteredItems"
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
          <td>{{ event_data["cal_all Meeting URL"] }}</td>
          <td>
            - Check url and make sure it matches the one in client calendar
          </td>
        </tr>
        <tr>
          <td>Link Username/Password</td>
          <td>{{ event_data["cal_all Meeting Username"] }} / {{ event_data["cal_all Meeting Password"] }}</td>
          <td>- Meeting USERNAME is Intempio or (client)? <br />
            - Check this link for reference:
            <a v-bind:href="meeting_link">https://docs.google.com/spreadsheets/d/1k62mDH1pnn1PZTntgiNARZksbHzeTX7e5cO09tMQ1ZM/edit?ts=5a845fe2#gid=0"</a>
          </td>
        </tr>
        <tr>
          <td>Producer Call Time</td>
          <td>{{ event_data["Producer offset"] }}</td>
          <td>Is Producer Call time correct? <br />
            0 - Rehearsal/DryRun, Demo & Techcheck <br />
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
      <div class="pagination">
        <button>&laquo;</button>
        <button>&raquo;</button>
      </div>
      <div class="done">
        <button @click="done">Done</button>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
  import clientheader from '../../components/Header.vue'
  import {restService} from '../../plugins/axios';
  import {tableService} from '../../services/table-service';
  import orderBy from 'lodash.orderby';

export default {
components: {clientheader},
  data() {
    return {
      data: [],
      event_code: "",
      event_name: "",
      event_start: "",
      time: "",
      meeting_portal: "",
      meeting_url: "",
      meeting_username: "",
      meeting_password: "",
      host_code: "",
      teleconference: "",
      presenter_name: "",
      producer: "",
      clientOptions: [],
      eventOptions: [],
      selected_client: "",
      selected_event: "",
      pageSize: 1,
      currentPage: 1,
      current_date: "",
      meeting_link:
        "https://docs.google.com/spreadsheets/d/1k62mDH1pnn1PZTntgiNARZksbHzeTX7e5cO09tMQ1ZM/edit?ts=5a845fe2#gid=0",
      host_link:
        "https://docs.google.com/spreadsheets/d/1k62mDH1pnn1PZTntgiNARZksbHzeTX7e5cO09tMQ1ZM/edit?ts=5a845fe2#gid=0",
      tele_link:
        "https://docs.google.com/spreadsheets/d/1k62mDH1pnn1PZTntgiNARZksbHzeTX7e5cO09tMQ1ZM/edit?ts=5a845fe2#gid=0",
      two_days: "",
      event_id:"",
      activity:""
    };
  },
  head: {
    title: "QA 1"
  },
  created: function() {
    this.onLoadData();
    //this.client();
  },
  methods: {
    async onLoadData() {
      try {
        this.clientid = this.$route.query.clientID;
        this.dateFrom = this.$route.query.dateFrom;
        this.dateTo = this.$route.query.dateTo;
        this.eventID = this.$route.query.eventID;
        this.current_date = new Date();
        let page_url = window.location.href;
        console.log(this.two_days);

       if (page_url.indexOf("eventID") != -1) {
          let url =
            'https://intempio-scheduler.herokuapp.com/api/v3/qa-report/?clientID=' +
            this.clientid +
            "&eventID=" +
            this.eventID;
          let response = await axios.get(url);
          this.data = response.data;
        } else {
          let url =
            'https://intempio-scheduler.herokuapp.com/api/v3/qa-report/?clientID=' +
            this.clientid;
          let response = await axios.get(url);
          this.data = response.data;
        }
        console.log(this.data);
        if (this.data.length > 0) {
          let i;
          for (i = 0; i < this.data.length; i++) {
            let d = this.data[i];
            this.event_code = d["event_cod e"];
            this.event_name = d["event_name"];
            this.event_start = d["event_start"];
            this.time = d["time"];
            this.meeting_portal = d["cal_all Meeting Portal"];
            this.meeting_url = d["cal_all Meeting URL"];
            this.meeting_username = d["cal_all Meeting Username"];
            this.meeting_password = d["cal_all Meeting Password"];
            this.host_code = d["cal_producer Host Code"];
            this.teleconference = d["cal_producer Teleconference #"];
            this.presenter_name = d["cal_all Presenter 1 Name"];
            this.producer = d["Producer"];
          }
        }
      } catch (e) {
        console.log("Error in function load data handleSubmit" + e);
      }
    },
    done: function() {
      this.eventID = this.$route.query.eventID;
      let data = {
          event_id: this.eventID,
          activity: "QA 1"
        };
        let url = '/api/v3/qa-activity/';
        restService.post(url, data)
		.then(() => {
            this.event_id = '';
            this.activity = '';
          })
          .catch(error => {
            this.$toast.error(`Error: ${error}`)
          });
    },
    nextPage: function() {
      if (this.currentPage * this.pageSize < this.data.length)
        this.currentPage++;
    },
    prevPage: function() {
      if (this.currentPage > 1) this.currentPage--;
    },
    sortedData: function() {
      return this.data
        .sort((a, b) => {
          let modifier = 1;
          if (this.currentSortDir === "desc") modifier = -1;
          if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
          if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
          return 0;
        })
        .filter((row, index) => {
          let start = (this.currentPage - 1) * this.pageSize;
          let end = this.currentPage * this.pageSize;
          if (index >= start && index < end) return true;
        });
    }
  },
  computed: {
    filteredItems: function() {
      let items = this.items;
      return this.sortedData();
    }
  }
};
</script>
<style lang="scss" scoped>
  @import "../../css/people-products";
</style>
