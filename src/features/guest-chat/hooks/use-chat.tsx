import { useState, useEffect } from "react";
import { useSendMessage } from "../conversation/use-send-message";
import { Daum } from "../conversation/types";
import { ChatMessage } from "../types";

export function useChat(initialThreadId: string | null, agentData: any) {
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [conversation, setConversation] = useState<Daum[]>([]);
  const [threadId, setThreadId] = useState<string | null>(initialThreadId);
  const [message, setMessage] = useState("");

  const { mutate, isPending } = useSendMessage();

  const sendMessage = () => {
    if (!message.trim() || isPending) return;

    const userMessage: ChatMessage = {
      fromChat: false,
      message: message.trim(),
      timestamp: new Date(),
    };

    setChat((prev) => [...prev, userMessage]);
    setMessage("");

    mutate(
      {
        message: userMessage.message,
        assistantId: agentData.agente.ass_id,
        sk: agentData.agente.sk,
        ...(threadId ? { thread_id: threadId } : {}),
      },
      {
        onSuccess: (response) => {
          const firstDaum = response[0].data[0];
          const assistantMessage = firstDaum?.content?.[0]?.text.value ?? "";

          if (assistantMessage) {
            setChat((prev) => [
              ...prev,
              {
                fromChat: true,
                message: assistantMessage,
                timestamp: new Date(),
              },
            ]);
          }

          setThreadId(firstDaum?.thread_id ?? threadId);
          setConversation(response[0].data);
        },
      }
    );
  };

  useEffect(() => {
    if (conversation.length > 0 && !threadId) {
      setThreadId(conversation[conversation.length - 1].thread_id ?? null);
    }
  }, [conversation, threadId]);

  return {
    chat,
    message,
    setMessage,
    sendMessage,
    isPending,
  };
}
