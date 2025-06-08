import { useQuery } from "@tanstack/react-query";

export const useGetHistoryChat = (threadId: string) => {
  const query = useQuery({
    queryKey: ["chat-history", threadId],
    queryFn: async () => {

    }
  });

  return query;
};
