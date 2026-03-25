import {
  getItemByTitle,
  saveItemService,
  getItemsService,
} from "./items.service.js";

export const saveItemController = async (req, res, next) => {
  try {
    const {
      url,
      title,
      description,
      tags,
      collections,
      type,
      content,
      position,
      tagName,
    } = req.body;

    // Determine if it's text or media based on content or tagName
    let itemType = type || "text";
    if (!type) {
      if (tagName === "IMG" || tagName === "VIDEO" || tagName === "AUDIO" || (content && content.startsWith("http"))) {
        itemType = "media";
      }
    }

    // Don't error out on existing elements that don't have titles, unless title is explicitly provided
    if (title) {
      const existing = await getItemByTitle(title);
      if (existing) {
        return res.status(400).json({ message: "Item already exists" });
      }
    }

    const itemPayload = {
      url,
      title: title || (content ? content.substring(0, 50) + "..." : "Saved Element"),
      content,
      description,
      tags,
      collections,
      type: itemType,
    };

    if (position || tagName) {
      itemPayload.elementData = { position, tagName };
    }

    if (req.user && req.user.id) {
      itemPayload.user = req.user.id;
    }

    const item = await saveItemService(itemPayload);

    return res.status(200).json({ message: "Item saved successfully", item });
  } catch (error) {
    console.error("Error in saveItemController:", error);
    next(error);
  }
};

export const getItemsController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const items = await getItemsService(userId);
    return res
      .status(200)
      .json({ message: "Items fetched successfully", items });
  } catch (error) {
    console.error("Error in getItemsController:", error);
    next(error);
  }
};
