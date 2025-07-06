"use client";

import { useGetIntegrations } from "@/features/integrations/api/use-get-integrations";
import Loading from "../../loading";
import { IntegrationsCard } from "./_components/integrations-card";

export default function IntegrationsPage() {
  const { data, isLoading } = useGetIntegrations();

  if (!data || isLoading) return <Loading />;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-6 gap-4">
      {data.channels.map((integration) => (
        <IntegrationsCard channel={integration} key={integration.id} />
      ))}
    </div>
  );
}
