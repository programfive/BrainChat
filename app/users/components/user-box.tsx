"use client";

import axios from "axios";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { LoadingModal } from "@/components/loading-modal";
import { UserAvatar } from "@/components/user-avatar";

interface UserBoxProps {
  data: User;
}

const UserBox: React.FC<UserBoxProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/conversations", {
        userId: data.id,
      })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data, router]);

  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        onClick={handleClick}
        className="w-full relative  flex items-center space-x-3 hover:bg-neutral-100 hover:dark:bg-background dark:hover:opacity-50   transition cursor-pointer p-4 border-b border-b-border"
      >
        <UserAvatar data={data} />
        <div className="min-w-0 flex-1 ">
          <div className="focus:outline-none">
            <div className="flex flex-col justify-center mb-1">
              <p className=" text-md font-medium text-neutral-800 dark:text-white">
                {data.name}
              </p>
              <p className="text-foreground dark:text-muted-foreground truncate text-sm ">
                {data.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
