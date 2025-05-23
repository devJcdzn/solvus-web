"use client";

import Loading from "../../loading";
import { LeadsCard } from "./_components/leads-card";
import { useGetLeads } from "@/features/leads/api/use-get-leads";

export default function LeadsPage() {
  const { data, isLoading } = useGetLeads();

  if (!data || isLoading) return <Loading />;

  return (
    <div className="p-6 mt-5 bg-background rounded-xl border">
      <div className="px-2 md:px-6 grid grid-cols-1 gap-6">
        {data?.conversas && Object.keys(data.conversas).length > 0 ? (
          Object.entries(data.conversas).map(([assistantName, conversas]) =>
            Array.isArray(conversas) && conversas.length > 0 ? (
              <div key={assistantName}>
                <div className="px-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {conversas.map((contact) => {
                    const firstWord = contact.nome?.split("-")[0]?.trim() || "";
                    const fallback = /^\d/.test(firstWord)
                      ? contact.nome?.split("-")[1]?.trim()[0] || ""
                      : firstWord[0] || "";

                    return (
                      <LeadsCard key={contact.remoteJid} contact={contact} />
                    );
                  })}
                </div>
              </div>
            ) : null
          )
        ) : (
          <div className="px-3 py-3 text-muted-foreground text-center">
            Nenhuma conversa disponível
          </div>
        )}
      </div>
    </div>
  );
}
