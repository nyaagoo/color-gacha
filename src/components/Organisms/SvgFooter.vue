<template lang="pug">
  .svg-footer
    svg(width="100%" :height="viewBoxHeight")
      circle(v-for="(item, i) in bubbles" :key="index" :cx="item.cx" :cy="item.cy" :r="item.r" fill="#88f" stroke="#110000" stroke-width="3")
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";

@Component({
  name: "svg-footer",
  components: {}
})
export default class SvgFooter extends Vue {
  bubbles: { cx: number; cy: number; r: number }[] = [];
  viewBoxHeight = 200;
  minRadius = 6;
  maxRadius = 30;
  quantity = 400;

  mounted() {
    this.updateBubbles();
    window.addEventListener("resize", this.updateBubbles);
  }

  beforeDestroy() {
    window.removeEventListener("resize", this.updateBubbles);
  }

  updateBubbles() {
    const bubbleList: { cx: number; cy: number; r: number }[] = [];
    const maxWidth = window.innerWidth;
    const maxHeight = this.viewBoxHeight;
    for (let i = 0; i < this.quantity; i++) {
      bubbleList.push({
        cx: Math.floor(Math.random() * maxWidth),
        cy: Math.floor(Math.random() * maxHeight) + this.maxRadius,
        r: Math.floor(
          Math.random() * (this.maxRadius - this.minRadius) + this.minRadius
        )
      });
    }
    this.bubbles = bubbleList;
  }
}
</script>
<style lang="stylus" scoped></style>
