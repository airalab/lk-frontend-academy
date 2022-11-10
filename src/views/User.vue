<template>
  <div class="lesson__tags">
    <div class="lessons__tags-container">
      <div class="lesson__tags__tag">{{ $t("app.account") }}: {{ user }}</div>
    </div>
  </div>
  <div class="layout">
    <Lessons :account="user" />
  </div>
</template>

<script>
import { onUnmounted, ref, watchEffect } from "vue";
import { useAccount } from "../hooks/useAccount";
import Lessons from "../components/Lessons.vue";

export default {
  props: ["account"],
  components: {
    Lessons
  },
  setup(props) {
    const user = ref("");
    const { account: sender, unsubscribe } = useAccount();
    onUnmounted(() => {
      unsubscribe();
    });

    watchEffect(() => {
      if (props.account) {
        user.value = props.account;
      } else {
        user.value = sender.value;
      }
    });

    return {
      user
    };
  },
  data() {
    return {
      isAuth: false
    };
  }
};
</script>

<style scoped>
.lesson__tags {
  padding-top: calc(var(--gap) * 0.5);
  background-color: var(--color-brown);
  color: var(--color-yellow);
  text-align: center;
}
.lessons__tags-container {
  max-width: 650px;
  margin: 0 auto;
  text-align: left;
  white-space: nowrap;
}
.lesson__tags__tag {
  display: inline-block;
  margin-bottom: calc(var(--gap) * 0.5);
}
</style>
