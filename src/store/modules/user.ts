import {
  Mutation,
  Action,
  VuexModule,
  getModule,
  Module
} from "vuex-module-decorators";
import store from "@/store/store";
import firebase, { firestore } from "firebase";
import { Color } from "@/model/color";
import { login } from "@/store/index";
import router from "@/router";

@Module({ dynamic: true, store, name: "user", namespaced: true })
class User extends VuexModule {
  // #region STATE
  private uid: string | undefined = undefined;

  // Getterを作るメリット：データを加工して渡す事ができる
  // デメリット:getterを書くのが面倒くさい
  get GET_UID() {
    return this.uid;
  }
  // #endregion

  // #region MUTATION
  @Mutation // counter
  public SET_UID(uid: string | undefined) {
    this.uid = uid;
  }

  // #endregion

  // #region ACTION
  @Action({ rawError: true })
  public async ReadLocalStorageUID() {
    const uid = localStorage.getItem("uid");
    if (uid === null) {
      this.SET_UID(undefined);
    }
    this.SET_UID(uid!);
  }

  @Action({ rawError: true })
  public async insertUserGacha(gachaList: Color[]) {
    const dbRef = firebase
      .firestore()
      .collection("users")
      .doc(user.uid);
    await dbRef.get().then(async docSnapshot => {
      if (docSnapshot.exists) {
        await dbRef.update({
          colorList: firestore.FieldValue.arrayUnion(
            gachaList[0],
            gachaList[1],
            gachaList[2],
            gachaList[3],
            gachaList[4],
            gachaList[5],
            gachaList[6],
            gachaList[7],
            gachaList[8],
            gachaList[9]
          )
        });
      } else {
        await dbRef.set({
          colorList: firestore.FieldValue.arrayUnion(
            gachaList[0],
            gachaList[1],
            gachaList[2],
            gachaList[3],
            gachaList[4],
            gachaList[5],
            gachaList[6],
            gachaList[7],
            gachaList[8],
            gachaList[9]
          )
        });
      }
    });

    await firebase
      .firestore()
      .collection("users")
      .doc(user.uid);

    // Firebaseの仕様上まとめられない
  }
  // #endregion
}
export const user = getModule(User);
