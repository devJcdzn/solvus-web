"use client";
import { useSearchParams } from "next/navigation";
import Loading from "../../loading";

export default function Home() {
  const params = useSearchParams();

  const startDate = params.get("from") || "";
  const endDate = params.get("to") || "";

  //   const { data, isLoading } = useGetDashboardData(startDate, endDate);

  //   if (!data || isLoading) return <Loading />;

  return <Loading />;
}
