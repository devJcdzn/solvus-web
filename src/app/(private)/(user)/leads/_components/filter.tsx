"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Filter, X } from "lucide-react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const FilterLeads = () => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const orderBy = params.get("order") || "";
  const leadsQuery = params.get("q") || "";

  const [order, setOrder] = useState(orderBy);
  const [query, setQuery] = useState(leadsQuery);

  useEffect(() => {
    const orderBy = params.get("order");
    const leadsQuery = params.get("q");

    if (orderBy) setOrder(orderBy);
    if (leadsQuery) setQuery(leadsQuery);
  }, [searchParams]);

  const handleFilter = () => {
    if (order) {
      params.set("order", order);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const handleRemoveFilters = () => {
    params.delete("order");
    params.delete("q");
    replace(`${pathname}`);
  };

  return (
    <div className="flex items-center justify-between gap-2 w-full sm:w-fit">
      <div className={cn("grid gap-2 flex-1 sm:flex-none")}>
        <Select defaultValue={order} onValueChange={(e) => setOrder(e)}>
          <SelectTrigger>
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="asc">Crescente (A-Z)</SelectItem>
              <SelectItem value="desc">Decrescente (Z-A)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Button
        onClick={handleFilter}
        size={"sm"}
        className="bg-foreground w-fit rounded-lg sm:w-auto hover:bg-foreground/90"
      >
        <Filter className="size-4" />
        <span className="sr-only">Filtrar</span>
      </Button>
      {(orderBy || leadsQuery) && (
          <Button
            onClick={handleRemoveFilters}
            size={"sm"}
            variant={"destructive"}
            className=" w-fit rounded-lg sm:w-auto"
          >
            <X className="size-4" />
            <span className="sr-only">Remover filtros</span>
          </Button>
        )}
    </div>
  );
};
