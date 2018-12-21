<template>
  <section class="content main">
    <h2>Recent Updates: Sunovion</h2>
    <recent-updates></recent-updates>
    <div class="filter-container" style="margin-bottom: 25px">
      <div class="search-input-field-name">
        <input
          type="text"
          style="width: 200px;"
          class="filter-item search-input"
          placeholder="Search"
          v-model="search"
        >
        <button class="search-icon">
          <font-awesome-icon icon="search"/>
        </button>
      </div>
      <a href="/create">
        <button class="add_btn">
          <font-awesome-icon class="icon" icon="calendar-plus"/>Add
        </button>
      </a>
    </div>

    <events-list></events-list>
  </section>
</template>

<script>
import RecentUpdates from '../components/RecentUpdates.vue'
import EventsList from '..//components/EventsList.vue'

export default {
  name: 'App',
  data() {
    return {
      search: ''
    }
  },
  components: {
    RecentUpdates,
    EventsList
  }
}
</script>