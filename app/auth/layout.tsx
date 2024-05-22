"use client";
import { containerVariants, imageVariants, textVariants } from "@/frame/auth";
import { motion } from "framer-motion";
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.main
      className="grid grid-cols-1  md:grid-cols-2 min-h-screen shadow-lg relative  "
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="absolute top-0 md:hidden right-0 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-[#7c3aed] z-6 transition-all duration-[1.8s] ease-in-out"></div>

      <div className=" bg-gradient-to-tl space-y-4 from-electric-violet-600 to-electric-violet-800  relative hidden md:flex p-4  justify-center items-center flex-col">
        <motion.h2
          className="text-2xl font-semibold text-center text-electric-violet-50 uppercase"
          variants={textVariants}
        >
          BrainChat
        </motion.h2>
        <div className="w-full overflow-hidden items-center flex justify-center">
          <motion.div
            className="max-w-[550px] max-h-[550px] bg-white rounded-lg"
            variants={imageVariants}
          >
            <motion.img
              src="/images/sign-up-cuate.svg"
              alt="authentication illustration"
              width={550}
              height={550}
              variants={imageVariants}
            />
          </motion.div>
        </div>
        <motion.p
          className="text-electric-violet-300 text-center flex flex-col leading-relaxed"
          variants={textVariants}
        >
          <span>Now you can start connecting</span>
          <span>With your friends and family easily and reliably.</span>
        </motion.p>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        {children}
      </div>
    </motion.main>
  );
};

export default AuthLayout;
