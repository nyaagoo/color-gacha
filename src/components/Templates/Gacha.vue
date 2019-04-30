<template lang="pug">
  .gacha-template
    gacha-container
    .login-conitaner
      gacha-toolbar
    dialog-color-detail
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import GachaContainer from "@/components/Organisms/GachaContainer.vue";
import GachaToolbar from "@/components/Organisms/GachaToolbar.vue";
import GachaCollection from "@/components/Organisms/GachaCollection.vue";
import { user } from "@/store/index";
import DialogColorDetail from "@/components/Organisms/DialogColorDetail.vue";

@Component({
  name: "gacha-template",
  components: {
    "gacha-container": GachaContainer,
    "gacha-toolbar": GachaToolbar,
    "gacha-collection": GachaCollection,
    "dialog-color-detail": DialogColorDetail
  }
})
export default class GachaTemplate extends Vue {
  created() {
    user.ReadLocalStorageUID();
  }
}
</script>
<style lang="stylus" scoped>
.gacha-template
  overflow-y auto
  height calc(100vh - 48px)
</style>
