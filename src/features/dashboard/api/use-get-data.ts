import { loadDashboardData } from "../actions";
import { useQuery } from "@tanstack/react-query";
import { formatISO, parse } from "date-fns";

export const useGetDashboardData = (startDate?: string, endDate?: string) => {
  const query = useQuery({
    queryKey: ["dashboard", startDate, endDate],
    queryFn: async () => {
      if (startDate && endDate) {
        const parsedStart = parse(startDate, "dd-MM-yyyy", new Date());
        const parsedEnd = parse(endDate, "dd-MM-yyyy", new Date());

        const startUTC = formatISO(parsedStart, { representation: "date" });
        const endUTC = formatISO(parsedEnd, { representation: "date" });

        const data = await loadDashboardData(startUTC, endUTC);

        return data;
      }

      const data = await loadDashboardData();

      return data;
    },
    refetchInterval: 5 * 60 * 1000,
  });

  return query;
};
