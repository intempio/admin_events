<template id="modal-template">
  <div class="modal-mask" v-show="show" transition="modal">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">
            <h2 class="colored">History</h2>
          </slot>
        </div>

        <div class="modal-body">
          <div class="form-row">
            <table border="0"
                   class="history fixed_header">
              <thead>
              <slot name="table-header">
                <tr>
                  <th class="history-th-1">Date Time</th>
                  <th class="history-th-2">User</th>
                  <th class="history-th-3">Event Code</th>
                </tr>
              </slot>
              </thead>
              <slot name="table-body">
                <tbody>
                <tr>
                  <td>2018-05-30 13:00</td>
                  <td>Michelle</td>
                  <td>Event Code</td>
                </tr>
                </tbody>
              </slot>
            </table>
          </div>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button class="modal-button" @click="close">Close</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'modal',
    template: '#modal-template',
    props: {clientStatusHist: Array},
    data: function () {
      return {show: false}
    },
    methods: {
      open: function () {
        this.show = true
      },
      close: function () {
        this.show = false
      }
    },
    computed: {}
  }
</script>
