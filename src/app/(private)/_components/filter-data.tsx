"use client";

import { addDays, format, isValid, parse } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Filter } from "lucide-react";
import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export const FilterData = () => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const parseDate = (dateStr: string | null) => {
    if (!dateStr) return null;
    const parsedDate = parse(dateStr, "dd-MM-yyyy", new Date());
    return isValid(parsedDate) ? parsedDate : null;
  };

  const from = parseDate(searchParams.get("from"));
  const to = parseDate(searchParams.get("to"));

  const [date, setDate] = useState<DateRange | undefined>({
    from: from || addDays(new Date(), -7),
    to: to || new Date(),
  });

  useEffect(() => {
    const from = parseDate(searchParams.get("from"));
    const to = parseDate(searchParams.get("to"));

    setDate({
      from: from || addDays(new Date(), -7),
      to: to || new Date(),
    });
  }, [searchParams]);

  const handleFilter = () => {
    if (date?.from && date.to) {
      params.set("from", format(date.from, "dd-MM-yyyy"));
      params.set("to", format(date.to, "dd-MM-yyyy"));
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between gap-2 w-full sm:w-fit">
      <div className={cn("grid gap-2 flex-1 sm:flex-none")}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full sm:w-[250px]justify-start truncate text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "d 'de' LLLL 'de' yyyy", {
                      locale: ptBR,
                    })}{" "}
                    -{" "}
                    {format(date.to, "d 'de' LLLL 'de' yyyy", { locale: ptBR })}
                  </>
                ) : (
                  format(date.from, "d 'de' LLLL 'de' yyyy", { locale: ptBR })
                )
              ) : (
                <span>Escolha uma data</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              locale={ptBR}
            />
          </PopoverContent>
        </Popover>
      </div>
      <Button
        onClick={handleFilter}
        size={"sm"}
        className="bg-foreground w-fit rounded-lg sm:w-auto hover:bg-foreground/90"
      >
        <Filter className="size-4" />
        <span className="sr-only">Filtrar</span>
      </Button>
    </div>
  );
};
