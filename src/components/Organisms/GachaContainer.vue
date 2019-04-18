<template lang="pug">
  .gacha-container
    section.section-intro
      p GachaContainer
      p ユーザーID: {{loginUid}}
      v-btn(outline @click="gacha()") ガチャ！
      .flex-container
        .color-box-wrapper(v-for="item in gachaList")
          .color-box(:style='{ "background-color": `${item.code}`}') 
          .color-name {{item.name}}
    section.section-login
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { Color } from "@/model/color.ts";
import { gacha, login, user } from "@/store/index";
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
    return gacha.hadColorList;
  }
  get loginUid() {
    return login.uid;
  }

  created() {
    gacha.fetchColorList();
  }
  async gacha() {
    await gacha.gacha();
    await user.insertUserGacha(gacha.gachaList);
  }
}
</script>
<style lang="stylus" scoped>
.gacha-container
  width 1000px
  margin auto
.section-intro
  padding 20px
  background-color #EFEFEF
  height 900px
.section-login
  background-color #c6ddfd
  height 900px
.flex-container
  display flex
  flex-wrap wrap
  justify-content space-between
.color-box-wrapper
  margin 8px
  height 180px
  width 160px
.color-box
  height 160px
  width 100%
  border 4px solid #458A07
  border-radius 8px
.color-name
  width 140px
  margin auto
  margin-top 4px
  border 2px solid #AAAAAA
  border-radius 20px
</style>
