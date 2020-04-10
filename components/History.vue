<template id="modal-template">
  <div class="modal-mask" v-show="show" transition="modal">
    <div class="modal-wrapper">
      <div class="modal-container" v-if="tab">
        <div class="modal-header d-flex justify-content-between">
          <h3>{{tab.header}}</h3>
          <div class="p-2 cursor-pointer" @click="close">
            <i class="material-icons">clear</i>
          </div>
        </div>

        <div class="modal-body">
          <div class="form-row">
            <table border="0" class="history-table">
              <thead>
                <tr>
                  <th>{{tab.colNames[0]}}</th>
                  <th>{{tab.colNames[1]}}</th>
                  <th>{{tab.colNames[2]}}</th>
                </tr>
              </thead>
              <tbody>
              <tr v-for="(item, i) in data" :key="i">
                <td>{{item[tab.colKeys[0]]}}</td>
                <td v-html=item[tab.colKeys[1]]></td>
                <td>{{item[tab.colKeys[2]]}}</td>
              </tr>
              <tr v-if="!rows.length">
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
      return {
        show: false,
        rows: [],
        tab: ''
      }
    },
    methods: {
      open: function () {
        this.show = true
      },
      close: function () {
        this.show = false
      }
    },
    watch: {
      data: function (val) {
        this.rows = val;
      },
      table: function (val) {
        this.tab = val;
      }
    }
  }
</script>
<style>
  h3 {
    font-weight: bold;
  }
</style>
