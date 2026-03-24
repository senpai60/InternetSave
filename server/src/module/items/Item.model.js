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
    // Added "element" to support your specific extension saves
    type: {
      type: String,
      enum: [
        "article",
        "youtube",
        "image",
        "pdf",
        "tweet",
        "note",
        "element",
        "other",
      ],
      index: true,
    },

    // 🔹 NEW: Dedicated structure for Extension Element saves
    elementData: {
      viewport: {
        width: Number,
        height: Number,
      },
      position: {
        top: Number,
        left: Number,
        width: Number,
        height: Number,
        absoluteTop: Number,
        absoluteLeft: Number,
      },
      responsivePosition: {
        leftVW: String,
        topVH: String,
        widthVW: String,
        heightVH: String,
        absoluteLeftPercent: String,
        absoluteTopPercent: String,
      },
      content: String, // The actual text extracted
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
  "elementData.content": "text",
});

const Item = mongoose.model("Item", itemSchema);
export default Item;
