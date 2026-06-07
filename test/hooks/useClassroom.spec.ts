import { renderHook, waitFor } from "@testing-library/react";
import { actionsClassroom } from "@data/classroom";
import { useClassroom } from "@hooks/useClassroom";

import { createWrapper, createQueryClient } from "./react-query";
import { Mock } from "vitest";

// Esse teste precisa de um ambiente react, pois utiliza
// react-queries
// Então, precisamos fornecer QueryClient e QuerClientProvider

vi.mock("@data/classroom", () => ({
  actionsClassroom: {
    get: vi.fn(),
    add: vi.fn(),
    edit: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("hooks: useClassroom", () => {
  afterEach(() => vi.clearAllMocks());

  it("useClassroom - ADD deve invalidar a query de classrooms", async () => {
    // único para cada teste, evita cachear
    const queryClient = createQueryClient();
    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

    (actionsClassroom.add as Mock).mockReturnValue(true);

    // renderHook(() => HOOK-QUE-QUERO-TESTAR(), SUA CONFIGURAÇÃO)
    const { result } = renderHook(() => useClassroom.add(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate({
      color: "white",
      name: "white",
    });

    await waitFor(() => expect(result.current.isSuccess));

    expect(invalidateSpy).toHaveBeenCalled();
  });

  it("useClassroom - GET", async () => {
    const queryClient = createQueryClient();
    const classroomsMock = [
      {
        id: 1,
        color: "white",
        name: "white",
      },
    ];

    (actionsClassroom.get as Mock).mockReturnValue(classroomsMock);

    const { result } = renderHook(() => useClassroom.get(), {
      wrapper: createWrapper(queryClient),
    });

    await waitFor(() => expect(result.current.data).toEqual(classroomsMock));
    expect(actionsClassroom.get).toHaveBeenCalledTimes(1);
  });

  it("useClassroom - UPDATE", async () => {
    const queryClient = createQueryClient();
    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

    (actionsClassroom.edit as Mock).mockReturnValue(true);

    const { result } = renderHook(() => useClassroom.update(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate({
      data: {
        color: "black",
        name: "white",
      },
      idClassroom: 1,
    });

    await waitFor(() => expect(result.current.isSuccess));

    expect(invalidateSpy).toHaveBeenCalled();
  });

  it("useClassroom - DELETE", async () => {
    const queryClient = createQueryClient();
    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");
    (actionsClassroom.delete as Mock).mockReturnValue(true);

    const { result } = renderHook(() => useClassroom.delete(), {
      wrapper: createWrapper(queryClient)
    })

    result.current.mutate({idClassroom: 1});
    
    await waitFor(() => expect(result.current.isSuccess));

    expect(invalidateSpy).toHaveBeenCalled();
  })
});
