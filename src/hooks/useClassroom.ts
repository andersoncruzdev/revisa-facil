import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { actionsClassroom } from "@data/classroom";
import { queryKeys } from "@data/query-keys";

import type { EditClassroom, NewClassroom } from "@data/classroom";

const useGetClassroom = () => {
  return useQuery({
    queryKey: queryKeys.study.classrooms,
    queryFn: async () => actionsClassroom.get(),
  });
};

const useAddClassroom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: NewClassroom) => {
      const success = actionsClassroom.add(data);

      if (!success) {
        throw new Error("Não foi possível adicionar a matéria");
      }

      return success;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.study.classrooms });
    },
  });
};

const useEditClassroom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      idClassroom,
      data,
    }: {
      data: EditClassroom;
      idClassroom: number;
    }) => {
      const success = actionsClassroom.edit(idClassroom, data);

      if (!success) {
        throw new Error("Não foi possível editar a matéria");
      }

      return success;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.study.classrooms });
    },
  });
};

const useDeleteClassroom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ idClassroom }: { idClassroom: number }) => {
      const success = actionsClassroom.delete(idClassroom);

      if (!success) {
        throw new Error("Não foi possível deletar a matéria")
      }

      return success;
    },
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: queryKeys.study.classrooms})
    }
  });
};

export const useClassroom = {
    get: useGetClassroom,
    add: useAddClassroom,
    delete: useDeleteClassroom,
    update: useEditClassroom,
}
