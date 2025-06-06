import { Card, CardTitle } from "@/components/ui/card";

export const ChatsData = ({
  data,
}: {
  data: {
    teamData: {
      primaryColor: string;
    };
    messages_length: number;
    chats_length: number;
  };
}) => {
  return (
    <Card className="py-4 px-6 border-none">
      <div className="flex items-center justify-between">
        <div className="grid gap-1">
          <CardTitle>Mensagens</CardTitle>
          <span
            className="text-3xl font-bold"
            style={{ color: data.teamData.primaryColor }}
          >
            {data.messages_length}
          </span>
        </div>
        <div className="grid gap-1">
          <CardTitle className="text-right">Conversas</CardTitle>
          <span
            className="text-3xl font-bold text-right"
            style={{ color: data.teamData.primaryColor }}
          >
            {data.chats_length}
          </span>
        </div>
      </div>
    </Card>
  );
};
