<template>
  <section>
    <div class="main">
      <clientheader :clientid="clientid ? clientid : ''" :sidebarOff="true" change-system="true"></clientheader>

      <div class="container-fluid mt-5" style="padding-top: 30px">
        <div class="row">
          <div class="col-xl-11 col-lg-12 m-auto">
            <div class="row d-flex justify-content-end">
              <div class="col-5 my-2">
                <b-form-input
                  type="text"
                  v-model="search"
                  placeholder="Search"
                ></b-form-input>
              </div>
            </div>
            <table
              border="0"
              class="person_tbl w-100"
            >
              <thead>

              <tr>
                <th @click="sort('client_name')" class="cursor-pointer">
                  <div class="d-flex align-items-center flex-nowrap">
                    <span class="mr-2">Client Name</span>
                    <font-awesome-icon icon="sort" size="lg" v-if="currentSort !== 'client_name'"/>
                    <font-awesome-icon icon="caret-down" size="lg"
                                       v-if="currentSort === 'client_name' && currentSortDir === 'asc'"/>
                    <font-awesome-icon icon="caret-up" size="lg"
                                       v-if="currentSort === 'client_name' && currentSortDir === 'desc'"/>
                  </div>
                </th>
                <th
                  @click="sort('product_name')"
                  class="cursor-pointer"
                >
                  <div class="d-flex align-items-center flex-nowrap">
                    <span class="mr-2">Product Name</span>
                    <font-awesome-icon icon="sort" size="lg" v-if="currentSort !== 'product_name'"/>
                    <font-awesome-icon icon="caret-down" size="lg"
                                       v-if="currentSort === 'product_name' && currentSortDir === 'asc'"/>
                    <font-awesome-icon icon="caret-up" size="lg"
                                       v-if="currentSort === 'product_name' && currentSortDir === 'desc'"/>
                  </div>
                </th>

                <th
                  @click="sort('product_description')"
                  class="cursor-pointer"
                >
                  <div class="d-flex align-items-center flex-nowrap">
                    <span class="mr-2">Product Description</span>
                    <font-awesome-icon icon="sort" size="lg" v-if="currentSort !== 'product_description'"/>
                    <font-awesome-icon icon="caret-down" size="lg"
                                       v-if="currentSort === 'product_description' && currentSortDir === 'asc'"/>
                    <font-awesome-icon icon="caret-up" size="lg"
                                       v-if="currentSort === 'product_description' && currentSortDir === 'desc'"/>
                  </div>
                </th>

                <th class="text-center" style="width: 330px;">
                  <span>Edit actions</span>
                </th>
                <th class="text-center" style="width: 170px;">
                  <span>List actions</span>
                </th>
              </tr>
              </thead>
              <tbody>
              <tr></tr>
              <tr
                v-for="(product, index) in products"
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
                  <div class="d-flex justify-content-center flex-wrap">
                    <b-button
                      v-b-modal.modalEdit
                      class="px-2 m-1"
                      variant="primary action"
                      @click="showModal(product, 'Client')"
                    >
                      Client
                    </b-button>
                    <b-button
                      v-b-modal.modalEdit
                      class="px-2 m-1"
                      variant="primary action"
                      @click="showModal(product, 'Product')"
                    >
                      Product
                    </b-button>
                    <b-button
                      v-b-modal.modalEdit
                      class="px-2 m-1"
                      variant="primary action"
                      @click="showModal(product, 'Checklist')"
                    >
                      Checklist
                    </b-button>
                  </div>

                </td>
                <td>
                  <div class="d-flex justify-content-end">
                    <b-button v-b-modal.eventClone
                              @click="selectedEvent = product"
                              class="px-2 m-1">
                      Clone
                    </b-button>
                    <b-button v-b-modal.eventDelete
                              @click="selectedEvent = product"
                              class="px-2 m-1">
                      Delete
                    </b-button>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
            <div class="pagination py-4">
              <div class="pagination-wrap">
                <button @click="prevPage">&laquo;</button>
                <b-form-input
                  type="text"
                  :value="getPages()"
                  name="url"
                  readonly
                  style="width: 50px;"
                  class="input input-items mx-1"
                ></b-form-input>
                <b-select v-model="pageSize" placeholder="Items" style="width: 100px">
                  <option :value="item.value"
                          v-for="item in paginationOptions"
                          :key="item.value">{{item.label}}
                  </option>
                </b-select>
                <button @click="nextPage" class="mx-1">&raquo;</button>
              </div>
            </div>
            <!-- Product edit modal-->
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
              </b-form>
            </b-modal>

            <!-- Confirm Modal -->
            <b-modal
              id="eventDelete"
              ref="eventDelete"
              title="Delete Event"
              @ok="actionDelete(selectedEvent)"
            >
              <span v-if="selectedEvent">Do you want to delete product: {{selectedEvent.product_description}}?</span>
            </b-modal>

            <!-- Confirm Modal -->
            <b-modal
              size="sm"
              id="eventClone"
              ref="eventClone"
              title="Clone Event"
              @ok="actionClone(selectedEvent)"
            >
              <span v-if="selectedEvent">Do you want to clone product: {{selectedEvent.product_description}}?</span>
            </b-modal>

            <b-modal
              size="sm"
              id="modalEdit"
              ref="modal"
              :title="'Edit ' + selectedModal"
            >
              <table class="modal-tbl">
                <thead>
                <tr>
                  <th class="cursor-pointer" @click="sort('tag_name', true)">
                    <div class="d-flex align-items-center flex-nowrap">
                      <span class="mr-2">Items</span>
                      <font-awesome-icon icon="sort" size="lg" v-if="modalTableSort.field !== 'tag_name'"/>
                      <font-awesome-icon icon="caret-down" size="lg"
                                         v-if="modalTableSort.field === 'tag_name' && modalTableSort.dir === 'asc'"/>
                      <font-awesome-icon icon="caret-up" size="lg"
                                         v-if="modalTableSort.field === 'tag_name' && modalTableSort.dir === 'desc'"/>
                    </div>
                  </th>
                  <th class="cursor-pointer" @click="sort('updated', true)">
                    <div class="d-flex align-items-center flex-nowrap">
                      <span class="mr-2">Content</span>
                      <font-awesome-icon icon="sort" size="lg" v-if="modalTableSort.field !== 'updated'"/>
                      <font-awesome-icon icon="caret-down" size="lg"
                                         v-if="modalTableSort.field === 'updated' && modalTableSort.dir === 'asc'"/>
                      <font-awesome-icon icon="caret-up" size="lg"
                                         v-if="modalTableSort.field === 'updated' && modalTableSort.dir === 'desc'"/>
                    </div>
                  </th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr
                  v-for="(item, index) in modalData"
                  v-bind:key="index"
                >
                  <td class="hidden">
                    <b-form-input
                      type="text"
                      v-model="item.product_id"
                    ></b-form-input>
                  </td>
                  <td>
                    <b-form-input
                      disabled
                      type="text"
                      v-model="item.tag_name"
                    ></b-form-input>
                  </td>
                  <td>
                    <b-form-input
                      type="text"
                      v-model="item.tag_value"
                    ></b-form-input>
                  </td>
                  <td>
                    <b-button
                      type="submit"
                      variant="primary"
                      @click="updateItem(item)"
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
                      class="w-100"
                      variant="secondary"
                      @click="addItem()"
                    >+ ADD
                    </b-button>
                  </td>
                </tr>
                </tbody>
              </table>
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
  import {tableService} from '../../services/table-service';
  import orderBy from 'lodash.orderby';
  import * as moment from 'moment';

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
        modalData: [],
        product: {},
        updateM: {},
        updateModal: [],
        prod_id: null,
        tag_name: null,
        tag_value: null,
        client_name: '',
        prod_name: '',
        prodData: '',
        clientName: [],
        clientOptions: [],
        selectedEvent: '',
        tableName: 'productList',
        paginationOptions: [],
        allProducts: [],
        selectedModal: '',
        selectedItem: '',
        modalTableSort: {
          dir: 'desc',
          field: 'updated'
        }
      };
    },
    head: {
      title: 'Products List'
    },
    created: function () {
      this.onLoadData();
      this.paginationOptions = [
        {label: '10', value: 10},
        {label: '25', value: 25},
        {label: '50', value: 50},
      ];
      this.pageSize = tableService.getTableSettings(this.tableName);
    },
    methods: {
      actionDelete(product) {
        let del_url = '/api/v3/products/';
        let data_delete = {
          product_id: product.product_id
        };
        restService.delete(del_url, {data: data_delete})
          .then(() => {
            this.onLoadData();
            this.$toast.success('Event deleted successfully')
          })
          .catch(error => {
            this.$toast.error(`Error: ${error}`)
          });
      },
      getPages() {
        return `${this.currentPage}/${this.allPages}`
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
          await restService.put(update_url, data);
          this.$refs.modalUpdate.hide();
          this.onLoadData();
        } catch (error) {
          this.$toast.error(`Error: ${error}`)
        }
      },
      async actionClone(product) {
        try {
          let productData = product;
          let clone_url = '/api/v3/products/';
          restService.post(clone_url, {
            product_id: productData.product_id,
            product_name: productData.product_name,
            clone: 'True'
          });
          this.onLoadData();
          this.$toast.success('Event cloned successfully')
        } catch (error) {
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
          await restService.post(sub_url, data);
          this.product_name = '';
          this.product_description = '';
          this.client_id = '';
          this.duration_minutes = '';
          this.$refs.modalAdd.hide();
          this.onLoadData();
        } catch (error) {
          this.$toast.error(`Error: ${error}`)
        }
      },
      async onLoadData() {
        try {
          let load_url = '/api/v3/products/';
          let response = await restService.get(load_url);
          this.products = response.data;
          this.allProducts = response.data;
          this.sortedProducts();
        } catch (error) {
          this.$toast.error(`Error: ${error}`)
        }
      },
      async showModal(item, type) {
        this.selectedModal = type;
        this.selectedItem = item;
        try {
          this.prod_id = item['product_id'];
          let productid = item['product_id'];
          let turl =
            '/api/v3/producttags/?productID=' + productid + '&tagType=' + this.selectedModal;
          let response = await restService.get(turl);
          this.modalData = response.data;
          this.sortModalItems();
        } catch (error) {
          this.$toast.error(`Error: ${error}`);
        }
      },
      clearName() {
        this.name = '';
      },
      handleOk(evt) {
        evt.preventDefault();
        this.handleSubmit();
      },
      handleAdd(evt) {
        evt.preventDefault();
        this.submit();
      },
      handleUpdate(evt) {
        evt.preventDefault();
        this.sendData();
      },
      async updateItem(item) {
        try {
          let data = {
            product_id: item.product_id,
            tag_type: this.selectedModal,
            tag_name: item.tag_name,
            tag_value: item.tag_value
          };
          let pt_url = '/api/v3/producttags/';
          await restService.post(pt_url, data);
          this.$toast.success(`Updated successfully`);
          this.showModal(this.selectedItem, this.selectedModal);
        } catch (error) {
          this.$toast.error(`Error: ${error}`);
        }
      },
      async addItem() {
        try {
          let data = {
            product_id: this.prod_id,
            tag_type: this.selectedModal,
            tag_name: this.tag_name,
            tag_value: this.tag_value
          };
          let pt_url = '/api/v3/producttags/';
          await restService.post(pt_url, data);
          this.tag_name = null;
          this.tag_value = null;
          this.$toast.success(`Added successfully`);
          this.showModal(this.selectedItem, this.selectedModal);
        } catch (error) {
          this.$toast.error(`Error: ${error}`);
        }
      },
      sort: function (s, modal) {
        if (s === this.currentSort && !modal) {
          this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
        } else if (s === this.modalTableSort.field && modal) {
          this.modalTableSort.dir = this.modalTableSort.dir === 'asc' ? 'desc' : 'asc';
        }
        if (!modal) {
          this.currentSort = s;
          this.sortedProducts();
        } else {
          this.modalTableSort.field = s;
          this.sortModalItems();
        }
      },
      nextPage: function () {
        if (this.currentPage < this.allPages) {
          this.currentPage++;
          this.sortedProducts();
        }
      },
      prevPage: function () {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.sortedProducts();
        }
      },
      sortedProducts: function () {
        let list = JSON.parse(JSON.stringify(this.allProducts));

        if (this.search) {
          list = list.filter(person => {
            const results = Object.values(person).reduce((prev, val) => {
              if (typeof val === 'string' || typeof val === 'number') {
                const text = val.toString().toLowerCase();
                return [...prev, text.includes(this.search.toLowerCase())];
              }
            }, []);
            return results.some(e => !!e);
          });
        }

        this.allPages = Math.ceil(list.length / this.pageSize);

        if (list.length < this.pageSize) {
          this.currentPage = 1;
        }

        if (this.currentPage > this.allPages) {
          this.currentPage = 1;
        }

        list = list
          .sort((a, b) => {
            let modifier = 1;
            if (this.currentSortDir === 'desc') modifier = -1;
            if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
            if (a[this.currentSort] > b[this.currentSort]) return modifier;
            return 0;
          })
          .filter((row, index) => {
            let start = (this.currentPage - 1) * this.pageSize;
            let end = this.currentPage * this.pageSize;
            if (index >= start && index < end) return true;
          });

        this.products = list;
      },
      sortModalItems() {
        if (this.modalTableSort.field === 'tag_name') {
          this.modalData = orderBy(this.modalData, [this.modalTableSort.field], [this.modalTableSort.dir]);
        } else if (this.modalTableSort.field === 'updated') {
          let data = this.modalData.map(i => ({...i, updated: moment(i.updated).toDate()}));
          this.modalData = orderBy(data, ['updated', 'tag_value'], [this.modalTableSort.dir, 'asc']);
        }
        console.log(this.modalData);
      }
    },
    watch: {
      pageSize: function () {
        this.sortedProducts();
        tableService.saveTableSettings(this.tableName, this.pageSize);
      },
      search: function () {
        this.sortedProducts();
      }
    }
  };
</script>
<style lang="scss">
  @import "../../css/people-products";

  .action {
    width: 94px;
  }

  img {
    cursor: pointer;
  }
</style>
