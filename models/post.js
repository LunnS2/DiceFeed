import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Creator is required."],
  },
  title: {
    type: String,
    required: [true, "Title is required."],
    trim: true,
  },
  media: {
    type: {
      type: String,
      enum: ["image", "video", "gif", "audio"],
      required: [true, "Media type is required."],
    },
    url: {
      type: String,
      required: [true, "Media URL is required."],
    },
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  }
}, { timestamps: true });

const Post = models.Post || model("Post", PostSchema);

export default Post;
