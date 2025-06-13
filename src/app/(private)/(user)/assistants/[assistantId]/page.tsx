"use client";

import { useParams } from "next/navigation";

export default function AssistantPage() {
  const params = useParams();
  const assId = params.assistantId as string;

  return (
    <div className="flex flex-col h-screen items-center justify-center max-w-5xl mx-auto px-6 md:px-0">
      <div className="grid place-items-center mb-10">{assId}</div>
    </div>
  );
}
