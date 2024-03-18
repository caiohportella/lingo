import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    // Delete all existing data
    await Promise.all([
      db.delete(schema.userProgress),
      db.delete(schema.challenges),
      db.delete(schema.units),
      db.delete(schema.lessons),
      db.delete(schema.courses),
      db.delete(schema.challengeOptions),
      db.delete(schema.userSubscription),
    ]);

    // Insert courses
    const courses = await db
      .insert(schema.courses)
      .values([{ title: "Spanish", image: "/es.svg" }])
      .returning();

    // For each course, insert units
    for (const course of courses) {
      const units = await db
        .insert(schema.units)
        .values([
          {
            courseid: course.id,
            title: "Unit 1",
            description: `Learn the basics of ${course.title}`,
            order: 1,
          },
          {
            courseid: course.id,
            title: "Unit 2",
            description: `Learn intermediate ${course.title}`,
            order: 2,
          },
        ])
        .returning();

      // For each unit, insert lessons
      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitid: unit.id, title: "Nouns", order: 1 },
            { unitid: unit.id, title: "Verbs", order: 2 },
            { unitid: unit.id, title: "Adjectives", order: 3 },
            { unitid: unit.id, title: "Phrases", order: 4 },
            { unitid: unit.id, title: "Sentences", order: 5 },
          ])
          .returning();

        // For each lesson, insert challenges
        for (const lesson of lessons) {
          const challenges = await db
            .insert(schema.challenges)
            .values([
              {
                lessonid: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the man"?',
                order: 1,
              },
              {
                lessonid: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the woman"?',
                order: 2,
              },
              {
                lessonid: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the boy"?',
                order: 3,
              },
              {
                lessonid: lesson.id,
                type: "ASSIST",
                question: '"the man"',
                order: 4,
              },
              {
                lessonid: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the zombie"?',
                order: 5,
              },
              {
                lessonid: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the robot"?',
                order: 6,
              },
              {
                lessonid: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the girl"?',
                order: 7,
              },
              {
                lessonid: lesson.id,
                type: "ASSIST",
                question: '"the zombie"',
                order: 8,
              },
            ])
            .returning();

          // For each challenge, insert challenge options
          for (const challenge of challenges) {
            if (challenge.order === 1) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeid: challenge.id,
                  correct: true,
                  text: "el hombre",
                  image: "/man.svg",
                  audio: "/es_man.mp3",
                },
                {
                  challengeid: challenge.id,
                  correct: false,
                  text: "la mujer",
                  image: "/woman.svg",
                  audio: "/es_woman.mp3",
                },
                {
                  challengeid: challenge.id,
                  correct: false,
                  text: "el chico",
                  image: "/boy.svg",
                  audio: "/es_boy.mp3",
                },
              ]);
            }

            if (challenge.order === 2) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeid: challenge.id,
                  correct: true,
                  text: "la mujer",
                  image: "/woman.svg",
                  audio: "/es_woman.mp3",
                },
                {
                  challengeid: challenge.id,
                  correct: false,
                  text: "el chico",
                  image: "/boy.svg",
                  audio: "/es_boy.mp3",
                },
                {
                  challengeid: challenge.id,
                  correct: false,
                  text: "el hombre",
                  image: "/man.svg",
                  audio: "/es_man.mp3",
                },
              ]);
            }

            if (challenge.order === 3) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeid: challenge.id,
                  correct: false,
                  text: "la mujer",
                  image: "/woman.svg",
                  audio: "/es_woman.mp3",
                },
                {
                  challengeid: challenge.id,
                  correct: false,
                  text: "el hombre",
                  image: "/man.svg",
                  audio: "/es_man.mp3",
                },
                {
                  challengeid: challenge.id,
                  correct: true,
                  text: "el chico",
                  image: "/boy.svg",
                  audio: "/es_boy.mp3",
                },
              ]);
            }

            if (challenge.order === 4) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeid: challenge.id,
                  correct: false,
                  text: "la mujer",
                  audio: "/es_woman.mp3",
                },
                {
                  challengeid: challenge.id,
                  correct: true,
                  text: "el hombre",
                  audio: "/es_man.mp3",
                },
                {
                  challengeid: challenge.id,
                  correct: false,
                  text: "el chico",
                  audio: "/es_boy.mp3",
                },
              ]);
            }

            if (challenge.order === 5) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeid: challenge.id,
                  correct: false,
                  text: "el hombre",
                  image: "/man.svg",
                  audio: "/es_man.mp3",
                },
                {
                  challengeid: challenge.id,
                  correct: false,
                  text: "la mujer",
                  image: "/woman.svg",
                  audio: "/es_woman.mp3",
                },
                {
                  challengeid: challenge.id,
                  correct: true,
                  text: "el zombie",
                  image: "/zombie.svg",
                  audio: "/es_zombie.mp3",
                },
              ]);
            }

            if (challenge.order === 6) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeid: challenge.id,
                  correct: true,
                  text: "el robot",
                  image: "/robot.svg",
                  audio: "/es_robot.mp3",
                },
                {
                  challengeid: challenge.id,
                  correct: false,
                  text: "el zombie",
                  image: "/zombie.svg",
                  audio: "/es_zombie.mp3",
                },
                {
                  challengeid: challenge.id,
                  correct: false,
                  text: "el chico",
                  image: "/boy.svg",
                  audio: "/es_boy.mp3",
                },
              ]);
            }

            if (challenge.order === 7) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeid: challenge.id,
                  correct: true,
                  text: "la nina",
                  image: "/girl.svg",
                  audio: "/es_girl.mp3",
                },
                {
                  challengeid: challenge.id,
                  correct: false,
                  text: "el zombie",
                  image: "/zombie.svg",
                  audio: "/es_zombie.mp3",
                },
                {
                  challengeid: challenge.id,
                  correct: false,
                  text: "el hombre",
                  image: "/man.svg",
                  audio: "/es_man.mp3",
                },
              ]);
            }

            if (challenge.order === 8) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeid: challenge.id,
                  correct: false,
                  text: "la mujer",
                  audio: "/es_woman.mp3",
                },
                {
                  challengeid: challenge.id,
                  correct: true,
                  text: "el zombie",
                  audio: "/es_zombie.mp3",
                },
                {
                  challengeid: challenge.id,
                  correct: false,
                  text: "el chico",
                  audio: "/es_boy.mp3",
                },
              ]);
            }
          }
        }
      }
    }
    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
