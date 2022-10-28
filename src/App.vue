<template>
  <div>
    <Header @login="isAuth = true" @logout="isAuth = false" />
    <router-view v-if="isAuth" />
    <section v-else>
      <div class="layout">You need to login</div>
    </section>
  </div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: { Header },
  data() {
    return {
      isAuth: false
    };
  }
};
</script>

<style>
.layout {
  max-width: 960px;
  margin: 0 auto;
  padding-left: var(--space);
  padding-right: var(--space);
}
</style>
