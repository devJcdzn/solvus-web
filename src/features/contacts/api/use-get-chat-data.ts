import { getChatData } from "@/app/(private)/(user)/contact/actions";
import { useQuery } from "@tanstack/react-query";

export const useGetChatData = (remoteJid: string) => {
  const query = useQuery({
    queryKey: ["chat", remoteJid],
    queryFn: async () => {
      try {
        const data = await getChatData(remoteJid);

        return data;
      } catch (err) {
        throw new Error((err as Error).message);
      }
    },
    refetchInterval: 1000 * 60 * 5,
  });

  return query;
};
