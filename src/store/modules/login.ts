import {
  Mutation,
  Action,
  VuexModule,
  getModule,
  Module
} from "vuex-module-decorators";
import store from "@/store/store";
import firebase from "firebase";
import router from "@/router";
import { user } from "@/store/index";

@Module({ dynamic: true, store, name: "login", namespaced: true })
class Login extends VuexModule {
  // #region STATE
  // #endregion

  // #region MUTATION
  // #endregion

  // #region ACTION
  @Action({ rawError: true })
  public async loginAnonymously() {
    firebase.auth().onAuthStateChanged(userData => {
      user.SET_UID(userData!.uid);
      localStorage.setItem("uid", userData!.uid);
    });
    try {
      await firebase
        .auth()
        .signInAnonymously()
        .catch(function(error) {
          // eslint-disable-next-line no-console
          console.log(error.code);
          // eslint-disable-next-line no-console
          console.log(error.message);
          alert("匿名ログインに失敗しました");
        });
      router.push("/gacha");
    } catch (error) {
      alert("loginに失敗しました。");
    }
  }
  @Action({ rawError: true })
  public async loginGoogle() {
    firebase.auth().onAuthStateChanged(userData => {
      user.SET_UID(userData!.uid);
      localStorage.setItem("uid", userData!.uid);
    });
    try {
      await firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider());
      router.push("/gacha");
    } catch (error) {
      alert("loginに失敗しました。");
    }
  }

  @Action({ rawError: true })
  public async alreadyLogin() {
    router.push("/gacha");
    user.SET_UID(user.GET_UID);
  }

  @Action({ rawError: true })
  public async logout() {
    try {
      await firebase.auth().signOut();
      localStorage.clear();
      router.push("/");
    } catch (error) {
      alert("logoutに失敗しました。");
    }
  }
  // #endregion
}
export const login = getModule(Login);
