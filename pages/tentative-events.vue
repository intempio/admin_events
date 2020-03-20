<template>
  <section>
    <clientheader :sidebarOff="true" change-system="true"></clientheader>

    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-11 col-lg-12 m-auto">
          <div class="go-back-button cursor-pointer" @click="goHome()">
            <i class="material-icons mr-2">chevron_left</i>
            <h6>Home</h6>
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
          <TentativeEventForm :is-open="false" :event-form="selectedEvent" @form="formSave" ref="eventForm"></TentativeEventForm>
        </div>
      </div>
    </b-modal>
  </section>

</template>

<script>
  import clientheader from '../components/Header.vue';
  import {restService} from '../plugins/axios';
  import CTable from '../components/c-table';
  import TentativeEventForm from '../components/TentativeEventForm';

  export default {
    name: 'tentative-events',
    components: {TentativeEventForm, CTable, clientheader},
    data() {
      return {
        events: [],
        cols: [],
        actions: [],
        selectedEvent: {},
        items: ['Operations', 'Sales']
      }
    },
    created() {
      this.cols = [
        {name: 'name', key: 'name'},
        {name: 'email', key: 'email'},
        {name: 'phone', key: 'phone'},
        {name: 'contact', key: 'call_time', type: 'date'},
        {
          name: 'assigned to',
          key: 'assigned_to',
          type: 'select',
          action: this.updateEvent.bind(this),
          items: this.items
        },
        {name: 'complete', key: 'complete', type: 'checkbox', action: this.updateEvent.bind(this)},
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
        if (form) {
          restService.put('api/v3/tentative-events', form)
            .then(() => {
              this.getEvents();
              this.$toast.success('Event updated successfully');
            })
            .catch(error => this.$toast.error(`Error: ${error}`));
        }
      },
      formUpdate() {
        this.$refs['eventForm'].prepareForm();
      },
      goHome() {
        this.$router.push('/system-pick');
      },
      updateEvent(val, item, colName) {
        if (colName === 'complete') {
          item.complete = val ? 'Y' : 'N';
        } else {
          item.assigned_to = val;
        }
        restService.put('api/v3/tentative-events', item)
          .then(() => this.$toast.success('Event updated successfully'))
          .catch(error => {
            this.checked = !this.checked;
            this.$toast.error(error);
          });
      }
    }
  }
</script>
