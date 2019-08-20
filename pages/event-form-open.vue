<template>
  <section class="d-flex justify-content-center">
    <div class="head">
      <div class="container">
        <div class="row">
          <div class="col-xl-8 col-lg-9 col-md-10 col-sm-12 col-12 m-auto">
            Request for Contact
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
              <EventForm :is-open="true" @form="captcha" ref="openForm"></EventForm>
            </div>

            <div class="card-footer d-flex justify-content-end">
              <button type="button" class="cstm" @click="submit">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
  import Vue from 'vue';
  import {VueReCaptcha} from 'vue-recaptcha-v3'
  import {RECAPTCHA} from '../const/recaptcha';
  import {restService} from '../plugins/axios';
  import EventForm from '../components/tentative-events/EventForm';

  Vue.use(VueReCaptcha, {
    siteKey: RECAPTCHA.siteKey
  });

  export default {
    name: 'event-form-open',
    components: {EventForm},
    data() {
      return {}
    },
    methods: {
      captcha(form) {
        this.$recaptcha('login').then(token => {
          console.log('token');
          console.log(token);
          form.token = token;
          this.sendForm(form);
        }).catch(error => this.$toast.error(error));
      },
      sendForm(form) {
        restService.post('api/v3/tentative-events', form).then(resp => {
          console.log(resp);
        });
      },
      submit() {
        this.$refs['openForm'].emitForm();
      }
    }
  }
</script>
