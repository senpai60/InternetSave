import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },

    title: {
      type: String,
      trim: true,
      required: true,
    },
    url: {
      type: String,
      trim: true,
      required: true,
    },
    // article | youtube | image | pdf | tweet | note | other
    type: {
      type: String,
      enum: ["article", "youtube", "image", "pdf", "tweet", "note", "other"],
      required: true,
      index: true,
    },

    // Content / metadata (AI friendly)
    description: {
      type: String,
      trim: true,
    },
    sourceMeta: {
      // extra data per type
      domain: String, // e.g. medium.com, youtube.com
      author: String,
      durationSeconds: Number, // for youtube
      thumbnailUrl: String,
    },

    // Tags + collections
    tags: {
      type: [String],
      index: true,
      default: [],
    },
    collections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection",
      },
    ],

    // For highlights / notes on saved item
    highlights: [
      {
        text: String,
        note: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // resurfacing
    ai: {
      summary: String,
      autoTags: [String],
      // store embedding id / vector ref, not full array in Mongo
      embeddingId: String,
      lastProcessedAt: Date,
    },

    // For resurfacing & stats
    lastAccessedAt: {
      type: Date,
      index: true,
    },
    openCount: {
      type: Number,
      default: 0,
    },

    isArchived: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true },
);

// Simple text index for search (MVP)
itemSchema.index({ title: "text", description: "text", tags: 1 });

const Item = mongoose.model("Item", itemSchema);
export default Item;
