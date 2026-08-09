import { waitFor } from "@testing-library/react";
import { actionsSubject } from "@data/subject";
import { useSubject } from "@hooks/useSubject";

import { useMocks, useRenderHooks } from "@test/helpers/mocks";
import { Mock } from "vitest";
import { queryKeys } from "@data/query-keys";

vi.mock("@data/subject", () => ({
  actionsSubject: {
    get: vi.fn(),
    add: vi.fn(),
    edit: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("hooks: useSubject", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("useSubject - GET", async () => {
    const subjectsMock = [
      {
        id: 1,
        color: "white",
        name: "white",
      },
    ];

    const { queryClient } = useMocks(
      actionsSubject.get as Mock,
      subjectsMock,
    );

    const { result } = useRenderHooks(queryClient, useSubject.get);

    await waitFor(() => {
      expect(result.current.data).toEqual(subjectsMock);
    });

    expect(actionsSubject.get).toHaveBeenCalledTimes(1);
  });

  it("useSubject - ADD", async () => {
    const { queryClient, invalidateSpy } = useMocks(
      actionsSubject.add as Mock,
      true,
    );

    const { result } = useRenderHooks(queryClient, useSubject.add);

    await result.current.mutateAsync({
      color: "white",
      name: "white",
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(actionsSubject.add).toHaveBeenCalledWith({
      color: "white",
      name: "white",
    });

    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: queryKeys.study.subjects,
    });
  });

  it("useSubject - ADD failed", async () => {
    const { queryClient, invalidateSpy } = useMocks(
      actionsSubject.add as Mock,
      false,
    );

    const { result } = useRenderHooks(queryClient, useSubject.add);

    await expect(
      result.current.mutateAsync({
        color: "white",
        name: "white",
      }),
    ).rejects.toThrow("Não foi possível adicionar a matéria");

    expect(actionsSubject.add).toHaveBeenCalledWith({
      color: "white",
      name: "white",
    });

    expect(invalidateSpy).not.toHaveBeenCalled();
  });

  it("useSubject - UPDATE", async () => {
    const { queryClient, invalidateSpy } = useMocks(
      actionsSubject.edit as Mock,
      true,
    );

    const { result } = useRenderHooks(queryClient, useSubject.update);

    await result.current.mutateAsync({
      subjectId: 1,
      data: {
        color: "black",
        name: "white",
      },
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(actionsSubject.edit).toHaveBeenCalledWith(1, {
      color: "black",
      name: "white",
    });

    expect(invalidateSpy).toHaveBeenCalled();
  });

  it("useSubject - UPDATE failed", async () => {
    const { queryClient, invalidateSpy } = useMocks(
      actionsSubject.edit as Mock,
      false,
    );

    const { result } = useRenderHooks(queryClient, useSubject.update);

    await expect(
      result.current.mutateAsync({
        subjectId: 1,
        data: {
          color: "black",
          name: "white",
        },
      }),
    ).rejects.toThrow("Não foi possível editar a matéria");

    expect(actionsSubject.edit).toHaveBeenCalledWith(1, {
      color: "black",
      name: "white",
    });

    expect(invalidateSpy).not.toHaveBeenCalled();
  });

  it("useSubject - DELETE", async () => {
    const { queryClient, invalidateSpy } = useMocks(
      actionsSubject.delete as Mock,
      true,
    );

    const { result } = useRenderHooks(queryClient, useSubject.delete);

    await result.current.mutateAsync({
      subjectId: 1,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(actionsSubject.delete).toHaveBeenCalledWith(1);
    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: queryKeys.study.subjects,
    });
    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: queryKeys.study.contents,
    });
  });

  it("useSubject - DELETE failed", async () => {
    const { queryClient, invalidateSpy } = useMocks(
      actionsSubject.delete as Mock,
      false,
    );

    const { result } = useRenderHooks(queryClient, useSubject.delete);

    await expect(
      result.current.mutateAsync({
        subjectId: 1,
      }),
    ).rejects.toThrow("Não foi possível excluir a matéria");

    expect(actionsSubject.delete).toHaveBeenCalledWith(1);
    expect(invalidateSpy).not.toHaveBeenCalled();
  });
});
