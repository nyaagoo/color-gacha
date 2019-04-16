import * as functions from "firebase-functions";
import * as express from "express";
import * as admin from "firebase-admin";
import { Request, Response, NextFunction } from "express";

var serviceAccount = require("../dev/color-gacha-firebase-adminsdk-sy9f7-80bc62164e.json");

import * as cors from "cors";
const corsHandler = cors({ origin: true });

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://color-gacha.firebaseio.com"
});
// import * as cors from "cors";

exports.sample = functions.https.onRequest((req, res) => {
  corsHandler(req, res, () => {
    res.send("Passed.");
  });
});

const app = express();

app.get("/users", validate, aa);
app.get("/users/b", aa);

app.get("/gacha", Gacha);
export function validate(req: Request, res: Response, next: NextFunction) {
  next();
}
export async function Gacha(req: Request, res: Response) {
  corsHandler(req, res, () => {});
  const colorList: Color[] = [];
  await admin
    .firestore()
    .collection("colors")
    .get()
    .then(async querySnapshot => {
      await querySnapshot.forEach(async doc => {
        // doc.data() is never undefined for query doc snapshots
        await colorList.push({
          id: doc.data().id,
          name: doc.data().name,
          code: doc.data().code
        });
      });
    });

  const gachaList: Color[] = [];
  for (let i = 0; i < 10; i++) {
    const random = Math.floor(Math.random() * colorList.length + 1);
    gachaList.push(colorList[random]);
  }

  res.send(gachaList);
}

export interface Color {
  id: number;
  name: string;
  code: string;
}

export async function aa(req: Request, res: Response) {
  corsHandler(req, res, () => {
    const users = [{ id: 1, name: "hfuasdhiufas" }];
    // データを返却
    res.send(JSON.stringify(users));
  });
}

app.get("/users/a", [], (req: Request, res: Response) => {
  const users = [{ id: 1, name: "fdsadsdf" }];

  res.header("Access-Control-Allow-Origin", "*");
  res.send(JSON.stringify(users));
});

exports.app = functions.https.onRequest(app);
