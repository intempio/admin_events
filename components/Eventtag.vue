<template id = 'eventtag'>
  <div class="checklists width">
    <h2 class="colored">{{title}}</h2>
    <table class="assignee-list">
      <thead>
        <tr>
          <td class="tbl-sort" @click="sort('tag_name')">Items
            <font-awesome-icon icon="caret-down" size="lg"/>
          </td>
          <td class="tbl-sort" @click="sort('tag_value')">Content
            <font-awesome-icon icon="caret-down" size="lg"/>
          </td>
          <td>Action</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in sortedEventtags" v-bind:key="item.tag_name">
          <td>{{item.tag_name}}</td>
          <td>
            <div v-show="index != currentIndex">
              <label>{{item.tag_value}}</label>
            </div>

            <input
              v-show="index == currentIndex"
              v-model="item.tag_value"
              @blur="onChange(item.tag_value, item.tag_name), currentIndex=-1"
              :ref="'tagv'+index"
            >
          </td>
          <td>
            <a @click="edit(index)">
              <font-awesome-icon icon="edit"/>Edit
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
        <b-select v-model="selectedItem" placeholder="Items" class="eventtag-select">
          <option :value="item" v-for="item in items" v-bind:key="item">{{item}}</option>
        </b-select>
        <input
          v-model="InputTagName"
          type="text"
          name="url"
          placeholder="input text here"
          class="input input-items"
        >
        <button class="add_btn" @click="add()">+ Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import items from '../items.json'
import axios from 'axios'

export default {
  name: 'eventtag',
  template: '#eventtag',
  props: { eventId: String, tagType: String, title: String },
  data: function() {
    return {
      Eventtag: [],
      items: items,
      isHidden: false,
      show: true,
      InputTagName: '',
      currentIndex: -1,
      currentSort: 'tag_name',
      currentSortDir: 'asc',
      pageSize: 3,
      currentPage: 1
    }
  },
  watch: {
    eventId: function(val) {
      if (val !== undefined) {
        this.fetchEventtag()
      }
    }
  },

  methods: {
    fetchEventtag: function() {
      const url =
        'https://intempio-api-v3.herokuapp.com/api/v3/eventtags/?eventID=' +
        this.eventId +
        '&tagType=' +
        this.tagType

      axios.get(url).then(response => {
        this.Eventtag = response.data
      })
    },

    add: function(field_name) {
      const url = 'https://intempio-api-v3.herokuapp.com/api/v3/eventtags/'
      var data = {
        event_id: this.eventId,
        tag_type: this.tagType,
        tag_name: this.selectedItem,
        tag_value: this.InputTagName
      }

      axios
        .post(url, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          this.fetchEventtag()
        })
        .catch(function(error) {
          console.log(error)
        })
        .then(function() {
          // always executed
        })
    },

    edit: function(index) {
      this.currentIndex = index
      this.$refs['tagv' + index][0].focus()
    },

    onChange: function(tag_value, tag_name) {
      debugger
      const url = 'https://intempio-api-v3.herokuapp.com/api/v3/eventtags/'

      var data = {
        event_id: this.eventId,
        tag_type: this.tagType,
        tag_name: tag_name,
        tag_value: tag_value
      }

      axios
        .put(url, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          this.fetchEventtag()
        })
        .catch(function(error) {
          console.log(error)
        })
        .then(function() {
          // always executed
        })
    },

    sort: function(s) {
      //if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = s
    },
    nextPage: function() {
      if (this.currentPage * this.pageSize < this.Eventtag.length)
        this.currentPage++
    },
    prevPage: function() {
      if (this.currentPage > 1) this.currentPage--
    }
  },
  computed: {
    sortedEventtags: function() {
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
    }
  }
}
</script>