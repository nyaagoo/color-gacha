<template lang="pug">
  .login
    login-template
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import firebase from "firebase";
import LoginTemplateVue from "@/components/Templates/Login.vue";

@Component({
  name: "login",
  components: {
    "login-template": LoginTemplateVue
  }
})
export default class Login extends Vue {
  user: firebase.User | null = null;
  headingTitle: string = "ログイン";
  isLogin = false;
  inputMemo = "";
  memos: string[] = [];

  login() {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.user = null;
    this.isLogin = false;
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
