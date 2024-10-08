<template>
  <div>
    <label for="">Username</label>
    <input type="text" value="Abcxyz123" /><br />
    <label for="">Password</label>
    <input type="password" value="123456" /><br />
    <button @click="save">Login</button>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const user = reactive({
  username: "Abcxyz123",
  password: "123456",
});
const save = () => {
  localStorage.setItem("user", JSON.stringify(user));
  router.push("/admin/dashboard");
};
</script>

<style></style>
