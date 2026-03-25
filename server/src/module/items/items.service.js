import Item from "./Item.model.js";
import geminiEmbeddingService from "./gemini.service.js";
import PineConeService from "./pincone.service.js";

// Dummy embedding generator placeholder.
// Note: Requires a real embedding provider like OpenAI to return a 1536-dimensional float array.
const generateEmbedding = async (text) => {
  // return Array(1536).fill(0).map(() => Math.random() * 2 - 1); // Mock 1536 dimensions
  return new Array(1536).fill(0);
};

export const getItemByTitle = async (title) => {
  try {
    const item = await Item.findOne({ title });
    return item;
  } catch (error) {
    throw error;
  }
};

export const saveItemService = async (itemData) => {
  try {
    const item = new Item(itemData);
    await item.save();

    // ─── Pinecone Vector DB Hooks ───
    try {
      const vectorId = item._id.toString();
      // Only embed the text content, skip extremely long base64 / pure binary medias if text falls back
      const textToEmbed = `Title: ${item.title} \n Content: ${
        item.content ? item.content.substring(0, 1000) : ""
      }`;

      // 1. Generate Embedding
      const vector = await geminiEmbeddingService(textToEmbed);
      console.log("Vectors going to Pinecone:", vector);

      // 2. Insert mapped payload to Pinecone
      const pineconeIndex = PineConeService.index("gemini-dense-3072-js");
      await pineconeIndex.upsert({
        records: [
          {
            id: vectorId,
            values: vector,
            metadata: {
              title: item.title,
              url: item.url,
              type: item.type || "unknown",
              userId: item.user ? item.user.toString() : "anonymous",
            },
          },
        ],
      });

      // 3. Connect Pinecone relationship to MongoDB Item
      item.ai = {
        ...item.ai,
        embeddingId: vectorId,
        lastProcessedAt: new Date(),
      };
      await item.save();
    } catch (pineconeError) {
      console.error("Vector DB Insertion Error: ", pineconeError);
    }

    return item;
  } catch (error) {
    throw error;
  }
};

export const getItemsService = async (userId) => {
  try {
    const items = await Item.find({ user: userId }).sort({ createdAt: -1 });
    return items;
  } catch (error) {
    throw error;
  }
};
