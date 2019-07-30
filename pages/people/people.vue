<template>
  <section>
    <div class="main">

      <clientheader :clientid="clientid ? clientid : ''" :sidebarOff="true" change-system="true"></clientheader>

      <div class="container-fluid mt-5" style="padding-top: 30px">
        <div class="row">
          <div class="col-xl-10 col-lg-12 m-auto">
            <div class="row mt-3">
              <div class="col-12 d-flex justify-content-end">
                <b-button
                  v-b-modal.modalAdd
                  variant="primary"
                >
                  + Add
                </b-button>
                <div class="w-25">
                  <b-form-input
                    type="text"
                    v-model="search"
                    placeholder="Search"
                  ></b-form-input>
                </div>
                <!-- Modal Component -->
                <b-modal
                  id="modalAdd"
                  ref="modalAdd"
                  title="Add Person"
                  @ok="handleAdd"
                >
                  <b-form @submit.stop.prevent="submit">
                    <b-form-group>
                      <b-form-input
                        type="text"
                        v-model="first_name"
                        placeholder="First Name"
                      >
                      </b-form-input>
                    </b-form-group>
                    <b-form-group>
                      <b-form-input
                        type="text"
                        v-model="last_name"
                        placeholder="Last Name"
                      >
                      </b-form-input>
                    </b-form-group>
                    <b-form-group>
                      <b-form-input
                        type="email"
                        v-model="email"
                        placeholder="Email Address"
                      >
                      </b-form-input>
                    </b-form-group>
                    <b-form-group>
                      <b-form-input
                        type="text"
                        v-model="cell"
                        placeholder="Phone Number"
                      >
                      </b-form-input>
                    </b-form-group>
                    <b-form-group>
                      <b-form-select
                        :options="primary_comms"
                        v-model="primary_comm"
                        placeholder="Primary Communication"
                      >
                      </b-form-select>
                    </b-form-group>
                    <b-form-group>
                      <b-form-textarea
                        v-model="notes"
                        placeholder="Enter Notes"
                      ></b-form-textarea>
                    </b-form-group>
                    <!--<b-button type="submit" variant="primary">Submit</b-button>-->
                    <span class="notif">{{notif}}</span>
                  </b-form>
                </b-modal>
              </div>
            </div>

            <div class="row">
              <div class="col-12">
                <table
                  border="0"
                  class="person_tbl w-100 mt-3"
                >
                  <thead>
                  <tr>
                    <th
                      @click="sort('first_name')"
                      style="cursor:pointer"
                    >First Name
                      <font-awesome-icon icon="caret-down"/>
                    </th>
                    <th
                      @click="sort('last_name')"
                      style="cursor:pointer"
                    >Last Name
                      <font-awesome-icon icon="caret-down"/>
                    </th>
                    <th
                      @click="sort('email')"
                      style="cursor:pointer"
                    >Email
                      <font-awesome-icon icon="caret-down"/>
                    </th>
                    <th>Cell</th>
                    <th>Primary <br/> Comm Method</th>
                    <th
                      @click="sort('notes')"
                      style="cursor:pointer"
                    >Notes
                      <font-awesome-icon icon="caret-down"/>
                    </th>
                    <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr
                    v-for="person in filteredItems"
                    v-bind:key="person.person_id"
                  >
                    <td>{{ person['first_name'] }}</td>
                    <td>{{ person['last_name'] }}</td>
                    <td>{{ person['email'] }}</td>
                    <td>{{ person['cell'] }}</td>
                    <td>{{ person['primary_comm_method'] }}</td>
                    <td>{{ person['notes'] }}</td>
                    <td class="id">{{ person['person_id'] }}</td>
                    <td>
                      <div>
                        <b-button
                          v-b-modal.modalEdit
                          variant="primary"
                          @click="showModal(person)"
                        >
                          Edit
                        </b-button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="!filteredItems.length">
                    <td colspan="7" class="py-3">
                      <span>No results. Try changing the search query.</span>
                    </td>
                  </tr>
                  </tbody>
                </table>
                <div class="pagination mb-5">
                  <button @click="prevPage">&laquo;</button>
                  <button @click="nextPage">&raquo;</button>
                </div>
                <!-- Modal Component -->
                <b-modal
                  id="modalEdit"
                  ref="modal"
                  title="Edit Person"
                  @ok="handleOk"
                >
                  <form @submit.stop.prevent="handleSubmit">
                    <b-form-input
                      type="text"
                      placeholder="First Name"
                      v-model="personModal.first_name"
                    ></b-form-input>
                    <br>
                    <b-form-input
                      type="text"
                      placeholder="Last Name"
                      v-model="personModal.last_name"
                    ></b-form-input>
                    <br>
                    <b-form-input
                      type="text"
                      placeholder="Email"
                      v-model="personModal.email"
                    ></b-form-input>
                    <br>
                    <b-form-input
                      type="text"
                      placeholder="Cell"
                      v-model="personModal.cell"
                    ></b-form-input>
                    <br>
                    <!--<b-form-input
                      type="text"
                      placeholder="Primary Comm Method"
                      v-model="personModal.primary_comm_method"
                      :options="primary_comms"
                    ></b-form-input>-->
                    <b-form-group>
                      <b-form-select
                        :options="primary_comms"
                        v-model="personModal.primary_comm_method"
                        placeholder="Primary Communication"
                      >
                      </b-form-select>
                    </b-form-group>
                    <br>
                    <b-form-textarea
                      placeholder="Notes"
                      v-model="personModal.notes"
                    ></b-form-textarea>
                    <br>
                  </form>
                </b-modal>
              </div>
            </div>

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
    data() {
      return {
        date: [], //for the daterange
        currentSort: 'first_name',
        currentSortDir: 'asc',
        pageSize: 10,
        currentPage: 1,
        search: '',
        persons: [],
        personModal: {},
        first_name: null,
        last_name: null,
        email: null,
        cell: null,
        primary_comm: null,
        notes: null,
        notif: '',
        clientid: '',
        primary_comms: [
          {text: 'Select Primary Comm Method', value: null},
          'Email',
          'Chat',
          'Call'
        ],
        show: true
      };
    },
    head: {
      title: 'People List'
    },
    created: function () {
      this.onLoadData();
    },
    methods: {
      submit() {
        let data = {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          cell: this.cell,
          primary_comm_method: this.primary_comm,
          notes: this.notes
        };
        let url = '/api/v3/persons/';
        restService.post(url, data)
          .then(() => {
            this.first_name = '';
            this.last_name = '';
            this.email = '';
            this.cell = '';
            this.notes = '';
            this.notif = 'Successfully Submitted!';
            // this.$router.push('/');
            this.$refs.modalAdd.hide();
            this.onLoadData();
            this.notif = '';
          })
          .catch(error => {
            this.$toast.error(`Error: ${error}`)
          });
      },
      onLoadData() {
        let url = '/api/v3/persons/';
        restService.get(url)
          .then(response => {
            this.persons = response.data;
          })
          .catch(error => {
            this.$toast.error(`Error: ${error}`)
          });
      },
      showModal(data) {
        this.personModal = data;
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
        //}
      },
      handleSubmit() {
        let data = {
          person_id: this.personModal.person_id,
          first_name: this.personModal.first_name,
          last_name: this.personModal.last_name,
          email: this.personModal.email,
          primary_comm_method: this.personModal.primary_comm_method,
          cell: this.personModal.cell,
          notes: this.personModal.notes
        };
        let url = '/api/v3/persons/';
        restService.put(url, data)
          .then(() => {
            this.$refs.modal.hide();
          })
          .catch(error => {
            this.$toast.error(`Error: ${error}`)
          });
      },
      sort: function (s) {
        //if s == current sort, reverse
        if (s === this.currentSort) {
          this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
        }
        this.currentSort = s;
      },
      nextPage: function () {
        if (this.currentPage * this.pageSize < this.persons.length)
          this.currentPage++;
      },
      prevPage: function () {
        if (this.currentPage > 1) this.currentPage--;
      },
      sortedPersons: function () {
        /*  if (this.search.length <= 0) {
          return this.searchPersons();
        }*/
        return this.persons
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
      searchPersons: function () {
        return this.persons.filter(person => {
          const results = Object.values(person).reduce((prev, val) => {
            if (typeof val === 'string' || typeof val === 'number') {
              const text = val.toString().toLowerCase();
              return [...prev, text.includes(this.search.toLowerCase())];
            }
          }, []);
          return results.some(e => !!e);
        });
      }
    },
    computed: {
      filteredItems: function () {
        if (this.search.length > 0) {
          return this.searchPersons();
        }
        return this.sortedPersons();
      }
    }
  };
</script>
<style lang="scss">
  @import "../../css/people-products";
</style>
