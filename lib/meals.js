import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export const getMeals = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // throw new Error("Something went wrong");
  return db.prepare("SELECT * FROM meals").all();
};

export const getMeal = async (slug) => {
  return await db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
};

export function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  // using xss because we have used dangerously set html
  meal.instructions = xss(meal.instructions);
}
