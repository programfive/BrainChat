import UserList from "./components/user-list";
import { getUsers } from "@/data/get-users";
import { LayoutTemplate } from "@/components/layout-template";
export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();
  return (
    <LayoutTemplate SidebarComponent={UserList} sidebarProps={{ users: users }}>
      {children}
    </LayoutTemplate>
  );
}
