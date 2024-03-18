import { auth } from "@clerk/nextjs";

const adminIDs = ["user_2dkjw3qC7ArelzqeBs7UR9fY2bx"];

export const isAdmin = () => {
  const { userId } = auth();

  if (!userId) return false;

  return adminIDs.indexOf(userId) !== -1;
};
