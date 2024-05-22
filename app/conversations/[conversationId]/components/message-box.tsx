"use client";
import { UserAvatar } from "@/components/user-avatar";
import { FullMessageType } from "@/types";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { format } from "date-fns";
import Image from "next/image";
import { VideoPlayer } from "@/components/videoPlayer";
import { DocumentViewer } from "@/components/document-viewer";
import { FaFilePdf, FaFile, FaRegClock } from "react-icons/fa";

import Link from "next/link";
import { MessageActions } from "./message-actions";
import { cn } from "@/lib/utils";
interface MessageBoxProps {
  isLast: boolean;
  data: FullMessageType;
  onOpenImage?: () => void;
}
const convertUrlToLink = (text: string) => {
  const urlRegex = /\b(https?:\/\/\S+)\b/gi;
  return text.split(urlRegex).map((part, i) =>
    i % 2 ? (
      <div key={i} className="truncate w-32 md:w-36 lg:w-auto">
        <Link
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className=""
        >
          {part}
        </Link>
      </div>
    ) : (
      part
    )
  );
};
export const MessageBox: React.FC<MessageBoxProps> = ({
  isLast,
  data,
  onOpenImage,
}) => {
  const session = useSession();
  const isOwn = session.data?.user.email === data.sender.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");
  const container = cn("flex gap-3 p-4   ", isOwn && "justify-end");
  const avatar = cn(isOwn && "order-2");
  const body = cn("flex flex-col gap-2  z-30", isOwn && "items-end");
  const message = cn(
    "text-sm w-fit max-w-[500px] relative rounded-md   ",
    isOwn ? "bg-electric-violet-600  text-white" : "bg-muted",
    data.file ? "p-0" : " py-2 px-4"
  );
  const emojiContainer = cn(
    "flex items-center gap-2 first-child:bg-red-500  ",
    !isOwn && "flex-row flex-row-reverse "
  );
  const images = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/gif",
    "image/svg+xml",
  ];
  const videos = [
    "video/mp4",
    "video/mp3",
    "video/quicktime",
    "video/x-msvideo",
  ];
  const pdf = ["application/pdf"];
  const documents = [
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  return (
    <div>
      <div className={container}>
        <div className={avatar}>
          <UserAvatar data={data.sender} />
        </div>
        <div className={body}>
          <div className="flex items-center gap-1">
            <div className="text-sm text-gray-600">{data.sender.name}</div>
            <div className="text-xs text-gray-500 flex gap-1 items-center ">
              <span> {format(new Date(data.createdAt), "p")}</span>
              <FaRegClock size={12} />
            </div>
          </div>
          <div className={emojiContainer}>
            <MessageActions data={data} isOwn={isOwn} />
            <div className={message}>
              {data.file ? (
                <>
                  {documents.includes(data.typeFile!) && (
                    <>
                      <DocumentViewer
                        name={data.nameFile!}
                        size={data.sizeFile!}
                        url={data.file}
                        icon={FaFile}
                      />
                    </>
                  )}
                  {videos.includes(data.typeFile!) && (
                    <>
                      <VideoPlayer url={data.file} width="auto" height={288} />
                    </>
                  )}
                  {pdf.includes(data.typeFile!) && (
                    <>
                      <DocumentViewer
                        name={data.nameFile!}
                        size={data.sizeFile!}
                        url={data.file}
                        icon={FaFilePdf}
                      />
                    </>
                  )}
                  {images.includes(data.typeFile!) && (
                    <>
                      <Image
                        onClick={onOpenImage}
                        alt={data.nameFile!}
                        height="288"
                        width="288"
                        src={data.file}
                        className="object-cover cursor-pointer hover:scale-110 transition translate"
                      />
                    </>
                  )}
                </>
              ) : (
                <div>{convertUrlToLink(data.body!)}</div>
              )}
            </div>
          </div>
          {isLast && isOwn && seenList.length > 0 && (
            <div className="text-xs font-light text-gray-500">
              {`Seen by ${seenList}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
