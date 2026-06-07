import { waitFor } from "@testing-library/react";
import { actionsClassroom } from "@data/classroom";
import { useClassroom } from "@hooks/useClassroom";

import { useMocks, useRenderHooks } from "@test/helpers/mocks";
import { Mock } from "vitest";

vi.mock("@data/classroom", () => ({
  actionsClassroom: {
    get: vi.fn(),
    add: vi.fn(),
    edit: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("hooks: useClassroom", () => {
  afterEach(() => {
    vi.clearAllMocks();
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

    const { result } = useRenderHooks(queryClient, useClassroom.get);

    await waitFor(() => {
      expect(result.current.data).toEqual(classroomsMock);
    });

    expect(actionsClassroom.get).toHaveBeenCalledTimes(1);
  });

  it("useClassroom - ADD", async () => {
    const { queryClient, invalidateSpy } = useMocks(
      actionsClassroom.add as Mock,
      true,
    );

    const { result } = useRenderHooks(queryClient, useClassroom.add);

    await result.current.mutateAsync({
      color: "white",
      name: "white",
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(actionsClassroom.add).toHaveBeenCalledWith({
      color: "white",
      name: "white",
    });

    expect(invalidateSpy).toHaveBeenCalled();
  });

  it("useClassroom - ADD failed", async () => {
    const { queryClient, invalidateSpy } = useMocks(
      actionsClassroom.add as Mock,
      false,
    );

    const { result } = useRenderHooks(queryClient, useClassroom.add);

    await expect(
      result.current.mutateAsync({
        color: "white",
        name: "white",
      }),
    ).rejects.toThrow("Não foi possível adicionar a matéria");

    expect(actionsClassroom.add).toHaveBeenCalledWith({
      color: "white",
      name: "white",
    });

    expect(invalidateSpy).not.toHaveBeenCalled();
  });

  it("useClassroom - UPDATE", async () => {
    const { queryClient, invalidateSpy } = useMocks(
      actionsClassroom.edit as Mock,
      true,
    );

    const { result } = useRenderHooks(queryClient, useClassroom.update);

    await result.current.mutateAsync({
      idClassroom: 1,
      data: {
        color: "black",
        name: "white",
      },
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(actionsClassroom.edit).toHaveBeenCalledWith(1, {
      color: "black",
      name: "white",
    });

    expect(invalidateSpy).toHaveBeenCalled();
  });

  it("useClassroom - UPDATE failed", async () => {
    const { queryClient, invalidateSpy } = useMocks(
      actionsClassroom.edit as Mock,
      false,
    );

    const { result } = useRenderHooks(queryClient, useClassroom.update);

    await expect(
      result.current.mutateAsync({
        idClassroom: 1,
        data: {
          color: "black",
          name: "white",
        },
      }),
    ).rejects.toThrow("Não foi possível editar a matéria");

    expect(actionsClassroom.edit).toHaveBeenCalledWith(1, {
      color: "black",
      name: "white",
    });

    expect(invalidateSpy).not.toHaveBeenCalled();
  });

  it("useClassroom - DELETE", async () => {
    const { queryClient, invalidateSpy } = useMocks(
      actionsClassroom.delete as Mock,
      true,
    );

    const { result } = useRenderHooks(queryClient, useClassroom.delete);

    await result.current.mutateAsync({
      idClassroom: 1,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(actionsClassroom.delete).toHaveBeenCalledWith(1);
    expect(invalidateSpy).toHaveBeenCalled();
  });

  it("useClassroom - DELETE failed", async () => {
    const { queryClient, invalidateSpy } = useMocks(
      actionsClassroom.delete as Mock,
      false,
    );

    const { result } = useRenderHooks(queryClient, useClassroom.delete);

    await expect(
      result.current.mutateAsync({
        idClassroom: 1,
      }),
    ).rejects.toThrow("Não foi possível deletar a matéria");

    expect(actionsClassroom.delete).toHaveBeenCalledWith(1);
    expect(invalidateSpy).not.toHaveBeenCalled();
  });
});
