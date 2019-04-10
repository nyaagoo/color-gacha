import {
  Mutation,
  Action,
  VuexModule,
  getModule,
  Module
} from "vuex-module-decorators";
import store from "@/store/store";
import firebase from "firebase";

@Module({ dynamic: true, store, name: "login", namespaced: true })
class Login extends VuexModule {
  // #region STATE
  user: firebase.User | undefined = undefined;

  // #endregion

  // #region MUTATION
  @Mutation // counter
  public SET_USER(user: firebase.User | undefined) {
    this.user = user;
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
  public logout() {
    firebase.auth().signOut();
  }
  // #endregion
}
export const login = getModule(Login);
