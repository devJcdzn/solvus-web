import { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";

interface InputAreaProps {
  message: string;
  setMessage: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  disabled: boolean;
}

export function InputArea({
  message,
  setMessage,
  onSubmit,
  disabled,
}: InputAreaProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full gap-2 items-center pt-3 border-t"
    >
      <Input
        placeholder="Digite sua mensagem..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={disabled}
        className="p-3 bg-muted"
      />
      <Button type="submit" size="icon" disabled={!message.trim() || disabled}>
        <SendHorizonal className="size-4" />
      </Button>
    </form>
  );
}
