<template>
  <div class="main">
    <clientheader :clientid="clientid"></clientheader>

    <div class="container-fluid mt-5" style="padding-top: 30px">
      <div class="row">
        <div class="col-12">
          <div class="half notif">{{ notif }}</div>
          <div class="half">
            <div class="search-cont">
              <input
                type="text"
                v-model="search"
                placeholder="Search"
              />
            </div>
          </div>
          <table
            border="0"
            class="person_tbl"
          >
            <thead>

            <tr>
              <th>Client Name</th>
              <th
                @click="sort('product_name')"
                style="cursor:pointer"
              >
                Product Name <img
                src="~/assets/sort.png"
                class="tbl-sort"
              />
              </th>

              <th
                @click="sort('product_description')"
                style="cursor:pointer"
              >
                Product Description
                <img
                  src="~/assets/sort.png"
                  class="tbl-sort"
                />
              </th>

              <th colspan="2">
                Actions
                <ul class="sub-heading">
                  <li>Edit Actions</li>
                  <li>List Actions</li>
                </ul>
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
          <div class="pagination">
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
              <table class="tblProdUpdate">
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
            <table>
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
              <table>
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
            <table>
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
              </tbody>
            </table>
            <div class="modAdd">
              <table>
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
                      variant="primary"
                      @click="addProduct()"
                    >+ ADD
                    </b-button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="notif">{{ tag_notif }}</div>
          </b-modal>

          <b-modal
            id="modalChecklist"
            ref="modalChecklist"
            title="Edit Checklist"
          >
            <table>
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
              <table>
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
</template>

<script>
  import axios from 'axios';

  export default {
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
      async addItem(field) {
        let url = process.env.VUE_APP_API + '/api/v3/producttags';
        var data = {
          product_id: this.product_id,
          tag_type: this.tagType,
          tag_name: this.selectedItem,
          tag_value: this.InputTagName
        };
        let response = axios
          .post(url, data, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => {
            this.fetchEvenag();
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // always executed
          });
      },
      async actionDelete(product) {
        let del_url = process.env.VUE_APP_API + '/api/v3/products/';
        try {
          let productData = product;
          let data_delete = {
            product_id: productData.product_id
          };
          let response = axios.delete(del_url, {data: data_delete});
          this.notif = 'Product has been deleted!';
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        } catch (e) {
          window.alert('Error logging in' + e);
        }
      },
      async editProduct(data) {
        this.updateModal = data;
        let url = process.env.VUE_APP_API + '/api/v3/clients/';
        let response = await axios.get(url);
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
          let update_url = process.env.VUE_APP_API + '/api/v3/products/';
          let data = {
            product_id: this.updateModal.product_id,
            product_name: this.updateModal.product_name,
            product_description: this.updateModal.product_description,
            client_id: this.updateModal.client_id,
            duration_minutes: this.updateModal.duration_minutes
          };
          let response = await axios.put(update_url, data);
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
          let clone_url = process.env.VUE_APP_API + '/api/v3/products/';
          let response = axios.post(clone_url, {
            product_id: productData.product_id,
            product_name: productData.product_name,
            clone: 'True'
          });
          this.notif = 'Product has been cloned!';
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        } catch (e) {
          window.alert('Error logging in' + e);
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
          let sub_url = process.env.VUE_APP_API + '/api/v3/products/';
          let response = await axios.post(sub_url, data);
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
          window.alert('Error logging in');
        }
      },
      async onLoadData() {
        try {
          let load_url = process.env.VUE_APP_API + '/api/v3/products/';
          let response = await axios.get(load_url);
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
          let response = await axios.get(process.env.VUE_APP_API + turl);
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
          let response = await axios.get(process.env.VUE_APP_API + turl);
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
          let response = await axios.get(process.env.VUE_APP_API + turl);
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
          let response = await axios.post(process.env.VUE_APP_API + pt_url, data);
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
          let response = await axios.post(process.env.VUE_APP_API + pt_url, data);
          this.pro_tag_name = '';
          this.pro_tag_value = '';
          this.tag_notif = 'Successfully submitted!';
        } catch (e) {
          window.alert('Error logging in' + e);
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
          let response = await axios.post(process.env.VUE_APP_API + pt_url, data);
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
          let response = await axios.post(process.env.VUE_APP_API + pt_url, data);
          this.tag_notif = 'Successfully submitted!';
        } catch (e) {
          window.alert('Error logging in' + e);
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
          let response = await axios.post(process.env.VUE_APP_API + pt_url, data);
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
          let response = await axios.post(process.env.VUE_APP_API + pt_url, data);
          this.check_tag_name = '';
          this.check_tag_value = '';
          this.tag_notif = 'Successfully submitted!';
        } catch (e) {
          window.alert('Error logging in' + e);
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

  button.btn-secondary {
    background: #74bd44;
  }

  .hidden {
    visibility: hidden;
    display: none;
  }

  table.person_tbl {
    width: 100%;
    font-size: 14px;
  }

  table.person_tbl td,
  table.person_tbl th {
    border: 0;
    padding: 0.5rem;
  }

  table.person_tbl th {
    border-bottom: 2px solid #dee2e6;
    border-top: 1px solid #dee2e6;
    text-align: center;
  }

  table.person_tbl tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.05);
  }

  table.person_tbl tbody td {
    border-top: 1px solid #dee2e6;
    text-align: center;
  }

  table.person_tbl td.id {
    display: none;
  }

  .pagination {
    margin-top: 20px;
  }

  button,
  button.btn.btn-primary {
    border: 0;
    margin-right: 10px;
    padding: 5px 30px;
    color: #fff;
    font-size: 13px;
    background: #0097e1;
    cursor: pointer !important;
    border-radius: 0;
  }

  .modAdd {
    background: #f1f1f1;
    margin-top: 30px;
  }

  button.btn.btn-secondary {
    border: 0;
    margin-right: 10px;
    padding: 5px 20px;
    font-size: 13px;
    cursor: pointer !important;
    border-radius: 0;
  }

  button.btn.btn-danger {
    border: 0;
    margin-right: 10px;
    padding: 5px 30px;
    color: #fff;
    font-size: 13px;
    cursor: pointer !important;
    border-radius: 0;
  }

  button.close {
    border: 0;
    box-shadow: none;
    right: -9px;
    background: #0097e1 !important;
    opacity: 0.9 !important;
    text-align: center;
    margin: 0 !important;
    padding: 0 0 2px !important;
    width: 28px;
    font-weight: normal;
    font-size: 16px;
    border-radius: 50%;
  }

  span.notif {
    padding: 20px 0;
    font-style: italic;
    color: green;
    font-size: 13px;
  }

  button:hover,
  button.btn.btn-primary:hover {
    opacity: 0.7;
  }

  textarea.form-control {
    height: 150px;
  }

  .form-control {
    font-size: 14px;
    border-radius: 0;
  }

  .half {
    width: 49.7%;
    display: inline-block;
    vertical-align: top;
    padding: 20px 0;
  }

  .search-cont {
    display: inline-block;
    width: 79%;
  }

  .search-cont input {
    width: 100%;
    border: solid 1px #dee2e6;
    padding: 5px 10px;
    font-size: 13px;
  }

  td.prod_name {
    text-align: left !important;
  }

  td.prod_name img {
    padding-right: 10px;
  }

  /*ul.sub-heading li {*/
  /*  width: 59%;*/
  /*  display: inline-block;*/
  /*  font-size: 14px;*/
  /*  list-style-type: none;*/
  /*  font-weight: normal;*/
  /*}*/

  /*ul.sub-heading li:last-child {*/
  /*  width: 40%;*/
  /*}*/

</style>
