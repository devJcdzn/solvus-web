"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function CreateCampaigns() {
  const [campaignType, setCampaignType] = useState<"email" | "whatsapp">(
    "email"
  );
  const [emailType, setEmailType] = useState<"regular" | "test">("regular");
  const [name, setName] = useState<string>("");

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleBack = () => {
    router.back();
  };

  const handleCreate = () => {
    const params = new URLSearchParams(searchParams);
    params.set("campaignType", campaignType);
    if (campaignType === "email") {
      params.set("emailType", emailType);
    }
    params.set("name", name);

    router.push(`/mailbox/send?${params.toString()}`);
  };

  return (
    <div className="p-6 mt-5 bg-background rounded-xl border">
      <div className="px-2 md:px-6 grid grid-cols-1 gap-6">
        <header className="py-2 flex items-center w-full gap-4 md:gap-6">
          <Button onClick={handleBack} variant={"ghost"}>
            <ArrowLeft />
            Voltar
          </Button>
          <h2 className="text-2xl">Criar campanha</h2>
        </header>

        <div className="flex flex-col w-full gap-2 items-center">
          <div className="flex gap-1 w-full max-w-lg p-1">
            <Button
              onClick={() => setCampaignType("email")}
              className={cn(
                "rounded-sm flex-1",
                campaignType === "email"
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-transparent hover:bg-gray-200 text-black"
              )}
            >
              Email
            </Button>
            {/* <Button
              onClick={() => setCampaignType("whatsapp")}
              className={cn(
                "rounded-sm flex-1",
                campaignType === "whatsapp"
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-100 hover:bg-gray-200 text-black"
              )}
            >
              WhatsApp
            </Button> */}
          </div>

          {campaignType === "email" && (
            <div className="flex gap-1 w-full max-w-lg p-1">
              <Button
                onClick={() => setEmailType("regular")}
                className={cn(
                  "rounded-sm flex-1",
                  emailType === "regular"
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-transparent hover:bg-gray-200 text-black"
                )}
              >
                Regular
              </Button>
              <Button
                onClick={() => setEmailType("test")}
                className={cn(
                  "rounded-sm flex-1",
                  emailType === "test"
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-100 hover:bg-gray-200 text-black"
                )}
              >
                AB/Test
              </Button>
            </div>
          )}

          <div className="grid gap-1 mt-4 max-w-lg w-full">
            <label htmlFor="name" className="font-semibold">
              Nome da Campanha
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome da campanha"
              className=""
            />
          </div>

          <Button
            onClick={handleCreate}
            className="bg-blue-500 hover:bg-blue-600 w-full max-w-lg mt-2 rounded-sm"
          >
            Criar Campanha
          </Button>
        </div>
      </div>
    </div>
  );
}
