import "styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "provider/userProvider";
import { ActionCableProvider } from "provider/ActionCableProvider";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <UserProvider>
        <ActionCableProvider>
          <Component {...pageProps} />
        </ActionCableProvider>
      </UserProvider>
    </SessionProvider>
  );
}
