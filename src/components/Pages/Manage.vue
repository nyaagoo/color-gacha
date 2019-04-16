<template lang="pug">
  .manage-template
    manage-template
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import ManageTemplate from "@/components/Templates/Manage.vue";

@Component({
  name: "manage-page",
  components: { "manage-template": ManageTemplate }
})
export default class ManagePage extends Vue {}
</script>
<style lang="stylus" scoped></style>
