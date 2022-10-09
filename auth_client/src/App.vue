<template>
  <div id="app">
    <nav class="navbar mb-5" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="https://bulma.io" target="_blank" rel="noopener noreferrer">
                <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
            </a>
        </div>

        <div class="navbar-menu">
            <div class="navbar-start">
                <router-link to="/" class="navbar-item">Home</router-link>
            </div>

            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <button @click="logout" v-if="isLoggedIn"
                        class="button is-dark">Log out</button>
                        <button @click="redirect" v-else class="button is-light">Log in</button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import qs from 'qs';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
import { getters, actions } from '@/store';
export default {
  computed: {
    isLoggedIn: () => getters.isLoggedIn(),
  },
  methods: {
    redirect() {
      this.state = this.createRandomString(40);
      const verifier = this.createRandomString(128);
      this.challenge = this.base64Url(sha256(verifier));
      window.localStorage.setItem('state', this.state);
      window.localStorage.setItem('verifier', verifier);
      const queryString = {
        client_id: process.env.VUE_APP_OAUTH_CLIENT_ID,
        redirect_uri: process.env.VUE_APP_OAUTH_CLIENT_REDIRECT,
        response_type: 'code',
        scope: '',
        state: this.state,
        code_challenge: this.challenge,
        code_challenge_method: 'S256',
      };
      window.location.href = `${process.env.VUE_APP_OAUTH_AUTH_SERVER}/oauth/authorize?${qs.stringify(queryString)}`;
    },
    createRandomString(num) {
      return [...Array(num)].map(() => Math.random().toString(36)[2]).join('')
    },
    base64Url(string) {
      return Base64.stringify(string)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
    },
    logout() {
      actions.logout();
    },
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
