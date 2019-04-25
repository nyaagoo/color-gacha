/* eslint-disable no-console */
import {
  Mutation,
  Action,
  VuexModule,
  getModule,
  Module
} from "vuex-module-decorators";
import store from "@/store/store";
import { login, user } from "@/store/index";
import { Color, ColorExtendsRarity } from "@/model/color";
import { raritySetting } from "@/model/static";
import firebase from "firebase";

@Module({ dynamic: true, store, name: "gacha", namespaced: true })
class Gacha extends VuexModule {
  // #region STATE
  colorList: Color[] = [];

  gachaList: ColorExtendsRarity[] = [];

  displayCardList: ColorExtendsRarity[] = [];

  hadColorList: Color[] = [];
  // #endregion

  // #region MUTATION
  @Mutation
  public SET_COLOR_LIST(list: Color[]) {
    this.colorList = list;
  }

  @Mutation
  public SET_GACHA_LIST(list: ColorExtendsRarity[]) {
    this.gachaList = list;
  }

  @Mutation
  public SET_DISPLAY_CARD_LIST(list: ColorExtendsRarity[]) {
    this.displayCardList = list;
  }

  @Mutation
  public UNSHIFT_DISPLAY_CARD_LIST(item: ColorExtendsRarity) {
    this.displayCardList.unshift(item);
  }

  @Mutation
  public SET_HAS_COLOR_LIST(list: Color[]) {
    this.hadColorList = list;
  }

  // #endregion

  // #region ACTION
  @Action({ rawError: true })
  public async fetchColorList() {
    const doc = await firebase
      .firestore()
      .collection("gacha")
      .doc("master")
      .get();
    const colorList = doc.data()!.colorList;
    this.SET_COLOR_LIST(colorList);
  }

  @Action({ rawError: true })
  public async gacha() {
    const gachaList: Color[] = [];
    for (let i = 0; i < 10; i++) {
      const random = Math.floor(Math.random() * this.colorList.length);
      gachaList.push(this.colorList[random]);
    }
    const colorExtendsRarity: ColorExtendsRarity[] = gachaList.map(x => {
      const colors = raritySetting.find(r => r.rarity === x.rarity);
      return {
        ...x,
        backgroundColor: colors!.backgroundColor,
        borderColor: colors!.borderColor
      } as ColorExtendsRarity;
    });

    this.SET_GACHA_LIST(colorExtendsRarity);

    let intervalId: any;
    intervalId = setInterval(() => {
      const color = colorExtendsRarity.shift();
      if (color === undefined) clearInterval(intervalId);
      gacha.UNSHIFT_DISPLAY_CARD_LIST(color!);
    }, 500);
  }

  @Action({ rawError: true })
  public async onSnapshot() {
    await firebase
      .firestore()
      .collection("users")
      .doc(user.GET_UID)
      .onSnapshot(doc => {
        console.log(doc.data());
        this.SET_HAS_COLOR_LIST(doc.data()!.colorList);
      });
  }

  @Action({ rawError: true })
  public async reset() {
    await firebase
      .firestore()
      .collection("users")
      .doc(user.GET_UID)
      .set({ colorList: [] });
  }
}
export const gacha = getModule(Gacha);
