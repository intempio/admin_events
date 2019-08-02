import Vue from 'vue';
import {BehaviorSubject} from 'rxjs';
import * as moment from 'moment';
import {PERMISSIONS} from '../const/permissions';
import union from 'lodash.union';

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
    getUser() {
      if (this.user) {
        return this.user;
      } else {
        this.restoreSession();
        return this.user;
      }
    },
    getUserPermissions() {
      const userRoles = JSON.parse(localStorage.getItem('user_roles'));
      const permissions = userRoles.reduce((prev, role) => {
        Object.keys(PERMISSIONS[role]).forEach(key => {
          if (prev.hasOwnProperty(key)) {
            prev[key] = union(prev[key], PERMISSIONS[role][key]);
            return prev;
          } else {
            prev[key] = PERMISSIONS[role][key];
          }
        });
        return prev;
      }, {});
      return permissions;
    },
    setSession(data) {
      this.token = data.accessToken;
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('expiry', JSON.stringify(data.idTokenPayload.exp));
      localStorage.setItem('user', JSON.stringify(data.idTokenPayload));
      localStorage.setItem('user_roles', JSON.stringify(data.idTokenPayload['http://localhost:8081/' + 'user_roles']));
      this.authenticated.next(true);
    },
    restoreSession() {
      const user = JSON.parse(localStorage.getItem('user'));
      const userRoles = JSON.parse(localStorage.getItem('user_roles'));
      const token = localStorage.getItem('token');
      const expiry = localStorage.getItem('expiry');
      if (user && userRoles && token && moment.unix(Number(expiry)).isAfter(moment())) {
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
