// my-next-app\app\api\images\[id]\route.js

import { MongoClient, GridFSBucket, ObjectId } from "mongodb";

export async function GET(req, { params }) {
  const { id } = params;

  if (!ObjectId.isValid(id)) {
    return new Response(
      JSON.stringify({ success: false, message: "Invalid image ID" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const bucket = new GridFSBucket(db, { bucketName: "images" });

    const downloadStream = bucket.openDownloadStream(new ObjectId(id));

    let chunks = [];
    downloadStream.on("data", (chunk) => {
      chunks.push(chunk);
    });

    downloadStream.on("error", (error) => {
      console.error("Error downloading image:", error);
      return new Response(
        JSON.stringify({ success: false, message: "Image not found" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    });

    const contentTypePromise = new Promise((resolve, reject) => {
      downloadStream.on("file", (file) => {
        const contentType = file.contentType || "application/octet-stream";
        resolve(contentType);
      });
    });

    return new Promise((resolve, reject) => {
      downloadStream.on("end", async () => {
        const buffer = Buffer.concat(chunks);
        const contentType = await contentTypePromise;

        resolve(
          new Response(buffer, {
            status: 200,
            headers: {
              "Content-Type": contentType,
            },
          })
        );
      });
    });
  } catch (error) {
    console.error("Failed to retrieve image:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to retrieve image" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
