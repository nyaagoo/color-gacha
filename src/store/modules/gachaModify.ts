import {
  Mutation,
  MutationAction,
  Action,
  VuexModule,
  getModule,
  Module
} from "vuex-module-decorators";
import store from "@/store/store";
import firebase from "firebase";
import { Gacha, Color } from "@/model/color";

@Module({ dynamic: true, store, name: "gachaModify", namespaced: true })
class GachaModify extends VuexModule {
  // #region STATE
  counter: number = 0;
  gachaMasterData: Gacha = {} as Gacha;

  // #endregion

  // #region MUTATION
  @Mutation // counter
  public SET_COUNTER(num: number) {
    this.counter = num;
  }

  @Mutation // counter
  public SET_GACHA_MASTER_DATA(data: Gacha) {
    this.gachaMasterData = data;
  }

  // #endregion

  // #region ACTION
  @Action({ rawError: true })
  public async fetchGachaData() {
    const gachaName = "master";
    const doc = await firebase
      .firestore()
      .collection("gacha")
      .doc(gachaName)
      .get();
    const gachaMasterData: Gacha = {
      id: doc.data()!.id,
      name: doc.data()!.name,
      displayName: doc.data()!.displayName,
      discription: doc.data()!.discription,
      colorList: doc.data()!.colorList
    };
    this.SET_GACHA_MASTER_DATA(gachaMasterData);
  }

  @Action({ rawError: true })
  public async UpdateColorList(colorList: Color[]) {
    const gachaName = "master";
    const color: Color[] = colorList.map(color => ({
      ...color,
      id: Number(color.id),
      idRoot: Number(color.idRoot),
      purchasability: Number(color.purchasability),
      rarity: Number(color.rarity)
    }));

    const doc = await firebase
      .firestore()
      .collection("gacha")
      .doc(gachaName)
      .set({ ...this.gachaMasterData, colorList: color });
  }
  // #endregion
}
export const gachaModify = getModule(GachaModify);
