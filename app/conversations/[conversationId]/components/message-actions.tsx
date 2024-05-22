"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { FullMessageType } from "@/types";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { toast } from "sonner";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useMessageStore } from "@/store/messages";
interface MessageAction {
  data: FullMessageType;
  isOwn: boolean;
}

export const MessageActions: React.FC<MessageAction> = ({ data, isOwn }) => {
  const { messages, setMessages } = useMessageStore();
  const user = useCurrentUser();
  const onDelete = async () => {
    try {
      const deleteData = await axios.delete(`/api/messages/${data.id}`);
      if (deleteData.statusText !== "OK") {
        toast.error("Something went wrong!");
      }
      const filterData = messages.filter((dataItem) => {
        return dataItem.id !== deleteData.data.id;
      });
      toast.success("The message has been successfully deleted.");
      setMessages(filterData);
    } catch (error) {
      console.error("Error deleting message", error);
    }
  };
  return (
    <div className="text-gray-600  flex gap-2 relative  ">
      {isOwn && (
        <AlertDialog>
          <AlertDialogTrigger>
            <div className="">
              <FaTrash size={15} />
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Do you want to delete this message?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Before proceeding to delete this message, we want to remind you
                that this action will be irreversible. Once you delete the
                message, you will not be able to recover it.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};
