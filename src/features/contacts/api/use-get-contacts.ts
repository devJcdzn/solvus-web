import { getContacts } from "@/app/(private)/(user)/contact/actions";
import { useQuery } from "@tanstack/react-query";

export const useGetContacts = () => {
  const query = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      try {
        const chats = await getContacts();

        return chats;
      } catch (err) {
        console.log(err);
      }
    },
  });

  return query
};
