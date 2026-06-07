import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";


// Simula o ambiente real, o QueryClientProvider
export const createWrapper = (queryClient: QueryClient) => {
  return ({ children }: { children: ReactNode }) => {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
};

// Gerenciador interno do React query
// - cache das queries
// - estados loading, erro, sucesso
// - mutations em andamento
// - queries invalidads
// - retires
// - refetech
export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // não tentar novamente se error
      },
      mutations: {
        retry: false, // não tentar novamente se error
      },
    },
  });
};
