<template>
  <div>
    <h1>Dashboard</h1>
  </div>
</template>

<script setup>
import { ref } from "vue";
// import { onBeforeRouteEnter } from "vue-router";

const data = ref({});

const getData = () => {
  let a = JSON.parse(localStorage.getItem("user"));

  if (a) {
    data.value = a;
  }
};

getData();

// onBeforeRouteEnter((to, from, next) => {
//   if (!data.value) {
//     next("/login");
//   } else {
//     next();
//   }
// });
</script>

<style></style>
