import { InputProps } from "./ui/input";
import * as React from "react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { User } from "next-auth";
import { FieldValues } from "react-hook-form";
import { FiUploadCloud } from "react-icons/fi";

interface UploadAvatarProps extends InputProps {
  field: FieldValues;
  disabled?: boolean;
  data: User;
}

export const UploadAvatar: React.FC<UploadAvatarProps> = ({
  field,
  disabled,
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const images = [
    "image/jpeg",
    "image/png",
    "image/jpg",
  ];
  const includesImages = images.includes(selectedImage?.type!);
  console.log();
  return (
    <div
      className={cn(
        "w-full text-muted-foreground p-4 overflow-hidden flex justify-center items-center bg-background mx-auto rounded-lg border-2 border-dashed border-primary ",
        disabled && "opacity-50"
      )}
    >
      <label
        htmlFor="fileInput"
        className="text-center h-32 w-full flex flex-col justify-center items-center cursor-pointer"
      >
        <Input
          disabled={disabled}
          type="file"
          className="hidden"
          id="fileInput"
          onChange={(e) => {
            field.onChange(e.target.files);
            setSelectedImage(e.target.files?.[0] || null);
          }}
          ref={field.ref}
        />
        {includesImages ? (
          <div className="relative overflow-hidden  w-full h-full">
            <Image
              src={URL.createObjectURL(selectedImage!)}
              alt="image update"
              layout="fill"
              objectFit="contain"
            />
          </div>
        ) : (
          <>
            <FiUploadCloud size={80} className="text-purple-400" />
          </>
        )}
      </label>
    </div>
  );
};
