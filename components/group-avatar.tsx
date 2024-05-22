"use client";

import Image from "next/image";
import { User } from "next-auth";
import Avatar from "react-avatar";
import { cn } from "@/lib/utils";
interface AvatarGroupProps {
  data?: User[];
  sizeMedium?: boolean;
  sizeElement?: string;
  textSize?: number;
}

export const GroupAvatar: React.FC<AvatarGroupProps> = ({
  data = [],
  sizeMedium = false,
  sizeElement = "25",
  textSize = 2,
}) => {
  const slicedUsers = data.slice(0, 3);

  const positionMap = {
    0: `top-0  ${sizeMedium ? "left-[24px]" : "left-[12px]"}`,
    1: "bottom-0",
    2: "bottom-0 right-0",
  };

  return (
    <div className={cn(`relative w-12 h-10`, sizeMedium && "w-28 h-24")}>
      {slicedUsers.map((data, index) => (
        <div
          key={data.id}
          className={`
            absolute
            inline-block            
            ${positionMap[index as keyof typeof positionMap]}
          `}
        >
          <Avatar
            src={data.image || ""}
            name={data.name!}
            round={true}
            textSizeRatio={textSize}
            size={sizeElement}
            maxInitials={1}
            title=""
            className="  w-full h-full bg-white object-cover"
          />
        </div>
      ))}
    </div>
  );
};
