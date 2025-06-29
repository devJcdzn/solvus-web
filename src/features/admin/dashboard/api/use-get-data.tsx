import { useQuery } from "@tanstack/react-query";
import { formatISO, parse } from "date-fns";
import { loadDashboardData } from "../actions";

export const useGetData = (startDate?: string, endDate?: string) => {
  const query = useQuery({
    queryKey: ["adminDash"],
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
