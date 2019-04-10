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

@Module({ dynamic: true, store, name: "login", namespaced: true })
class Login extends VuexModule {
  // #region STATE
  user: firebase.User | undefined = undefined;
  uid: string = "";

  // #endregion

  // #region MUTATION
  @Mutation // counter
  public SET_USER(user: firebase.User | undefined) {
    this.user = user;
  }
  @Mutation // counter
  public SET_UID(uid: string) {
    this.uid = uid;
  }

  // #endregion

  // #region ACTION
  @Action({ rawError: true })
  public login() {
    firebase
      .auth()
      .signInAnonymously()
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }

  @Action({ rawError: true })
  public async loginAnonymously() {
    firebase.auth().onAuthStateChanged(user => {
      this.SET_UID(user!.uid);
      // eslint-disable-next-line no-console
      console.log(user!.uid);
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
  public async logout() {
    try {
      await firebase.auth().signOut();
      router.push("/");
    } catch (error) {
      alert("logoutに失敗しました。");
    }
  }
  // #endregion
}
export const login = getModule(Login);
