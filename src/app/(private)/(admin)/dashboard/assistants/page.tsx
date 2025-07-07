"use client";

import { useGetAssistants } from "@/features/assistants/api/use-get-assistants";
import { AssistantCard } from "@/app/(private)/(user)/assistants/_components/assistant-card";
import Loading from "@/app/(private)/loading";
import { useRouter } from "next/navigation";

export default function AdminAssistantsPage() {
  const router = useRouter();

  const { data, isLoading } = useGetAssistants();

  const handleAssistantChat = (assistantId: string) => {
    router.push(`/assistants/${assistantId}`);
  };

  if (!data || isLoading) return <Loading />;

  return (
    <div className="p-6 mt-5 bg-background rounded-xl border">
      <div className="px-2 md:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.agents.map((agent) => (
          <AssistantCard
            key={agent.ass_id}
            agent={agent}
            handleClick={() => handleAssistantChat(agent.id)}
          />
        ))}
      </div>
    </div>
  );
}
