import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import type { AppProps } from "next/app";

import NoSSRWrapper from "../components/NoSsrWrapper";

import "~/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { RouteGuard } from "~/guards/RouterGuard";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NoSSRWrapper>
      <QueryClientProvider client={queryClient}>
        <RouteGuard>
          <Component {...pageProps} />
          <ToastContainer />
        </RouteGuard>
      </QueryClientProvider>
    </NoSSRWrapper>
  );
}
