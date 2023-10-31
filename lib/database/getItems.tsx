import clientPromise from "../mongodb";
export default async function getItems(query: Array<string>) {
  try {
    let client = await clientPromise;

    const db = client.db("commerce");

    const collection = db.collection("items");

    if (query.length == 1 && query[0] == "all") {
      let result = await collection.find().toArray();
      return result;
    } else {
      // let fin = []
      // for(let x = 0 ; x<query.length ; x++){
      //     fin.push({"category" : query[x]});
      // }
      let result = await collection
        .find({ category: { $in: query } })
        .toArray();
      return result;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
}
