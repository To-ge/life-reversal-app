import "styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import TopBar from "components/topbar/TopBar";
import { UserProvider } from "provider/userProvider";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <UserProvider>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </UserProvider>
  );
}
