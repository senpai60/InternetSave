import { getItemByTitle, saveItemService } from "./items.service.js";

export const saveItemController = async (req, res, next) => {
  try {
    const { url, title, description, tags, collections, type, content, position, tagName } = req.body;

    // The extension sends 'content' and 'position' instead of 'title' for element saves
    const itemTitle = title || (content ? content.substring(0, 50) + "..." : "Saved Element");
    const itemType = type || (content ? "element" : "other");

    // Don't error out on existing elements that don't have titles, unless title is explicitly provided
    if (title) {
      const existing = await getItemByTitle(title);
      if (existing) {
        return res.status(400).json({ message: "Item already exists" });
      }
    }

    const itemPayload = {
      url,
      title: itemTitle,
      description,
      tags,
      collections,
      type: itemType,
    };

    if (content || position || tagName) {
      itemPayload.elementData = { content, position, tagName };
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
