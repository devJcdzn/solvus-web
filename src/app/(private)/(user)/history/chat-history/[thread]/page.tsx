export default function ChatHistoryPage({
  params,
}: {
  params: { thread: string };
}) {
  return <p>{params.thread}</p>;
}
