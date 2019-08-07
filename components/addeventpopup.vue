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
            <b-form-group>
              <div v-for="item in Products" v-bind:key="item.product_id">
                <b-form-radio
                  @change="productSelect($event)"
                  :value="item"
                  name="product">
                  {{item.product_name}}
                </b-form-radio>
              </div>
            </b-form-group>
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
    data() {
      return {
        show: false,
        Products: [],
        selectedProduct: ''
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
      productSelect(product) {
        this.selectedProduct = product.product_id;
      },
      fetchProducts: function () {
        const url = '/api/v3/products/?clientID=' + this.clientId;
        restService.get(url)
          .then(response => {
            this.Products = response.data;
          })
          .catch(err => {
            this.$toast.error(`Cannot fetch product list: ${err}`)
          })
      },
      addEvent: function () {
        const url = process.env.VUE_APP_API + '/api/v3/events/';
        const data = {
          client_id: this.clientId,
          product_id: this.selectedProduct
        };
        restService
          .post(url, data)
          .then(response => {
            this.$router.push(`/admin/events/${response.data.event_id}`)
          })
          .catch(error => {
            this.$toast.error(`Error: ${error}`);
          })
      }
    },
    computed: {},
    mounted: function () {
      this.fetchProducts()
    }
  }
</script>
