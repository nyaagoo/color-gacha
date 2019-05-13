<template lang="pug">
  #app
    v-app
      v-content
        router-view
        dialog-color-detail
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import DialogColorDetail from "@/components/Organisms/DialogColorDetail.vue";
@Component({
  name: "gacha-template",
  components: { "dialog-color-detail": DialogColorDetail }
})
export default class HelloWorld extends Vue {}
</script>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
#nav
  padding 30px
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983
</style>
