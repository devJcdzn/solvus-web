import { getProfileInfo } from "@/app/(private)/(user)/account/actions";
import { useQuery } from "@tanstack/react-query";

export const useGetUserInfo = () => {
  const query = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await getProfileInfo();

      if (!response) throw new Error("Erro ao buscar informações do perfil.");

      return response;
    },
    refetchInterval: 1000 * 60 * 5
  });

  return query;
};
