import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { NewContent, UpdateContent } from "@data/content";
import { actionsContent } from "@data/content";
import { queryKeys } from "@data/query-keys";

const useGetContent = () => {
  return useQuery({
    queryKey: queryKeys.study.contents,
    queryFn: () => actionsContent.get(),
  });
};

const useAddContent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      idClassroom,
      data,
    }: {
      idClassroom: number;
      data: NewContent;
    }) => {
      const result = actionsContent.add(idClassroom, data);

      if (result === false) {
        throw new Error("Não foi possível adicionar o novo contéudo");
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.study.contents });
    },
  });
};

const useUpdateContent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      idContent,
      data,
    }: {
      idContent: number;
      data: UpdateContent;
    }) => {
      const result = actionsContent.update(idContent, data);

      if (result === false) {
        throw new Error("Não foi possível editar o conteúdo");
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.study.contents });
    },
  });
};

const useDeleteContent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ idContent }: { idContent: number }) => {
      const result = actionsContent.delete(idContent);

      if (result === false) {
        throw new Error("Não foi possível editar o conteúdo");
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.study.contents });
    },
  });
};

export const useContent = {
  get: useGetContent,
  add: useAddContent,
  update: useUpdateContent,
  delete: useDeleteContent,
};
