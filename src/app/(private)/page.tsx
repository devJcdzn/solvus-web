import { MultiBarChart } from "@/components/bar-chart";
import { DashboardPieChart } from "@/components/pie-chart";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { FilterData } from "./_components/filter-data";
import { getSessionData } from "../(public)/(auth)/login/actions/login-action";

export default async function Home() {
  const userInfo = await getSessionData();

  const teamData = {
    primaryColor: userInfo?.time.cor_primaria,
    secondaryColor: userInfo?.time.cor_secundaria,
  }

  return (
    <div className="p-6 mt-5 bg-background rounded-xl border">
      <div className="flex gap-2 w-full  flex-col sm:flex-row items-center justify-between mb-6">
        <FilterData />
        <Button size={"sm"} variant={"outline"} className="w-full sm:w-fit">
          <Download />
          Baixar dados
        </Button>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <MultiBarChart team={teamData} />
        <DashboardPieChart team={teamData} />
      </div>
    </div>
  );
}
