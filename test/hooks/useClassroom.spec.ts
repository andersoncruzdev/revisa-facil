import { waitFor } from "@testing-library/react";
import { actionsClassroom } from "@data/classroom";
import { useClassroom } from "@hooks/useClassroom";

import { useMocks, useRenderHooks } from "@test/helpers/mocks";
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
    const { queryClient, invalidateSpy } = useMocks(
      actionsClassroom.add as Mock,
      true,
    );
    const { result } = useRenderHooks(queryClient, () => useClassroom.add());

    result.current.mutate({
      color: "white",
      name: "white",
    });

    await waitFor(() => expect(result.current.isSuccess));

    expect(invalidateSpy).toHaveBeenCalled();
  });

  it("useClassroom - GET", async () => {
    const classroomsMock = [
      {
        id: 1,
        color: "white",
        name: "white",
      },
    ];

    const { queryClient } = useMocks(
      actionsClassroom.get as Mock,
      classroomsMock,
    );

    const { result } = useRenderHooks(queryClient, () => useClassroom.get());

    await waitFor(() => {
      expect(result.current.data).toEqual(classroomsMock);
    });

    expect(actionsClassroom.get).toHaveBeenCalledTimes(1);
  });

  it("useClassroom - UPDATE", async () => {
    const { queryClient, invalidateSpy } = useMocks(
      actionsClassroom.edit as Mock,
      true,
    );

    const { result } = useRenderHooks(queryClient, () => useClassroom.update());

    result.current.mutate({
      data: {
        color: "black",
        name: "white",
      },
      idClassroom: 1,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(invalidateSpy).toHaveBeenCalled();
  });

  it("useClassroom - DELETE", async () => {
    const { queryClient, invalidateSpy } = useMocks(
      actionsClassroom.delete as Mock,
      true,
    );

    const { result } = useRenderHooks(queryClient, () => useClassroom.delete());

    result.current.mutate({ idClassroom: 1 });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(invalidateSpy).toHaveBeenCalled();
  });
});
