import { ChatContent } from "./_components/chat-content";

export default function ChatHistoryPage({
  params,
}: {
  params: { thread: string };
}) {
  return (
    <div className="p-6 mt-5 bg-background rounded-xl border">
      <p className="text-sm text-muted-foreground">{params.thread}</p>
      <ChatContent />
    </div>
  );
}
