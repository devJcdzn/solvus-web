"use client";

import { useParams } from "next/navigation";

export default function AssistantPage() {
  const params = useParams();
  const assId = params.assistantId as string;

  return assId;
}
