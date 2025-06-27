"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";
import { login } from "../actions/login-action";

const initialState = {
  success: false,
  message: "",
};

export const LoginForm = () => {
  const [state, action, isLoading] = useActionState(login, initialState);

  useEffect(() => {
    if (state.success) {
      redirect("/");
    }
  }, [state]);

  return (
    <div className={"flex flex-col gap-6"}>
      <form action={action}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col items-center gap-2 font-medium">
              <div className="flex size-20 items-center justify-center rounded-md">
                <Image
                  src={"/solvus.png"}
                  alt="logo-solvus"
                  width={200}
                  height={200}
                  className="object-cover size-full"
                />
              </div>
              <span className="sr-only">Solvus</span>
            </div>
            <h1 className="text-xl font-bold">Admin Solvus</h1>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <label htmlFor="email">Email</label>
              <Input
                name="email"
                id="email"
                type="email"
                required
                placeholder="seuemail@example.com"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="password">Senha</label>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button disabled={isLoading} type="submit">
              {isLoading ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                "Fazer Login"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
