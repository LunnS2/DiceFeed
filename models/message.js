import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Sender is required."],
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Receiver is required."],
  },
  content: {
    type: String,
    required: [true, "Message content is required."],
  },
  media: {
    type: {
      type: String,
      enum: ["image", "video", "gif", "audio"],
    },
    url: {
      type: String,
    },
  },
  read: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

// Index for quick retrieval of messages between two users
MessageSchema.index({ senderId: 1, receiverId: 1, createdAt: -1 });

const Message = models.Message || model("Message", MessageSchema);

export default Message;