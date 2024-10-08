<template>
  <div>
    <h1>Admin</h1>
    <nav>
      <router-link class="st" to="/admin/dashboard">Dashboard</router-link>
      <router-link class="st" to="/admin/manager-product"
        >Manage Product</router-link
      >
      <router-link class="st" to="/admin/manager-user"
        >Manager USer</router-link
      >
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.st {
  margin-right: 20px;
}
.router-link-active {
  background-color: #1fff84;
  color: #000;
}
</style>
