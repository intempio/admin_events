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

    <div class="container mb-5">
      <div class="row mt-5 pt-4 mb-4">
        <div class="col-xl-8 col-lg-9 col-md-10 col-sm-12 col-12 m-auto">

          <div class="card w-100 mt-4">
            <div class="card-header">Form</div>

            <div class="card-body">
              <EventForm :is-open="true" @form="captcha" ref="openForm"></EventForm>
            </div>

            <div class="card-footer">
              <div class="row d-flex justify-content-end">
                <div class="col-12 m-0 d-flex justify-content-end">
                  <button type="button" class="cstm" @click="submit">Submit</button>
                </div>

                <div class="col-8 col-md-7 col-lg-6 mt-3 d-flex justify-content-end align-items-center">
                <span class="text-right text-muted font-xs">This site is protected by reCAPTCHA and the Google
                  <a href="https://policies.google.com/privacy">Privacy Policy</a> and
                  <a href="https://policies.google.com/terms">Terms of Service</a> apply.
                </span>
                </div>
              </div>
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
    siteKey: RECAPTCHA.siteKey,
    autoHideBadge: true
  });

  export default {
    name: 'event-form-open',
    components: {EventForm},
    methods: {
      captcha(form) {
        this.$recaptcha('login').then(token => {
          form.token = token;
          this.sendForm(form);
        }).catch(error => this.$toast.error(error));
      },
      sendForm(form) {
        restService.post('api/v3/tentative-events', form).then(() => {
          this.$toast.success('Form submitted successfully!');
          this.$refs['openForm'].clearForm();
        }, err => {
          this.$toast.error(err);
        });
      },
      submit() {
        this.$refs['openForm'].emitForm();
      }
    }
  }
</script>
