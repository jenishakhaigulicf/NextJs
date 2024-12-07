import sql from "better-sqlite3";

const db = sql("meals.db");

export const getMeals = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // throw new Error("Something went wrong");
  return db.prepare("SELECT * FROM meals").all();
};

export const getMeal = async (slug) => {
  return await db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
};
