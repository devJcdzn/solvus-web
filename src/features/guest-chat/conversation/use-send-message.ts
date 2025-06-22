import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChatResponseMessage } from "./types";

export const useSendMessage = () => {
  const mutation = useMutation({
    mutationKey: ["message-send"],
    mutationFn: async (messagePayload: any) => {
      const data = {
        message: messagePayload.message,
        messageType: "conversation",
        assistant_id: messagePayload.assistantId,
        sk: messagePayload.sk,
        thread_id: messagePayload.thread_id,
      };

      const { data: response } = await axios.post<ChatResponseMessage[]>(
        "https://webhook.dev.solvus.io/webhook/app-solvus-guest",
        data
      );

      console.log(response);

      return response;
    },
  });

  return mutation;
};
