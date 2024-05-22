'use client'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

interface TooltipHeaderProps {
  children: React.ReactNode;
  text: string;
}
export const TooltipHeader: React.FC<TooltipHeaderProps> = ({
  children,
  text,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent className="hidden md:block z-50 mt-2" side="bottom">
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
