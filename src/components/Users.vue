<template>
  <section>
    <h2>Lessons</h2>
    <table>
      <tr>
        <th>account</th>
        <th>lesson1</th>
        <th>lesson2</th>
        <th>lesson3</th>
        <th>lesson4</th>
        <th>lesson5</th>
      </tr>
      <tr
        v-for="(item, k) in users"
        :key="k"
        :class="{
          red:
            !item.lesson1 &&
            !item.lesson2 &&
            !item.lesson3 &&
            !item.lesson4 &&
            !item.lesson5,
          warn:
            item.lesson1 ||
            item.lesson2 ||
            item.lesson3 ||
            item.lesson4 ||
            item.lesson5,
          success:
            item.lesson1 &&
            item.lesson2 &&
            item.lesson3 &&
            item.lesson4 &&
            item.lesson5
        }"
      >
        <td>
          <router-link
            :to="{ name: 'user', params: { account: item.account } }"
            >{{ item.account }}</router-link
          >
        </td>
        <td>{{ item.lesson1 ? "+" : "-" }}</td>
        <td>{{ item.lesson2 ? "+" : "-" }}</td>
        <td>{{ item.lesson3 ? "+" : "-" }}</td>
        <td>{{ item.lesson4 ? "+" : "-" }}</td>
        <td>{{ item.lesson5 ? "+" : "-" }}</td>
      </tr>
    </table>
  </section>
</template>

<script>
import { get } from "../api";

export default {
  data() {
    return {
      users: []
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      const result = await get("/users");
      if (result && result.users) {
        this.users = result.users;
      }
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
}
table td {
  padding: 5px;
}
table td a {
  color: var(--color-white);
}
table td a:hover {
  color: var(--color-brown) !important;
}
.warn a {
  color: var(--color-brown);
}
table td a:hover {
  color: var(--color-white) !important;
}
.red {
  background-color: var(--color-orange);
}
.warn {
  background-color: var(--color-yellow);
}
.success {
  background-color: var(--color-green);
}
</style>
