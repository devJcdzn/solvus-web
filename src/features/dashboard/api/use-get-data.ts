import { loadDashboardData } from "@/app/(private)/(user)/actions/dashboard";
import { useQuery } from "@tanstack/react-query";
import { format, formatISO, parse } from "date-fns";

export const useGetDashboardData = (startDate?: string, endDate?: string) => {
  const query = useQuery({
    queryKey: ["dashboard", startDate, endDate],
    queryFn: async () => {
      if (startDate && endDate) {
        const parsedStart = parse(startDate, "dd-MM-yyyy", new Date());
        const parsedEnd = parse(endDate, "dd-MM-yyyy", new Date());

        const startUTC = formatISO(parsedStart, { representation: "date" });
        const endUTC = formatISO(parsedEnd, { representation: "date" });

        const { teamData, barChartData, pieChartData, access, assistants } =
          await loadDashboardData(startUTC, endUTC);

        return {
          access,
          teamData,
          barChartData,
          pieChartData,
          assistants,
        };
      }

      const { teamData, barChartData, pieChartData, access, assistants } =
        await loadDashboardData();

      return {
        access,
        teamData,
        barChartData,
        pieChartData,
        assistants,
      };
    },
  });

  return query;
};
