<template>
  <section>
    <h2>{{ $t("users.title") }}</h2>
    <table>
      <tr>
        <th style="width: 200px">{{ $t("users.table.header.account") }}</th>
        <th>{{ $t("users.table.header.lesson1") }}</th>
        <th>{{ $t("users.table.header.lesson2") }}</th>
        <th>{{ $t("users.table.header.lesson3") }}</th>
        <th>{{ $t("users.table.header.lesson4") }}</th>
        <th>{{ $t("users.table.header.lesson5") }}</th>
      </tr>
      <tr
        v-for="(item, k) in users"
        :key="k"
        :class="{
          red:
            !item.lesson1 &&
            !item.lesson2.passed &&
            !item.lesson3 &&
            !item.lesson4.passed &&
            !item.lesson5,
          warn:
            item.lesson1 ||
            item.lesson2.passed ||
            item.lesson3 ||
            item.lesson4.passed ||
            item.lesson5,
          success:
            item.lesson1 &&
            item.lesson2.passed &&
            item.lesson3 &&
            item.lesson4.passed &&
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
        <td>
          {{ item.lesson2.passed ? "+" : "-" }}
          <span v-if="item.lesson2.count > 0">
            / {{ item.lesson2.count }}
          </span>
        </td>
        <td>{{ item.lesson3 ? "+" : "-" }}</td>
        <td>
          {{ item.lesson4.passed ? "+" : "-" }}
          <span v-if="item.lesson4.count > 0">
            / {{ item.lesson4.count }}
          </span>
        </td>
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
table th {
  padding: 5px;
  font-size: 14px;
}
table td {
  padding: 5px;
  text-align: center;
  border-right: 1px solid #eee;
}
table td a {
  color: var(--color-white);
  font-size: 17px;
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

table tr.red {
  background-color: var(--color-orange);
}
table tr.warn {
  background-color: var(--color-yellow);
}
table tr.success {
  background-color: var(--color-green);
}
table tr.red:hover {
  background-color: #d56e3e;
}
table tr.warn:hover {
  background-color: #dbce88;
}
table tr.success:hover {
  background-color: #93c12c;
}
span {
  font-size: 10px;
}
</style>
