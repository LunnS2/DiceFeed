import { MongoClient, GridFSBucket, ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { id } = req.query;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid image ID" });
  }

  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db(process.env.DB_NAME); 
    const bucket = new GridFSBucket(db, { bucketName: "images" });

    const downloadStream = bucket.openDownloadStream(new ObjectId(id));

    downloadStream.on("error", () => {
      return res.status(404).json({ success: false, message: "Image not found" });
    });

    downloadStream.on("file", (file) => {
      const contentType = file.contentType || "application/octet-stream"; 
      res.setHeader("Content-Type", contentType);
    });

    downloadStream.pipe(res);
  } catch (error) {
    console.error("Failed to retrieve image", error);
    res.status(500).json({ success: false, message: "Failed to retrieve image" });
  }
}



