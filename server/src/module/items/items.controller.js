import { getItemByTitle, saveItemService } from "./items.service.js";
export const saveItemController = async (req, res, next) => {
  try {
    const { url, title, description, tags, collections, type } = req.body;

    const existing = await getItemByTitle(title);
    if (existing) {
      return res.status(400).json({ message: "Item already exists" });
    }

    const item = await saveItemService({
      url,
      title,
      description,
      tags,
      collections,
      type,
    });

    return res.status(200).json({ message: "Item saved successfully", item });
  } catch (error) {
    console.error("Error in saveItemController:", error);
    next(error);
  }
};
