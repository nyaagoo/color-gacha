<template lang="pug">
  .login-title-logo
    p.logo-paragraph
      span C
      span o
      span l
      span o
      span r
      span i
      span s
      span m
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";

@Component({
  name: "login-title-logo",
  components: {}
})
export default class LoginTitleLogo extends Vue {}
</script>
<style lang="stylus" scoped>
.logo-paragraph
  display flex
  justify-content space-between
p span
  position: relative;
  display: block;
  width 72px
  height 72px
  margin 10px
  padding: .25em;
  border: .1em solid #666664;
  color: #ffffff;
  font-size: 40px;
  font-weight: 500;
  line-height: .88;
  text-transform: uppercase;
  background-color: red;
span:nth-child(1) { background-color: #e57373; border: .1em solid #d32f2f; }
span:nth-child(2) { background-color: #BA68C8; border: .1em solid #7B1FA2; }
span:nth-child(3) { background-color: #7986CB; border: .1em solid #303F9F; }
span:nth-child(4) { background-color: #4FC3F7; border: .1em solid #0288D1; }
span:nth-child(5) { background-color: #4DB6AC; border: .1em solid #00796B; }
span:nth-child(6) { background-color: #AED581; border: .1em solid #689F38; }
span:nth-child(7) { background-color: #FFF176; border: .1em solid #FBC02D; }
span:nth-child(8) { background-color: #FFB74D; border: .1em solid #F57C00; }
</style>
