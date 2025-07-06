import { getAuthToken } from "@/features/auth/actions";
import { useQuery } from "@tanstack/react-query";
import { getIntegrations } from "../actions";

export const useGetIntegrations = () => {
  const query = useQuery({
    queryKey: ["integrations"],
    queryFn: async () => {
      const data = await getIntegrations();

      return data;
    },
  });

  return query;
};
