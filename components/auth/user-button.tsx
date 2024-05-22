"use client";
import { ExitIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutButton } from "@/components/auth/logout-button";
import Avatar from "react-avatar";
import { User } from "next-auth";
interface UserButtonProps {
  data: User;
}
export const UserButton: React.FC<UserButtonProps> = ({ data }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div>
          <Avatar
            src={data?.image!}
            size="40"
            textSizeRatio={1.6}
            round
            name={data?.name!}
            className="bg-white object-cover"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" className="w-40" align="start">
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
