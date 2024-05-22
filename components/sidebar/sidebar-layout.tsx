"use client";
import { SidebarHeader } from "@/components/sidebar/sidebar-header";
import { UserButton } from "@/components/auth/user-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FooterDesktop } from "@/components/sidebar/footer-desktop";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { SearchInput, SearchNotFound } from "@/components/search-input";
import { ModeToggle } from "../ui/mode-toggle";

interface SidebarLayoutProps {
  items: any[];
  searchTerm: string;
  onSearch: (event: React.FormEvent<HTMLInputElement>) => void;
  title: string;
  Content: React.FC<{ items: any[] }>;
  filter: any[];
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  items,
  searchTerm,
  onSearch,
  title,
  Content,
  filter,
}) => {
  const user = useCurrentUser();
  return (
    <aside className="z-40 bg-white dark:bg-background relative overflow-hidden border border-border w-full h-full lg:w-[25rem] lg:block">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-neutral-800 dark:text-primary-foreground">
            {title}
          </div>
          <div className="lg:hidden flex items-center gap-2">
            <ModeToggle />
            <UserButton data={user!} />
          </div>
          <SidebarHeader users={items} />
        </div>
        <SearchInput search={searchTerm} onSearch={onSearch} />
      </div>
      <ScrollArea className="h-full pb-[13.8rem]">
        {filter.length !== 0 ? <Content items={filter} /> : <SearchNotFound />}
      </ScrollArea>
      <FooterDesktop data={user!} />
    </aside>
  );
};

export default SidebarLayout;
