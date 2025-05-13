import { loadDashboardData } from "@/app/(private)/actions/dashboard";
import { useQuery } from "@tanstack/react-query";

export const useGetDashboardData = (startDate?: string, endDate?: string) => {
  const query = useQuery({
    queryKey: ["dashboard", startDate, endDate],
    queryFn: async () => {
      const { teamData, barChartData, pieChartData, access, assistants } =
        await loadDashboardData();


      return {
        access,
        teamData,
        barChartData,
        pieChartData,
        assistants
      };
    },
  });

  return query;
};
