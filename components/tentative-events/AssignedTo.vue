<template>
  <multiselect v-model="selectedItem"
               :options="items"
               name="sel"
               selectLabel="Select"
               deselectLabel="Clear"
               selectedLabel=""
               :searchable="false"
               :allowEmpty="true"
               placeholder="Management"
               @input="updateEvent">
  </multiselect>
</template>

<script>
  import Multiselect from 'vue-multiselect';
  import get from 'lodash.get';
  import {restService} from '../../plugins/axios';

  export default {
    name: 'AssignedTo',
    props: {context: Object},
    components: {
      Multiselect
    },
    data() {
      return {
        items: ['Operations', 'Sales'],
        selectedItem: ''
      }
    },
    created() {
      this.selectedItem = get(this.context, 'assigned_to');
      this.oldValue = get(this.context, 'assigned_to');
    },
    methods: {
      updateEvent() {
        const data = this.context;
        data.assigned_to = this.selectedItem;
        restService.post('api/v3/tentative-events', data)
          .then(() => {
            this.$toast.success('Event updated successfully');
            this.oldValue = this.selectedItem;
          })
          .catch(error => {
            this.selectedItem = this.oldValue;
            this.$toast.error(error);
          });
      }
    }
  }
</script>
