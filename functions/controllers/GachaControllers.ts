/* eslint-disable no-console */
import * as cors from "cors";
import { Request, Response } from "express";
import * as admin from "firebase-admin";
import { Color, Gacha } from "../models/ColorModel";
const corsHandler = cors({ origin: true });

var serviceAccount = require("../dev/color-gacha-firebase-adminsdk-sy9f7-80bc62164e.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://color-gacha.firebaseio.com"
});

/**
 * [POST]
 */
export async function SetGachaMasterData(req: Request, res: Response) {
  corsHandler(req, res, () => {});

  console.log(req.body.colorList);
  console.log(req.body.name);

  const colorList: Color[] = req.body.colorList;
  const name: string = req.body.name;
  const id: number = req.body.id;
  const displayName: string = req.body.displayName;
  const discription: string = req.body.discription;

  await admin
    .firestore()
    .collection("gacha")
    .doc(name)
    .set({
      id: id,
      name: name,
      displayName: displayName,
      discription: discription,
      colorList: colorList
    });
  res.status(200);
}

export async function RollGacha(req: Request, res: Response) {
  corsHandler(req, res, () => {});

  const masterGacha = await admin
    .firestore()
    .collection("gacha")
    .doc("master")
    .get();

  const gacha: Gacha = {
    id: masterGacha.data()!.id,
    name: masterGacha.data()!.name,
    displayName: masterGacha.data()!.displayName,
    discription: masterGacha.data()!.discription,
    colorList: masterGacha.data()!.colorList
  };
  res.send(gacha);
}
