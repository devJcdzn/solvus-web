import { useMutation } from "@tanstack/react-query";
import { ConversationResponse, MessagePayload } from "./types";
import axios from "axios";

export const useSendMessage = () => {
  const mutation = useMutation({
    mutationKey: ["message-send-platform"],
    mutationFn: async (payload: MessagePayload) => {
      const { data } = await axios.post<ConversationResponse[]>(
        "https://webhook.dev.solvus.io/webhook/app-solvus",
        payload
      );

      return data;
    },
  });

  return mutation;
};
