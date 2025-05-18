"use client";

import { Usuario } from "@/app/(public)/(auth)/types/user-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutateUserInfo } from "@/features/user/api/use-mutate-user-info";
import { useState } from "react";

export const UserInfoForm = ({ user }: { user: Usuario }) => {
  const [name, setName] = useState(user.nome);
  const [email, setEmail] = useState(user.email);

  const { mutate, isPending } = useMutateUserInfo();

  const couldBeSubmitted = (): boolean => {
    const hasChangedData = name !== user.nome || email !== user.email;
    const noEmptyData = name.trim() !== "" && email.trim() !== "";

    return hasChangedData && noEmptyData;
  };

  const handleSubmit = async () => {
    const data = {
      email,
      name,
    };

    const response = mutate(data, {
      onSuccess: () => {},
    });
  };

  return (
    <form className="space-y-4 md:max-w-1/2">
      <div className="grid gap-1">
        <label htmlFor="name" className="">
          Nome:
        </label>
        <Input
          name="name"
          id="name"
          className="p-2"
          placeholder="Seu nome"
          autoComplete="none"
          onBlur={(e) => setName(e.target.value)}
          defaultValue={user.nome}
        />
      </div>
      <div className="grid gap-1">
        <label htmlFor="email" className="">
          Email:
        </label>
        <Input
          name="email"
          id="emal"
          className="p-2"
          placeholder="Seu email"
          autoComplete="none"
          onBlur={(e) => setEmail(e.target.value)}
          defaultValue={user.email}
        />
      </div>
      <Button
        className="rounded-lg w-full"
        onClick={() => handleSubmit()}
        disabled={!couldBeSubmitted() || isPending}
      >
        {isPending ? "Carregando..." : "Salvar Alterações"}
      </Button>
    </form>
  );
};
