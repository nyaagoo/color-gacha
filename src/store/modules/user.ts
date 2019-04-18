import {
  Mutation,
  MutationAction,
  Action,
  VuexModule,
  getModule,
  Module
} from "vuex-module-decorators";
import store from "@/store/store";
import firebase, { firestore } from "firebase";
import { Color } from "@/model/color";

@Module({ dynamic: true, store, name: "user", namespaced: true })
class User extends VuexModule {
  // #region STATE
  uid: string = "";

  // #endregion

  // #region MUTATION
  @Mutation // counter
  public SET_UID(uid: string) {
    this.uid = uid;
  }

  // #endregion

  // #region ACTION
  @Action({ rawError: true })
  public async insertUserGacha(gachaList: Color[]) {
    await firebase
      .firestore()
      .collection("users")
      .doc(this.uid)
      .update({
        colorList: firestore.FieldValue.arrayUnion(gachaList[0], gachaList[1])
      });
  }

  // #endregion
}
export const user = getModule(User);
