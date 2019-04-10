/* eslint-disable no-console */
import {
  Mutation,
  MutationAction,
  Action,
  VuexModule,
  getModule,
  Module
} from "vuex-module-decorators";
import store from "@/store/store";

import { Color } from "@/model/color.ts";
import firebase from "firebase";

@Module({ dynamic: true, store, name: "gacha", namespaced: true })
class Gacha extends VuexModule {
  // #region STATE
  colorList: Color[] = [];

  // #endregion

  // #region MUTATION
  @Mutation
  public SET_COLOR_LIST(list: Color[]) {
    this.colorList = list;
  }

  // #endregion

  // #region ACTION
  @Action({ rawError: true })
  public fetchColorList() {
    this.SET_COLOR_LIST([]);
  }
  // #endregion
}
export const gacha = getModule(Gacha);
