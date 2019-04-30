<template lang="pug">
  .gacha-container
    section.section-intro
      p GachaContainer
      p ユーザーID: {{loginUid}}
      v-btn(outline @click="gacha()") ガチャ！
      v-btn(outline @click="reset()") リセット！
      v-btn(outline @click="test1()") test1
      v-btn(outline @click="test2()") test2
      v-btn(outline @click="test3()") test3
      transition-group.flex-container(name="list" tag="p")
        .color-box-wrapper(v-for="(item, index) in displayCardList" :key="`${item.idRoot}`")
          .color-box(:class="`color-box${index}`" :style='{ "background-image": `${background(item.backgroundColor)}`,"border-color": `${item.borderColor}`}' @click="openDialogColorDetail(item)")
          .color-name(:style='{ "border-color": `${item.backgroundColor}`}')
            b {{ item.ruby }}
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { Color, ColorExtendsRarity } from "@/model/color";
import { raritySetting } from "@/model/static";
import { gacha, login, user, dialog, colorDetail } from "@/store/index";
import { TweenMax, TimelineMax } from "gsap";
import CardOnTheBack from "@/components/Molecules/CardOnTheBack.vue";
import "css-doodle";
@Component({
  name: "gacha-container",
  components: {
    "card-on-the-back": CardOnTheBack
  }
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
  get displayCardList(): ColorExtendsRarity[] {
    return gacha.displayCardList;
  }
  set displayCardList(list: ColorExtendsRarity[]) {
    gacha.SET_DISPLAY_CARD_LIST(list);
  }
  get hasColorList() {
    return gacha.hadColorList;
  }
  openDialogColorDetail(color: ColorExtendsRarity) {
    colorDetail.OpenDialog(color);
  }

  background(hex: string) {
    const subhex = hex.substring(1, 7);
    return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%23${subhex}' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 4L52 0h2L40 14v-2zm0 4L56 0h2L40 18v-2zm0 4L60 0h2L40 22v-2zm0 4L64 0h2L40 26v-2zm0 4L68 0h2L40 30v-2zm0 4L72 0h2L40 34v-2zm0 4L76 0h2L40 38v-2zm0 4L80 0v2L42 40h-2zm4 0L80 4v2L46 40h-2zm4 0L80 8v2L50 40h-2zm4 0l28-28v2L54 40h-2zm4 0l24-24v2L58 40h-2zm4 0l20-20v2L62 40h-2zm4 0l16-16v2L66 40h-2zm4 0l12-12v2L70 40h-2zm4 0l8-8v2l-6 6h-2zm4 0l4-4v2l-2 2h-2z'/%3E%3C/g%3E%3C/svg%3E")`;
  }
  async gacha() {
    await gacha.gacha();
    this.displayCardList = [];
  }
  async reset() {
    await gacha.reset();
  }

  test1(color: string) {
    gacha.animationKill();
  }

  test2() {
    const timeLine = new TimelineMax();
    gacha.animationKill();

    this.displayCardList.forEach((card, index) => {
      timeLine
        .to(`.color-box${index}`, 0.4, {
          rotationY: "180deg",
          backgroundColor: card.code,
          backgroundImage: "none",
          borderColor: "none",
          scale: 1.2
        })
        .to(`.color-box${index}`, 0.2, {
          scale: 1.0
        });
    });
  }
  test3() {
    dialog.SET_IS_VISIBLE_COLOR_DETAIL(true);
  }
}
</script>
<style lang="stylus" scoped>
card-on-the-back
  width 200px
  height 200px
.list-move
  transition all .5s
.list-enter-active, .list-leave-active {
  transition: all .5s;
}
.list-enter
  opacity 0
  transform translateY(-80px)
.list-leave-to
  opacity 0
  transform translateY(80px)
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
  justify-content center
.color-box-wrapper
  margin 8px
  height 120px
  width 160px
.color-box
  height 84px
  width 100%
  border 4px solid #458A07
  border-radius 8px
  background-repeat repeat
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
  color #232323
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
