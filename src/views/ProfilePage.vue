<template>
  <div>
    <h1>Profile Page</h1>
    <input type="text" v-model="userName" />
    <button @click="click">123</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";
const userName = ref("");

onBeforeRouteLeave((to, from, next) => {
  if (userName.value) {
    const isConfirm = window.confirm("Bạn có chắc muốn rời trang");
    if (!isConfirm) {
      next(false);
    } else {
      next();
    }
  }
});
const router = useRouter();
const click = () => {
  router.push("/home");
};
</script>

<style></style>
