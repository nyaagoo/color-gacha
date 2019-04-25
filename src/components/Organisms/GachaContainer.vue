<template lang="pug">
  .gacha-container
    section.section-intro
      p GachaContainer
      p ユーザーID: {{loginUid}}
      v-btn(outline @click="gacha()") ガチャ！
      v-btn(outline @click="reset()") リセット！
      v-btn(outline @click="test1()") test1
      v-btn(outline @click="test2()") test2
      .flex-container
        .color-box-wrapper(v-for="(item, index) in gachaList")
          .color-box(:class="`color-box${index}`" :style='{ "background-color": `${item.backgroundColor}`, "border-color": `${item.borderColor}` }')
          .color-name {{item.name}}
      
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { Color } from "@/model/color";
import { raritySetting } from "@/model/static";
import { gacha, login, user } from "@/store/index";
import { TweenMax, TimelineMax } from "gsap";
@Component({
  name: "gacha-container",
  components: {}
})
export default class GachaContainer extends Vue {
  created() {
    gacha.fetchColorList();
    gacha.SET_GACHA_LIST([]);
  }
  get loginUid() {
    return user.GET_UID;
  }
  get colorList() {
    return gacha.colorList;
  }
  get gachaList(): Color[] {
    return gacha.gachaList;
  }
  get hasColorList() {
    return gacha.hadColorList;
  }
  async gacha() {
    await gacha.gacha();
    const timeLine = new TimelineMax();

    /*
    await timeLine.to(".color-box-wrapper .color-box", 0.5, {
      rotationY: "0deg"
      backgroundColor: element.code
    });
*/
    gacha.gachaList.forEach((element, index) => {
      timeLine.to(`.color-box${index}`, 0.1, {
        rotationY: "0deg",
        backgroundColor: element.backgroundColor
      });
    });
    gacha.gachaList.forEach((element, index) => {
      timeLine.staggerTo(
        `.color-box${index}`,
        0.5,
        {
          rotationY: "180deg",
          backgroundColor: element.code
        },
        0
      );
    });
    await user.insertUserGacha(gacha.gachaList);
  }
  async reset() {
    await gacha.reset();
  }

  test1(color: string) {}

  test2() {
    TweenMax.to(".color-box", 1, { x: 200 });
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
  height 600px
.section-login
  background-color #c6ddfd
  height 600px
.flex-container
  display flex
  flex-wrap wrap
  justify-content space-between
.color-box-wrapper
  margin 8px
  height 100px
  width 160px
.color-box
  height 80px
  width 100%
  border 4px solid #458A07
  border-radius 8px
  background-color #acacac
.color-box-main
  height 80px
  width 160px
  margin 0 auto
  border 4px solid #458A07
  border-radius 8px
.color-box-main:hover
  cursor pointer
.color-box-main span
  line-height 80px
.color-name
  width 140px
  margin auto
  margin-top 4px
  border 2px solid #AAAAAA
  border-radius 20px
</style>

<style scoped>
.aa {
  background-color: #e0e0e0;
  background-color: #9e9e9e;
  background-color: #81c784;
  background-color: #4caf50;
  background-color: #4fc3f7;
  background-color: #03a9f4;
  background-color: #ba68c8;
  background-color: #9c27b0;
  background-color: #ffb74d;
  background-color: #ff9800;
}
</style>
