"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "@/components/text-generate-effect";
import Link from "next/link";
import { RegisterButton } from '@/components/auth/register-button';


export default function Home() {
  return (
    <main className="min-h-screen relative">
      <div className="md:h-[700px] md:w-[700px] w-[400px] h-[600px] absolute -top-1/3 md:-top-1/2 lg:-top-1/4 right-0 md:-right-48 lg:right-0 rounded-3xl rotate-45 bg-electric-violet-500" />
      <div className="max-w-[1400px] h-full mx-auto">
        <header>
          <nav
            className="flex items-center justify-between w-full p-8"
            aria-label="Primary navigation"
          >
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-neutral-800 dark:text-white text-2xl font-bold relative z-40"
            >
              BrainChat
            </motion.div>
            <ul className="flex space-x-4">
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                className="relative pb-2 text-white hover:text-gray-300 transition-colors cursor-pointer group"
              >
                <Link href="/auth/register">Sign up</Link>
                <div className="absolute left-0 bottom-0 h-0.5 bg-transparent group-hover:bg-white w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
                className="relative pb-2 text-white hover:text-gray-300 transition-colors cursor-pointer group"
              >
                <Link href="/auth/login">Log in</Link>
                <div className="absolute left-0 bottom-0 h-0.5 bg-transparent group-hover:bg-white w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </motion.li>
            </ul>
          </nav>
        </header>
        <div className="flex items-center flex-col-reverse md:flex-row z-40 relative justify-center md:gap-24 p-4 gap-6 md:px-8 md:py-10">
          <div className="flex flex-col items-center md:text-start text-center md:items-start">
            <h1 className="dark:text-white text-neutral-800 text-3xl sm:text-5xl md:text-7xl flex flex-col gap-1 md:gap-2 font-semibold">
              <span>Send private</span>
              <span className="text-electric-violet-500">messages</span>
            </h1>
            <TextGenerateEffect
              className="text-sm sm:text-base md:text-lg mt-4 max-w-md text-foreground dark:text-muted-foreground font-light"
              words="Free messaging and document sharing in a simple, reliable way and private, available worldwide."
            />
            <RegisterButton>
              <div className="mt-8">
                <Button size="lg">Sign Up for free</Button>
              </div>
            </RegisterButton>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="md:mr-8 z-10 flex justify-center items-center"
          >
            <picture>
              <source
                srcSet="/images/online-world-cuate.svg"
                media="(min-width: 768px)"
              />
              <Image
                src="/images/online-world-cuate.svg"
                width={350}
                height={350}
                alt="Illustration of online messaging"
                className="md:hidden"
              />
            </picture>
            <Image
              src="/images/online-world-cuate.svg"
              width={600}
              height={600}
              alt="Illustration of online messaging"
              className="hidden md:block"
            />
          </motion.div>
        </div>
      </div>
    </main>
  );
}
