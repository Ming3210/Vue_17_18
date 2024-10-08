<template>
  <div class="update-info-container">
    <h1>Setting Page</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="fullName">Họ và tên</label>
        <input type="text" id="fullName" v-model="user.userName" />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="user.email" />
      </div>
      <button type="submit" class="submit-button">Lưu</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";

const user = reactive({
  userName: "",
  email: "",
});

const router = useRouter();

onBeforeRouteLeave((to, from, next) => {
  if (user.userName || user.email) {
    const isConfirm = window.confirm(
      "Bạn có chắc muốn rời trang? Các thay đổi chưa được lưu."
    );
    if (isConfirm) {
      next();
    } else {
      next(false);
    }
  } else {
    next();
  }
});

const submitForm = () => {
  if (user.userName && user.email) {
    router.push("/home");
  }
};
</script>

<style scoped>
/* Giữ nguyên phần CSS như trước */
</style>
