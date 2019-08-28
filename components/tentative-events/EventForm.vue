<template>

  <form>
    <div class="row form-group">
      <div class="col-4 d-flex justify-content-end align-items-center">
        <label>Name:</label>
      </div>
      <div class="col-8">
        <b-form-input v-model="form.name"></b-form-input>
      </div>
    </div>
    <div class="row form-group">
      <div class="col-4 d-flex justify-content-end align-items-center">
        <label>E-mail:</label>
      </div>
      <div class="col-8">
        <b-form-input v-model="form.email"></b-form-input>
      </div>
    </div>
    <div class="row form-group">
      <div class="col-4 d-flex justify-content-end align-items-center">
        <label>Estimated date:</label>
      </div>
      <div class="col-8">
        <VueCtkDateTimePicker
          id="CtkDateTimePicker2"
          v-model="form.estimated_time"
          :min-date="form.call_time ? form.call_time : timeNow"
          format="YYYY-MM-DD"
          formatted="YYYY-MM-DD"
          :only-date="true"
          :no-header=true
          :auto-close="true"
          label="Select date"
          :no-button-now=true
          color="#0097e1"
          minute-interval="15"
        ></VueCtkDateTimePicker>
      </div>
    </div>
    <div class="row form-group">
      <div class="align-items-center bg-prime col-12 d-flex mb-3 mb-4 mt-2 p-2 text-white" v-if="isOpen">
        <div class="w-100">
          <div class="col-8 offset-4">
            <p>Please provide us a date<br>
              and time when we can call you:</p>
          </div>
        </div>
      </div>
      <div class="col-4 d-flex justify-content-end align-items-center">
        <label>Call date/time:</label>
      </div>
      <div class="col-8">
        <VueCtkDateTimePicker
          id="CtkDateTimePicker3"
          v-model="form.call_time"
          format="YYYY-MM-DD HH:mm"
          formatted="YYYY-MM-DD HH:mm"
          :no-header=true
          color="#0097e1"
          :min-date="timeNow"
          :max-date="form.estimated_time ? form.estimated_time : ''"
          minute-interval="15"
          v-validate="'required'"
          name="contactDateTime"
          :class="{'input': true, 'is-danger': errors.has('contactDateTime') }"
        ></VueCtkDateTimePicker>
        <div class="text-danger font-xs" v-show="errors.has('contactDateTime')">The field is required
        </div>
      </div>
    </div>
    <div class="row form-group">
      <div class="col-4 d-flex justify-content-end align-items-center">
        <label>Comments:</label>
      </div>
      <div class="col-8">
        <b-form-textarea rows="4" v-model="form.comments"></b-form-textarea>
      </div>
    </div>
  </form>

</template>

<script>
  import Vue from 'vue';
  import * as moment from 'moment';
  import get from 'lodash.get';
  import VeeValidate from 'vee-validate';
  import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
  import {OpenForm} from '../../pages/open-form';

  Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);
  Vue.use(VeeValidate);

  export default {
    name: 'EventForm',
    props: {isOpen: Boolean, eventForm: Object},
    data() {
      return {
        form: new OpenForm,
        timeNow: moment().toISOString()
      }
    },
    methods: {
      emitForm() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.$emit('form', this.form);
          }
        });
      },
      clearForm() {
        this.form = new OpenForm;
      }
    },
    watch: {
      eventForm: function (val) {
        if (val) {
          if (this.isOpen) {
            this.form.name = get(this.$route.query, 'name');
            this.form.email = get(this.$route.query, 'email');
          } else {
            this.form = this.eventForm;
          }
        }
      }
    }
  }
</script>

<style scoped>
  label {
    text-align: right;
  }

  p {
    margin: 0;
  }
</style>
