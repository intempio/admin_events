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
          <i class="material-icons search-input-clear"
             v-if="search"
             @click="search = ''">clear</i>
        </div>
      </div>
    </div>
    <table class="assignee-list">
      <thead>
      <tr>
        <td class="tbl-sort" @click="sort('tag_name')">
          <div class="d-flex align-items-center">
            <span>Items</span>
            <i class="material-icons" v-if="currentSort !== 'tag_name'">unfold_more</i>
            <i class="material-icons" v-if="currentSort === 'tag_name' && currentSortDir === 'asc'">expand_more</i>
            <i class="material-icons"
               v-if="currentSort === 'tag_name' && currentSortDir === 'desc'">expand_less</i>
          </div>
        </td>
        <td class="tbl-sort" @click="sort('tag_value')">
          <div class="d-flex align-items-center">
            <span>Content</span>
            <i class="material-icons" v-if="currentSort !== 'tag_value'">unfold_more</i>
            <i class="material-icons" v-if="currentSort === 'tag_value' && currentSortDir === 'asc'">expand_more</i>
            <i class="material-icons"
               v-if="currentSort === 'tag_value' && currentSortDir === 'desc'">expand_less</i>
          </div>
        </td>
        <td v-if="permissions.includes('EDIT')">Action</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in events" v-bind:key="index">
        <td>{{item.tag_name}}</td>
        <td>
          <div v-show="index != currentIndex" class="align-items-center" :style="{display: 'flex'}">
            <label id="tooltip-button-interactive">{{item.tag_value}}</label>
            <i class="material-icons ml-1 cursor-pointer"
               :style="{fontSize: 16 + 'px', fontWeight: 'bold'}"
               v-if="replaceURLWithHTMLLinks(item.tag_value)"
               @click="goToLink(replaceURLWithHTMLLinks(item.tag_value))">arrow_forward</i>
          </div>
          <input
            id="descriptionEdit"
            :style="{width: 100 + '%'}"
            v-if="index == currentIndex"
            ref="descriptionEdit"
            v-model="item.tag_value"
            @keyup.enter="onChange(item.tag_value, item.tag_name), currentIndex=-1"
          >
        </td>
        <td v-if="permissions.includes('EDIT')">
          <a @click="edit(index, item.tag_value)" v-if="index != currentIndex" class="d-flex align-items-center">
            <i class="material-icons mr-1">create</i>
            <span>Edit</span>
          </a>
          <a @click="onChange(item.tag_value, item.tag_name), currentIndex=-1" v-else class="d-flex align-items-center">
            <i class="material-icons mr-1">save</i>
            <span>Save</span>
          </a>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="wrap-pagination-add">
      <div class="pagination-wrap">
        <button class="cstm" @click="prevPage">&laquo;</button>
        <b-form-input
          :value="currentPage + '/' + allPages"
          type="text"
          name="url"
          readonly
          style="width: 68px;"
          class="input input-items mx-1"
        ></b-form-input>
        <b-select v-model="pageSize" placeholder="Items" style="width: 100px">
          <option :value="item.value"
                  v-for="item in paginationOptions"
                  :key="item.value">{{item.label}}
          </option>
        </b-select>
        <button @click="nextPage" class="mx-1 cstm">&raquo;</button>
      </div>

      <div class="add-new-record ml-3" v-if="permissions.includes('EDIT')">
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
          <button class="add_btn cstm" @click="add()">+ Add</button>
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
  import {authService} from '../services/auth-service';
  import {tableService} from '../services/table-service';
  import orderBy from 'lodash.orderby';
  import * as moment from 'moment';

  export default {
    name: 'eventtag',
    template: '#eventtag',
    components: {
      Multiselect
    },
    props: {eventId: String, tagType: String, title: String, isChecklist: Boolean},
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
        permissions: [],
        urlRegex: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
      }
    },
    created() {
      this.permissions = authService.getUserPermissions().admin;
      this.paginationOptions = [
        {label: '10', value: 10},
        {label: '25', value: 25},
        {label: '50', value: 50},
      ];
      this.pageSize = tableService.getTableSettings(this.tableName);
      if (this.isChecklist) {
        this.currentSortDir = 'asc';
        this.currentSort = 'tag_value';
      }
    },
    watch: {
      eventId: function (val) {
        if (val !== undefined) {
          this.fetchEventtag()
        }
      },
      pageSize: function () {
        this.filtered();
        tableService.saveTableSettings(this.tableName, this.pageSize);
      },
      search: function () {
        this.filtered();
      }
    },
    methods: {
      fetchEventtag: function () {
        const url = '/api/v3/eventtags/?eventID=' + this.eventId + '&tagType=' + this.tagType;
        restService.get(url).then(response => {
          if (response && response.data.length) {
            this.Eventtag = response.data;
            this.events = response.data;
            this.filtered();
          }
        }).catch(err => this.$toast.error(`Error getting event tag: ${err}`));
      },
      add: function (field_name) {
        const url = '/api/v3/eventtags/';
        const data = {
          event_id: this.eventId,
          tag_type: this.tagType.charAt(0).toUpperCase() + this.tagType.slice(1),
          tag_name: this.selectedItem,
          tag_value: this.InputTagName
        };

        restService.post(url, data)
          .then(() => {
            this.InputTagName = '';
            this.selectedItem = '';
            this.fetchEventtag();
            this.$toast.success(`Added successfully`)
          })
          .catch(error => {
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
          const data = {
            event_id: this.eventId,
            tag_type: this.tagType.charAt(0).toUpperCase() + this.tagType.slice(1),
            tag_name: tag_name,
            tag_value: tag_value,
            updated: moment().utc(true).toDate()
          };

          restService
            .put(url, data)
            .then(() => {
              this.fetchEventtag();
              this.$toast.success(`Updated successfully`)
            })
            .catch(error => {
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

        if (!this.isChecklist || (this.isChecklist && this.currentSort !== 'tag_value')) {
          eventtags = orderBy(eventtags, [this.currentSort], [this.currentSortDir]);
        } else {
          let data = eventtags.map(i => ({...i, updated: moment(i.updated).toDate()}));
          eventtags = orderBy(data, ['updated', 'tag_value'], [this.currentSortDir, 'asc']);
        }

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
      replaceURLWithHTMLLinks: function (text) {
        return text.match(this.urlRegex) ? text.match(this.urlRegex)[0] : null;
      },
      goToLink: link => {
        window.open(link, '_blank');
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
