"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

type SidebarItemsProps = {
  label: string;
  icon: string;
  href: string;
};

const SidebarItem = ({ label, icon, href }: SidebarItemsProps) => {
  const pathName = usePathname();
  const isActive = pathName === href;

  return (
    <Button
      variant={isActive ? "sidebarOutline" : "sidebar"}
      className="justify-start h-[52px]"
      asChild
    >
      <Link href={href}>
        <Image src={icon} alt={label} className="mr-5" height={32} width={32} />
        {label}
      </Link>
    </Button>
  );
};

export default SidebarItem;
