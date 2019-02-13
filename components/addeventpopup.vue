<template id="modal-template">
  <div class="modal-mask" v-show="show" transition="modal">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">
            <h2 class="colored">Products</h2>
          </slot>
        </div>

        <div class="modal-body">
          <div class="radio-wrap">
            <form>
              <div class="field" v-for="(item, index) in Products" v-bind:key="item.product_id">
                <input
                  name="product"
                  type="radio"
                  v-model="selectedProduct[index]"
                  :value="item.product_id"
                  class="b-radio"
                >
                {{item.product_name}}
                <br>
              </div>
            </form>
          </div>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button class="modal-button" @click="addEvent()">Next</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'addeventmodal',
  template: '#modal-addevent-template',
  props: { clientId: String },
  data: function() {
    return { show: false, Products: [], selectedProduct: [] }
  },
  watch: {
    clientId: function() {
      this.fetchProducts()
    }
  },
  methods: {
    open: function() {
      this.show = true
    },
    close: function() {
      this.show = false
    },
    fetchProducts: function() {
      const url =
        'https://intempio-api-v3.herokuapp.com/api/v3/products?clientID=' +
        this.clientId

      axios.get(url).then(response => {
        this.Products = response.data
      })
    },
    addEvent: function() {
      const url = 'https://intempio-api-v3.herokuapp.com/api/v3/events/'
      var data = {
        client_id: this.clientId,
        product_id: this.getProductId(this.selectedProduct)
      }

      axios
        .post(url, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          this.$router.push(`/events/${response.data.event_id}`)
        })
        .catch(function(error) {
          console.log(error)
        })
        .then(function() {
          // always executed
        })
    },

    getProductId: function(selectedProduct) {
      var i
      for (i = 0; i < selectedProduct.length; i++) {
        if (selectedProduct[i]) return selectedProduct[i]
      }
    }
  },
  computed: {},
  mounted: function() {
    this.fetchProducts()
  }
}
</script>