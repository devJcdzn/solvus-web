import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { GuestAssistantResponse } from "../types";

export const useGetGuestChat = (chatSlug: string) => {
  const query = useQuery({
    queryKey: ["guest-chat", chatSlug],
    queryFn: async () => {
      const { data } = await api.post<GuestAssistantResponse>(
        "/getGuestAssistant",
        {
          assistente: chatSlug,
        }
      );

      return data;
    },
  });

  return query;
};
