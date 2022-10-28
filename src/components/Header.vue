<template>
  <header class="header">
    <div class="container__wide">
      <router-link class="logo header__section" to="/">
        <img src="@/assets/images/logo.svg" />
      </router-link>
      <nav id="nav" class="nav header__section">
        <a class="nav__link" href="https://robonomics.academy/" target="_blank">
          Online Robonomics school 2022
        </a>
        <router-link
          v-if="type === 'admin'"
          class="nav__link"
          :to="{ name: 'users' }"
          >Users</router-link
        >
      </nav>

      <div class="header-right expand header__section" tabindex="0">
        <Account
          v-if="isReady"
          @login="$emit('login')"
          @logout="$emit('logout')"
          @type="(v) => (type = v)"
        />
      </div>
    </div>
  </header>
</template>

<script>
import AccountManager from "../accountManagerUi";
import robonomics from "../robonomics";
import Account from "./Account.vue";

export default {
  emits: ["login", "logout"],
  components: { Account },
  data() {
    return {
      isReady: false,
      isAuth: false,
      type: "user"
    };
  },
  async created() {
    await robonomics.run();
    await AccountManager.initPlugin(robonomics.accountManager.keyring, {
      isDevelopment: false
    });
    this.isReady = true;
  }
};
</script>

<style>
.header {
  background-color: var(--color-brown-dark);
  color: var(--color-white);
  font-family: var(--font-title);
  font-size: var(--font-size);
  font-weight: bold;
  padding-bottom: calc(var(--gap) * 0.5);
  padding-top: calc(var(--gap) * 0.5);
  position: sticky;
  top: 0;
  z-index: 10;
}
.header .container__wide {
  padding-left: calc(var(--gap) * 3);
  position: relative;
}
.header__section {
  display: inline-block;
  vertical-align: middle;
}
.header .logo {
  left: 0;
  max-width: calc(var(--gap) * 1.8);
  position: absolute;
  top: calc(var(--gap) * -0.3);
}
.header .logo img {
  display: block;
  width: 100%;
}
.header a {
  color: var(--color-white);
}
.header a:not(:last-child) {
  margin-right: var(--gap);
}
.header a:hover {
  color: var(--color-orange);
}
.header a.active,
.header a.active:hover {
  color: var(--color-yellow);
}
.header nav {
  margin-right: calc(var(--gap) * 3);
}
.header .expand {
  position: absolute;
  right: 0;
  top: 0;
}
.header .expand summary {
  background-color: var(--color-orange);
  border-radius: var(--gap);
  padding: 0 calc(var(--gap) * 0.4);
}
.header .expand__content {
  background-color: var(--color-orange);
  border-radius: calc(var(--gap) * 0.5);
  padding: calc(var(--gap) * 0.5);
  position: absolute;
  right: 0;
  top: calc(var(--gap) * 1.2);
  width: 300px;
}
.header .expand__content a {
  color: var(--color-brown);
}
.expand summary::-webkit-details-marker,
.expand summary::marker {
  display: none;
  font-size: 0;
}
.expand summary {
  cursor: pointer;
  display: inline-block;
  user-select: none;
}
.nav__popup__link,
.nav__popup__close {
  display: none;
}
.nav__popup__close {
  position: fixed;
  top: calc(var(--gap) * 0.5);
  right: 0;
  z-index: 100;
  color: var(--color-brown) !important;
  font-size: 2rem;
}
.header-right {
  display: inline-flex;
}
@media screen and (max-width: 945px) {
  .nav {
    background: var(--color-white);
    color: var(--color-bworn);
    padding: calc(var(--gap) * 2) var(--gap);

    position: fixed;
    z-index: 100;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    margin: 0 !important;
    text-align: center;
  }
  /* .nav:not(:target) { */
  .nav:not(.open) {
    display: none;
  }
  /* .nav:target { */
  .nav.open {
    display: block;
  }
  /* .nav:target + .nav__popup__close { */
  .nav.open + .nav__popup__close {
    display: block;
  }
  .nav a {
    color: var(--color-brown);
    font-size: 130%;
    display: block;
    width: 100%;
    margin-bottom: var(--gap);
  }
  .header .container__wide {
    text-align: right;
  }
  .header .expand {
    position: static;
  }
  .nav__popup__link {
    display: inline-block !important;
  }
}
</style>
