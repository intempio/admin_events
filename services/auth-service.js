import Vue from 'vue';
import {BehaviorSubject} from 'rxjs';

export const authService = new Vue({
  data: {
    token: '',
    user: '',
    userRoles: '',
    loading: new BehaviorSubject(false),
    authenticated: new BehaviorSubject(false)
  },
  methods: {
    setLoading(state) {
      this.loading.next(state);
    },
    setToken(token) {
      this.token = token;
    },
    getToken() {
      if (!this.token) {
        this.restoreSession();
      }
      return this.token;
    },
    setSession(data) {
      this.token = data.accessToken;
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('expiry', JSON.stringify(data.tokenExpiry));
      localStorage.setItem('user', JSON.stringify(data.idTokenPayload));
      localStorage.setItem('user_roles', JSON.stringify(data.idTokenPayload['http://localhost:8081/' + 'user_roles']));
      this.authenticated.next(true);
    },
    restoreSession() {
      const user = JSON.parse(localStorage.getItem('user'));
      const userRoles = JSON.parse(localStorage.getItem('user_roles'));
      const token = localStorage.getItem('token');
      if (user && userRoles && token) {
        this.user = user;
        this.userRoles = userRoles;
        this.token = token;
        this.authenticated.next(true);
      }
    },
    terminateSession() {
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('access_token');
      localStorage.removeItem('token');
      localStorage.removeItem('expiry');
      localStorage.removeItem('user');
      localStorage.removeItem('user_roles');
      this.authenticated.next(false);
    },
    // isLoggedIn() {
    //   if (!this.token || !this.user || !this.userRoles) {
    //     this.restoreSession();
    //   }
    //   this.authenticated.next(true);
    //   return this.token && this.user && this.userRoles;
    // }
  }
});
