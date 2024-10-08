<template>
  <div class="container">
    <h2 class="title">Danh sách sản phẩm</h2>

    <!-- Form tìm kiếm -->
    <form @submit.prevent="searchProducts" class="search-form">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Nhập tên sản phẩm"
        class="search-input"
      />
      <button type="submit" class="search-button">Tìm kiếm</button>
    </form>

    <!-- Danh sách sản phẩm -->
    <div class="product-list">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="product-item"
      >
        <img :src="product.image" :alt="product.name" class="product-image" />
        <h3>{{ product.name }}</h3>
        <p>{{ product.price.toLocaleString() }} VND</p>
        <button class="details-button">Xem chi tiết</button>
      </div>
    </div>

    <p class="footer-text">Dữ liệu được lấy từ localStorage</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

// Dữ liệu mẫu sản phẩm
const initialProducts = [
  {
    id: 1,
    name: "Điện thoại iPhone 15 Pro",
    price: 30000000,
    image:
      "https://th.bing.com/th/id/OIP.HgU3FO6J-X7_GGFMl92oCwHaD4?rs=1&pid=ImgDetMain",
  },
  {
    id: 2,
    name: "Điện thoại OPPO Reno11 5G",
    price: 10600000,
    image:
      "https://th.bing.com/th/id/OIP.dO1L-hRlhGVaGDp4hvTLPgHaDz?rs=1&pid=ImgDetMain",
  },
  {
    id: 3,
    name: "Điện thoại vivo Y17s",
    price: 3300000,
    image:
      "https://th.bing.com/th/id/OIP.3UvA4muSJoH3QHUXjR1aIgHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: 4,
    name: "Điện thoại Nokia 8210 4G",
    price: 3300000,
    image:
      "https://th.bing.com/th/id/OIP.aEcIo6YGvvSIuLafhuit_QHaFj?rs=1&pid=ImgDetMain",
  },
];

const products = ref([]);
const searchQuery = ref("");

const saveProductsToLocalStorage = (products) => {
  localStorage.setItem("products", JSON.stringify(products));
};

const loadProductsFromLocalStorage = () => {
  const storedProducts = localStorage.getItem("products");
  return storedProducts ? JSON.parse(storedProducts) : null;
};

const searchProducts = () => {
  router.push({ path: "/list-product", query: { name: searchQuery.value } });
};

const filteredProducts = computed(() => {
  const query = route.query.name?.toLowerCase() || "";
  return products.value.filter((product) =>
    product.name.toLowerCase().includes(query)
  );
});

onMounted(() => {
  const storedProducts = loadProductsFromLocalStorage();
  if (!storedProducts) {
    saveProductsToLocalStorage(initialProducts);
    products.value = initialProducts;
  } else {
    products.value = storedProducts;
  }

  // Đặt giá trị tìm kiếm từ URL
  if (route.query.name) {
    searchQuery.value = route.query.name;
  }
});
</script>

<style scoped>
.container {
  text-align: center;
  padding: 20px;
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.search-form {
  margin-bottom: 20px;
}

.search-input {
  padding: 8px;
  width: 200px;
  margin-right: 10px;
}

.search-button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.product-list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.product-item {
  border: 1px solid #ddd;
  padding: 20px;
  margin: 10px;
  width: 200px;
  text-align: center;
}

.product-image {
  max-width: 100%;
  height: auto;
}

.details-button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.footer-text {
  margin-top: 20px;
  font-size: 18px;
  color: #666;
}
</style>
