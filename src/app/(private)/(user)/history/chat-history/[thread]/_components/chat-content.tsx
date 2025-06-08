"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetHistoryChat } from "@/features/history/api/use-get-history-chat";
import { cn } from "@/lib/utils";
import { Sparkles, User } from "lucide-react";
import { useParams } from "next/navigation";

const ChatContentSkeleton = () => {
  return Array.from({ length: 4 }).map((_, index) => (
    <div
      key={index}
      className={cn("flex justify-between w-full gap-6 items-start")}
    >
      <Skeleton className="size-10 rounded-full" />
      <Skeleton className="h-12 w-full rounded-lg" />
    </div>
  ));
};

export const ChatContent = () => {
  const params = useParams() as { thread: string };
  const { data, isLoading } = useGetHistoryChat(params.thread);

  return (
    <div className="min-h-[60vh]">
      <div className="px-4 py-3 shadow-md mt-4 md:mt-8 rounded-lg space-y-6 h-[50vh] overflow-y-auto">
        {!data || isLoading ? (
          <ChatContentSkeleton />
        ) : (
          <>
            {data.mensagens.map((message, index) => (
              <div
                key={message.id}
                className={cn("flex justify-between w-full gap-6 items-start")}
              >
                <Avatar className="size-10">
                  {index % 2 !== 0 ? (
                    <>
                      <AvatarImage
                        src={`${process.env.NEXT_PUBLIC_S3_FILES}/${data.agente.avatar}`}
                        className="object-cover"
                      />
                      <AvatarFallback>
                        <Sparkles className="size-8" />
                      </AvatarFallback>
                    </>
                  ) : (
                    <AvatarFallback>
                      <User className="size-8" />
                    </AvatarFallback>
                  )}
                </Avatar>

                <div
                  className={cn(
                    "border p-3 w-full rounded-lg",
                    index % 2 !== 0 ? "border-none shadow-sm font-semibold" : ""
                  )}
                >
                  {message.conteudo}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="mx-auto bg-muted w-fit mt-8 p-4 rounded-lg text-sm">
        Conversa Encerrada
      </div>
    </div>
  );
};
