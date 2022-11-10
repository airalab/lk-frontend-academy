<template>
  <template v-if="accounts.length > 0">
    <select v-model="account">
      <option
        v-for="(account, key) in accounts"
        :key="key"
        :value="account.address"
      >
        {{ account.meta.isTesting ? "[ dev ]" : "" }} {{ account.meta.name }}
      </option>
    </select>
    <button v-if="!isAuth" @click="auth">{{ $t("account.login") }}</button>
  </template>
  <span v-else>
    <i18n-t keypath="account.create.text">
      <template #link>
        <a href="https://polkadot.js.org/extension/" target="_blank">
          {{ $t("account.create.link") }}
        </a>
      </template>
    </i18n-t>
  </span>
</template>

<script>
import robonomics from "../robonomics";
import { encodeAddress } from "@polkadot/util-crypto";
import { auth, logout } from "../api";

export default {
  emits: ["login", "logout", "type"],
  data() {
    return {
      account: null,
      accounts: [],
      type: "user",
      isAuth: false
    };
  },
  async created() {
    robonomics.accountManager.onReady(() => {
      this.accounts = robonomics.accountManager.getAccounts();
      if (this.accounts.length) {
        this.account = this.accounts[0].address;
      }
    });
  },
  watch: {
    async account(address) {
      this.isAuth = false;
      logout();
      await robonomics.accountManager.selectAccountByAddress(address);
    },
    isAuth(v) {
      if (v) {
        this.$emit("login");
      } else {
        this.$emit("logout");
      }
    },
    type(v) {
      this.$emit("type", v);
    }
  },
  methods: {
    async auth() {
      this.isAuth = false;
      const address = encodeAddress(
        robonomics.accountManager.account.address,
        32
      );
      const signature = await robonomics.accountManager.account.signMsg(
        address
      );
      const res = await auth(address, signature);
      if (res.isValid) {
        this.isAuth = true;
        this.type = res.type;
      }
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
