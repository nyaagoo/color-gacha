<template lang="pug">
  .login-form
    v-form(v-model="valid")
      v-container
        v-layout(row wrap)
          v-flex(xs12)
            v-btn(color="primary" @click="login()") 始める！！

    
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { login } from "@/store/index";
import firebase from "firebase";

@Component({
  name: "login-form",
  components: {}
})
export default class LoginForm extends Vue {
  user: firebase.User | null = null;
  name: string = "";
  email: string = "";
  valid: boolean = false;
  rules = {
    required: (value: any) => !!value || "Required.",
    counter: (value: any) => value.length <= 20 || "Max 20 characters",
    email: (value: any) => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || "Invalid e-mail.";
    }
  };
  login() {
    login.loginAnonymously();
  }
  logout() {
    firebase.auth().signOut();
  }
}
</script>
<style lang="stylus" scoped></style>
