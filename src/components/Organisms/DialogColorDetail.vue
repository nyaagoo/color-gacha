<template lang="pug">
  .dialog-color-detail.text-xs-center
    v-dialog(v-model='isVisible', width='500')
      v-card
        v-card-title.header(primary-title='' :style="{'background-color':color.code}")
          span {{color.ruby}}
        v-card-text
          section.color-sample(:style="{'background-color':color.code}")
            .rarity-container
              v-icon.rarity(v-for="i in color.rarity" :key="i" size="36" :style="{'color':color.backgroundColor}") star
          section.color-detail
            p {{ color.name }} / {{color.ruby}} / {{color.code}}
        v-divider
        v-card-actions
          v-spacer
          v-btn(color='primary', flat='', @click="closeDialog()") I accept

</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import router from "@/router";
import { dialog, colorDetail } from "@/store/index";
import { ColorExtendsRarity } from "../../model/color";

@Component({
  name: "dialog-color-detail",
  components: {}
})
export default class DialogColorDetail extends Vue {
  backgroundColor: string = "#ff00ff";
  get color(): ColorExtendsRarity {
    return colorDetail.color;
  }

  get isVisible(): boolean {
    return dialog.isVisibleColorDetail;
  }
  set isVisible(isVisible: boolean) {
    dialog.SET_IS_VISIBLE_COLOR_DETAIL(isVisible);
  }

  closeDialog() {
    dialog.SET_IS_VISIBLE_COLOR_DETAIL(false);
  }
}
</script>
<style lang="stylus" scoped>
.color-sample
  margin 8px
  height 180px
.rarity-container
  margin auto
  display flex
  flex-direction row
  justify-content center
  align-items flex-end
  position relative
  top 160px
.rarity
  color yellow
.color-detail
  padding 8px
</style>
