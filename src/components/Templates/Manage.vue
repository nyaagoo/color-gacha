<template lang="pug">
  .manage-template
    manage-toolbar
    .manage-conitaner
      manage-container
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import ManageToolbar from "@/components/Organisms/ManageToolbar.vue";
import ManageContainer from "@/components/Organisms/ManageContainer.vue";

@Component({
  name: "manage-template",
  components: {
    "manage-toolbar": ManageToolbar,
    "manage-container": ManageContainer
  }
})
export default class ManageTemplate extends Vue {}
</script>
<style lang="stylus" scoped>
.manage-conitaner
  overflow-y auto
  height calc(100vh - 48px)
</style>
