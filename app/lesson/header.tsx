import { Progress } from "@/components/ui/progress";
import { useExitModal } from "@/store/use-exit-modal";
import { InfinityIcon, X } from "lucide-react";
import Image from "next/image";

type HeaderProps = {
  hearts: number;
  percentage: number;
  hasActiveSubscription: boolean;
};

const Header = ({ hearts, percentage, hasActiveSubscription }: HeaderProps) => {
    const { open } = useExitModal();

  return (
    <header className="lg:pt-[50px] pt-20 px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full">
      <X
        onClick={open}
        className="text-slate-500 hover:opacity-75 transition cursor-pointer"
      />
      <Progress value={percentage} />
      <div className="flex text-rose-500 font-bold items-center">
        <Image
          src={"/heart.svg"}
          alt={"Heart"}
          height={20}
          width={20}
          className="mr-2"
        />
        {hasActiveSubscription ? (
          <InfinityIcon className="w-6 h-6 stroke-[3] shrink-0" />
        ) : (
          hearts
        )}
      </div>
    </header>
  );
};

export default Header;
