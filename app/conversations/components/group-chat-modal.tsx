"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { User } from "next-auth";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Select } from "@/components/ui/select";
import { MembersSchema } from "@/schemas";

interface GroupChatModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onToggleModal: () => void;
  data?: User[];
}

export const GroupChatModal: React.FC<GroupChatModalProps> = ({
  children,
  isOpen,
  onToggleModal,
  data,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof MembersSchema>>({
    resolver: zodResolver(MembersSchema),
    defaultValues: {
      name: "",
      members: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof MembersSchema>) {
    setIsLoading(true);
    axios
      .post("/api/conversations", {
        ...values,
        isGroup: true,
      })
      .then(() => {
        router.refresh();
        onToggleModal();
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setIsLoading(false));
  }


  return (
    <Dialog open={isOpen} onOpenChange={onToggleModal}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-start">
          <DialogTitle>Create a group chat</DialogTitle>
          <DialogDescription>
            Create a chat with more than 2 people.
          </DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="members"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Members</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        isMulti={true}
                        options={data?.map((user) => ({
                          value: user.id,
                          label: user.name ?? "",
                        }))}
                        isSearchable={true}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isLoading} type="submit">
                Create
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
