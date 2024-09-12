import { MongoClient, GridFSBucket, ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db(process.env.DB_NAME); 

    const bucket = new GridFSBucket(db, { bucketName: "images" });

    const downloadStream = bucket.openDownloadStream(ObjectId(id));

    res.setHeader("Content-Type", "image/jpeg");
    downloadStream.pipe(res);

    downloadStream.on("error", () => {
      res.status(404).json({ success: false, message: "Image not found" });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to retrieve image" });
  }
}


