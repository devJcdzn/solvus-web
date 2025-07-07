import { getAssistants } from "@/app/(private)/(user)/assistants/actions";
import { useQuery } from "@tanstack/react-query";

export const useGetAssistants = () => {
  const query = useQuery({
    queryKey: ["assistants"],
    queryFn: async () => {
      const response = await getAssistants();

      console.log(response);

      if (!response) return;

      return {
        agents: response.agentes,
      };
    },
  });

  return query;
};
