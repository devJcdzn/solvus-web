"use client";

import { addDays, format } from "date-fns";
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
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export const FilterData = () => {
  const pathname = usePathname();
  const { replace } = useRouter();

  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -7),
    to: new Date(),
  });

  const handleFilter = () => {
    const params = new URLSearchParams();

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
                "w-full sm:w-[250px]justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
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
