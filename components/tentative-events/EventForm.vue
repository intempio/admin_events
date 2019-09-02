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
                       v-validate="'required'"
                       :default-country="'us'"
                       @input="onPhoneChange">
        </vue-tel-input>
        <div class="text-danger font-xs" v-show="errors.has('phoneInput')">The field is required</div>
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
        <label>Time zone:</label>
      </div>
      <div class="col-8">
        <b-form-input v-model="form.time_zone" disabled></b-form-input>
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
  import {VueTelInput} from 'vue-tel-input';

  Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);
  Vue.use(VeeValidate);

  export default {
    name: 'EventForm',
    components: {
      VueTelInput,
    },
    props: {isOpen: Boolean, eventForm: Object},
    data() {
      return {
        form: new OpenForm,
        timeNow: moment().toISOString(),
        phone: {
          number: '',
          valid: false,
          country: undefined,
        },
        validated: false
      }
    },
    created() {
      this.updateFormValues();
    },
    methods: {
      emitForm() {
        this.validated = true;
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.$emit('form', this.form);
          }
        });
      },
      clearForm() {
        this.validated = false;
        this.form = new OpenForm;
        this.$validator.pause();
        this.$nextTick(() => {
          this.$validator.errors.clear();
          this.$validator.fields.items.forEach(field => field.reset());
          this.$validator.fields.items.forEach(field => this.errors.remove(field));
          this.$validator.resume();
        })
      },
      onPhoneChange(formattedNumber, {number, valid, country}) {
        this.phone.number = number['international'];
        this.phone.valid = valid;
        this.phone.country = country && country.name;
      },
      updateFormValues() {
        if (this.isOpen) {
          this.form.name = get(this.$route.query, 'name');
          this.form.email = get(this.$route.query, 'email');
          this.form.time_zone = get(this.$route.query, 'timezone');
        } else {
          this.form = this.eventForm;
        }
      }
    },
    watch: {
      eventForm: function (val) {
        if (val) {
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
