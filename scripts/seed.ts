import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DB_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database...");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.userSubscription);

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "Spanish",
        image: "/es.svg",
      },
      {
        id: 2,
        title: "Italian",
        image: "/it.svg",
      },
      {
        id: 3,
        title: "French",
        image: "/fr.svg",
      },
      {
        id: 4,
        title: "Croatian",
        image: "/hr.svg",
      },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseid: 1, // Spanish
        title: "Unit 1",
        description: "Learn the basics of Spanish",
        order: 1,
      },
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitid: 1, // Unit 1 (Learn the basics...)
        order: 1,
        title: "Nouns",
      },
      {
        id: 2,
        unitid: 1, // Unit 1 (Learn the basics...)
        order: 2,
        title: "Verbs",
      },
      {
        id: 3,
        unitid: 1, // Unit 1 (Learn the basics...)
        order: 3,
        title: "Verbs",
      },
      {
        id: 4,
        unitid: 1, // Unit 1 (Learn the basics...)
        order: 4,
        title: "Verbs",
      },
      {
        id: 5,
        unitid: 1, // Unit 1 (Learn the basics...)
        order: 5,
        title: "Verbs",
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonid: 1, // Nouns
        type: "SELECT",
        order: 1,
        question: 'Which one of these is the "the man"?',
      },
      {
        id: 2,
        lessonid: 1, // Nouns
        type: "ASSIST",
        order: 2,
        question: '"the man"',
      },
      {
        id: 3,
        lessonid: 1, // Nouns
        type: "SELECT",
        order: 3,
        question: 'Which one of these is the "the robot"?',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeid: 1, // Which one of these is "the man"?
        image: "/man.svg",
        correct: true,
        text: "el hombre",
        audio: "/es_man.mp3",
      },
      {
        challengeid: 1,
        image: "/woman.svg",
        correct: false,
        text: "la mujer",
        audio: "/es_woman.mp3",
      },
      {
        challengeid: 1,
        image: "/robot.svg",
        correct: false,
        text: "el robot",
        audio: "/es_robot.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeid: 2, // "the man"?
        correct: true,
        text: "el hombre",
        audio: "/es_man.mp3",
      },
      {
        challengeid: 2,
        correct: false,
        text: "la mujer",
        audio: "/es_woman.mp3",
      },
      {
        challengeid: 2,
        correct: false,
        text: "el robot",
        audio: "/es_robot.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeid: 3, // Which one of these is the "the robot"?
        image: "/man.svg",
        correct: false,
        text: "el hombre",
        audio: "/es_man.mp3",
      },
      {
        challengeid: 3,
        image: "/woman.svg",
        correct: false,
        text: "la mujer",
        audio: "/es_woman.mp3",
      },
      {
        challengeid: 3,
        image: "/robot.svg",
        correct: true,
        text: "el robot",
        audio: "/es_robot.mp3",
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 4,
        lessonid: 2, // Verbs
        type: "SELECT",
        order: 1,
        question: 'Which one of these is the "the man"?',
      },
      {
        id: 5,
        lessonid: 2, // Verbs
        type: "ASSIST",
        order: 2,
        question: '"the man"',
      },
      {
        id: 6,
        lessonid: 2, // Verbs
        type: "SELECT",
        order: 3,
        question: 'Which one of these is the "the robot"?',
      },
    ]);
    console.log("Seeding finished!");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();
