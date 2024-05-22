import React from "react";
import { MobileFooter } from "./sidebar/mobile-footer";

interface LayoutTemplateProps {
  children: React.ReactNode;
  SidebarComponent: React.ComponentType<any>;
  sidebarProps: any;
}

export const LayoutTemplate: React.FC<LayoutTemplateProps> = ({
  children,
  SidebarComponent,
  sidebarProps,
}) => {
  return (
    <main className="h-screen bg-electric-violet-50 dark:bg-background">
      <div className="w-screen h-64 absolute z-10 bg-electric-violet-600 dark:hidden"></div>
      <div className="h-full max-w-[100rem] relative z-20 sm:p-4 p-2 md:p-6 lg:p-8 m-auto">
        <div className="flex bg-white dark:bg-background border-r border-t border-b h-full rounded-lg border-border overflow-hidden">
          <SidebarComponent {...sidebarProps} />
          {children}
        </div>
      </div>
      <MobileFooter items={sidebarProps.users} />
    </main>
  );
};
