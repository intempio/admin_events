<template>
  <section>
    <clientheader :sidebarOff="true" change-system="true"></clientheader>

      <div class="container-fluid">
        <div class="row">
          <div class="col-xl-11 col-lg-12 m-auto">
            <div class="go-back-button cursor-pointer" @click="goHome()">
              <font-awesome-icon icon="chevron-left" class="mr-2"/>
              Home
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row mt-3 mb-5">
          <div class="col-xl-11 col-lg-12 m-auto">
            <c-table :items="events"
                     :cols="cols"
                     :actions="actions"
                     table-name="tentative-events"
                     title="Tentative events"
            ></c-table>
          </div>
        </div>
      </div>
      <b-modal
        size="sm"
        id="eventEdit"
        ref="eventEdit"
        class="custom-modal"
        title="Edit event"
        @hide="selectedEvent = null"
        @ok.prevent="formUpdate"
      >
        <div class="row p-5 pl-0">
          <div class="col-12">
            <EventForm :is-open="false" :event-form="selectedEvent" @form="formSave" ref="eventForm"></EventForm>
          </div>
        </div>
      </b-modal>
  </section>

</template>

<script>
  import clientheader from '../components/Header.vue';
  import AssignedTo from '../components/tentative-events/AssignedTo.vue';
  import CompletedCheckbox from '../components/tentative-events/CompletedCheckbox.vue'
  import {restService} from '../plugins/axios';
  import CTable from '../components/c-table';
  import EventForm from '../components/tentative-events/EventForm';

  export default {
    name: 'tentative-events',
    components: {EventForm, CTable, clientheader, AssignedTo, CompletedCheckbox},
    data() {
      return {
        events: [],
        cols: [],
        actions: [],
        selectedEvent: {}
      }
    },
    created() {
      this.cols = [
        {name: 'name', key: 'name'},
        {name: 'email', key: 'email'},
        {name: 'phone', key: 'phone', type: 'date'},
        {name: 'contact', key: 'call_time', type: 'date'},
        {name: 'assigned to', key: 'assigned_to', type: 'component', component: AssignedTo, width: '180px'},
        {name: 'complete', key: 'complete', type: 'component', component: CompletedCheckbox},
        {name: 'updated', key: 'updated', type: 'date'},
      ];
      this.actions = [
        {label: 'Edit', action: this.editEvent.bind(this)}
      ];
      this.getEvents();
    },
    methods: {
      getEvents() {
        restService.get('api/v3/tentative-events').then(res => {
          this.events = res.data;
        });
      },
      editEvent(data) {
        this.selectedEvent = data;
        this.$refs['eventEdit'].show();
      },
      formSave(form) {
        this.$refs['eventEdit'].hide();
        restService.put('api/v3/tentative-events', form)
          .then(() => this.$toast.success('Event updated successfully'))
          .catch(error => this.$toast.error(`Error: ${error}`))
      },
      formUpdate() {
        this.$refs['eventForm'].emitForm();
      },
      goHome() {
        this.$router.push('/system-pick');
      }
    }
  }
</script>
