"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export function EmptyState() {
  return (
    <>
      <div className="flex-col h-full  bg-background border-t border-b border-r border-border">
        <div className="flex flex-col p-4 items-center justify-center h-full w-full ">
          <motion.h2
            className="text-3xl font-semibold text-neutral-800 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to our chat!
          </motion.h2>
          <motion.div
            className="relative max-w-[500px] h-[500px] "
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Image
              src="/images/Conversation-rafiki.svg"
              alt="image"
              width={500}
              height={500}
              className="z-30 w-full h-full object-contain"
            />
          </motion.div>
          <motion.div
            className="text-foreground dark:text-muted-foreground font-medium flex items-center text-center flex-col"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p> Now you can start chatting.</p>
            <p> Choose a user from the list on the left to start a new chat.</p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
