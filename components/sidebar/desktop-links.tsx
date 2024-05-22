"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "../ui/button";
interface DesktopLinksProps {
  children: React.ReactNode;
}
export const DesktopLinks: React.FC<DesktopLinksProps> = ({ children }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="outline"
          asChild
          size="icon"
          className="p-1 border-none"
        >
          {children}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Pages</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/conversations" className="block  w-full">
            Chat
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/users" className="block  w-full">
            Peoples
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
