import {
  Mutation,
  Action,
  VuexModule,
  getModule,
  Module
} from "vuex-module-decorators";
import store from "@/store/store";
import { dialog } from "@/store/index";
import { ColorExtendsRarity } from "@/model/color";

@Module({ dynamic: true, store, name: "colorDetail", namespaced: true })
class ColorDetail extends VuexModule {
  // #region STATE
  color: ColorExtendsRarity = {} as ColorExtendsRarity;

  // #endregion

  // #region MUTATION
  @Mutation // counter
  public SET_COLOR(hex: ColorExtendsRarity) {
    this.color = hex;
  }

  // #endregion

  // #region ACTION
  @Action({ rawError: true })
  public OpenDialog(color: ColorExtendsRarity) {
    this.SET_COLOR(color);
    dialog.SET_IS_VISIBLE_COLOR_DETAIL(true);
  }
  // #endregion
}
export const colorDetail = getModule(ColorDetail);
