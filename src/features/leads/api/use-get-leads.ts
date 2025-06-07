import { getLeads } from "@/app/(private)/(user)/leads/actions";
import { useQuery } from "@tanstack/react-query";

export const useGetLeads = (orderby?: string, leadsQuery?: string) => {
  const query = useQuery({
    queryKey: ["leads", orderby, leadsQuery],
    queryFn: async () => {
      const data = await getLeads(orderby, leadsQuery);

      return data;
    },
  });

  return query;
};
