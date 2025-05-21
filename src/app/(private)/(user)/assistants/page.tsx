"use client";

import { useGetAssistants } from "@/features/assistants/api/use-get-assistants";
import { AssistantCard } from "./_components/assistant-card";

export default function AssistantsPage() {
  const { data, isLoading } = useGetAssistants();

  if (!data || isLoading) return <p>Carregando...</p>;

  return (
    <div className="p-6 mt-5 bg-background rounded-xl border">
      <div className="px-2 md:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.agents.map((agent) => (
          <AssistantCard key={agent.ass_id} agent={agent} />
        ))}
      </div>
    </div>
  );
}
