import { useQuery } from "@tanstack/react-query";
import { getHistoryChat } from "../actions";

export const useGetHistoryChat = (threadId: string) => {
  const query = useQuery({
    queryKey: ["chat-history", threadId],
    queryFn: async () => {
      const data = await getHistoryChat(threadId);

      return data;
    },
  });

  return query;
};
