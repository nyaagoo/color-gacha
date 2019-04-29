<template>
  <div class="card-wrapper">
    <p>{{ hoge }}</p>
    <css-doodle class="card-on-the-back">
      :doodle { @grid: 10 / 100vmax; background: midnightblue; } @shape: circle;
      background: hsla( calc(300 - @index() * 5), 60%, 70%, @rand(.8) );
      transform: scale(@rand(.2, 1.2)) translate( @rand(-50%, 50%), @rand(-20%,
      20%) );
    </css-doodle>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Prop } from "vue-property-decorator";
import router from "@/router";
import "css-doodle";

@Component({
  name: "card-on-the-back",
  components: {}
})
export default class CardOnTheBack extends Vue {
  @Prop({ type: String, required: true })
  hoge: string = "11";
}
</script>
<style scoped>
.card-on-the-back {
  border: 2px solid red;
  width: 200px;
  height: 200px;
  background-color: red;
}
</style>
