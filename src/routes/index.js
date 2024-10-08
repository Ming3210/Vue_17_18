// Định nghĩa danh sách các route

import HomePage from "@/views/HomePage.vue";
import About from "@/views/About.vue";
import ContactPage from "@/views/ContactPage.vue";
import { createRouter, createWebHistory } from "vue-router";
import FeelBack from "@/views/FeelBack.vue";
import UserPage from "@/views/UserPage.vue";
// import ProfilePage from "@/views/ProfilePage.vue";
import { ref } from "vue";

const routes = [
  {
    path: "/",
    alias: ["/home", "/home-page"],
    name: "home",
    component: () => import(/*webpackChunkName:"home"*/ "@/views/HomePage.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import(/*webpackChunkName:"about"*/ "@/views/About.vue"),
  },
  {
    path: "/contact",
    alias: ["/get-in-touch"],
    name: "contact",
    component: () =>
      import(/*webpackChunkName:"contact"*/ "@/views/ContactPage.vue"),

    // redirect: "/feelback", // Tự động chuyển hướng
  },
  {
    path: "/feelback",
    name: "feelback",
    component: () =>
      import(/*webpackChunkName:"feelback"*/ "@/views/FeelBack.vue"),
  },
  {
    path: "/user/:id",
    name: "userPage",
    component: () => import(/*webpackChunkName:"user"*/ "@/views/UserPage.vue"),

    redirect: (to) => `profile/${to.params.id}`,
  },
  {
    path: "/profile/:id",
    name: "profilePage",
    component: () =>
      import(/*webpackChunkName:"profile"*/ "@/views/ProfilePage.vue"),
  },
  {
    path: "/list-product",
    name: "listProduct",
    component: () =>
      import(/*webpackChunkName:"profile"*/ "@/views/ListProduct.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () =>
      import(/*webpackChunkName:"profile"*/ "@/views/Dashboard.vue"),
  },
  {
    path: "/search",
    name: "seacrh",
    component: () =>
      import(/*webpackChunkName:"profile"*/ "@/views/Search.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    beforeEnter: (to, from, next) => {
      const isAuthenticated = true;
      if (isAuthenticated) {
        next();
      } else {
        alert("Bn ko có quyền");
        next("/contact");
      }
    },
    component: () => import(/*webpackChunkName:"admin"*/ "@/views/Admin.vue"),
    children: [
      {
        path: "/admin/dashboard",
        name: "dashboard",
        component: () =>
          import(/*webpackChunkName:"dashboard"*/ "@/views/Dashboard.vue"),
        beforeEnter: (to, from, next) => {
          let data = JSON.parse(localStorage.getItem("user")) || null;

          if (!data) {
            next("/login");
          } else {
            next();
          }
        },
      },

      {
        path: "/admin/manager-product",
        name: "managerProduct",
        component: () =>
          import(
            /*webpackChunkName:"managerProduct"*/ "@/views/ManagerProduct.vue"
          ),
      },
      {
        path: "/admin/manager-user",
        name: "userProduct",
        component: () =>
          import(/*webpackChunkName:"userProduct"*/ "@/views/ManagerUser.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    component: () =>
      import(/*webpackChunkName:"notFound"*/ "@/views/NotFound.vue"),
  },
  {
    path: "/login",
    component: () => import(/*webpackChunkName:"login"*/ "@/views/Login.vue"),
  },
  {
    path: "/posts",
    name: "ListPost",
    component: () =>
      import(/*webpackChunkName:"login"*/ "@/views/ListPost.vue"),
  },
  {
    path: "/posts/:id",
    name: "PostDetail",
    component: () =>
      import(/*webpackChunkName:"login"*/ "@/views/PostDetail.vue"),
    props: true,
  },
  {
    path: "/setting",
    name: "setting",
    component: () => import(/*webpackChunkName:"login"*/ "@/views/Setting.vue"),
  },
  {
    path: "/post-not-found",
    name: "PostNotFound",
    component: () =>
      import(/*webpackChunkName:"login"*/ "@/views/PostNotFound.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/posts",
  },
];
const scrollPositions = {};

// Tạo cơ chế định tuyến thông qua hàm createRouter
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else if (to.name === "PostDetail" && from.name === "ListPost") {
      return {
        left: 0,
        top: document.body.scrollHeight / 2,
      };
    } else if (from.name === "PostDetail" && to.name === "ListPost") {
      return { left: 0, top: 0 };
    } else if (to.name === "PostNotFound") {
      return { left: 0, top: 0 };
    } else {
      return { left: 0, top: 0, behavior: "smooth" };
    }
  },
});

// cơ chế bảo vệ router

// router.beforeEach((to, from, next) => {
//   //   const company = prompt("Nhập địa chỉ mạng:");
//   //   const password = prompt("Nhập mật khẩu");
//   // mô phỏng người dùng đã hoặc chưa đăng nhập
//   const isLogin = false;
//   //   if (company === "RikkeiAcademy" && password === "123") {
//   //     next("/home");
//   //   } else {
//   //     next();
//   //   }
// });

export default router;
