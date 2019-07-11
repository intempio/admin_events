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
              <div v-for="(item, index) in Products" v-bind:key="item.product_id">
                <b-radio
                  v-model="selectedProduct[index]"
                  name="product"
                  :native-value="item.product_id">
                  {{item.product_name}}
                </b-radio>
              </div>
            </form>
          </div>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button @click="show=false">Cancel</button>
            <button class="clone ml-1" @click="addEvent()">Next</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {restService} from '../plugins/axios';

  export default {
    name: 'addeventmodal',
    template: '#modal-addevent-template',
    props: {clientId: String},
    data: function () {
      return {
        show: false,
        Products: [],
        selectedProduct: []
      }
    },
    watch: {
      clientId: function () {
        this.fetchProducts()
      }
    },
    methods: {
      open: function () {
        this.show = true
      },
      close: function () {
        this.show = false
      },
      fetchProducts: function () {
        const url = '/api/v3/products/?clientID=' + this.clientId
        restService.get(url)
          .then(response => this.Products = response.data)
          .catch(err => {
            this.$toast.error(`Cannot fetch product list: ${err}`)
          })
      },
      addEvent: function () {
        const url = process.env.VUE_APP_API + '/api/v3/events/'
        var data = {
          client_id: this.clientId,
          product_id: this.getProductId(this.selectedProduct)
        }

        restService
          .post(url, data)
          .then(response => {
            this.$router.push(`/admin/events/${response.data.event_id}`)
          })
          .catch(error => {
            console.log(error);
            this.$toast.error(`Error: ${error}`);
          })
      },

      getProductId: function (selectedProduct) {
        var i
        for (i = 0; i < selectedProduct.length; i++) {
          if (selectedProduct[i]) return selectedProduct[i]
        }
      }
    },
    computed: {},
    mounted: function () {
      this.fetchProducts()
    }
  }
</script>
