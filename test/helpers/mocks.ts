import { Mock } from "vitest";
import { renderHook } from "@testing-library/react";
import {
  createQueryClient,
  createWrapper,
} from "@test/hooks/react-query-tests";
import { QueryClient } from "@tanstack/react-query";

export const useMocks = <T>(mockFunction: Mock, expectedReturn: T) => {
  const queryClient = createQueryClient();

  const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

  mockFunction.mockReturnValue(expectedReturn);

  return {
    queryClient,
    invalidateSpy,
  };
};

export const useRenderHooks = (queryClient: QueryClient, hook: () => any) => {
  return renderHook(hook, {
    wrapper: createWrapper(queryClient),
  });
};
