"use client";

import { courses, userProgress } from "@/db/schema";
import Card from "./card";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { upsertUserProgress } from "@/actions/user-progress";
import { toast } from "sonner";

type ListProps = {
  courses: (typeof courses.$inferSelect)[];
  activeCourseID?: typeof userProgress.$inferSelect.activeCourseID;
};

const List = ({ courses, activeCourseID }: ListProps) => {
  const router = useRouter();
  const [pending, startTranstion] = useTransition();

  const onClick = (id: number) => {
    if (pending) return;

    if (id === activeCourseID) {
      return router.push("/learn");
    }

    startTranstion(() => {
      upsertUserProgress(id).catch(() => toast.error("Failed to start course"));
    });
  };

  return (
    <div className="pt-6 grid gris-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          image={course.image}
          onClick={onClick}
          disabled={pending}
          active={course.id === activeCourseID}
        />
      ))}
    </div>
  );
};

export default List;
