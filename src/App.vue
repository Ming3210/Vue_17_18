<template>
  <div>
    <h1>App Page</h1>
    <nav>
      <router-link to="/home"> User</router-link>
      <router-link to="/about">Product</router-link>
      <router-link to="/contact">Setting</router-link>
    </nav>
    <router-view v-slot="{ Component }">
      <Suspense>
        <!-- Thành phần các component sử dụng cơ chế lazy loading  -->

        <template #default>
          <component :is="Component" />
        </template>
        <!-- Hiệu ứng loading trc khi tải trang  -->

        <template #fallback>
          <div class="loading">Loading...</div>
        </template>
      </Suspense>
    </router-view>
  </div>
</template>

<script setup></script>

<style>
nav {
  position: sticky;
  top: 0;
}
.router-link-active {
  background-color: #f1f1f1;
  color: #000;
}
</style>
