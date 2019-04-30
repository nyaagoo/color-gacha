import {
  Mutation,
  Action,
  VuexModule,
  getModule,
  Module
} from "vuex-module-decorators";
import store from "@/store/store";

@Module({ dynamic: true, store, name: "dialog", namespaced: true })
class Dialog extends VuexModule {
  // #region STATE
  isVisibleColorDetail: boolean = false;

  // #endregion

  // #region MUTATION
  @Mutation // counter
  public SET_IS_VISIBLE_COLOR_DETAIL(bool: boolean) {
    this.isVisibleColorDetail = bool;
  }

  // #endregion

  // #region ACTION
  @Action({ rawError: true })
  public OpenDialogColorDetail(color: string) {}
  // #endregion
}
export const dialog = getModule(Dialog);
