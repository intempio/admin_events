<template id='eventtag'>
  <div class="checklists pl-0 mb-5">
    <div class="colored">
      <div class="row m-0">
        <div class="col-8 bg-prime d-flex align-items-center">
          <h3 class="m-0 font-weight-bold text-white">{{title}}</h3>
        </div>
        <div class="col-4 bg-prime p-2">
          <b-form-input
            type="text"
            style="height: 32px"
            v-model="search"
            placeholder="Search"
          ></b-form-input>
        </div>
      </div>
    </div>
    <table class="assignee-list">
      <thead>
      <tr>
        <td class="tbl-sort" @click="sort('tag_name')">
          Items
          <font-awesome-icon icon="sort" size="lg" v-if="currentSort !== 'tag_name'"/>
          <font-awesome-icon icon="caret-down" size="lg" v-if="currentSort === 'tag_name' && currentSortDir === 'asc'"/>
          <font-awesome-icon icon="caret-up" size="lg" v-if="currentSort === 'tag_name' && currentSortDir === 'desc'"/>
        </td>
        <td class="tbl-sort" @click="sort('tag_value')">
          Content
          <font-awesome-icon icon="sort" size="lg" v-if="currentSort !== 'tag_value'"/>
          <font-awesome-icon icon="caret-down" size="lg" v-if="currentSort === 'tag_value' && currentSortDir === 'asc'"/>
          <font-awesome-icon icon="caret-up" size="lg" v-if="currentSort === 'tag_value' && currentSortDir === 'desc'"/>
        </td>
        <td>Action</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in events" v-bind:key="index">
        <td>{{item.tag_name}}</td>
        <td>
          <div v-show="index != currentIndex">
            <label>{{item.tag_value}}</label>
          </div>
          <input
            id="descriptionEdit"
            v-if="index == currentIndex"
            ref="descriptionEdit"
            v-model="item.tag_value"
            @keyup.enter="onChange(item.tag_value, item.tag_name), currentIndex=-1"
          >
        </td>
        <td>
          <a @click="edit(index, item.tag_value)" v-if="index != currentIndex">
            <font-awesome-icon class="mr-1" icon="edit"/>
            Edit
          </a>
          <a @click="onChange(item.tag_value, item.tag_name), currentIndex=-1" v-else>
            <font-awesome-icon class="mr-1" icon="save"/>
            Save
          </a>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="wrap-pagination-add">
      <div class="pagination-wrap">
        <button @click="prevPage">&laquo;</button>
        <b-form-input
          :value="currentPage + '/' + allPages"
          type="text"
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

      <div class="add-new-record ml-3">
        <div class="row m-0">
          <div class="col pr-0">
            <multiselect v-model="selectedItem"
                         :options="items"
                         :name="tagType"
                         placeholder="Items">
            </multiselect>
          </div>
          <div class="col p-0">
            <div class="px-2">
              <b-form-input
                v-model="InputTagName"
                type="text"
                name="url"
                placeholder="input text here"
                class="input input-items w-100"
              ></b-form-input>
            </div>
          </div>
          <button class="add_btn" @click="add()">+ Add</button>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
  import {CLIENT_ITEMS} from '../const/constants.js'
  import {CHECKLIST_ITEMS} from '../const/constants.js'
  import {PRODUCT_ITEMS} from '../const/constants.js'
  import {restService} from '../plugins/axios';
  import Multiselect from 'vue-multiselect';
  import get from 'lodash.get'

  export default {
    name: 'eventtag',
    template: '#eventtag',
    components: {
      Multiselect
    },
    props: {eventId: String, tagType: String, title: String},
    data: function () {
      return {
        Eventtag: [],
        events: [],
        isHidden: false,
        show: true,
        InputTagName: '',
        currentIndex: -1,
        currentSort: 'tag_value',
        currentSortDir: 'desc',
        pageSize: 10,
        currentPage: 1,
        allPages: 1,
        selectedItem: '',
        oldDescriptionValue: '',
        search: '',
        paginationOptions: [],
      }
    },
    created() {
      this.paginationOptions = [
        {label: '10', value: 10},
        {label: '25', value: 25},
        {label: '50', value: 50},
      ];
      this.getTableSettings();
    },
    watch: {
      eventId: function (val) {
        if (val !== undefined) {
          this.fetchEventtag()
        }
      },
      pageSize: function (val) {
        this.filtered();
        this.saveTableSettings()
      },
      search: function () {
        this.filtered();
      }
    },
    methods: {
      fetchEventtag: function () {
        const url = '/api/v3/eventtags/?eventID=' + this.eventId + '&tagType=' + this.tagType;
        restService.get(url).then(response => {
          this.Eventtag = response.data;
          this.events = response.data;
          this.filtered();
        }).catch(err => this.$toast.error(`Error getting event tag: ${err}`));
      },
      add: function (field_name) {
        const url = '/api/v3/eventtags/'
        var data = {
          event_id: this.eventId,
          tag_type: this.tagType.charAt(0).toUpperCase() + this.tagType.slice(1),
          tag_name: this.selectedItem,
          tag_value: this.InputTagName
        };

        restService.post(url, data)
          .then(response => {
            this.fetchEventtag();
            this.$toast.success(`Added successfully`)
          })
          .catch(function (error) {
            this.$toast.error(`Saving error: ${error}`)
          });
      },
      edit: function (index, oldValue) {
        this.currentIndex = index;
        this.oldDescriptionValue = oldValue;
        setTimeout(() => {
          if (!!this.$refs.descriptionEdit[0]) {
            this.$refs.descriptionEdit[0].focus();
          }
        }, 50)
      },
      onChange: function (tag_value, tag_name) {
        if (this.oldDescriptionValue !== tag_value) {
          const url = '/api/v3/eventtags/';
          var data = {
            event_id: this.eventId,
            tag_type: this.tagType.charAt(0).toUpperCase() + this.tagType.slice(1),
            tag_name: tag_name,
            tag_value: tag_value
          };

          restService
            .put(url, data)
            .then(response => {
              this.fetchEventtag();
              this.$toast.success(`Updated successfully`)
            })
            .catch(function (error) {
              this.$toast.error(`Error: ${error}`)
            })
        }
      },
      sort: function (s) {
        if (s === this.currentSort) {
          this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
        }
        this.currentSort = s;
        this.filtered();
      },
      nextPage: function () {
        if (this.currentPage < this.allPages) {
          this.currentPage++;
          this.filtered();
        }
      },
      prevPage: function () {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.filtered();
        }
      },
      filtered: function () {
        let eventtags;

        if (this.search) {
          eventtags = this.Eventtag.filter(tag => {
            const results = Object.keys(tag).reduce((prev, key) => {
              if ((typeof tag[key] === 'string' || typeof tag[key] === 'number') && key !== 'tag_type') {
                const text = tag[key].toString().toLowerCase();
                return [...prev, text.includes(this.search.toLowerCase())];
              } else {
                return prev;
              }
            }, []);
            return results.some(e => !!e)
          })
        } else {
          eventtags = this.Eventtag;
        }

        eventtags = eventtags.sort((a, b) => {
          let modifier = 1;
          if (this.currentSortDir === 'desc') modifier = -1;
          if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
          if (a[this.currentSort] > b[this.currentSort]) return modifier;
          return 0
        });

        this.allPages = Math.ceil(eventtags.length / this.pageSize);

        if (eventtags.length < this.pageSize) {
          this.currentPage = 1;
        }

        if (this.currentPage > this.allPages) {
          this.currentPage = 1;
        }

        eventtags = eventtags.filter((event, index) => {
          let start = (this.currentPage - 1) * this.pageSize;
          let end = this.currentPage * this.pageSize;
          if (index >= start && index < end) return true
        });
        this.events = eventtags;
      },
      getTableSettings() {
        let tableSettings = JSON.parse(localStorage.getItem('tableSizes'));
        if (get(tableSettings, this.tagType)) {
          this.pageSize = get(tableSettings, this.tagType);
        }
      },
      saveTableSettings() {
        let tableSettings = JSON.parse(localStorage.getItem('tableSizes'));
        if (tableSettings) {
          tableSettings[this.tagType] = this.pageSize;
        } else {
          tableSettings = {
            [this.tagType]: this.pageSize
          }
        }
        localStorage.setItem('tableSizes', JSON.stringify(tableSettings));
      }
    },
    computed: {
      items: function () {
        if (this.tagType === 'checklist') {
          if (process.env.CHECKLIST_ITEMS) {
            return process.env.CHECKLIST_ITEMS.split(',').map(item => item.trim());
          } else {
            return CHECKLIST_ITEMS
          }
        }
        if (this.tagType === 'product') {
          if (process.env.PRODUCT_ITEMS) {
            return process.env.PRODUCT_ITEMS.split(',').map(item => item.trim())
          } else {
            return PRODUCT_ITEMS
          }
        }
        if (this.tagType === 'client') {
          if (process.env.CLIENT_ITEMS) {
            return process.env.CLIENT_ITEMS.split(',').map(item => item.trim())
          } else {
            return CLIENT_ITEMS
          }
        }
      }
    }
  }
</script>
