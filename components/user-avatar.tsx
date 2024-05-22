"use client";
import { useActiveList } from "@/hooks/use-active-list";
import { User } from "next-auth";
import React from "react";
import Avatar from "react-avatar";
interface UserAvatarProps {
  data: User;
  size?: string;
  textSize?: number;
}
export const UserAvatar: React.FC<UserAvatarProps> = ({
  data,
  size = "40",
  textSize = 1.8,
}) => {
  return (
    <div className="relative">
      <div className="relative inline-block ">
        <Avatar
          src={data.image || ""}
          name={data.name!}
          round={true}
          textSizeRatio={textSize}
          size={size}
          maxInitials={1}
          title=""
          className="bg-white object-cover"
        />
      </div>
    </div>
  );
};
