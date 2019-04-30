<template lang="pug">
  .collection-template
    collection-toolbar
    collection-container
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import CollectionToolbar from "@/components/Organisms/CollectionToolbar.vue";
import CollectionContainer from "@/components/Organisms/CollectionContainer.vue";

@Component({
  name: "collection-template",
  components: {
    "collection-toolbar": CollectionToolbar,
    "collection-container": CollectionContainer
  }
})
export default class CollectionTemplate extends Vue {}
</script>
<style lang="stylus" scoped></style>
