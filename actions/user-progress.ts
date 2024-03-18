"use server";

import { POINTS_TO_REFILL } from "@/constants";
import db from "@/db/drizzle";
import {
  getCourseByID,
  getUserProgress,
  getUserSubscription,
} from "@/db/queries";
import { challengeProgress, challenges, userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";



export const upsertUserProgress = async (courseID: number) => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) throw new Error("Unauthorized");

  const course = await getCourseByID(courseID);

  if (!course) throw new Error("Course not found");

  if (!course.units.length || !course.units[0].lessons.length) {
    throw new Error("Course is empty");
  }

  const existingUserProgress = await getUserProgress();

  if (existingUserProgress) {
    await db.update(userProgress).set({
      activeCourseID: courseID,
      username: user.firstName || "User",
      image: user.imageUrl || "/mascot.svg",
    });

    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");
  }

  await db.insert(userProgress).values({
    userid: userId,
    activeCourseID: courseID,
    username: user.firstName || "User",
    image: user.imageUrl || "/mascot.svg",
  });

  revalidatePath("/courses");
  revalidatePath("/learn");
  redirect("/learn");
};

export const reduceHearts = async (challengeID: number) => {
  const { userId } = await auth();

  if (!userId) throw new Error("User not found");

  const currentUserProgress = await getUserProgress();
  const userSubscription = await getUserSubscription();

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeID),
  });

  if (!challenge) throw new Error("Challenge not found");

  const lessonID = challenge.lessonid;

  if (!currentUserProgress) throw new Error("User progress not found");

  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userid, userId),
      eq(challengeProgress.challengeid, challengeID)
    ),
  });

  const isPractice = !!existingChallengeProgress;

  if (isPractice) return { error: "practice" };

  if (userSubscription?.isActive) return { error: "subscription" };

  if (currentUserProgress.hearts === 0) {
    return { error: "hearts" };
  }

  await db
    .update(userProgress)
    .set({
      hearts: Math.max(currentUserProgress.hearts - 1, 0),
    })
    .where(eq(userProgress.userid, userId));

  revalidatePath("/learn");
  revalidatePath("/shop");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
  revalidatePath(`/lesson/${lessonID}`);
};

export const refillHearts = async () => {
  const currentUserProgress = await getUserProgress();

  if (!currentUserProgress) throw new Error("User progress not found");

  if (currentUserProgress.hearts === 5) {
    throw new Error("Hearts are full");
  }

  if (currentUserProgress.points < POINTS_TO_REFILL) {
    throw new Error("Not enough points");
  }

  await db
    .update(userProgress)
    .set({
      hearts: 5,
      points: currentUserProgress.points - POINTS_TO_REFILL,
    })
    .where(eq(userProgress.userid, currentUserProgress.userid));

  revalidatePath("/shop");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
  revalidatePath("/learn");
};
