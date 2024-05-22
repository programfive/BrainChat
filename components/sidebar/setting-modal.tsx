"use client";
import { User } from "next-auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { UploadAvatar } from "../upload-avatar";
import { UserAvatar } from "../user-avatar";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useFileUpload } from "@/hooks/use-file-upload";
import { SettingSchema } from "@/schemas";

interface SettingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  children: React.ReactNode;
}

export const SettingModal: React.FC<SettingModalProps> = ({
  currentUser,
  isOpen,
  children,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { uploadFileAsync, isUploading, uploadError } = useFileUpload();
  const router = useRouter();
  const form = useForm<z.infer<typeof SettingSchema>>({
    resolver: zodResolver(SettingSchema),
    defaultValues: {
      name: currentUser?.name || "",
      image: null,
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (values: z.infer<typeof SettingSchema>) => {
    setIsLoading(true);
    let urlImage = currentUser?.image;
    if (values.image) {
      const file = values.image[0];
      const fileData = await uploadFileAsync(file, "avatar");
      if (!fileData) {
        toast.error("An error has occurred!");
        console.log(fileData);
        return;
      }
      urlImage = fileData.downloadURL;
    }

    axios
      .post("/api/settings", {
        name: values.name,
        image: urlImage,
      })
      .then(() => {
        router.refresh();
        toast.success("information updated correctly!");
        onClose();
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setIsLoading(false));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-start">
          <DialogTitle>Profile</DialogTitle>
          <DialogDescription>Edit your public information.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-4 items-center mb-">
                    <UserAvatar data={currentUser} />
                    <FormLabel>Avatar</FormLabel>
                  </div>
                  <FormControl>
                    <UploadAvatar data={currentUser} field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading}>
              Update
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
