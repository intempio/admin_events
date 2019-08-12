<template id="modal-template">
  <div class="modal-mask" v-show="show" transition="modal">
    <div class="modal-wrapper">
      <div class="modal-container" v-if="data && table">
        <div class="modal-header">
          <h2>{{table.header}}</h2>
        </div>

        <div class="modal-body">
          <div class="form-row">
            <table border="0" class="history-table">
              <thead>
                <tr>
                  <th>{{table.colNames[0]}}</th>
                  <th>{{table.colNames[1]}}</th>
                  <th>{{table.colNames[2]}}</th>
                </tr>
              </thead>
              <tbody>
              <tr v-for="(item, i) in data" :key="i">
                <td>{{item[table.colKeys[0]]}}</td>
                <td>{{item[table.colKeys[1]]}}</td>
                <td>{{item[table.colKeys[2]]}}</td>
              </tr>
              <tr v-if="!data.length">
                <td colspan="3">
                  No history records.
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button class="modal-button cstm" @click="close">Close</button>
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
    props: {data: Array, table: Object},
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
<style>
  h2 {
    font-weight: bold;
  }
</style>
