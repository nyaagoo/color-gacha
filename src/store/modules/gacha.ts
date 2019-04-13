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
import { login } from "@/store/index";

import { Color } from "@/model/color.ts";

import axios, { AxiosRequestConfig } from "axios";
import firebase from "firebase";

@Module({ dynamic: true, store, name: "gacha", namespaced: true })
class Gacha extends VuexModule {
  // #region STATE
  colorList: Color[] = [];

  gachaList: Color[] = [];

  hadColorList: number[] = [];
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
  public SET_HAS_COLOR_LIST(list: number[]) {
    this.hadColorList = list;
  }

  // #endregion

  // #region ACTION
  @Action({ rawError: true })
  public async fetchColorList() {
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    };
    console.log("Helloaaaaaaaaaaa");
    const res = await axios.get(
      "https://us-central1-color-gacha.cloudfunctions.net/app/gacha",
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      }
    );

    console.log(res.data);

    const colorList: Color[] = res.data.map((x: Color) => ({ ...x } as Color));

    this.SET_COLOR_LIST(colorList);
    this.SET_GACHA_LIST(colorList);
    /*
    firebase
      .firestore()
      .collection("colors")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          colorList.push({
            id: doc.data().id,
            name: doc.data().name,
            code: doc.data().code
          });
        });
      });
    this.SET_COLOR_LIST(colorList);

    let hasColorList: number[] = [];
    firebase
      .firestore()
      .collection("users")
      .doc(login.uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      });
      */
  }

  @Action({ rawError: true })
  public async gacha() {
    if (!login.uid) {
      alert("ログイン失敗");
      return;
    }
    const res = await axios.get(
      "https://us-central1-color-gacha.cloudfunctions.net/app/gacha",
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      }
    );
    /*
    const gachaList: Color[] = [];
    for (let i = 0; i < 10; i++) {
      const random = Math.floor(Math.random() * 11);
      gachaList.push(this.colorList[random]);
    }
    this.SET_GACHA_LIST(gachaList);

    const db = firebase.firestore();
    db.collection("users")
      .doc(login.uid)
      .set({
        hasColor: gachaList.map(x => x.id)
      });
      */
    /*
    const db = firebase.firestore();
    for (let i = 0; i < 10; i++) {
      const id = gachaList[i].id.toString();
      db.collection("users")
        .doc(login.uid)
        .collection("has-color")
        .doc(id)
        .set({
          "has-color": true
        });
    }
    */
  }
  // #endregion
}
export const gacha = getModule(Gacha);
