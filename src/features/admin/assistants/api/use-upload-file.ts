import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "../actions";

export const useUploadFile = (bucket: string) => {
  const mutation = useMutation({
    mutationFn: async (formData: any) => {
      return await uploadFile(formData, bucket);
    },
  });

  return mutation;
};
