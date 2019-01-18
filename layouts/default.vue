<template>
  <div id="app">
    <div class="head">
      <div class="header-admin">
        <img src="~/assets/operation.png" class="mobile_btn">
        <span>Operations Admin</span>
      </div>
      <div class="header-projects">Sunovion</div>
    </div>
    <div class="menu-wrap">
      <template>
        <Push noOverlay width="200">
          <a id="Biogen" href="#">
            <img src="~/assets/biogen.png">
            <span>Biogen</span>
          </a>
          <a id="Sunovion" href="#">
            <img src="~/assets/sunovion.png">
            <span>Sunovion</span>
          </a>
          <a id="Unassigned" href="#">
            <img src="~/assets/unassigned.png">
            <span>Unassigned</span>
          </a>
        </Push>
      </template>
    </div>

    <section class="main-content" id="page-wrap">
      <div id="wrap">
        <nuxt/>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import { Push } from 'vue-burger-menu'
//import VueSidebarMenu from 'vue-sidebar-menu'

export default {
  components: {
    Push // Register your component
  }
  /* data() {
    menu: [
      {
        href: '/',
        title: 'Dashboard',
        icon: 'fa fa-user'
      },
      {
        href: '#',
        title: 'Charts',
        icon: 'fa fa-chart-area'
      }
    ]
  }  */
  /* data() {
    return {
      items: [
        { title: 'Home', icon: 'home', to: { name: 'index' } },
        { title: 'Inspire', icon: 'lightbulb', to: { name: 'inspire' } },
      ],
    };
  },*/
}

/*Vue.use(VueSidebarMenu) */
</script>
