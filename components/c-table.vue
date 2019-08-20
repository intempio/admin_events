<template>

  <div class="content">
    <div class="col-12 p-0">
      <div class="colored h-60">
        <div class="row m-0 bg-prime h-60">
          <div class="col-6 d-flex align-items-center">
            <h3 class="m-0 font-weight-bold text-white">{{title}}</h3>
          </div>
          <div class="col-3 d-flex justify-content-end align-items-center">
            <button class="btn btn-light btn-sm" v-if="!isCustomFilter" @click="customFilter('complete', true)">Show completed</button>
            <button class="btn btn-light btn-sm" v-else @click="customFilter('complete', '')">Show all</button>
          </div>
          <div class="col-3 pl-0 d-flex justify-content-end align-items-center">
            <b-form-input
              type="text"
              style="height: 32px"
              v-model="search"
              placeholder="Search"
            ></b-form-input>
            <font-awesome-icon class="search-input-clear"
                               icon="times"
                               v-if="search"
                               @click="search = ''"/>
          </div>
        </div>
      </div>
      <table>

        <thead>
          <tr>
            <th></th>
            <th v-for="col in cols" class="tbl-sort" @click="sort(col.key)"
                :style="{'width': col.width ? col.width : ''}">
              <span class="text-capitalize">{{col.name}}</span>
              <font-awesome-icon icon="sort" size="lg" v-if="currentSort !== col.key"/>
              <font-awesome-icon icon="caret-down" size="lg"
                                 v-if="currentSort === col.key && currentSortDir === 'asc'"/>
              <font-awesome-icon icon="caret-up" size="lg"
                                 v-if="currentSort === col.key && currentSortDir === 'desc'"/>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) in sortedItems" v-bind:key="index">
            <td v-if="actions">
              <button v-for="btn in actions" type="button" class="btn btn-info btn-sm" @click="btn.action(item)">{{btn.label}}</button>
            </td>
            <td v-for="col in cols">
              <span v-if="!col.type">{{item[col.key]}}</span>
              <span v-if="col.type && col.type === 'date'">{{getDateTime(item[col.key], col.dateFormat)}}</span>
              <div v-if="col.type && col.type === 'component'">
                <component :is="col.component" :context="item"></component>
              </div>
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
            style="width: 50px;"
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
      </div>
    </div>
  </div>

</template>

<script>
  import {tableService} from '../services/table-service';
  import {authService} from '../services/auth-service';
  import orderBy from 'lodash.orderby';
  import * as moment from 'moment';

  export default {
    name: 'c-table',
    props: {
      title: String,
      items: Array,
      cols: Array,
      actions: Array,
      tableName: String
    },
    data() {
      return {
        currentPage: 1,
        allPages: 1,
        pageSize: 10,
        paginationOptions: [],
        search: '',
        currentIndex: 1,
        currentSort: '',
        currentSortDir: 'asc',
        permissions: [],
        sortedItems: [],
        isCustomFilter: false
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
    },
    methods: {
      getDateTime(value, format) {
        if (format) {
          return moment(value).format(format);
        } else {
          return moment(value).format('lll')
        }
      },
      sort(s) {
        if (s === this.currentSort) {
          this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
        }
        this.currentSort = s;
        this.sortItems();
      },
      getPages() {
        return `${this.currentPage}/${this.allPages}`
      },
      nextPage() {
        if (this.currentPage * this.pageSize < this.items.length) {
          this.currentPage++;
          this.sortItems();
        }
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.sortItems();
        }
      },
      sortItems(list) {
        const originalList = list ? list : this.items;
        let items;

        if (this.search) {
          items = originalList.filter(tag => {
            const results = Object.keys(tag).reduce((prev, key) => {
              if ((typeof tag[key] === 'string' || typeof tag[key] === 'number') && key !== 'tag_type') {
                const text = tag[key].toString().toLowerCase();
                return [...prev, text.includes(this.search.toLowerCase())];
              } else {
                return prev;
              }
            }, []);
            return results.some(e => !!e);
          })
        } else {
          items = originalList;
        }

        items = orderBy(items, [this.currentSort], [this.currentSortDir]);
        this.allPages = Math.ceil(items.length / this.pageSize);

        if (items.length < this.pageSize) {
          this.currentPage = 1;
        }

        if (this.currentPage > this.allPages) {
          this.currentPage = 1;
        }

        items = items.filter((event, index) => {
          let start = (this.currentPage - 1) * this.pageSize;
          let end = this.currentPage * this.pageSize;
          if (index >= start && index < end) return true
        });
        this.sortedItems = items;
      },
      customFilter(key, value) {
        if (value) {
          this.sortedItems = this.sortedItems.filter(i => i[key] === value);
          this.sortItems(this.sortedItems);
          this.isCustomFilter = true;
        } else {
          this.isCustomFilter = false;
          this.sortItems();
        }
      },
    },
    watch: {
      pageSize: function () {
        this.sortItems();
        tableService.saveTableSettings(this.tableName, this.pageSize);
      },
      search: function () {
        this.sortItems();
      },
      items: function () {
        this.sortItems();
      }
    }
  }
</script>

<style scoped>
  table {
    width: 100%;
  }

  .h-60 {
    height: 60px;
  }
</style>
