<template>
  <b-form-checkbox
    class="table-checkbox"
    v-model="checked"
    @change="updateEvent"
    name="checkbox-c">
  </b-form-checkbox>
</template>

<script>
  import get from 'lodash.get';
  import {restService} from '../../plugins/axios';

  export default {
    name: 'CompletedCheckbox',
    props: {context: Object},
    data() {
      return {
        checked: false
      }
    },
    created() {
      this.checked = get(this.context, 'complete');
    },
    methods: {
      updateEvent() {
        const data = this.context;
        data.complete = this.checked;
        restService.put('api/v3/tentative-events', data)
          .then(() => this.$toast.success('Event updated successfully'))
          .catch(error => {
            this.checked = !this.checked;
            this.$toast.error(error);
          });
      }
    }
  }
</script>
