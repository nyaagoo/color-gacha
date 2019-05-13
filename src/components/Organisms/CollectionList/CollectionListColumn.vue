<template lang="pug">
  .collection-list-column
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";

@Component({
  name: "collection-list-column",
  components: {}
})
export default class CollectionListColumn extends Vue {}
</script>
<style lang="stylus" scoped>
.collection-list-column
  background red
  width 40px
  height 40px
</style>
