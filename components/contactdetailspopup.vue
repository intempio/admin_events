<template>
  <div id="openModal" class="modalDialog">
    <div>
      <a href="#close" title="Close" class="close">X</a>
      <h2>Details</h2>
      <ul v-for="details in event.customer_details" v-bind:key="details">
        <li>
          <strong>Customer Name:</strong>
          {{ details.customer_name }}
        </li>
        <li>
          <strong>Phone Number:</strong>
          {{ details.phone }}
        </li>
        <li>
          <strong>Email Address:</strong>
          {{ details.email }}
        </li>
      </ul>
    </div>
  </div>
</template>
