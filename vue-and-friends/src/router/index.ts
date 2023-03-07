import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/games",
    name: "games",
    component: () => import("../views/Games/GameView.vue"),
  },
  {
    path: "/game-play",
    name: "game-play",
    component: () => import("../views/Games/GamePlay.vue"),
    children: [
      {
        path: "flipped",
        name: "flipped",
        component: () =>
          import("../views/Games/Collection/Flipped/Flipped.vue"),
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
