<template id="modal-template">
  <div class="modal-mask" v-show="show" transition="modal">
    <div class="modal-wrapper">
      <div class="modal-container" v-if="data">
        <div class="modal-header d-flex justify-content-between">
          <h3>Add external notes</h3>
          <div class="p-2 cursor-pointer" @click="close">
            <i class="material-icons">clear</i>
          </div>
        </div>

        <div class="modal-body" style="overflow-y: visible">
          <div class="row">
            <div class="col-12">
              <editor-content :editor="editor"/>
<!--              <b-form-textarea-->
<!--                v-model="external_notes"-->
<!--                placeholder="External notes"-->
<!--                class="input"-->
<!--                :class="{'input': true, 'is-danger': errors.includes('notes') && !external_notes }"-->
<!--                rows="5"-->
<!--              >event.external_notes-->
<!--              </b-form-textarea>-->
            </div>
            <div class="col-12 m-0">
              <div class="text-danger font-xs" v-if="errors.includes('notes') && !external_notes">This field is
                required
              </div>
            </div>
<!--            <div class="col-12 d-flex mt-2">-->
<!--              <multiselect v-model="peopleAssigned"-->
<!--                           :options="people"-->
<!--                           label="person"-->
<!--                           :class="{'input': true, 'is-danger': errors.includes('people') && !peopleAssigned }"-->
<!--                           placeholder="Person"-->
<!--                           track-by="value">-->
<!--              </multiselect>-->
<!--            </div>-->
<!--            <div class="col-12 m-0">-->
<!--              <div class="text-danger font-xs" v-if="errors.includes('people') && !peopleAssigned">This field is-->
<!--                required-->
<!--              </div>-->
<!--            </div>-->
          </div>
          <div class="row mt-4">
            <div class="col-12 d-flex justify-content-end">
              <button class="btn btn-secondary mr-4" @click="close">Close</button>
              <b-button class="btn btn-info mr-2"
                        @click="saveNote(true)">Send email
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
  import {Editor, EditorContent} from 'tiptap'
  import {EMAIL_PROCESS_TYPES} from '../const/constants';

  export default {
    name: 'ExternalNotesModal',
    components: {
      Multiselect,
      EditorContent,
    },
    template: '#modal-template',
    props: {data: Object},
    data: function () {
      return {
        show: false,
        people: [],
        peopleAssigned: '',
        external_notes: '',
        errors: [],
        editor: null,
      }
    },
    mounted() {
      this.editor = new Editor({
        content: '',
        autoFocus: true,
        onUpdate: e => {
          this.external_notes = e.getHTML();
        }
      })
    },
    methods: {
      open: function () {
        this.show = true
      },
      close: function () {
        this.show = false
      },
      saveNote(sendEmail) {
        this.errors = [];
        if (!this.external_notes) {
          this.errors.push('notes');
        }
        if (!this.errors.length) {
          this.saveNoteToDb(sendEmail);
        }
      },
      sendEmail() {
        const url = '/api/v3/send-email';
        restService.post(url, {
          event_id: this.data.eventId,
          process_type: EMAIL_PROCESS_TYPES.external_notes,
        }).then(() => {
          this.$toast.success(`E-mail sent`);
        }).catch(error => {
          this.$toast.error(`Error: ${error}`)
        });
      },
      saveNoteToDb(sendEmail) {
        const data = {
          event_id: this.data.eventId,
          external_notes: this.external_notes,
        };
        restService.put('/api/v3/events/', data)
          .then(() => {
            this.show = false;
            this.$toast.success('External note saved');
            if (sendEmail) {
              this.sendEmail();
            }
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
    },
    beforeDestroy() {
      this.editor.destroy()
    },
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
