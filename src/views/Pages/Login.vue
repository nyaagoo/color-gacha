<template lang="pug">
  .login
    login-template
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import firebase from "firebase";
import LoginTemplateVue from "@/views/Templates/Login.vue";

@Component({
  name: "login",
  components: {
    "login-template": LoginTemplateVue
  }
})
export default class Login extends Vue {
  /*
    h1 {{headingTitle}}
    v-btn(color="primary" @click="login()") Google Login
    v-btn(color="primary" @click="logout()") Logout
    p isLogin:{{isLogin}}
    p(v-if="user !== null") email: {{user.email}}
    .memo-container
      p(v-for="(memo, index) in memos") {{memo}}
    v-text-field(v-model="inputMemo" label="追加するメモ" @keyup.enter="AddMemo()")
    
    v-btn(color="primary" @click="loadMemo()") LoadMemos
    v-btn(color="primary" @click="saveMemo()") SaveMemos
  */
  user: firebase.User | null = null;
  headingTitle: string = "ログイン";
  isLogin = false;
  inputMemo = "";
  memos: string[] = [];

  login() {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.user = null;
    this.isLogin = false;

    // router.push("home");
  }

  created() {
    firebase.auth().onAuthStateChanged(user => {
      // eslint-disable-next-line no-console
      console.log(user);
      this.user = user;
      if (user) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
  }
  mounted() {
    document.onkeydown = e => {
      if (e.key == "s" && e.metaKey) {
        this.saveMemo();
        return false;
      }
    };
  }
  beforeDestroy() {
    document.onkeydown = null;
  }

  AddMemo() {
    this.memos.push(this.inputMemo);
    this.inputMemo = "";
  }
  loadMemo() {
    firebase
      .database()
      .ref("memos/" + this.user!.uid)
      .once("value")
      .then(result => {
        if (result.val()) {
          this.memos = result.val();
        }
      });
  }
  saveMemo() {
    firebase
      .database()
      .ref("memos/" + this.user!.uid)
      .set(this.memos);
  }
}
</script>

<style lang="stylus" scoped>
.memo-container
  padding 20px
</style>
