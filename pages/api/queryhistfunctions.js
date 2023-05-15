import { Polybase } from "@polybase/client";
// import { Auth } from '@polybase/auth';
import { ethPersonalSign } from '@polybase/eth'
import { ethers } from "ethers";

// const auth = new Auth();
const db = new Polybase({
  defaultNamespace: process.env.NEXT_PUBLIC_POLYBASE_NAME_SPACE ?? '',
});

// db.signer((data) => {
//   return {
//     h: 'eth-personal-sign',
//     sig: ethPersonalSign(wallet.privateKey(), data)
//   }
// })

export default async function handler(req, res) {
  const collectionReference = db.collection("Function");
  const myFunctions = await collectionReference.where()
  
  const method = req.method;
  // const id = req.query.id;

  switch(method) {
    case 'GET':
      // result = await 
      break;
    case 'POST':
      const filename = req.body.split("filename=\"")[1].split("\"")[0].trim();
      const source = req.body.split("text/javascript")[1].split("------WebKit")[0].trim();
      const account = req.body.split("name=\"account\"")[1].split("------WebKit")[0].trim();
      const id = ethers.utils.id(source+account);
      const uploadTime = new Date();
      const recordData = await collectionReference.create([
        id, 
        filename,
        account, 
        source,
        uploadTime
      ]);
      console.log({recordData})
      res.status(200).json({ filename: "test.json" });
      return id;
    case 'DELETE':
      break;
    case 'PUT':
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
