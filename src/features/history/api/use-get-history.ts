import { useQuery } from "@tanstack/react-query";
import { getHistory } from "../actions";

export const useGetHistory = () => {
  const query = useQuery({
    queryKey: ["history"],
    queryFn: async () => {
      const data = await getHistory();

      return data.conversas;
    },
  });

  return query;
};
