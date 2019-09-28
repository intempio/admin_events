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
        <b-form-input v-model="form.email"
                      type="email"
                      name="email"
                      :class="{'input': true, 'is-danger': errors.has('email') }"
                      v-validate="'email|required'">
        </b-form-input>
        <div class="text-danger font-xs" v-show="errors.has('email')">{{errors.first('email')}}</div>
      </div>
    </div>
    <div class="row form-group">
      <div class="col-4 d-flex justify-content-end align-items-center">
        <label>Phone number:</label>
      </div>
      <div class="col-8">
        <vue-tel-input v-model="form.phone"
                       :class="{'is-danger': !phone.valid && (phone.number || validated), 'form-control': true}"
                       :valid-characters-only="true"
                       :required="true"
                       placeholder=""
                       name="phoneInput"
                       :v-validate="'required'"
                       :default-country="'us'"
                       @input="onPhoneChange">
        </vue-tel-input>
        <div class="text-danger font-xs" v-show="!phone.valid && (phone.number || validated)">Phone number not valid
        </div>
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
        <label>Call date:</label>
      </div>
      <div class="col-8">
        <div class="row">
          <div class="col-sm-6 col-12 m-0">
            <datepicker v-model="form.call_time"
                        name="contactDateTime"
                        input-class="form-control"
                        v-validate="'required'"
                        :disabled-dates="disabledDates"
                        :class="{'input': true, 'is-danger': errors.has('contactDateTime') }">
            </datepicker>
          </div>
          <div class="col-sm-1 col-6 d-none p-0 d-sm-flex justify-content-end align-items-center">time:</div>
          <div class="col-sm-5 col-6 d-none d-sm-block m-0">
            <b-form-input v-model="time" type="time"></b-form-input>
          </div>
        </div>
        <div class="row">
          <div class="col-12 m-0">
            <div class="text-danger font-xs" v-show="errors.has('contactDateTime')">The field is required</div>
          </div>
        </div>
      </div>
    </div>

    <div class="row form-group d-sm-none d-flex">
      <div class="col-4 d-flex justify-content-end align-items-center">
        <label>Call time:</label>
      </div>
      <div class="col-8">
        <b-form-input v-model="time" type="time"></b-form-input>
      </div>
    </div>

    <div class="row form-group">
      <div class="col-4 d-flex justify-content-end align-items-center">
        <label>Time zone:</label>
      </div>
      <div class="col-8">
        <b-form-input v-model="form.time_zone" readonly></b-form-input>
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
  import isEqual from 'lodash.isequal';
  import VeeValidate from 'vee-validate';
  import {OpenForm} from '../pages/open-form';
  import {VueTelInput} from 'vue-tel-input';
  import Datepicker from 'vuejs-datepicker';

  Vue.use(VeeValidate);

  export default {
    name: 'TentativeEventForm',
    components: {
      VueTelInput,
      Datepicker
    },
    props: {isOpen: Boolean, eventForm: Object},
    created() {
      if (this.isOpen) {
        this.setQueryValues();
      }
    },
    data() {
      return {
        form: new OpenForm,
        timeNow: moment().toISOString(),
        phone: {
          number: '',
          valid: false,
          country: undefined,
        },
        validated: false,
        disabledDates: {
          to: moment().toDate()
        },
        time: ''
      }
    },
    methods: {
      prepareForm() {
        if (!this.isOpen) {
          if (!isEqual(this.form, this.eventForm) || moment(this.eventForm.call_time).format('HH:mm') !== this.time) {
            this.emitForm();
          } else {
            this.$emit('form', null);
          }
        } else {
          this.emitForm();
        }
      },
      emitForm() {
        this.validated = true;
        this.$validator.validateAll().then((result) => {
          if (result && this.phone.valid) {
            const data = this.form;
            data.phone = this.phone.number || this.form.phone;
            if (this.time) {
              const hour = Number(this.time.split(':')[0]);
              const minute = Number(this.time.split(':')[1]);
              data.call_time = moment(data.call_time).set('hour', hour).set('minute', minute).utc(true).format('MM-DD-YYYY HH:mm:ss');
            } else {
              data.call_time = moment(data.call_time).startOf('day').format('MM-DD-YYYY HH:mm:ss');
            }
            this.$emit('form', data);
          }
        });
      },
      setQueryValues() {
        const timezone = get(this.$route.query, 'timezone');
        this.form.name = get(this.$route.query, 'name');
        this.form.email = get(this.$route.query, 'email');
        this.form.time_zone = timezone ? timezone : 'EST';
      },
      onPhoneChange(formattedNumber, {number, valid, country}) {
        this.phone.number = number['international'];
        this.phone.valid = valid;
        this.phone.country = country && country.name;
      },
      updateFormValues() {
        if (!this.isOpen) {
          this.form = JSON.parse(JSON.stringify(this.eventForm));
          const hour = moment(this.eventForm.call_time).format('HH');
          const minute = moment(this.eventForm.call_time).format('mm');
          this.time = `${hour}:${minute}`;
          this.phone.number = this.eventForm.phone;
          this.phone.valid = true;
        }
      }
    },
    watch: {
      eventForm: function (val) {
        if (val) {
          this.validated = false;
          this.updateFormValues();
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
