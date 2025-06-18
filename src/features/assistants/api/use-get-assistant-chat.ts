import { useQuery } from "@tanstack/react-query";
import { getAssistantChat } from "../actions";

export const useGetAssistantChat = (assistantId: string) => {
  const query = useQuery({
    queryKey: ["private-chat", assistantId],
    queryFn: async () => {
      const data = await getAssistantChat(assistantId);

      return data;
    },
  });

  return query;
};
