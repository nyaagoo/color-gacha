import * as functions from "firebase-functions";
import * as express from "express";
import * as admin from "firebase-admin";
import { Request, Response, NextFunction } from "express";

var serviceAccount = require("../dev/color-gacha-firebase-adminsdk-sy9f7-80bc62164e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://color-gacha.firebaseio.com"
});
// import * as cors from "cors";

const app = express();

app.get("/users", validate, aa);
app.get("/users/b", aa);
app
  .route("/book")
  .get(function(req, res) {
    res.send("Get a random book");
  })
  .post(function(req, res) {
    res.send("Add a book");
  })
  .put(function(req, res) {
    res.send("Update the book");
  });

app.get("/gacha", validate, Gacha);
export function validate(req: Request, res: Response, next: NextFunction) {
  // eslint-disable-next-line no-console
  console.log("Validation");
  next();
}
export async function Gacha(req: Request, res: Response) {
  const colorList: Color[] = [];
  await admin
    .firestore()
    .collection("colors")
    .get()
    .then(async function(querySnapshot) {
      await querySnapshot.forEach(async function(doc) {
        // doc.data() is never undefined for query doc snapshots
        await colorList.push({
          id: doc.data().id,
          name: doc.data().name,
          code: doc.data().code
        });
      });
    });

  res.send(colorList);
}

export interface Color {
  id: number;
  name: string;
  code: string;
}

export async function aa(req: Request, res: Response) {
  const users = [{ id: 1, name: "sss" }];
  // データを返却
  res.send(JSON.stringify(users));
}

app.get("/users/a", [], (req: Request, res: Response) => {
  const users = [{ id: 1, name: "dfs" }];
  res.send(JSON.stringify(users));
});

exports.app = functions.https.onRequest(app);
