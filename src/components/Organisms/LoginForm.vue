<template lang="pug">
  .login-form
    v-form(v-model="valid")
      v-container
        v-layout(row wrap)
          v-flex(xs6)
            v-text-field(v-model="name", :rules="[rules.required]", :counter="10", label="Name")
          v-flex(xs6)
            v-text-field(v-model="email", :rules="[rules.required, rules.email]", label="E-mail")
          v-flex(xs12)
            v-btn(outline color="primary" @click="login()") ゲストログイン
            v-btn(outline color="primary" @click="login2()") ゲストログイン2
            v-btn(outline color="primary" @click="logout()") ログアウト

    
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
    firebase
      .auth()
      .signInAnonymously()
      .catch(function(error) {
        // eslint-disable-next-line no-console
        console.log(error.code);
        // eslint-disable-next-line no-console
        console.log(error.message);
        alert("匿名ログインに失敗しました");
      });
  }
  login2() {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    firebase.auth().signOut();
  }

  created() {
    firebase.auth().onAuthStateChanged(user => {
      // eslint-disable-next-line no-console
      console.log(user);
      this.user = user;
    });
  }
}
</script>
<style lang="stylus" scoped></style>
