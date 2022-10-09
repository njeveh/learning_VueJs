<template>
  <div class="container">
    <div class="notification is-info">
        Logging you in...
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mutations } from '@/store';
export default {
  async mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    if (code && state) {
      if (state === window.localStorage.getItem('state')) {
        try {
          const response = await axios.post('/oauth/token', {
            grant_type: 'authorization_code',
            client_id: process.env.VUE_APP_OAUTH_CLIENT_ID,
            redirect_uri: process.env.VUE_APP_OAUTH_CLIENT_REDIRECT,
            code_verifier: window.localStorage.getItem('verifier'),
            code: code,
          });
          mutations.setToken(response.data.access_token);
          window.localStorage.setItem('accessToken', response.data.access_token);
          window.localStorage.setItem('refreshToken', response.data.refresh_token);
          this.$router.push('/');
        } catch (error) {
          console.log(error);
          this.$router.push('/');
        }
      }
    }
  },
};
</script>