<template>
  <section class="d-flex justify-content-center">
    <div class="head">
      <div class="container">
        <div class="row">
          <div class="col-xl-8 col-lg-9 col-md-10 col-sm-12 col-12 m-auto">
            Some title
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row mt-5 pt-4">
        <div class="col-xl-8 col-lg-9 col-md-10 col-sm-12 col-12 m-auto">
          <div class="card w-100 mt-4">

            <div class="card-header">Form</div>

            <div class="card-body">
              <form @submit.prevent="recaptcha">
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
                  <div class="align-items-center bg-prime col-12 d-flex mb-3 mb-4 mt-2 p-2 text-white">
                    <div class="w-100">
                      <div class="col-8 offset-4">
                        <p>Please provide us a date<br>
                          and time when we can call you:</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-8 offset-4">
                    <VueCtkDateTimePicker
                      id="CtkDateTimePicker3"
                      v-model="form.call_time"
                      format="YYYY-MM-DD HH:mm"
                      formatted="YYYY-MM-DD HH:mm"
                      :no-header=true
                      color="#0097e1"
                      :min-date="form.estimated_time ? form.estimated_time : timeNow"
                      minute-interval="15"
                      v-validate="'required'"
                      name="contactDateTime"
                      @input="validateTime"
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
            </div>

            <div class="card-footer d-flex justify-content-end">
              <button type="button" class="cstm" @click="recaptcha">Submit</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>

</template>

<script>
  import Vue from 'vue';
  import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
  import VeeValidate from 'vee-validate';
  import {VueReCaptcha} from 'vue-recaptcha-v3'
  import {RECAPTCHA} from '../../const/recaptcha';
  import {restService} from '../../plugins/axios';
  import get from 'lodash.get';
  import * as moment from 'moment';

  Vue.use(VueReCaptcha, {
    siteKey: RECAPTCHA.siteKey,
    loaderOptions: {
      autoHideBadge: true
    }
  });
  Vue.use(VeeValidate);

  Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);

  export default {
    name: 'c-form',
    data() {
      return {
        form: {
          name: '',
          email: '',
          estimated_time: '',
          call_time: '',
          comments: ''
        },
        timeNow: moment().toISOString()
      }
    },
    created() {
      this.form.name = get(this.$route.query, 'name');
      this.form.email = get(this.$route.query, 'email');
    },
    methods: {
      recaptcha() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.$recaptcha('login').then((token) => {
              this.sendForm(token);
            })
          }
        });
      },
      sendForm(token) {
        restService.post('api/v3/tentative-events', this.form).then(resp => {
          console.log(resp);
        });
      },
      validateTime() {
        // if (this.form.estimated_time && moment(this.form.estimated_time).isBefore(moment(this.form.call_time))) {
        //
        // }
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
