import Item from "./Item.model.js";

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
