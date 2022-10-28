import { createRouter, createWebHashHistory } from "vue-router";
import User from "./views/User";
import Users from "./views/Users";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/:account?",
      name: "user",
      component: User,
      props: true
    },
    {
      path: "/users",
      name: "users",
      component: Users
    }
  ]
});

export default router;
