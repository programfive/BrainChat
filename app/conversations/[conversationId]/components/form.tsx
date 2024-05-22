"use client";
import { useConversation } from "@/hooks/use-conversation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MessageInput } from "./message-input";
import { useState, useRef, useEffect } from "react";
import Dropzone from "@/components/Dropzone";
import { useFileUpload } from "@/hooks/use-file-upload";
import { BsEmojiGrin } from "react-icons/bs";
import { MessageEmoji } from "./emojis";
import { Emoji } from "@/types";
import { motion } from "framer-motion";

export const Form = () => {
  const { conversationId } = useConversation();
  const { uploadFileAsync, isUploading, uploadError } = useFileUpload();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<File | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<{ text: string }[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Estado de carga

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    setValue("message", "", { shouldValidate: true });
    const response = await axios.post("/api/messages", {
      message: inputValue,
      conversationId: conversationId,
    });
    if (response.statusText === "OK") {
      setInputValue("");
    }
    setMessages((prevMessages) => [...prevMessages, { text: data.message }]);
    setIsLoading(false);
  };

  const handleUpload = async () => {
    if (file) {
      setIsLoading(true);
      const { downloadURL, type, name, size } = await uploadFileAsync(
        file,
        "messages"
      );
      axios
        .post("/api/messages", {
          file: downloadURL,
          typeFile: type,
          nameContentFile: name,
          sizeContentFile: size,
          conversationId: conversationId,
        })
        .then(() => {
          setIsLoading(false);
        });
      setFile(null);
      setFilePreview(null);
      setPreviewUrl(null);
    }
  };
  return (
    <motion.div className="py-4 px-4 relative border-t border-b border-r flex items-center  bg-background gap-2 lg:gap-4 w-full">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <BsEmojiGrin
            size={24}
            className="text-gray-800 dark:text-muted-foreground"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="mb-6  z-40">
          <MessageEmoji
            onHandleEmoji={(emojiSelected: Emoji) => {
              setInputValue(inputValue + emojiSelected.native);
            }}
          />
        </DropdownMenuContent>
      </DropdownMenu>

      <Dropzone
        setFilePreview={setFilePreview}
        filePreview={filePreview}
        onClose={() => setFile(null)}
        onFileUpload={(file: File) => {
          setFile(file);
        }}
        previewUrl={previewUrl!}
        setPreviewUrl={setPreviewUrl}
      >
        <FaPlus
          size={30}
          className="text-gray-800 dark:text-muted-foreground"
        />
      </Dropzone>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message"
          value={inputValue}
        />

        <button
          type="submit"
          className="rounded-full p-2 bg-electric-violet-600 cursor-pointer hover:bg-electric-violet-500 transition"
          onClick={handleUpload}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white border-r-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <HiPaperAirplane size={18} className="text-white" />
          )}
        </button>
      </form>
    </motion.div>
  );
};
