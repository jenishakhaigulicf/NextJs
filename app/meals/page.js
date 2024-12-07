import React, { Suspense } from "react";
import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";
import Link from "next/link";
import { getMeals } from "@/lib/meals";
import MealsLoadingPage from "./loading-out";

export const metadata = {
  title: "All Meals",
  description: "Browse the delicious meals shared by our vibrant community.",
};

const MealsData = async () => {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
};

const Meals = () => {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share your favorite recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<MealsLoadingPage />}>
          <MealsData />
        </Suspense>
      </main>
    </>
  );
};

export default Meals;
