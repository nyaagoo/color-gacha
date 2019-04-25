<template lang="pug">
  .login-form
    v-form(v-model="valid")
      v-container
        v-layout(row wrap)
          v-flex(xs12)
            .login-btn-container(v-if="!uid")
              v-btn(color="primary" @click="loginAnonymously()") 匿名アカウントで始める！！
              v-btn(color="primary" @click="loginGoogle()") Googleアカウントで始める！
            .continue-btn-container(v-else)
              v-btn(color="primary" @click="alreadyLogin()") 続きから始める
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { login, user } from "@/store/index";
import firebase from "firebase";

@Component({
  name: "login-form",
  components: {}
})
export default class LoginForm extends Vue {
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

  created() {
    user.ReadLocalStorageUID();
  }
  get uid(): string | undefined {
    return user.GET_UID_LOGIN;
  }
  loginAnonymously() {
    login.loginAnonymously();
  }
  loginGoogle() {
    login.loginGoogle();
  }
  alreadyLogin() {
    login.alreadyLogin();
  }
  logout() {
    firebase.auth().signOut();
  }
}
</script>
<style lang="stylus" scoped></style>
