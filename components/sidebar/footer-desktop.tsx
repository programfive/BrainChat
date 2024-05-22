import { User } from "next-auth";
import { UserButton } from "../auth/user-button";
import { ModeToggle } from "../ui/mode-toggle";

interface FooterDesktopProps {
  data: User;
}
export const FooterDesktop: React.FC<FooterDesktopProps> = ({ data }) => {
  return (
    <div className="absolute  md:flex items-center justify-between p-4 hidden gap-2 bottom-0 bg-background w-full border-t border-border ">
      <div className="flex gap-4">
        <UserButton data={data} />
        <div className="flex flex-col truncate text-start">
          <span className=" text-md font-medium text-neutral-800 dark:text-primary-foreground">
            {data?.name}
          </span>
          <span className="text-muted-foreground truncate text-sm ">
            {data?.email}
          </span>
        </div>
      </div>
      <ModeToggle />
    </div>
  );
};
