<template lang="pug">
  .gacha-template
    gacha-toolbar
    gacha-container
    .svg-footer-container
      svg-footer

</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import GachaContainer from "@/components/Organisms/GachaContainer.vue";
import GachaToolbar from "@/components/Organisms/GachaToolbar.vue";
import GachaCollection from "@/components/Organisms/GachaCollection.vue";
import { user } from "@/store/index";
import DialogColorDetail from "@/components/Organisms/DialogColorDetail.vue";
import SvgFooter from "@/components/Organisms/SvgFooter.vue";

@Component({
  name: "gacha-template",
  components: {
    "gacha-container": GachaContainer,
    "gacha-toolbar": GachaToolbar,
    "gacha-collection": GachaCollection,
    "svg-footer": SvgFooter
  }
})
export default class GachaTemplate extends Vue {
  created() {
    user.ReadLocalStorageUID();
  }
}
</script>
<style lang="stylus" scoped>
.svg-header-container
  position absolute
  top 0
  left 0
  z-index 0
.gacha-template
  overflow-y auto
  height calc(100vh - 48px)
.svg-footer-container
  position absolute
  bottom 0
  width 100%
</style>
