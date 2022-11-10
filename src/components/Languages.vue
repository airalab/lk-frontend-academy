<template>
  <select v-model="locale">
    <option value="en">English</option>
    <option value="ru">Русский</option>
  </select>
</template>

<script>
export default {
  data() {
    return {
      locale: this.$i18n.locale
    };
  },
  watch: {
    locale(newValue) {
      this.$i18n.locale = newValue;
      localStorage.setItem("locale", newValue);
    }
  }
};
</script>

<style scoped>
select {
  background-image: none;
  background-color: var(--color-yellow);
  padding: 0.2rem 1.6rem;
  margin-right: var(--gap);
  font-size: 80%;
  font-weight: 600;
  border: 1px solid transparent;
  border-radius: var(--gap);
  color: var(--color-brown);
  text-transform: uppercase;
  cursor: pointer;
}
button {
  background-color: var(--color-orange);
  border-radius: var(--gap);
  padding: 0 calc(var(--gap) * 0.4);
  border: 0;
  font-size: 14px;
}
@media screen and (max-width: 450px) {
  select {
    margin-right: 1rem;
    padding: 0.2rem 0.6rem;
    max-width: 60px;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>
