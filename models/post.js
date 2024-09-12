import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  media: {
    type: Schema.Types.ObjectId,
    ref: "images.files",
  }
}, { timestamps: true });

const Post = models.Post || model('Post', PostSchema);
export default Post;

