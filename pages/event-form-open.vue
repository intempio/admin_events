<template>
  <section class="d-flex justify-content-center">
    <Spinner v-if="isLoading"></Spinner>
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
              <TentativeEventForm :is-open="true" @form="captcha" ref="openForm"></TentativeEventForm>
            </div>

            <div class="card-footer">
              <div class="row d-flex justify-content-end">
                <div class="col-12 m-0 d-flex justify-content-end">
                  <button id="formSubmit" type="button" class="cstm" :disabled="disabled">Submit</button>
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
  import {authService} from '../services/auth-service';
  import TentativeEventForm from '../components/TentativeEventForm';
  import Spinner from '../components/Spinner';
  import {fromEvent, Subject, interval} from 'rxjs';
  import {takeUntil, throttle} from 'rxjs/operators';

  Vue.use(VueReCaptcha, {
    siteKey: RECAPTCHA.siteKey,
    autoHideBadge: true
  });

  export default {
    name: 'event-form-open',
    components: {TentativeEventForm, Spinner},
    data() {
      return {
        isLoading: false,
        submission$: '',
        onDestroy$: new Subject(),
        disabled: false
      }
    },
    created() {
      authService.loading.subscribe(val => this.isLoading = val);
    },
    mounted() {
      const submit = document.getElementById('formSubmit');
      this.submission$ = fromEvent(submit, 'click');
      this.submission$.pipe(
        takeUntil(this.onDestroy$),
        throttle(() => interval(2000))
      ).subscribe(() => {
        if (!this.disabled) {
          this.submit();
        }
      });
    },
    destroyed() {
      this.onDestroy$.next();
    },
    methods: {
      captcha(form) {
        this.$recaptcha('login').then(token => {
          form.token = token;
          this.sendForm(form);
        }).catch(error => {
          this.$toast.error(error);
          this.disableForm();
        });
      },
      sendForm(form) {
        restService.post('api/v3/tentative-events', form).then(() => {
          this.$router.push('/confirm');
        }, err => {
          this.$toast.error(err);
        });
      },
      submit() {
        this.$refs['openForm'].prepareForm();
      },
      disableForm() {
        this.disabled = true;
        setTimeout(() => {
          this.disabled = false;
        }, 1000 * 10)
      }
    }
  }
</script>
<style scoped lang="scss">
  button[disabled], button[disabled]:hover {
    background-color: darkgrey;
    opacity: 1;
    cursor: initial;
  }
</style>
