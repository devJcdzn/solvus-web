import { getLeads } from "@/app/(private)/(user)/leads/actions";
import { useQuery } from "@tanstack/react-query";

export const useGetLeads = () => {
  const query = useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      const data = await getLeads();

      return data;
    },
  });

  return query;
};
