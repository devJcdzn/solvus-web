"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  Bot,
  FileClock,
  Gauge,
  LogOut,
  MenuIcon,
  Sparkles,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const SidebarContext = createContext(
  {} as { expanded: boolean; setExpanded: Dispatch<SetStateAction<boolean>> }
);

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
  const { expanded, setExpanded } = useContext(SidebarContext);

  return (
    <aside
      className={cn(
        "pt-6 px-4 border-r transition-transform bg-background flex flex-col items-center min-h-screen",
        "sm:static sm:translate-x-0 sm:w-20", // comportamento em telas médias+
        "fixed top-0 left-0 z-50 w-64", // comportamento mobile
        expanded
          ? "translate-x-0 sm:min-w-1/3 lg:min-w-1/6"
          : "-translate-x-full", // slide
        "duration-300 ease-in-out"
      )}
    >
      <div className="absolute top-4 right-4 sm:hidden">
        <Button
          onClick={() => setExpanded(false)}
          variant={"outline"}
          size={"icon"}
        >
          <X className="size-4" />
        </Button>
      </div>
      <div
        className={cn(
          "flex overflow-hidden flex-col items-center pb-4 border-b w-full"
        )}
      >
        <Image
          src={"/logo-t.png"}
          width={200}
          height={200}
          alt="logo-solvus.png"
          className="object-cover size-10"
        />
        <h2
          className={cn(
            "text-lg font-semibold capitalize transition-all whitespace-nowrap",
            expanded ? "opacity-100 ml-2" : "opacity-0 ml-0 w-0 overflow-hidden"
          )}
        >
          Solvus
        </h2>
      </div>

      {/* Nav */}
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
              <span
                className={cn(
                  "transition-all whitespace-nowrap",
                  expanded
                    ? "opacity-100 ml-2"
                    : "opacity-0 ml-0 w-0 overflow-hidden"
                )}
              >
                {link.title}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <footer className="py-4">
        <div className="flex items-center gap-8 justify-between">
          <div
            className={cn(
              "flex items-center transition-all overflow-hidden",
              !expanded ? "w-0 hidden" : ""
            )}
          >
            <Avatar className="size-12">
              <AvatarFallback>J</AvatarFallback>
            </Avatar>
            <span className="text-slate-950 text-xs">Jean Carlos</span>
          </div>
          <Button variant={"ghost"}>
            <LogOut className="size-5" />
          </Button>
        </div>
      </footer>
    </aside>
  );
};

export const SidebarTrigger = () => {
  const { expanded, setExpanded } = useContext(SidebarContext);

  return (
    <Button onClick={() => setExpanded(!expanded)} variant={"outline"}>
      <MenuIcon className="size-4" />
    </Button>
  );
};

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    setExpanded(isDesktop); // autoexpande somente em telas grandes
  }, [isDesktop]);

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded }}>
      <main className="flex min-h-screen bg-secondary">
        {expanded && (
          // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
          <div
            onClick={() => setExpanded(false)}
            className="fixed inset-0 bg-black/40 z-40 sm:hidden"
          />
        )}
        <DashboardSidebar />
        <div className="py-6 px-4 w-full">{children}</div>
      </main>
    </SidebarContext.Provider>
  );
};
