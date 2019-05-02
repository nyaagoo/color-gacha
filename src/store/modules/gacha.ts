/* eslint-disable no-console */
import {
  Mutation,
  Action,
  VuexModule,
  getModule,
  Module
} from "vuex-module-decorators";
import store from "@/store/store";
import { login, user } from "@/store/index";
import { Color, ColorExtendsRarity } from "@/model/color";
import { raritySetting } from "@/model/static";
import firebase from "firebase";
import { TweenMax, TimelineMax } from "gsap";

@Module({ dynamic: true, store, name: "gacha", namespaced: true })
class Gacha extends VuexModule {
  // #region STATE
  colorList: Color[] = [];

  gachaList: ColorExtendsRarity[] = [];

  displayCardList: ColorExtendsRarity[] = [];

  hadColorList: Color[] = [];

  animationPulse: any = undefined;
  // #endregion

  // #region MUTATION
  @Mutation
  public SET_COLOR_LIST(list: Color[]) {
    this.colorList = list;
  }

  @Mutation
  public SET_GACHA_LIST(list: ColorExtendsRarity[]) {
    this.gachaList = list;
  }

  @Mutation
  public SET_DISPLAY_CARD_LIST(list: ColorExtendsRarity[]) {
    this.displayCardList = list;
  }

  @Mutation
  public UNSHIFT_DISPLAY_CARD_LIST(item: ColorExtendsRarity) {
    this.displayCardList.unshift(item);
  }

  @Mutation
  public SET_HAS_COLOR_LIST(list: Color[]) {
    this.hadColorList = list;
  }

  @Mutation
  public SET_ANIMATION_PULSE(item: any) {
    this.animationPulse = item;
  }

  // #endregion

  // #region ACTION
  @Action({ rawError: true })
  public async fetchColorList() {
    const doc = await firebase
      .firestore()
      .collection("gacha")
      .doc("master")
      .get();
    const colorList = doc.data()!.colorList;
    this.SET_COLOR_LIST(colorList);
  }

  @Action({ rawError: true })
  public async gacha() {
    const gachaList: Color[] = [];
    for (let i = 0; i < 10; i++) {
      const random = Math.floor(Math.random() * this.colorList.length);
      gachaList.push(this.colorList[random]);
    }
    const colorExtendsRarity: ColorExtendsRarity[] = gachaList.map(x => {
      const colors = raritySetting.find(r => r.rarity === x.rarity);
      return {
        ...x,
        backgroundColor: colors!.backgroundColor,
        borderColor: colors!.borderColor
      } as ColorExtendsRarity;
    });

    this.SET_GACHA_LIST(colorExtendsRarity);
    let intervalId: any;
    intervalId = setInterval(async () => {
      const color = colorExtendsRarity.shift();
      if (color === undefined) {
        clearInterval(intervalId);
        await this.animationRarity();
        window.addEventListener("click", this.animationTurnOver, true);
        return;
      }
      gacha.UNSHIFT_DISPLAY_CARD_LIST(color!);
    }, 500);
  }

  @Action({ rawError: true })
  public async animationRarity() {
    this.displayCardList.forEach(async (item, index) => {
      if (item.rarity > 2) {
        const pluse = TweenMax.fromTo(
          `.color-box${index}`,
          1.5,
          {
            boxShadow: `0 0 0 0px ${await this.hexToRgbA({
              hex: `${item.borderColor}`,
              alpha: "0.7"
            })}`
          },
          {
            boxShadow: `0 0 0 20px ${await this.hexToRgbA({
              hex: `${item.borderColor}`,
              alpha: "0"
            })}`,
            repeat: -1
          }
        );
        this.SET_ANIMATION_PULSE(pluse);
      }
    });
  }

  @Action({ rawError: true })
  public async animationTurnOver() {
    window.removeEventListener("click", this.animationTurnOver, true);
    const timeLine = new TimelineMax();
    gacha.animationKill();

    this.displayCardList.forEach((card, index) => {
      timeLine
        .to(`.color-box${index}`, 0.4, {
          rotationY: "180deg",
          backgroundColor: card.code,
          backgroundImage: "none",
          borderColor: "none",
          scale: 1.2
        })
        .to(`.color-box${index}`, 0.2, {
          scale: 1.0
        });
    });
  }

  @Action({ rawError: true })
  public async animationKill() {
    TweenMax.killAll(true, true, false, false);
  }

  @Action({ rawError: true })
  public async hexToRgbA(data: { hex: string; alpha: string }) {
    let c: any;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(data.hex)) {
      c = data.hex.substring(1).split("");
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = "0x" + c.join("");
      return (
        "rgba(" +
        [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
        `,${data.alpha})`
      );
    }
    throw new Error("Bad Hex");
  }

  @Action({ rawError: true })
  public async onSnapshot() {
    await firebase
      .firestore()
      .collection("users")
      .doc(user.GET_UID)
      .onSnapshot(doc => {
        console.log(doc.data());
        this.SET_HAS_COLOR_LIST(doc.data()!.colorList);
      });
  }

  @Action({ rawError: true })
  public async reset() {
    await firebase
      .firestore()
      .collection("users")
      .doc(user.GET_UID)
      .set({ colorList: [] });
  }
}
export const gacha = getModule(Gacha);
