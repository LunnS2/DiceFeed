import { Schema, model, models } from "mongoose";

const FriendshipSchema = new Schema({
  user1Id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User 1 is required."],
  },
  user2Id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User 2 is required."],
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "declined"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

FriendshipSchema.index({ user1Id: 1, user2Id: 1 }, { unique: true });

const Friendship = models.Friendship || model("Friendship", FriendshipSchema);

export default Friendship;