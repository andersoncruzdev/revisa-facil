import { actionsContent } from "@data/content";
import { useContent } from "@hooks/useContent";
import { useMocks, useRenderHooks } from "@test/helpers/mocks";
import { waitFor } from "@testing-library/react";
import { Mock } from "vitest";

vi.mock("@data/content", () => ({
  actionsContent: {
    get: vi.fn(),
    add: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("hooks: useContent", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("useContent - GET", async () => {
    const contentMock = [
      {
        id: 1,
        idMateria: 1,
        content: "contentTest",
        studied: "06/06/2026",
        nextRevision: "06/06/2026",
      },
    ];

    const { queryClient } = useMocks(actionsContent.get as Mock, contentMock);

    const { result } = useRenderHooks(queryClient, useContent.get);

    await waitFor(() => {
      expect(result.current.data).toEqual(contentMock);
    });

    expect(actionsContent.get).toHaveBeenCalledTimes(1);
  });

  it("useContent - ADD", async () => {
    const { queryClient, invalidateSpy } = useMocks(
      actionsContent.add as Mock,
      true,
    );

    const { result } = useRenderHooks(queryClient, useContent.add);

    await result.current.mutateAsync({
      idClassroom: 1,
      data: {
        content: "contentTest",
        studied: "06/06/2026",
        nextRevision: "06/06/2026",
      },
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(actionsContent.add).toHaveBeenCalledWith(1, {
      content: "contentTest",
      studied: "06/06/2026",
      nextRevision: "06/06/2026",
    });

    expect(invalidateSpy).toHaveBeenCalled();
  });

  it("useContent - ADD failed", async () => {
    const { queryClient, invalidateSpy } = useMocks(
      actionsContent.add as Mock,
      false,
    );

    const { result } = useRenderHooks(queryClient, useContent.add);

    await expect(
      result.current.mutateAsync({
        idClassroom: 1,
        data: {
          content: "contentTest",
          studied: "06/06/2026",
          nextRevision: "06/06/2026",
        },
      }),
    ).rejects.toThrow("Não foi possível adicionar o novo contéudo");

    expect(actionsContent.add).toHaveBeenCalledWith(1, {
      content: "contentTest",
      studied: "06/06/2026",
      nextRevision: "06/06/2026",
    });

    expect(invalidateSpy).not.toHaveBeenCalled();
  });

  it("useContent - UPDATE", async () => {
    const { queryClient, invalidateSpy } = useMocks(
      actionsContent.update as Mock,
      true,
    );

    const { result } = useRenderHooks(queryClient, useContent.update);

    await result.current.mutateAsync({
      idContent: 1,
      data: {
        studied: "08/06/2026",
      },
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(actionsContent.update).toHaveBeenCalledWith(1, {
      studied: "08/06/2026",
    });

    expect(invalidateSpy).toHaveBeenCalled();
  });

  it("useContent - UPDATE failed", async () => {
    const { queryClient, invalidateSpy } = useMocks(
      actionsContent.update as Mock,
      false,
    );

    const { result } = useRenderHooks(queryClient, useContent.update);

    await expect(
      result.current.mutateAsync({
        idContent: 1,
        data: {
          studied: "08/06/2026",
        },
      }),
    ).rejects.toThrow("Não foi possível editar o conteúdo");

    expect(actionsContent.update).toHaveBeenCalledWith(1, {
      studied: "08/06/2026",
    });

    expect(invalidateSpy).not.toHaveBeenCalled();
  });

  it("useContent - DELETE", async () => {
    const { queryClient, invalidateSpy } = useMocks(
      actionsContent.delete as Mock,
      true,
    );

    const { result } = useRenderHooks(queryClient, useContent.delete);

    await result.current.mutateAsync({
      idContent: 1,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(actionsContent.delete).toHaveBeenCalledWith(1);
    expect(invalidateSpy).toHaveBeenCalled();
  });

  it("useContent - DELETE failed", async () => {
    const { queryClient, invalidateSpy } = useMocks(
      actionsContent.delete as Mock,
      false,
    );

    const { result } = useRenderHooks(queryClient, useContent.delete);

    await expect(
      result.current.mutateAsync({
        idContent: 1,
      }),
    ).rejects.toThrow("Não foi possível editar o conteúdo");

    expect(actionsContent.delete).toHaveBeenCalledWith(1);
    expect(invalidateSpy).not.toHaveBeenCalled();
  });
});