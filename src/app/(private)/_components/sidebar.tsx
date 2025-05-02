"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bot, FileClock, Gauge, LogOut, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const sidebarLinks = [
  {
    title: "Dashboard",
    path: "/",
    icon: Gauge,
  },
  {
    title: "Assistentes Solvus",
    path: "/assistants-solvus",
    icon: Sparkles,
  },
  {
    title: "Assistentes",
    path: "/assistants",
    icon: Bot,
  },
  {
    title: "Histórico",
    path: "/history",
    icon: FileClock,
  },
];

export const DashboardSidebar = () => {
  return (
    <aside className="pt-6 px-4 min-w-1/6 border-r bg-background flex flex-col items-center">
      <div className="flex flex-col items-center pb-4 border-b w-full">
        <Image
          src={"/logo-t.png"}
          width={200}
          height={200}
          alt="logo-solvus.png"
          className="object-cover size-16"
        />
        <h2 className="text-2xl font-semibold capitalize">Solvus</h2>
      </div>
      <div className="flex-1 w-full py-4 border-b">
        <nav className="flex flex-col gap-2">
          {sidebarLinks.map((link) => (
            <Link
              key={link.path}
              className="flex gap-2 p-2 rounded hover:bg-secondary transition-colors 
              items-center text-slate-950"
              href={link.path}
            >
              <link.icon className="size-5" />
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
      <footer className="py-4">
        <div className="flex items-center gap-8 justify-between">
          <div className="flex items-center">
            <Avatar className="size-12">
              <AvatarFallback>J</AvatarFallback>
            </Avatar>
            <span className="text-slate-950 text-sm">Jean Carlos</span>
          </div>
          <Button variant={"ghost"}>
            <LogOut className="size-5" />
          </Button>
        </div>
      </footer>
    </aside>
  );
};
