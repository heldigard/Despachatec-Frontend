'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function QueryProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes (increased to reduce re-fetching)
            retry: 1,
            refetchOnMount: false, // 🛡️ Prevent automatic re-fetch on mount
            refetchOnWindowFocus: false, // 🛡️ Prevent re-fetch on window focus
            refetchOnReconnect: false, // 🛡️ Prevent re-fetch on reconnect
          },
        },
      }),
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
