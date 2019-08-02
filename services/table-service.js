import Vue from 'vue';
import get from 'lodash.get';

export const tableService = new Vue({
  data: {},
  methods: {
    getTableSettings(tableName) {
      let tableSettings = JSON.parse(localStorage.getItem('tableSizes'));
      const tableSize = get(tableSettings, tableName);
      if (tableSize) {
        return tableSize;
      } else {
        return 10;
      }
    },
    saveTableSettings(tableName, size) {
      let tableSettings = JSON.parse(localStorage.getItem('tableSizes'));
      if (tableSettings) {
        tableSettings[tableName] = size;
      } else {
        tableSettings = {
          [tableName]: size
        }
      }
      localStorage.setItem('tableSizes', JSON.stringify(tableSettings));
    }
  }
});
