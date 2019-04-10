<template lang="pug">
  .gacha-container
    section.section-intro
      p GachaContainer
      p ユーザーID: {{loginUid}}
      v-btn(@click="gacha()") ガチャ
      .flex-container
        .color-box-wrapper(v-for="item in gachaList")
          .color-box(:style='{ "background-color": `${item.code}`}') {{item.name}}
    section.section-login
      login-form
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { Color } from "@/model/color.ts";
import { gacha, login } from "@/store/index";
@Component({
  name: "gacha-container",
  components: {}
})
export default class GachaContainer extends Vue {
  vdivHeight = 200;
  divWidth = 200;

  users = [{ name: "aa" }, { name: "bb" }];
  get colorList() {
    return gacha.colorList;
  }
  get gachaList() {
    return gacha.gachaList;
  }

  get hasColorList() {
    alert(gacha.hadColorList);
    return gacha.hadColorList;
  }
  get loginUid() {
    return login.uid;
  }

  created() {
    gacha.fetchColorList();
  }
  gacha() {
    gacha.gacha();
  }
}
</script>
<style lang="stylus" scoped>
.gacha-container
  width 600px
  margin auto
.section-intro
  padding 20px
  background-color #f8ff83
  height 400px
.section-login
  background-color #c6ddfd
  height 900px
.flex-container
  display flex
  flex-wrap wrap
.color-box-wrapper
  margin 8px
  height 80px
  width 80px
.color-box
  height 100%
  width 100%
</style>
