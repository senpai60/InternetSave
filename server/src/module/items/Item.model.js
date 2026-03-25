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
    // Added "text" and "media" to support new extension extractions
    type: {
      type: String,
      enum: [
        "article",
        "youtube",
        "image",
        "pdf",
        "tweet",
        "note",
        "text",
        "media",
        "element",
        "other",
      ],
      index: true,
    },
    content: {
      type: String,
      required: true,
    },

    // 🔹 NEW: Dedicated structure for Extension Element saves
    elementData: {
      position: {
        top: Number,
        left: Number,
        width: Number,
        height: Number,
        absoluteTop: Number,
        absoluteLeft: Number,
      },
      tagName: String, // e.g., 'DIV', 'A', 'P'
    },

    // Content / metadata (AI friendly)
    description: {
      type: String,
      trim: true,
    },
    sourceMeta: {
      domain: String,
      author: String,
      durationSeconds: Number,
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
      embeddingId: String,
      lastProcessedAt: Date,
    },

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

// Simple text index for search
itemSchema.index({
  title: "text",
  description: "text",
  content: "text",
});

const Item = mongoose.model("Item", itemSchema);
export default Item;
