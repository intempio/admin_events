import Vue from 'vue';
import {restService} from '../plugins/axios';

export const apiService = new Vue({
  methods: {
    getPeopleAssigned(eventId) {
      return restService.get('/api/v3/eventpersons/?eventID=' + eventId);
    }
  }
});
