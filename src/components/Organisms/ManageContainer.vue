<template lang="pug">
  .manage-container
    section.section-intro
      p {{ gachaMasterData.displayName }}
      p ユーザーID: sdfa
      v-btn(@click="UpdateMasterColor()" color="primary") UPDATE!!
      v-btn(@click="Update()" color="primary") tuyoi
      .flex-container(v-for="item in colorList")
        .color-sample(:style='{ "background-color": `${item.code}`}')
        span.column.column-number {{ item.idRoot }}
        span.column.column-number {{ item.id }}
        span.column {{ item.code }}
        span.column {{ item.name }}
        span.column {{ item.ruby }}
        span.column.column-number {{ item.rarity }}
        span.column.column-number {{ item.purchasability }}
      .add-field
        v-btn(color="primary" @click="addField()")
          v-icon() add
          | フィールドの追加
    section
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { gachaModify } from "@/store/index";
import { Gacha, Rarity, Color } from "@/model/color";

@Component({
  name: "manage-container",
  components: {}
})
export default class ManageContainer extends Vue {
  colorList: Color[] = [];
  SetMasterGachaData() {}

  get gachaMasterData(): Gacha {
    this.colorList = gachaModify.gachaMasterData.colorList;
    return gachaModify.gachaMasterData;
  }

  created() {
    gachaModify.fetchGachaData();
  }
  Update() {
    const list = gachaModify.gachaMasterData.colorList;
    const aa = list.map(color => ({
      ...color,
      id: "color_" + color.id,
      idRoot: "color_" + color.idRoot
    }));
    gachaModify.UpdateColorList(aa);
  }
  UpdateMasterColor() {
    gachaModify.UpdateColorList(this.colorList);
  }
  addField() {
    gachaModify.gachaMasterData.colorList.push({
      idRoot: "",
      id: "",
      name: "",
      ruby: "",
      code: "#",
      purchasability: 2,
      rarity: Rarity.Rare
    });
  }
}
</script>
<style lang="stylus" scoped>
.manage-container
  width 1080px
  margin auto
.section-intro
  padding 20px
  height 900px
.flex-container
  display flex
  flex-wrap wrap
  justify-content space-between
  border-bottom 1px solid lightgray
.color-box-wrapper
  margin 8px
  height 180px
  width 160px
.column
  width 160px
  margin auto
.color-box
  height 160px
  width 100%
  border 4px solid #458A07
  border-radius 8px
.color-name
  width 140px
  margin auto
  margin-top 4px
  border 2px solid #AAAAAA
  border-radius 20px
.flex-container
  .column-number
    width 100px
  .color-sample
    margin 2px 8px 2px 2px
    width 48px
    height 48px
    background-color red
.add-field
  text-align left
</style>
