import { useQuery } from "@tanstack/react-query";
import { getGuestChat } from "../actions";

export const useGetGuestChat = (chatSlug: string) => {
  const query = useQuery({
    queryKey: ["guest-chat", chatSlug],
    queryFn: async () => {
      const data = await getGuestChat(chatSlug);

      return data;
    },
  });

  return query;
};
