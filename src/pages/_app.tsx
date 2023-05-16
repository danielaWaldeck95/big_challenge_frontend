import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import type { AppProps } from "next/app";

import NoSSRWrapper from "../components/NoSsrWrapper";

import "~/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NoSSRWrapper>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ToastContainer />
      </QueryClientProvider>
    </NoSSRWrapper>
  );
}
