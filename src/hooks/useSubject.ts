import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { actionsSubject } from "@data/subject";
import { queryKeys } from "@data/query-keys";

import type { EditSubject, NewSubject } from "@data/subject";

const useGetSubject = () => {
  return useQuery({
    queryKey: queryKeys.study.subjects,
    queryFn: async () => actionsSubject.get(),
  });
};

const useAddSubject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: NewSubject) => {
      const success = actionsSubject.add(data);

      if (!success) {
        throw new Error("Não foi possível adicionar a matéria");
      }

      return success;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.study.subjects });
    },
  });
};

const useEditSubject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      subjectId,
      data,
    }: {
      data: EditSubject;
      subjectId: number;
    }) => {
      const success = actionsSubject.edit(subjectId, data);

      if (!success) {
        throw new Error("Não foi possível editar a matéria");
      }

      return success;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.study.subjects });
    },
  });
};

const useDeleteSubject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ subjectId }: { subjectId: number }) => {
      const success = actionsSubject.delete(subjectId);

      if (!success) {
        throw new Error("Não foi possível deletar a matéria")
      }

      return success;
    },
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: queryKeys.study.subjects})
    }
  });
};

export const useSubject = {
    get: useGetSubject,
    add: useAddSubject,
    delete: useDeleteSubject,
    update: useEditSubject,
}
