import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import ToDo from "../views/ToDo.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/todo/:id",
    name: "todo",
    component: ToDo,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
