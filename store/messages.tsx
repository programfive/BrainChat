
import {create} from 'zustand';
import { FullMessageType } from '@/types';

interface MessageState {
  messages: FullMessageType[];
  setMessages: (messages: FullMessageType[]) => void;
  addMessage: (message: FullMessageType) => void;
  updateMessage: (newMessage: FullMessageType) => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],
  setMessages: (messages) => set({ messages }),
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message]
    })),
  updateMessage: (newMessage) =>
    set((state) => ({
      messages: state.messages.map(msg =>
        msg.id === newMessage.id ? newMessage : msg
      )
    }))
}));
