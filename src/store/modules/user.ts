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
import { login } from "@/store/index";

@Module({ dynamic: true, store, name: "user", namespaced: true })
class User extends VuexModule {
  // #region STATE
  uid: string | undefined = undefined;

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
    // eslint-disable-next-line no-console
    console.log(gachaList);

    const dbRef = firebase
      .firestore()
      .collection("users")
      .doc(login.uid);

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
      .doc(login.uid);

    // Firebaseの仕様上まとめられない
  }

  @Action({ rawError: true })
  public getLocalStorageUid() {
    const uid = localStorage.getItem("uid");
    if (uid !== null) this.uid = uid;
    else this.uid = undefined;
  }

  // #endregion
}
export const user = getModule(User);
