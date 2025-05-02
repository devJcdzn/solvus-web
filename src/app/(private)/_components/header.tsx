"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderBreadcrumb = ({ path }: { path: string }) => {
  const segments = path.split("/").filter(Boolean); // remove vazios
  const fullPaths = segments.map(
    // biome-ignore lint/style/useTemplate: <explanation>
    (_, i) => "/" + segments.slice(0, i + 1).join("/")
  );

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        {segments.map((segment, i) => (
          <>
            <BreadcrumbSeparator key={`sep-${segment + i}`} />
            <BreadcrumbItem key={fullPaths[i]}>
              <BreadcrumbLink className="capitalize" href={fullPaths[i]}>
                {segment.replace(/-/g, " ")}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export const DashboardHeader = () => {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <header className="flex p-4 border justify-between items-center">
      <HeaderBreadcrumb path={pathname} />
      <div className="flex items-center gap-4 p-2 rounded-full bg-background">
        <form action="">
          <Input
            type="text"
            placeholder="Pesquisar"
            className="bg-background rounded-full"
          />
        </form>

        <Link
          href={"/about"}
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "rounded-full"
          )}
        >
          <Info className="size-5 text-muted-foreground" />
        </Link>

        <Avatar className="" asChild>
          <Link href={"/account"}>
            <AvatarFallback className="">J</AvatarFallback>
          </Link>
        </Avatar>
      </div>
    </header>
  );
};
