"use client";
import { containerVariants, imageVariants, textVariants } from "@/frame/auth";
import { motion } from "framer-motion";
interface AuthContentProps {
  children: React.ReactNode;
  title: string;
}
export const AuthContent: React.FC<AuthContentProps> = ({
  children,
  title,
}) => {
  return (
    <div className="w-full   flex justify-center items-center px-4  rounded-lg">
      <motion.div
        className=" max-w-[550px] flex-1 "
        variants={containerVariants}
      >
        <section className="space-y-4 md:p-4">
          <motion.div className="flex justify-center items-center md:hidden mt-6">
            <motion.img
              src="/images/work-chat-cuate.svg"
              alt="authentication illustration"
              width={350}
              height={350}
              variants={imageVariants}
              className="z-10"
            />
          </motion.div>
          <motion.div
            className=" text-center overflow-hidden "
            variants={textVariants}
          >
            <h2 className=" text-4xl font-semibold text-electric-violet-600 inline-block ">
              {title}
            </h2>
          </motion.div>
          {children}
        </section>
      </motion.div>
    </div>
  );
};
