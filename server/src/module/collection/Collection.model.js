const collectionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    color: String, // optional UI ke liye
    icon: String, // optional
    isPinned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

collectionSchema.index({ user: 1, name: 1 }, { unique: true });

const Collection = mongoose.model("Collection", collectionSchema);
export default Collection;
