<template id="modal-template">
  <div class="modal-mask" v-show="show" transition="modal">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">
            <h2 class="colored">Change Status</h2>
          </slot>
        </div>

        <div class="modal-body">
          <div class="form-row">
            <span>Are You sure to change status?</span>
          </div>
        </div>

        <div class="modal-footer status">
          <slot name="footer">
            <button class="modal-button save cstm" @click="save">Save</button>
            <button class="modal-button cstm" @click="close">Cancel</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'statusupdatemodal',
  template: '#modal-template',
  props: {
    saveCallback: Function,
    fieldName: String
  },
  data: function() {
    return { show: false }
  },
  methods: {
    open: function() {
      this.show = true
    },
    close: function() {
      this.show = false
    },
    save: function() {
      this.saveCallback(this.fieldName)
      this.show = false
    }
  },
  computed: {}
}
</script>
