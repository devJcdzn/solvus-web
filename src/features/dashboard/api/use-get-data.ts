import { loadDashboardData } from "@/app/(private)/actions/dashboard";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetDashboardData = (startDate?: string, endDate?: string) => {
  const query = useQuery({
    queryKey: ["dashboard", startDate, endDate],
    queryFn: async () => {
      const { teamData, barChartData, pieChartData } =
        await loadDashboardData();

        console.log("Query feita")
    
        return {
            teamData,
            barChartData,
            pieChartData
        }
    },
  });

  return query;
};
