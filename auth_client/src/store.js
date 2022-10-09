import { reactive } from "vue";
import axios from 'axios';

export const store = reactive({
  accessToken: window.localStorage.getItem('accessToken'),
});

export const getters = {
  isLoggedIn() {
    return !!store.accessToken;
  },
};

export const mutations = {
  setToken(token) {
    store.accessToken = token;
  },
};
export const actions = {
  async revoke_token() {
      try {
        const response = await axios.post(`${process.env.VUE_APP_OAUTH_AUTH_SERVER}/api/users/logout`, {
          headers: {
            Authorization:`Bearer ${store.accessToken}`,
          },
        });
        console.log(response.data);
      } catch (error) {
        alert(error)
        console.log(error);
      }finally{
        store.accessToken = null;
        localStorage.clear();
      }
    },
  logout() {
    this.revoke_token();
  },
};