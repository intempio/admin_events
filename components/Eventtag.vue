<template id='eventtag'>
  <div class="checklists pl-0">
    <h2 class="colored">{{title}}</h2>
    <table class="assignee-list">
      <thead>
      <tr>
        <td class="tbl-sort" @click="sort('tag_name')">
          Items
          <font-awesome-icon icon="caret-down" size="lg"/>
        </td>
        <td class="tbl-sort" @click="sort('tag_value')">
          Content
          <font-awesome-icon icon="caret-down" size="lg"/>
        </td>
        <td>Action</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in sortedEventtags" v-bind:key="index">
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
        <button @click="nextPage">&raquo;</button>
      </div>
      <div class="add-new-record">
        <div class="row">
          <div class="col pr-0">
            <b-select v-model="selectedItem" placeholder="Items">
              <option :value="item" v-for="item in items" v-bind:key="item">{{item}}</option>
            </b-select>
          </div>
          <div class="col pl-2 pr-4">
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
</template>

<script>
  import {CLIENT_ITEMS} from '../components/constants.js'
  import {CHECKLIST_ITEMS} from '../components/constants.js'
  import {PRODUCT_ITEMS} from '../components/constants.js'
  import {restService} from '../plugins/axios';

  export default {
    name: 'eventtag',
    template: '#eventtag',
    props: {eventId: String, tagType: String, title: String},
    data: function () {
      return {
        Eventtag: [],
        isHidden: false,
        show: true,
        InputTagName: '',
        currentIndex: -1,
        currentSort: 'tag_name',
        currentSortDir: 'asc',
        pageSize: 10,
        currentPage: 1,
        selectedItem: '',
        oldDescriptionValue: ''
      }
    },
    watch: {
      eventId: function (val) {
        if (val !== undefined) {
          this.fetchEventtag()
        }
      }
    },

    methods: {
      fetchEventtag: function () {
        const url =
          '/api/v3/eventtags/?eventID=' +
          this.eventId +
          '&tagType=' +
          this.tagType

        restService.get(url).then(response => {
          this.Eventtag = response.data
        })
          .catch(err => {

            this.$toast.error(`Error getting event tag: ${err}`)
          })
      },

      add: function (field_name) {
        const url = '/api/v3/eventtags/'
        var data = {
          event_id: this.eventId,
          tag_type: this.tagType.charAt(0).toUpperCase() + this.tagType.slice(1),
          tag_name: this.selectedItem,
          tag_value: this.InputTagName
        }

        restService.post(url, data)
          .then(response => {
            this.fetchEventtag();
            this.$toast.success(`Added successfully`)
          })
          .catch(function (error) {
            console.log(error);
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
              console.log(error);
              this.$toast.error(`Error: ${error}`)
            })
        }
      },

      sort: function (s) {
        //if s == current sort, reverse
        if (s === this.currentSort) {
          this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
        }
        this.currentSort = s
      },
      nextPage: function () {
        if (this.currentPage * this.pageSize < this.Eventtag.length)
          this.currentPage++
      },
      prevPage: function () {
        if (this.currentPage > 1) this.currentPage--
      }
    },
    computed: {
      sortedEventtags: function () {
        const eventtags = this.Eventtag == null ? [] : this.Eventtag

        return eventtags
          .sort((a, b) => {
            let modifier = 1
            if (this.currentSortDir === 'desc') modifier = -1
            if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier
            if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier
            return 0
          })
          .filter((event, index) => {
            let start = (this.currentPage - 1) * this.pageSize
            let end = this.currentPage * this.pageSize
            if (index >= start && index < end) return true
          })
      },

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
