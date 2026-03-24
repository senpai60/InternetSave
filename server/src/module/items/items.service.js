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
