<template lang="pug">
  .manage-container
    section.section-intro
      p {{ gachaMasterData.displayName }}
      p ユーザーID: sdfa
      v-btn(@click="UpdateMasterColor()" color="primary") UPDATE!!
      .flex-container(v-for="item in colorList")
        .color-sample(:style='{ "background-color": `${item.code}`}')
        v-text-field.column-number(v-model="item.idRoot" label="idRoot" placeholder="ID Root" solo )
        v-text-field.column-number(v-model="item.id" label="id" placeholder="ID" solo)
        v-text-field(v-model="item.code" label="Code" placeholder="Code" solo)
        v-text-field(v-model="item.name" label="Name" placeholder="Name" solo)
        v-text-field(v-model="item.ruby" label="Ruby" placeholder="Ruby" solo)
        v-text-field.column-number(v-model="item.rarity" label="Rarity" placeholder="Rarity" solo)
        v-text-field.column-number(v-model="item.purchasability" label="Purchasability" placeholder="Purchasability" solo)
      .add-field
        v-btn(color="primary" @click="addField()")
          v-icon() add
          | フィールドの追加
    section.section-login
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
  UpdateMasterColor() {
    gachaModify.UpdateColorList(this.colorList);
  }
  addField() {
    gachaModify.gachaMasterData.colorList.push({
      idRoot: 1,
      id: 1,
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
  width 1920px
  margin auto
.section-intro
  padding 20px
  background-color #EFEFEF
  height 900px
.section-login
  background-color #c6ddfd
  height 900px
.flex-container
  display flex
  flex-wrap wrap
  justify-content space-between
.color-box-wrapper
  margin 8px
  height 180px
  width 160px
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
