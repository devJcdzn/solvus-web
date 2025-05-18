import { updateProfileInfo } from "@/app/(private)/(user)/account/actions";
import { QueryClient, useMutation } from "@tanstack/react-query";

export const useMutateUserInfo = () => {
  const client = new QueryClient();
  const mutation = useMutation({
    mutationKey: ["update-profile"],
    mutationFn: async ({ name, email }: { name?: string; email?: string }) => {
      try {
        const response = await updateProfileInfo({ name, email });
      } catch (err) {
        console.log(err);
        throw new Error((err as Error).message);
      }
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  return mutation;
};
