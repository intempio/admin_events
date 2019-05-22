import Vue from 'vue';
import {BehaviorSubject} from "rxjs";

export const utilsService = new Vue({
  data: {
    token: '',
    loading: new BehaviorSubject(false)
  },
  methods: {
    setLoading(state) {
      this.loading.next(state);
    },
    setToken(token) {
      this.token = token;
    },
    getToken() {
      return this.token;
    }
  }
});
