import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

const db = sql("meals.db");

export const getMeals = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // throw new Error("Something went wrong");
  return db.prepare("SELECT * FROM meals").all();
};

export const getMeal = async (slug) => {
  return await db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
};

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  // using xss because we have used dangerously set html
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  // Saving image to public folder
  // creating a stream
  const stream = fs.createWriteStream(`public/images/${fileName}`);
  // creating buffer image
  const bufferedImage = await meal.image.arrayBuffer();
  // writing the stream with the bufferedImage
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed");
    }
  });

  meal.image = `/images/${fileName}`;
  db.prepare(
    `INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug) VALUES(@title, @summary, @instructions, @creator, @creator_email, @image, @slug)`
  ).run(meal);
}
