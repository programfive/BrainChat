import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FaTrash } from "react-icons/fa";

import { UserAvatar } from "@/components/user-avatar";
import { useActiveList } from "@/hooks/use-active-list";
import useOtherUser from "@/hooks/useOtherUser";
import { Conversation } from "@prisma/client";
import { format } from "date-fns";
import { User } from "next-auth";
import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "./confirm-modal";
import { GroupAvatar } from "@/components/group-avatar";
interface ProfileDrawerProps {
  children: React.ReactNode;
  data: Conversation & {
    users: User[];
  };
}
export const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  children,
  data,
}) => {
  const otherUser = useOtherUser(data);
  const [openModal, setOpenModal] = useState(false);
  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), "PP");
  }, [otherUser.createdAt]);

  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }

    return isActive ? "Active" : "Offline";
  }, [data, isActive]);
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-[90%] sm:w-[98%]">
        <div className="relative mt-6 flex-1 px-4 sm:px-2 ">
          <div className="flex flex-col items-center sm:px-4  ">
            <div className="mb-2">
              {data.isGroup ? (
                <GroupAvatar sizeMedium sizeElement="60" data={data.users} />
              ) : (
                <UserAvatar size="120" data={otherUser} />
              )}
            </div>
            <div>{title}</div>
            <div className="text-sm ">{statusText}</div>
            <div className="w-full py-5 my-2 sm:px-0 sm:pt-0">
              <div className="space-y-4  sm:space-y-6 ">
                {data.isGroup && (
                  <div>
                    <h3 className="text-2xl font-bold text-neutral-800 dark:text-white sm:w-40 sm:flex-shrink-0">
                      Members
                    </h3>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 ">
                      {data.users.map((user) => (
                        <div
                          key={user.id}
                          className="flex gap-2 items-center p-2"
                        >
                          <UserAvatar data={user} />
                          <div className="">
                            <p className="truncate text-sm capitalize  text-gray-300 font-medium">
                              {user.name}
                            </p>
                            <p className="text-foreground  truncate dark:text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      ))}
                    </dd>
                  </div>
                )}
                {!data.isGroup && (
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-neutral-800 dark:text-white sm:w-40 sm:flex-shrink-0">
                      Information
                    </h3>
                    <div>
                      <h2 className=" font-medium text-foreground  sm:w-40 sm:flex-shrink-0">
                        Email
                      </h2>
                      <p className="mt-1 text-sm text-foreground dark:text-muted-foreground sm:col-span-2">
                        {otherUser.email}
                      </p>
                    </div>
                  </div>
                )}
                {!data.isGroup && (
                  <>
                    <div>
                      <dt className="font-medium text-foreground sm:w-40 sm:flex-shrink-0">
                        Joined
                      </dt>
                      <dd className="  mt-1   text-sm   text-foreground dark:text-muted-foreground   sm:col-span-2">
                        <time dateTime={joinedDate}>{joinedDate}</time>
                      </dd>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="self-start ">
              <ConfirmModal
                isOpen={openModal}
                setOpenModal={() => setOpenModal(!openModal)}
              >
                <Button
                  variant="destructive"
                  className="flex gap-2 border-none items-center"
                >
                  <FaTrash />
                  <span>Delete</span>
                </Button>
              </ConfirmModal>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
