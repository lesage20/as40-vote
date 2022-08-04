import { useAuthStore } from "src/stores/auth";

// function isLoggedIn
const routes = [
  {
    path: "/",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      {
        path: "login",
        component: () => import("pages/LoginPage.vue"),
        name: "login",
      },
      {
        path: "register",
        component: () => import("pages/RegisterPage.vue"),
        name: "register",
      },
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
        name: "index",
        beforeEnter(to, from) {
          const auth = useAuthStore();
          if (auth.firstTime) return true;
          return { name: "propos" };
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "propos",
        component: () => import("pages/ProposPage.vue"),
        name: "propos",
        beforeEnter(to, from) {
          const auth = useAuthStore();
          if (auth.isLoggedIn) return true;
          return { name: "login" };
        },
      },
      {
        path: "my-props",
        component: () => import("pages/MyPropPage.vue"),
        name: "my-props",
        beforeEnter(to, from) {
          const auth = useAuthStore();
          if (auth.isLoggedIn) return true;
          return { name: "login" };
        },
      },
      {
        path: "profile",
        component: () => import("pages/ProfilePage.vue"),
        name: "profile",
        beforeEnter(to, from) {
          const auth = useAuthStore();
          if (auth.isLoggedIn) return true;
          return { name: "login" };
        },
      },
      {
        path: "prop/:id",
        component: () => import("pages/PropPage.vue"),
        name: "singleProp",
        beforeEnter(to, from) {
          const auth = useAuthStore();
          if (auth.isLoggedIn) return true;
          return { name: "login" };
        },
      },
      {
        path: "about",
        component: () => import("pages/AboutPage.vue"),
        name: "about",
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
