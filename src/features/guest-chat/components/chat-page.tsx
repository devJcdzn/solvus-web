// "use client";

// import { useParams } from "next/navigation";
// import { useGetGuestChat } from "@/features/guest-chat/api/use-get-guest-chat";
// import { useChat } from "@/features/guest-chat/hooks/use-chat";
//  import { ChatHeader } from "@/features/guest-chat/components/ChatHeader";
//  import { MessageList } from "@/features/guest-chat/components/MessageList";
//  import { InputArea } from "@/features/guest-chat/components/InputArea";
//  import { InitialChat } from "../_components/initial-chat";
// import { useScrollToBottom } from "@/features/guest-chat/hooks/useScrollToBottom";

// export default function ChatPage() {
//   const { chat: chatSlug } = useParams<{ chat: string }>();
//   const { data, isLoading, isError } = useGetGuestChat(chatSlug);

//   const { chat, message, setMessage, sendMessage, isPending } = useChat(
//     null,
//     data
//   );
//   const { messagesEndRef, scrollToBottom } = useScrollToBottom(chat);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     sendMessage();
//   };

//   if (isLoading) return <p>Carregando...</p>;
//   if (isError || !data) return <p>Erro ao carregar o chat.</p>;

//   return (
//     <div className="container mx-auto px-6">
//       {chat.length > 0 ? (
//         <>
//           <ChatHeader />
//           <MessageList chat={chat} ref={messagesEndRef} />
//           <InputArea
//             message={message}
//             setMessage={setMessage}
//             onSubmit={handleSubmit}
//             disabled={isPending}
//           />
//         </>
//       ) : (
//         <InitialChat
//           data={data}
//           message={message}
//           onSubmit={handleSubmit}
//           setMessage={setMessage}
//         />
//       )}
//     </div>
//   );
// }
