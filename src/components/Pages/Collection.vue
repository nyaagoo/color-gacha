<template lang="pug">
  .collection
    collection-template
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import CollectionTemplate from "@/components/Templates/Collection.vue";

@Component({
  name: "collection",
  components: {
    "collection-template": CollectionTemplate
  }
})
export default class Collection extends Vue {}
</script>
<style lang="stylus" scoped></style>
