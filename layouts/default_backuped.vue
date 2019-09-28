<template>
  <div>
    <div class="head">
      <img src="~/assets/operation.png" class="mobile_btn" />
      <span>Operations Admin</span>
    </div>
    <section class="main-content">
      <input type="checkbox" id="menu-toggle" />
      <label for="menu-toggle" class="menu-icon"></label>
      <aside class="sidebar">
        <ul>
          <li><img src="~/assets/biogen.png" /> Biogen</li>
          <li class="active"><img src="~/assets/sunovion.png" /> Sunovion</li>
          <li><img src="~/assets/unassigned.png" />Unassigned</li>
        </ul>
      </aside>

      <div id="wrap"><nuxt /></div>

      <div class="slideout-sidebar">
        <ul>
          <li><img src="~/assets/biogen.png" /> Biogen</li>
          <li class="active"><img src="~/assets/sunovion.png" /> Sunovion</li>
          <li><img src="~/assets/unassigned.png" />Unassigned</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  /* data() {
    return {
      items: [
        { title: 'Home', icon: 'home', to: { name: 'index' } },
        { title: 'Inspire', icon: 'lightbulb', to: { name: 'inspire' } },
      ],
    };
  },*/
}
</script>
