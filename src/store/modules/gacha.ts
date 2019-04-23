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
import { Color } from "@/model/color.ts";
import firebase from "firebase";

@Module({ dynamic: true, store, name: "gacha", namespaced: true })
class Gacha extends VuexModule {
  // #region STATE
  colorList: Color[] = [];

  gachaList: Color[] = [];

  hadColorList: Color[] = [];
  // #endregion

  // #region MUTATION
  @Mutation
  public SET_COLOR_LIST(list: Color[]) {
    this.colorList = list;
  }

  @Mutation
  public SET_GACHA_LIST(list: Color[]) {
    this.gachaList = list;
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
    if (!user.GET_UID) {
      alert("ログイン失敗");
      return;
    }
    const gachaList: Color[] = [];
    for (let i = 0; i < 10; i++) {
      const random = Math.floor(Math.random() * this.colorList.length);
      gachaList.push(this.colorList[random]);
    }
    this.SET_GACHA_LIST(gachaList);
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
