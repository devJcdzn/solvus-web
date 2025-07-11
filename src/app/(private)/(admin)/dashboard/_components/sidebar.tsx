"use client";

import { logout } from "@/app/(public)/(auth)/admin/login/actions/login-action";
import { UserData } from "@/app/(public)/(auth)/types/user-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useGetUserInfo } from "@/features/user/api/use-get-user-info";
import { useMediaQuery } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  Bot,
  ChartCandlestick,
  Contact,
  FileClock,
  Gauge,
  LogOut,
  Mailbox,
  MenuIcon,
  Network,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const SidebarContext = createContext(
  {} as {
    expanded: boolean;
    setExpanded: Dispatch<SetStateAction<boolean>>;
    userData?: Partial<UserData>;
    adminData?: Partial<UserData>;
  }
);

const sidebarLinks = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: Gauge,
  },
  {
    title: "Assistentes",
    path: "/dashboard/assistants",
    icon: Bot,
  },
  {
    title: "Campanhas",
    path: "#",
    icon: ChartCandlestick,
  },
  {
    title: "Leads",
    path: "#",
    icon: Contact,
  },
  {
    title: "Conversas",
    path: "#",
    icon: Users,
  },
  {
    title: "Integrações",
    path: "#",
    icon: Network,
  },
  {
    title: "Histórico",
    path: "#",
    icon: FileClock,
  },
  {
    title: "Mailbox",
    path: "#",
    icon: Mailbox,
  },
];

export const DashboardSidebar = () => {
  const { expanded, setExpanded, userData, adminData } =
    useContext(SidebarContext);
  const { data } = useGetUserInfo();

  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    redirect("/admin/login");
  };

  const userName =
    data?.usuario.nome.split(" ")[0] ||
    adminData?.usuario?.nome.split(" ")[0] ||
    userData?.usuario?.nome.split(" ")[0];

  const teamData = {
    name: adminData?.time?.nome || userData?.time?.nome || "Solvus - DevTeam",
    primaryColor: adminData?.time?.cor_primaria || userData?.time?.cor_primaria,
    secondaryColor: adminData?.time?.cor_secundaria || userData?.time?.cor_secundaria,
    logo: adminData?.time?.logo || userData?.time?.logo,
  };

  const logoUrl = teamData.logo
    ? new URL(teamData.logo, process.env.NEXT_PUBLIC_S3_FILES).toString()
    : "/fallback-logo.png";

  return (
    <aside
      className={cn(
        "pt-6 px-4 pb-4 border transition-transform sm:ml-4 sm:my-4 sm:rounded-xl bg-background flex flex-col items-center min-h-screen sm:min-h-0 sm:max-h-[calc(100vh-2rem)]",
        "sm:static sm:translate-x-0 sm:w-20", // desktop
        "fixed top-0 left-0 z-50 w-64", // mobile
        expanded
          ? "translate-x-0 sm:min-w-1/3 lg:min-w-1/6"
          : "-translate-x-full",
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
          src={logoUrl}
          width={200}
          height={200}
          alt="logo-solvus.png"
          className="object-contain size-10"
        />
        <h2
          className={cn(
            "text-lg font-semibold capitalize transition-all whitespace-nowrap --font-plus-jacarta",
            expanded ? "opacity-100" : "opacity-0 ml-0 w-0 overflow-hidden"
          )}
        >
          {data?.time.nome || adminData?.time?.nome || userData?.time?.nome || teamData.name} - Admin
        </h2>
      </div>

      {/* Nav */}
      <div className="flex-1 w-full py-4 border-b">
        <nav className="flex flex-col gap-2">
          {sidebarLinks.map((link, index) => {
            const active = pathname === link.path;

            return (
              <Link
                key={index}
                className={cn(
                  "flex p-2 rounded hover:bg-secondary transition-colors items-center text-slate-950",
                  active
                    ? `bg-muted-foreground/10 text-[${teamData.primaryColor}] font-semibold`
                    : ""
                )}
                style={{ color: active ? teamData.primaryColor : "" }}
                href={link.path}
              >
                <link.icon className="size-5" />
                <span
                  className={cn(
                    "transition-all whitespace-nowrap",
                    expanded
                      ? "opacity-100 ml-2"
                      : "opacity-0 ml-0 w-0 hidden overflow-hidden"
                  )}
                >
                  {link.title}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <footer className="py-4 w-full">
        <div className="flex items-center justify-between">
          <div
            className={cn(
              "flex items-center gap-2 flex-1 transition-all overflow-hidden",
              !expanded ? "w-0 hidden" : ""
            )}
          >
            <Avatar className="size-10">
              <AvatarImage
                src={`${process.env.NEXT_PUBLIC_S3_FILES}/${adminData?.time?.logo || userData?.time?.logo}`}
                className="object-contain"
              />
              <AvatarFallback>
                {data?.usuario.nome[0] || adminData?.usuario?.nome[0] || userData?.usuario?.nome[0]}
              </AvatarFallback>
            </Avatar>
            <span className="text-slate-950 text-xs">{userName}</span>
          </div>
          <Button variant={"ghost"} onClick={handleLogout}>
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

export const SidebarProvider = ({
  children,
  userData,
  adminData,
}: {
  children: ReactNode;
  userData?: Partial<UserData>;
  adminData?: Partial<UserData>;
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    setExpanded(isDesktop);
  }, [isDesktop]);

  return (
    <SidebarContext.Provider
      value={{ expanded, setExpanded, userData, adminData }}
    >
      <main className="flex h-screen min-h-screen bg-secondary overflow-hidden">
        {expanded && (
          <div
            onClick={() => setExpanded(false)}
            className="fixed inset-0 bg-black/40 z-40 sm:hidden"
          />
        )}
        <DashboardSidebar />
        <div className="py-3 px-4 w-full h-screen overflow-y-auto flex flex-col">
          {children}
        </div>
      </main>
    </SidebarContext.Provider>
  );
};
