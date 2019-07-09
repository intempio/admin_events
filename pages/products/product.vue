<template>
  <section>
    <div class="main">
      <clientheader :clientid="clientid ? clientid : ''" :sidebarOff="true"></clientheader>

      <div class="container-fluid mt-5" style="padding-top: 30px">
        <div class="row">
          <div class="col-xl-10 col-lg-12 m-auto">
            <div class="row d-flex justify-content-end">
              <div class="col-5 my-2">
                <b-form-input
                  type="text"
                  v-model="search"
                  placeholder="Search"
                ></b-form-input>
              </div>
            </div>
            <div class="half notif">{{ notif }}</div>
            <table
              border="0"
              class="person_tbl w-100"
            >
              <thead>

              <tr>
                <th>Client Name</th>
                <th
                  @click="sort('product_name')"
                  style="cursor:pointer"
                >
                  Product Name
                  <font-awesome-icon icon="caret-down"/>
                </th>

                <th
                  @click="sort('product_description')"
                  style="cursor:pointer"
                >
                  Product Description
                  <font-awesome-icon icon="caret-down"/>
                </th>

                <th colspan="2">
                  <div class="d-block text-center">
                    <div>
                      <span>Actions</span>
                    </div>
                    <div class="d-flex justify-content-around">
                      <div>Edit Actions</div>
                      <div>List Actions</div>
                    </div>
                  </div>
                </th>
              </tr>
              </thead>
              <tbody>
              <tr></tr>
              <tr
                v-for="(product, index) in filteredItems"
                v-bind:key="index"
              >
                <td><img
                  src="./../../assets/edit.png"
                  v-b-modal.modalUpdate
                  @click="editProduct(product)"
                /> {{ product.client_name }}
                </td>
                <td class="prod_name">{{ product.product_name }}</td>
                <td>{{ product.product_description }}</td>
                <td>
                  <b-button
                    v-b-modal.modalClient
                    variant="primary"
                    @click="showClient(product)"
                  >
                    Client
                  </b-button>
                  <b-button
                    v-b-modal.modalEdit
                    variant="primary"
                    @click="showModal(product)"
                  >
                    Product
                  </b-button>
                  <b-button
                    v-b-modal.modalChecklist
                    variant="primary"
                    @click="showChecklist(product)"
                  >
                    Checklist
                  </b-button>
                </td>
                <td>
                  <div>
                    <b-button @click="actionClone(product)">
                      Clone
                    </b-button>
                    <b-button @click="actionDelete(product)">
                      Delete
                    </b-button>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
            <div class="py-4">
              <button @click="prevPage">&laquo;</button>
              <button @click="nextPage">&raquo;</button>
            </div>
            <b-modal
              id="modalUpdate"
              ref="modalUpdate"
              title="Product Update"
              @ok="handleUpdate"
            >
              <b-form @submit.stop.prevent="sendData">
                <table class="tblProdUpdate modal-tbl">
                  <thead>
                  <tr>
                    <td></td>
                    <td></td>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>Product Name</td>
                    <td>
                      <b-form-group>
                        <b-form-input
                          type="text"
                          v-model="updateModal.product_name"
                          placeholder="Product Name"
                        >
                        </b-form-input>
                      </b-form-group>
                    </td>
                  </tr>
                  <tr>
                    <td>Product Description</td>
                    <td>
                      <b-form-group>
                        <b-form-input
                          type="text"
                          v-model="updateModal.product_description"
                          placeholder="Product Description"
                        >
                        </b-form-input>
                      </b-form-group>
                    </td>
                  </tr>
                  <tr>
                    <td>Client Name</td>
                    <td>
                      <b-form-group>
                        <b-form-select
                          :options="clientOptions"
                          v-model="updateModal.client_id"
                          placeholder="updateModal.client_name"
                        >
                        </b-form-select>
                      </b-form-group>
                    </td>
                  </tr>
                  <tr>
                    <td>Client ID</td>
                    <td>
                      <b-form-group>
                        <b-form-input
                          type="text"
                          v-model="updateModal.client_id"
                          placeholder="Client ID"
                        >
                        </b-form-input>
                      </b-form-group>
                    </td>
                  </tr>
                  <tr>
                    <td>Duration Minutes</td>
                    <td>
                      <b-form-group>
                        <b-form-input
                          type="text"
                          v-model="updateModal.duration_minutes"
                          placeholder="Duration Minutes"
                        >
                        </b-form-input>
                      </b-form-group>
                    </td>
                  </tr>
                  <tr>
                    <td>Producer Offset Minutes</td>
                    <td>
                      <b-form-group>
                        <b-form-input
                          type="text"
                          v-model="updateModal.producer_offset_minutes"
                          placeholder="Producer Offset Minutes"
                        >
                        </b-form-input>
                      </b-form-group>
                    </td>
                  </tr>
                  <tr>
                    <td>Producer Count</td>
                    <td>
                      <b-form-group>
                        <b-form-input
                          type="text"
                          v-model="updateModal.producer_count"
                          placeholder="Producer Count"
                        >
                        </b-form-input>
                      </b-form-group>
                    </td>
                  </tr>
                  </tbody>
                </table>
                <span class="notif">{{ notif }}</span>
              </b-form>
            </b-modal>
            <b-modal
              id="modalClient"
              ref="modalClient"
              title="Edit Client"
            >
              <table class="modal-tbl">
                <thead>
                <tr>
                  <th>Items</th>
                  <th>Content</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr
                  v-for="(client, index) in clientModal"
                  v-bind:key="index"
                >
                  <td class="hidden">
                    <b-form-input
                      type="text"
                      v-model="client.product_id"
                    ></b-form-input>
                  </td>
                  <td>
                    <b-form-input
                      disabled
                      type="text"
                      v-model="client.tag_name"
                    ></b-form-input>
                  </td>
                  <td>
                    <b-form-input
                      type="text"
                      v-model="client.tag_value"
                    ></b-form-input>
                  </td>
                  <td>
                    <b-button
                      type="submit"
                      variant="primary"
                      @click="updateClient(client)"
                    >UPDATE
                    </b-button>
                  </td>
                </tr>
                </tbody>
              </table>
              <div class="modAdd">
                <table class="modal-tbl">
                  <thead>
                  <tr>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td class="hidden">
                      <b-form-input type="text"></b-form-input>
                    </td>
                    <td>
                      <b-form-input
                        type="text"
                        v-model="tag_name"
                      ></b-form-input>
                    </td>
                    <td>
                      <b-form-input
                        type="text"
                        v-model="tag_value"
                      ></b-form-input>
                    </td>
                    <td>
                      <b-button
                        type="submit"
                        variant="primary"
                        @click="addClient()"
                      >+ ADD
                      </b-button>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="notif">{{ tag_notif }}</div>
            </b-modal>
            <!-- Modal Component -->
            <b-modal
              id="modalEdit"
              ref="modal"
              title="Edit Product"
            >
              <table class="modal-tbl">
                <thead>
                <tr>
                  <th>Items</th>
                  <th>Content</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr
                  v-for="(product, index) in productModal"
                  v-bind:key="index"
                >
                  <td class="hidden">
                    <b-form-input
                      type="text"
                      v-model="product.product_id"
                    ></b-form-input>
                  </td>
                  <td>
                    <b-form-input
                      disabled
                      type="text"
                      v-model="product.tag_name"
                    ></b-form-input>
                  </td>
                  <td>
                    <b-form-input
                      type="text"
                      v-model="product.tag_value"
                    ></b-form-input>
                  </td>
                  <td>
                    <b-button
                      type="submit"
                      variant="primary"
                      @click="updateProduct(product)"
                    >UPDATE
                    </b-button>
                  </td>
                </tr>
                <tr class="add">
                  <td class="hidden">
                    <b-form-input type="text"></b-form-input>
                  </td>
                  <td>
                    <b-form-input
                      type="text"
                      v-model="pro_tag_name"
                    ></b-form-input>
                  </td>
                  <td>
                    <b-form-input
                      type="text"
                      v-model="pro_tag_value"
                    ></b-form-input>
                  </td>
                  <td>
                    <b-button
                      type="submit"
                      class="w-100"
                      variant="secondary"
                      @click="addProduct()"
                    >+ ADD
                    </b-button>
                  </td>
                </tr>
                </tbody>
              </table>
              <div class="notif">{{ tag_notif }}</div>
            </b-modal>

            <b-modal
              id="modalChecklist"
              ref="modalChecklist"
              title="Edit Checklist"
            >
              <table class="modal-tbl">
                <thead>
                <tr>
                  <th>Items</th>
                  <th>Content</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr
                  v-for="(checklist, index) in checklistModal"
                  v-bind:key="index"
                >
                  <td class="hidden">
                    <b-form-input
                      type="text"
                      v-model="checklist.product_id"
                    ></b-form-input>
                  </td>
                  <td>
                    <b-form-input
                      disabled
                      type="text"
                      v-model="checklist.tag_name"
                    ></b-form-input>
                  </td>
                  <td>
                    <b-form-input
                      type="text"
                      v-model="checklist.tag_value"
                    ></b-form-input>
                  </td>
                  <td>
                    <b-button
                      type="submit"
                      variant="primary"
                      @click="updateChecklist(checklist)"
                    >UPDATE
                    </b-button>
                  </td>
                </tr>
                </tbody>
              </table>
              <div class="modAdd">
                <table class="modal-tbl">
                  <thead>
                  <tr>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td class="hidden">
                      <b-form-input type="text"></b-form-input>
                    </td>
                    <td>
                      <b-form-input
                        type="text"
                        v-model="check_tag_name"
                      ></b-form-input>
                    </td>
                    <td>
                      <b-form-input
                        type="text"
                        v-model="check_tag_value"
                      ></b-form-input>
                    </td>
                    <td>
                      <b-button
                        type="submit"
                        variant="primary"
                        @click="addChecklist()"
                      >+ ADD
                      </b-button>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="notif">{{ tag_notif }}</div>
            </b-modal>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import clientheader from '../../components/Header.vue'
  import {restService} from '../../plugins/axios';

  export default {
    components: {clientheader},
    props: ['clientid'],
    data() {
      return {
        date: [], //for the daterange
        currentSort: 'client_name',
        currentSortDir: 'asc',
        pageSize: 10,
        currentPage: 1,
        search: '',
        products: [],
        productData: {},
        product_name: null,
        product_description: null,
        client_id: null,
        duration_minutes: null,
        notif: '',
        productModal: [],
        product: {},
        updateM: {},
        clientModal: [],
        client: {},
        checklistModal: [],
        checklist: {},
        tag_notif: '',
        updateModal: [],
        prod_id: null,
        tag_name: null,
        tag_value: null,
        check_tag_name: null,
        check_tag_value: null,
        pro_tag_name: null,
        pro_tag_value: null,
        client_name: '',
        prod_name: '',
        prodData: '',
        clientName: [],
        clientOptions: []
      };
    },
    head: {
      title: 'Products List'
    },
    created: function () {
      this.onLoadData();
    },
    methods: {
      // async addItem(field) {
      //   let url = '/api/v3/producttags';
      //   var data = {
      //     product_id: this.product_id,
      //     tag_type: this.tagType,
      //     tag_name: this.selectedItem,
      //     tag_value: this.InputTagName
      //   };
      //   let response = axios
      //     .post(url, data, {
      //       headers: {
      //         'Content-Type': 'application/json'
      //       }
      //     })
      //     .then(response => {
      //       this.fetchEvenag();
      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     })
      //     .then(function () {
      //       // always executed
      //     });
      // },
      actionDelete(product) {
        let del_url = '/api/v3/products/';
        let data_delete = {
          product_id: product.product_id
        };

        restService.delete(del_url, {data: data_delete})
          .then(() => {
            this.notif = 'Product has been deleted!';
            setTimeout(function () {
              window.location.reload();
            }, 1000);
          })
          .catch(error => {
            this.$toast.error(`Error: ${error}`)
          });
      },
      async editProduct(data) {
        this.updateModal = data;
        let url = '/api/v3/clients/';
        let response = await restService.get(url);
        this.prodData = response.data;
        let i;
        let clientOption = [];
        for (i = 0; i < this.prodData.length; i++) {
          let d = this.prodData[i];
          this.clientName.push(d['client_name']);
          clientOption.push({value: d['client_id'], text: d['client_name']});
        }
        this.clientOptions = clientOption;
        console.log(this.clientOptions);
      },
      async sendData() {
        try {
          let update_url = '/api/v3/products/';
          let data = {
            product_id: this.updateModal.product_id,
            product_name: this.updateModal.product_name,
            product_description: this.updateModal.product_description,
            client_id: this.updateModal.client_id,
            duration_minutes: this.updateModal.duration_minutes
          };
          let response = await restService.put(update_url, data);
          console.log(response);
          this.notif = 'Successfully Submitted!';
          this.$refs.modalUpdate.hide();
          this.onLoadData();
          this.notif = '';
        } catch (e) {
          console.log('Error in function handleSubmit' + e);
        }
      },
      async actionClone(product) {
        try {
          let productData = product;
          let clone_url = '/api/v3/products/';
          let response = restService.post(clone_url, {
            product_id: productData.product_id,
            product_name: productData.product_name,
            clone: 'True'
          });
          this.notif = 'Product has been cloned!';
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        } catch (e) {
          this.$toast.error(`Error: ${error}`)
        }
      },
      async submit() {
        try {
          let data = {
            product_name: this.product_name,
            product_description: this.product_description,
            client_id: this.client_id,
            duration_minutes: this.duration_minutes
          };
          let sub_url = '/api/v3/products/';
          let response = await restService.post(sub_url, data);
          this.product_name = '';
          this.product_description = '';
          this.client_id = '';
          this.duration_minutes = '';
          this.notif = 'Successfully Submitted!';
          // this.$router.push('/');
          this.$refs.modalAdd.hide();
          this.onLoadData();
          this.notif = '';
        } catch (e) {
          this.$toast.error(`Error: ${error}`)
        }
      },
      async onLoadData() {
        try {
          let load_url = '/api/v3/products/';
          let response = await restService.get(load_url);
          this.products = response.data;
          // console.log(this.products);
        } catch (e) {
          console.log('Error in function handleSubmit' + e);
        }
      },
      async showModal(product) {
        try {
          this.prod_id = product['product_id'];
          let productid = product['product_id'];
          let turl =
            '/api/v3/producttags/?productID=' + productid + '&tagType=Product';
          let response = await restService.get(turl);
          this.productModal = response.data;
        } catch (e) {
          console.log('Error in function handleSubmit' + e);
        }
      },
      async showClient(product) {
        try {
          this.prod_id = product['product_id'];
          let productid = product['product_id'];
          let turl =
            '/api/v3/producttags/?productID=' + productid + '&tagType=Client';
          let response = await restService.get(turl);
          this.clientModal = response.data;
        } catch (e) {
          console.log('Error in function handleSubmit' + e);
        }
      },
      async showChecklist(product) {
        try {
          this.prod_id = product['product_id'];
          let productid = product['product_id'];
          let turl =
            '/api/v3/producttags/?productID=' + productid + '&tagType=Checklist';
          let response = await restService.get(turl);
          this.checklistModal = response.data;
          if (this.checklistModal > 0) {
            let i;
            for (i = 0; i < this.checklistModal.length; i++) {
              let d = this.checklistModal[i];
              console.log(d['tag_name']);
            }
          } else {
            //test
          }
        } catch (e) {
          console.log('Error in function handleSubmit' + e);
        }
      },
      clearName() {
        this.name = '';
      },
      handleOk(evt) {
        evt.preventDefault();
        this.handleSubmit();
        //}
      },
      handleAdd(evt) {
        evt.preventDefault();
        this.submit();
      },
      handleUpdate(evt) {
        evt.preventDefault();
        this.sendData();
      },
      async updateProduct(product) {
        try {
          let data = {
            product_id: product.product_id,
            tag_type: 'Product',
            tag_name: product.tag_name,
            tag_value: product.tag_value
          };
          console.log('data' + data.tag_value);
          let pt_url = '/api/v3/producttags/';
          let response = await restService.post(pt_url, data);
          this.tag_notif = 'Successfully submitted!';
        } catch (e) {
          console.log('Error in function handleSubmit' + e);
        }
      },
      async addProduct() {
        try {
          let data = {
            product_id: this.prod_id,
            tag_type: 'Product',
            tag_name: this.pro_tag_name,
            tag_value: this.pro_tag_value
          };
          let pt_url = '/api/v3/producttags/';
          let response = await restService.post(pt_url, data);
          this.pro_tag_name = '';
          this.pro_tag_value = '';
          this.tag_notif = 'Successfully submitted!';
        } catch (e) {
          this.$toast.error(`Error: ${error}`)
        }
      },
      async updateClient(client) {
        try {
          let data = {
            product_id: client.product_id,
            tag_type: 'Client',
            tag_name: client.tag_name,
            tag_value: client.tag_value
          };
          console.log('data' + data.tag_value);
          let pt_url = '/api/v3/producttags/';
          let response = await restService.post(pt_url, data);
          this.tag_notif = 'Successfully submitted!';
        } catch (e) {
          console.log('Error in function handleSubmit' + e);
        }
      },
      async addClient() {
        try {
          let data = {
            product_id: this.prod_id,
            tag_type: 'Client',
            tag_name: this.tag_name,
            tag_value: this.tag_value
          };
          let pt_url = '/api/v3/producttags/';
          let response = await restService.post(pt_url, data);
          this.tag_notif = 'Successfully submitted!';
        } catch (e) {
          this.$toast.error(`Error: ${error}`)
        }
      },
      async updateChecklist(checklist) {
        try {
          let data = {
            product_id: checklist.product_id,
            tag_type: 'Checklist',
            tag_name: checklist.tag_name,
            tag_value: checklist.tag_value
          };
          console.log('data' + data.tag_value);
          let pt_url = '/api/v3/producttags/';
          let response = await restService.post(pt_url, data);
          this.tag_name = '';
          this.tag_value = '';
          this.tag_notif = 'Successfully submitted!';
        } catch (e) {
          console.log('Error in function handleSubmit' + e);
        }
      },
      async addChecklist() {
        try {
          let data = {
            product_id: this.prod_id,
            tag_type: 'Checklist',
            tag_name: this.check_tag_name,
            tag_value: this.check_tag_value
          };
          console.log(data);
          let pt_url = '/api/v3/producttags/';
          let response = await restService.post(pt_url, data);
          this.check_tag_name = '';
          this.check_tag_value = '';
          this.tag_notif = 'Successfully submitted!';
        } catch (e) {
          this.$toast.error(`Error: ${error}`)
        }
      },
      sort: function (s) {
        //if s == current sort, reverse
        if (s === this.currentSort) {
          this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
        }
        this.currentSort = s;
      },
      nextPage: function () {
        if (this.currentPage * this.pageSize < this.products.length)
          this.currentPage++;
      },
      prevPage: function () {
        if (this.currentPage > 1) this.currentPage--;
      },
      sortedproducts: function () {
        return this.products
          .sort((a, b) => {
            let modifier = 1;
            if (this.currentSortDir === 'desc') modifier = -1;
            if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
            if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
            return 0;
          })
          .filter((row, index) => {
            let start = (this.currentPage - 1) * this.pageSize;
            let end = this.currentPage * this.pageSize;
            if (index >= start && index < end) return true;
          });
      },
      searchproducts: function () {
        var self = this;
        return this.products.filter(function (products) {
          return (
            products.product_name
              .toLowerCase()
              .indexOf(self.search.toLowerCase()) >= 0
          );
        });
      }
    },
    computed: {
      filteredItems: function () {
        let items = this.items;
        if (this.search.length > 0) {
          return this.searchproducts();
        }
        return this.sortedproducts();
      }
    }
  };
</script>
<style lang="scss">
  @import "../../css/people-products";
</style>
