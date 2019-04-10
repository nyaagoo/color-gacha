<template lang="pug">
  .about
    h1 This is an about page
    button(v-on:click="incrementStoreCounter()") Add 100
    p {{storeCounter}}
    button(v-on:click="incrementStoreCounter1()") Add 100
    p {{storeCounter1}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { counter, counter1 } from "@/store/index.ts";

@Component
export default class HelloWorld extends Vue {
  counter: number = 0;
  get storeCounter() {
    return counter.incrementCounter;
  }
  get storeCounter1() {
    return counter1.incrementCounter;
  }
  incrementStoreCounter() {
    counter.increment100();
  }
  incrementStoreCounter1() {
    counter1.increment100();
  }
}
</script>

<style scoped lang="stylus">
h3
  margin 40px 0 0

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

a
  color #42b983
</style>
