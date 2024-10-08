<template>
  <div>
    <input type="text" v-model="keySearch" />
    <button @click="find">Tìm Kiếm</button>
    <h2>Từ Khóa Tìm Kiếm: {{ keySearch }}</h2>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const keySearch = ref("");
const router = useRouter();
const route = useRoute();

// https://localhost:5173?q=value

const find = () => {
  router.push(`/searcht?q=${keySearch.value}`);
};

const valueSearch = computed(() => {
  return route.query.q;
});

let st = ref("");

watch(keySearch, (newVal) => {
  st = newVal;
});
console.log(valueSearch.value);
</script>

<style></style>
