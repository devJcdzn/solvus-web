import { MultiBarChart } from "@/components/bar-chart";
import { DashboardPieChart } from "@/components/pie-chart";
import { FilterData } from "./_components/filter-data";

export default function Home() {
  return (
    <div className="p-6 mt-5 bg-background rounded-xl border">
      <div className="flex items-center justify-end mb-2">
        <FilterData />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <MultiBarChart />
        <DashboardPieChart />
      </div>
    </div>
  );
}
