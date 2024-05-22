"use client";

import { User } from "@prisma/client";
import UserBox from "./user-box";
import { useMemo, useState } from "react";
import SidebarLayout from "@/components/sidebar/sidebar-layout";

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredItems = useMemo(() => {
    if (searchTerm.trim() === "") {
      return users;
    }
    return users.filter((user) => {
      if (user.name?.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      }
    });
  }, [users, searchTerm]);
  return (
    <SidebarLayout
      items={users}
      searchTerm={searchTerm}
      onSearch={(event) => setSearchTerm(event.currentTarget.value)}
      title="People"
      filter={filteredItems}
      Content={({ items }) =>
        items.map((item) => <UserBox key={item.id} data={item} />)
      }
    />
  );
};

export default UserList;
