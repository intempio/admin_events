<template id="modal-template">
  <div class="modal-mask" v-show="show" transition="modal">
    <div class="modal-wrapper">
      <div class="modal-container" v-if="data">
        <div class="modal-header d-flex justify-content-between">
          <h3>Add external notes</h3>
          <div class="p-2 cursor-pointer" @click="close">
            <font-awesome-icon icon="times"/>
          </div>
        </div>

        <div class="modal-body" style="overflow-y: visible">
          <div class="row">
            <div class="col-12">
              <b-form-textarea
                v-model="external_notes"
                placeholder="External notes"
                class="input"
                :class="{'input': true, 'is-danger': errors.includes('notes') && !external_notes }"
                rows="5"
              >event.external_notes
              </b-form-textarea>
            </div>
            <div class="col-12 m-0">
              <div class="text-danger font-xs" v-if="errors.includes('notes') && !external_notes">This field is
                required
              </div>
            </div>
            <div class="col-12 d-flex mt-2">
              <multiselect v-model="peopleAssigned"
                           :options="people"
                           label="person"
                           :class="{'input': true, 'is-danger': errors.includes('people') && !peopleAssigned }"
                           placeholder="Person"
                           track-by="value">
              </multiselect>
            </div>
            <div class="col-12 m-0">
              <div class="text-danger font-xs" v-if="errors.includes('people') && !peopleAssigned">This field is
                required
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-12 d-flex justify-content-end">
              <button class="btn btn-secondary mr-4" @click="close">Close</button>
              <b-button class="btn btn-info mr-2"
                        @click="sendEamil()">Send email
              </b-button>
              <b-button class="btn btn-info"
                        @click="saveNote()">Save note only
              </b-button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import Multiselect from 'vue-multiselect';
  import {restService} from '../plugins/axios';

  export default {
    name: 'ExternalNotesModal',
    components: {
      Multiselect,
    },
    template: '#modal-template',
    props: {data: Object},
    data: function () {
      return {
        show: false,
        people: [],
        peopleAssigned: '',
        external_notes: '',
        errors: []
      }
    },
    methods: {
      open: function () {
        this.show = true
      },
      close: function () {
        this.show = false
      },
      sendEamil() {
        this.errors = [];
        if (!this.external_notes) {
          this.errors.push('notes');
        }
        if (!this.peopleAssigned) {
          this.errors.push('people');
        }
        if (!this.errors.length) {
          this.saveDataToDb();
        }
      },
      saveNote() {
        this.errors = [];
        if (!this.external_notes) {
          this.errors.push('notes');
        }
        if (!this.errors.length) {
          this.saveNoteToDb();
        }
      },
      saveDataToDb() {
        const data = {
          event_id: this.data.eventId,
          send_email: true,
          external_notes: this.external_notes,
          email_external_notes: this.peopleAssigned.email
        };
        restService.put('/api/v3/events/', data)
          .then(() => {
            this.show = false;
            this.$toast.success('External notes saved')
          })
          .catch(error => {
            this.$toast.error(`Error: ${error}`)
          });
      },
      saveNoteToDb() {
        const data = {
          event_id: this.data.eventId,
          external_notes: this.external_notes,
        };
        restService.put('/api/v3/events/', data)
          .then(() => {
            this.show = false;
            this.$toast.success('External notes saved')
          })
          .catch(error => {
            this.$toast.error(`Error: ${error}`)
          });
      }
    },
    watch: {
      data: function (val) {
        if (val) {
          this.people = val.people;
          this.notes = val.external_notes;
        }
      },
    }
  }
</script>
<style>
  h3 {
    font-weight: bold;
  }

  textarea {
    max-height: 60vh;
  }
</style>